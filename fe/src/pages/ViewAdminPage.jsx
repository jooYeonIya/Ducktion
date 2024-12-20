import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { useNavigate } from 'react-router-dom'; 
import { getViewAdmin } from "../services/adminService";
import GodoTitleLabel from "../components/Labels/GodoTitleLabel";
import RectangleButton from "../components/Button/RectangleButton"; 
import RoundButton from "../components/Button/RoundButton"; 

import '@styles/components/ViewAdminPage.css';

function ViewAdminPage() {
  const [type, setType] = useState("요청");
  const [currentData, setCurrentData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getViewAdmin();
        setCurrentData(data);
      } catch (error) {
        console.error("Failed to fetch post list:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = currentData.filter(item => item.type === type);

  const handleNavigate = (id, type) => {
    if (type === "요청") {
      navigate(`/request/${id}`); // 요청 타입일 때
    } else if (type === "신고" || type === "검수") {
      navigate(`/product/${id}`); // 신고 및 검수 타입일 때
    }
  };
  

  const columns = React.useMemo(() => {
    const commonColumns = [
      {
        Header: "No",
        accessor: "id",
      },
    ];
  
    if (type === "신고") {
      return [
        ...commonColumns,
        {
          Header: "상품명",
          accessor: "title",
          Cell: ({ row }) => (
            <span onClick={() => handleNavigate(row.original.id, row.original.type)} style={{ cursor: "pointer", color: "black" }}>
              {row.original.title}
            </span>
          ),
        },
        {
          Header: "신고 횟수",
          accessor: "reportCount",
        },
        {
          Header: "작업",
          accessor: "action",
          Cell: () => (
            <div className="button-action">
              <RectangleButton text="반려" /> 
              <RectangleButton text="승인" />
            </div>
          ),
        },
      ];
    } else if (type === "검수") {
      return [
        ...commonColumns,
        {
          Header: "상품명",
          accessor: "title",
          Cell: ({ row }) => (
            <span onClick={() => handleNavigate(row.original.id, row.original.type)} style={{ cursor: "pointer", color: "black" }}>
              {row.original.title}
            </span>
          ),
        },
        {
          Header: "요청일시",
          accessor: "date",
        },
        {
          Header: "작업",
          accessor: "action",
          Cell: () => (
            <div className="button-action">
              <RectangleButton text="반려" />
              <RectangleButton text="검수완료" />
            </div>
          ),
        },
      ];
    } else if (type === "요청") {
      return [
        ...commonColumns,
        {
          Header: "분류",
          accessor: "status",
        },
        {
          Header: "제목",
          accessor: "communitytitle",
          Cell: ({ row }) => (
            <span onClick={() => handleNavigate(row.original.id, row.original.type)} style={{ cursor: "pointer", color: "black" }}>
              {row.original.communitytitle}
            </span>
          ),
        },
        {
          Header: "요청자",
          accessor: "user",
        },
        {
          Header: "요청일시",
          accessor: "date",
        },
      ];
    }
  }, [type]);
  

  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = useTable({ columns, data: filteredData });

  return (
    <div className="postlist-container">
      <GodoTitleLabel text={`${type} 목록`} />
      <div className="button-group-admin">
        <RoundButton
          options={[
            { value: '요청', title: '요청' },
            { value: '신고', title: '신고' },
            { value: '검수', title: '검수' },
          ]}
          onChange={(value) => setType(value)}
          selectedOption={type}
        />
      </div>
      <table {...getTableProps()} style={{ width: "100%" }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ padding: "10px", backgroundColor: "white", border: "1px solid white" }}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps(row.id)}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps({ key: cell.column.id })}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAdminPage;
