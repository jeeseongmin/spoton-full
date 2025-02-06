import { MouseEvent, useEffect, useState } from "react";

import { postReservationsByState } from "@/apis/reservation";
import Pagination from "@/components/Pagination";
import ReservationTable from "@/pages/Admin/components/ReservationInfo/ReservationTable";
import TableFilterButton from "@/pages/Admin/components/TableFilterButton";
import { ReservationByState, ReservationStateCode } from "@/types/reservation";

const filterButtons = [
  { name: "승인 요청", type: "request" },
  { name: "승인 완료", type: "approve" },
  { name: "승인 반려", type: "reject" },
  { name: "예약 취소", type: "cancel" },
];

const ReservationInfo = () => {
  const [reservations, setReservations] = useState<ReservationByState[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<
    ReservationStateCode | "all"
  >("all");
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  const getReservations = async () => {
    const { content, totalElements, totalPages } =
      await postReservationsByState(page, 10, selectedFilter);
    setReservations(content);
    setPageCount(totalPages);
    selectedFilter === "request" && setRequestCount(totalElements);
  };

  const getRequestCount = async () => {
    const { totalElements } = await postReservationsByState(
      page,
      10,
      "request",
    );
    setRequestCount(totalElements);
  };

  const handleClickFilterButton = (e: MouseEvent<HTMLButtonElement>) => {
    const filterType = e.currentTarget.dataset.filter as
      | ReservationStateCode
      | "all";

    setSelectedFilter(filterType);
    setPage(0);
  };

  const updateReservations = () => {
    getReservations();
  };

  useEffect(() => {
    getReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter, page]);

  useEffect(() => {
    getRequestCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 p-4 text-base text-black">
      <div className="relative flex gap-2">
        <TableFilterButton
          data-filter="all"
          isActive={selectedFilter === "all"}
          onClick={handleClickFilterButton}
        >
          전체
        </TableFilterButton>
        <div className="mx-1 border-r border-gray-dull"></div>
        {filterButtons.map(({ name, type }) => (
          <TableFilterButton
            data-filter={type}
            className="px-2 text-small"
            isActive={selectedFilter === type}
            isNew={type === "request" && requestCount > 0}
            onClick={handleClickFilterButton}
          >
            {name}
          </TableFilterButton>
        ))}
      </div>
      <div className="flex flex-col items-center gap-6 bg-white px-3 py-4">
        <ReservationTable
          reservations={reservations}
          updateReservations={updateReservations}
        />
        {pageCount > 0 && (
          <Pagination count={pageCount} page={page} onChange={setPage} />
        )}
      </div>
    </div>
  );
};

export default ReservationInfo;
