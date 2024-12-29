import React from "react";
import { useTable } from "react-table";
import RectangleButton from "../components/Button/RectangleButton";

export default function AdminTable({ type, data, handleNavigate }) {
  const columns = React.useMemo(() => {
    const commonColumns = [
      {
        Header: "No",
        Cell: ({ row }) => row.index + 1,
      },
    ];

    switch (type) {
      case "신고":
        return [
          ...commonColumns,
          {
            Header: "상품명",
            accessor: "itemName",
            Cell: ({ row }) => (
              <span
                onClick={() => handleNavigate(row.original.id, row.original.type)}
                style={{ cursor: "pointer", color: "black" }}
              >
                {row.original.itemName}
              </span>
            ),
          },
          { Header: "신고 횟수", accessor: "reportedCount" },
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
      case "검수":
        return [
          ...commonColumns,
          {
            Header: "상품명",
            accessor: "title",
            Cell: ({ row }) => (
              <span
                onClick={() => handleNavigate(row.original.id, row.original.type)}
                style={{ cursor: "pointer", color: "black" }}
              >
                {row.original.title}
              </span>
            ),
          },
          { Header: "요청 일시", accessor: "date" },
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
      default:
        return [
          ...commonColumns,
          {
            Header: "제목",
            accessor: "title",
            Cell: ({ row }) => (
              <span
                onClick={() => handleNavigate(row.original.id, row.original.type)}
                style={{ cursor: "pointer", color: "black" }}
              >
                {row.original.title}
              </span>
            ),
          },
          { Header: "요청자", accessor: "nickname" },
          { Header: "요청 일시", accessor: "requestTime" },
        ];
    }
  }, [type]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="admin-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
