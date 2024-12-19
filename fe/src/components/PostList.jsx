import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { Link } from 'react-router-dom'; 
import { getPostList } from "../services/adminService";
import GodoTitleLabel from "./Labels/GodoTitleLabel";
import RectangleButton from "./Button/RectangleButton"; 
import RoundButton from "./Button/RoundButton"; 
import '@styles/components/PostList.css';

function PostList() {
  const [type, setType] = useState("요청");
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostList();
        setCurrentData(data);
      } catch (error) {
        console.error("Failed to fetch post list:", error);
      }
    };

    fetchData();
  }, []);

  const handleReject = (id) => {
    setCurrentData(prevData => {
      const updatedData = prevData.filter(item => item.id !== id);
      return updatedData.map((item, index) => ({
        ...item,
        id: index + 1
      }));
    });
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
            <Link to={`/product/${row.original.id}`}>{row.original.title}</Link>
          ),
        },
        {
          Header: "신고 횟수",
          accessor: "reportCount",
        },
        {
          Header: "작업",
          accessor: "action",
          Cell: ({ row }) => (
            <div className="button-action">
              <RectangleButton text="반려" onClick={() => handleReject(row.original.id)} /> 
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
            <Link to={`/product/${row.original.id}`}>{row.original.title}</Link>
          ),
        },
        {
          Header: "요청일시",
          accessor: "date",
        },
        {
          Header: "작업",
          accessor: "action",
          Cell: ({ row }) => (
            <div className="button-action">
              <RectangleButton text="반려" onClick={() => handleReject(row.original.id)} />
              <RectangleButton text="검수완료" onClick={() => handleReviewComplete(row.original.id)} />
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
      <div className="button-group">
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

export default PostList;
