provider "aws" {
  region = "ap-northeast-2" # 서울 리전
}

# VPC 리소스 생성
resource "aws_vpc" "sample-vpc" {
  cidr_block           = "10.0.0.0/16" # VPC의 CIDR 블록 범위 지정
  enable_dns_support   = true          # DNS 해석 활성화
  enable_dns_hostnames = true          # EC2 인스턴스에 퍼블릭 DNS 이름 활성화
  tags = {
    Name = "sample-vpc"               
  }
}

# 퍼블릭 서브넷 생성
resource "aws_subnet" "sample-subnet-public-01" {
  vpc_id                  = aws_vpc.sample-vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true                    # EC2 인스턴스에 퍼블릭 IP 자동 할당
  availability_zone       = "ap-northeast-2a"
  tags = {
    Name = "sample-subnet-public-01"
  }
}

# 퍼블릭 서브넷
resource "aws_subnet" "sample-subnet-public-02" {
  vpc_id                  = aws_vpc.sample-vpc.id
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-2b"
  tags = {
    Name = "sample-subnet-public-02"
  }
}

# 프라이빗 서브넷 생성
resource "aws_subnet" "sample-subnet-private-01" {
  vpc_id                  = aws_vpc.sample-vpc.id
  cidr_block              = "10.0.64.0/24"
  availability_zone       = "ap-northeast-2a"
  tags = {
    Name = "sample-subnet-private-01"
  }
}

# 프라이빗 서브넷 생성
resource "aws_subnet" "sample-subnet-private-02" {
  vpc_id                  = aws_vpc.sample-vpc.id
  cidr_block              = "10.0.65.0/24"
  availability_zone       = "ap-northeast-2b"
  tags = {
    Name = "sample-subnet-private-02"
  }
}

# 인터넷 게이트웨이 생성
resource "aws_internet_gateway" "sample-igw" {
  vpc_id = aws_vpc.sample-vpc.id
  tags = {
    Name = "sample-igw"
  }
}

# 나트게이트웨이 생성
resource "aws_eip" "nat-ip01" {
  domain = "vpc"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_nat_gateway" "sample-ngw-01" {
  allocation_id = aws_eip.nat-ip01.id
  subnet_id     = aws_subnet.sample-subnet-public-01.id
  tags = {
    Name = "sample-ngw-01"
  }
}

# 라우트 테이블 생성
resource "aws_route_table" "sample-public-route" {
  vpc_id = aws_vpc.sample-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.sample-igw.id
  }

  tags = {
    Name = "sample-public-route"
  }
}

resource "aws_route_table" "sample-private-route" {
  vpc_id = aws_vpc.sample-vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.sample-ngw-01.id
  }

  tags = {
    Name = "sample-private-route"
  }
}

# 서브넷에 라우트 테이블 연결
resource "aws_route_table_association" "public-assoc" {
  subnet_id      = aws_subnet.sample-subnet-public-01.id
  route_table_id = aws_route_table.sample-public-route.id
}

resource "aws_route_table_association" "public-assoc-02" {
  subnet_id      = aws_subnet.sample-subnet-public-02.id
  route_table_id = aws_route_table.sample-public-route.id
}

resource "aws_route_table_association" "private-assoc-01" {
  subnet_id      = aws_subnet.sample-subnet-private-01.id
  route_table_id = aws_route_table.sample-private-route.id
}

resource "aws_route_table_association" "private-assoc-02" {
  subnet_id      = aws_subnet.sample-subnet-private-02.id
  route_table_id = aws_route_table.sample-private-route.id
}

# ALB 생성
resource "aws_lb" "sample-elb"{
  name = "sample-elb"
  internal = false	 # true = 내부(internal) / false = 외부(Internet-facing)
  load_balancer_type = "application" # Default - application, 다른 하나는 gateway
  security_groups    = [aws_security_group.alb-sg.id] 
  subnets = [
    aws_subnet.sample-subnet-public-01.id,
    aws_subnet.sample-subnet-public-02.id
  ]

  tags = {
      Name = "sample-elb"
  }
}

# ALB 대상 그룹 생성 (프라이빗 서브넷의 백엔드 EC2)
resource "aws_lb_target_group" "sample-tg" {
  name     = "sample-tg"
  port     = 8080                        # 백엔드 애플리케이션 포트
  protocol = "HTTP"
  vpc_id   = aws_vpc.sample-vpc.id

  tags = {
    Name = "Sample-TG"
  }
}

# ALB 대상 그룹에 백엔드 EC2 연결
resource "aws_lb_target_group_attachment" "backend-attachment" {
  target_group_arn = aws_lb_target_group.sample-tg.arn
  target_id        = aws_instance.backend.id
  port             = 8080 # 백엔드 EC2에서 애플리케이션이 실행 중인 포트
}

# ALB 리스너 생성
resource "aws_lb_listener" "sample-elb-listener" {
  load_balancer_arn = aws_lb.sample-elb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.sample-tg.arn
  }
}

# 출력: ALB DNS
output "alb_dns_name" {
  value = aws_lb.sample-elb.dns_name
}

# 보안 그룹 생성
# ALB 보안 그룹
resource "aws_security_group" "alb-sg" {
  vpc_id = aws_vpc.sample-vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # HTTP 접근 허용
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # HTTPS 접근 허용 (옵션)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ALB-SG"
  }
}

# 프론트엔드 보안 그룹
resource "aws_security_group" "frontend-sg" {
  vpc_id = aws_vpc.sample-vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Frontend-SG"
  }
}

# 백엔드 보안 그룹
resource "aws_security_group" "backend-sg" {
  vpc_id = aws_vpc.sample-vpc.id

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # 프론트엔드 서브넷만 허용
  }

  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # 모든 인터넷으로의 통신 허용
  }

  tags = {
    Name = "Backend-SG"
  }
}

# DB 보안 그룹
resource "aws_security_group" "db-sg" {
  vpc_id = aws_vpc.sample-vpc.id

  ingress {
    from_port   = 3308
    to_port     = 3308
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # VPC 내부 전체 서브넷 허용
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "DB-SG"
  }
}

# 프론트엔드 EC2
resource "aws_instance" "frontend" {
  ami           = "ami-0dc44556af6f78a7b" # ubuntu AMI
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.sample-subnet-public-01.id
  key_name      = "my-key-pair" 
  security_groups = [aws_security_group.frontend-sg.id]
  associate_public_ip_address = true # 퍼블릭 IP 활성화

  user_data = <<-EOF
    #!/bin/bash
    # 1. 시스템 업데이트
    sudo apt-get update -y

    # 2. Docker 설치
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo usermod -aG docker ubuntu
  EOF

  tags = {
    Name = "Frontend-Server"
  }
}

# 백엔드 EC2
resource "aws_instance" "backend" {
  ami           = "ami-0dc44556af6f78a7b" # ubuntu AMI
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.sample-subnet-private-01.id
  key_name      = "my-key-pair"
  security_groups = [aws_security_group.backend-sg.id]

  user_data = <<-EOF
    #!/bin/bash
    # 1. 시스템 업데이트
    sudo apt-get update -y

    # 2. Docker 설치
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo usermod -aG docker ubuntu
  EOF

  tags = {
    Name = "Backend-Server"
  }
}

# MySQL 실행 EC2 (Private Subnet)
resource "aws_instance" "mysql" {
  ami           = "ami-0dc44556af6f78a7b" # ubuntu AMI
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.sample-subnet-private-01.id
  key_name      = "my-key-pair"
  security_groups = [aws_security_group.db-sg.id]

  user_data = <<-EOF
    #!/bin/bash
    # 1. 시스템 업데이트
    sudo apt-get update -y

    # 2. Docker 설치
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo usermod -aG docker ubuntu

    # 3. MySQL 컨테이너 실행
    docker run -d --name ducktion_mysql \
      -p 3308:3306 \
      -e MYSQL_ROOT_PASSWORD=1111 \
      -e MYSQL_DATABASE=ducktion \
      mysql:latest
  EOF

  tags = {
    Name = "MySQL-Server"
  }
}

