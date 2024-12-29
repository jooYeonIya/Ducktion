import { useMemo } from "react";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import RectangleButton from "../components/Button/RectangleButton";

export default function AdminTable({ type, data }) {
  const navigate = useNavigate();

  const handleNavigate = (original) => {
    console.log(original)
    if (type === "개설 요청" || type === "삭제 요청") {
      navigate("/viewAdminDetailPage", { state: { type: type, data: original } });
    } else if (type === "신고" || type === "검수") {
      navigate("/viewItem", { state: { itemId: original.itemId } });
    }
  };

  const columns = useMemo(() => {
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
            accessor: "itemName",
            Cell: ({ row }) => (
              <span
                style={{ cursor: "pointer", color: "black" }}
              >
                {row.original.itemName}
              </span>
            ),
          },
          { Header: "낙찰일", accessor: "bidEndTime" },
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
          { Header: "제목", accessor: "title" },
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
            <tr {...row.getRowProps()}
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigate(row.original)}
            >
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
