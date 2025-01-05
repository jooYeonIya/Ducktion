import { useMemo } from "react";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import { useModal } from '../hooks/useModal'
import { submitReport, cancelReport, validateItemReject } from "../services/adminService";
import RectangleButton from "../components/Button/RectangleButton";
import InputInvoiceModalContent from '../components/Modal/InputInvoiceModalContent'
import CustomModal from '../components/Modal/CustomModal'

export default function AdminTable({ type, data }) {
  const navigate = useNavigate();
  const { isModalOpen, modalContent, openModal, closeModal } = useModal();

  const handleNavigate = (original) => {
    if (type === "개설 요청" || type === "삭제 요청") {
      navigate("/viewAdminDetailPage", { state: { type: type, data: original } });
    } else if (type === "신고" || type === "검수") {
      navigate("/viewItem", { state: { itemId: original.itemId } });
    }
  };

  const handleReportSubmit = async (event, original) => {
    event.stopPropagation(); // 이벤트 전파 중단

    const rejectReason = handelPrompt();
    const message = await submitReport(original.itemId, rejectReason);
    alert(message);
  }

  const handelReportCancel = async (event, original) => {
    event.stopPropagation();

    const message = await cancelReport(original.itemId);
    alert(message);
  }

  const handelValidateItemReject = async (event, original)  => {
    event.stopPropagation();
    const message = await validateItemReject(original.itemId);
    alert(message);
  }

  const handelPrompt = () => {
    const rejectReasonTextField = prompt("취소 사유를 입력해주세요:", "");
    if (rejectReasonTextField !== null && rejectReasonTextField.trim() !== "") {
      return rejectReasonTextField
    } else if (rejectReasonTextField !== null) {
      alert("사유를 작성해 주세요");
    }
  }

  const openInvoiceModal = (event, original) => {
    event.stopPropagation();
    openModal(<InputInvoiceModalContent itemId={original.itemId} onClose={closeModal} role="ADMIN"/>);
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
          { Header: "상품명", accessor: "itemName" },
          { Header: "신고 횟수", accessor: "reportedCount" },
          {
            Header: "작업",
            accessor: "action",
            Cell: ({ row }) => (
              <div className="button-action">
                <RectangleButton text="반려" onClick={(e) => handelReportCancel(e, row.original)} />
                <RectangleButton text="승인" onClick={(e) => handleReportSubmit(e, row.original)} />
              </div>
            ),
          },
        ];
      case "검수":
        return [
          ...commonColumns,
          { Header: "상품명", accessor: "itemName" },
          { Header: "낙찰일", accessor: "bidEndTime" },
          {
            Header: "작업",
            accessor: "action",
            Cell: ({ row }) => (
              <div className="button-action">
                <RectangleButton text="반려" onClick={(e) => handelValidateItemReject(e, row.original)} />
                <RectangleButton text="검수완료" onClick={(e) => openInvoiceModal(e, row.original)} />
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
    <>
      <CustomModal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />

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
    </>
  );
}
