import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { useNavigate } from 'react-router-dom'; 
import { getViewAdmin } from "../services/adminService";
import GodoTitleLabel from "./Labels/GodoTitleLabel";
import RectangleButton from "./Button/RectangleButton"; 
import RoundButton from "./Button/RoundButton"; 

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


  const handleNavigate = (id) => {
    navigate(`/product/${id}`); // navigate를 사용하여 상세 페이지로 이동
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
            <span onClick={() => handleNavigate(row.original.id)} style={{ cursor: "pointer", color: "black" }}>
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
          Cell: ({ }) => (
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
            <span onClick={() => handleNavigate(row.original.id)} style={{ cursor: "pointer", color: "black" }}>
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
          Cell: ({ }) => (
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
          accessor: "anothertitle",
          Cell: ({ row }) => (    
            <span onClick={() => handleNavigate(row.original.id)} style={{ cursor: "pointer", color: "black" }}>
              {row.original.anothertitle}
            </span> //임시방편용 카테고리개설요청상세로 넘어가기위함임
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
  } = useTable({ columns, data: currentData });

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
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
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
