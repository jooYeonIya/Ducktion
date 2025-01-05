# 1. Node.js 기반 이미지로 빌드 단계 설정
FROM node:22 AS builder

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 lock 파일 복사
COPY package.json package-lock.json ./

# 4. 의존성 설치
RUN npm install

# 5. 프로젝트 코드 복사
COPY . .

# 6. 빌드 실행
RUN npm run build

# 7. 정적 파일을 제공할 Nginx 설정
FROM nginx:alpine AS production

# 8. Nginx의 기본 정적 파일 제공 위치에 Vite 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 9. Nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]