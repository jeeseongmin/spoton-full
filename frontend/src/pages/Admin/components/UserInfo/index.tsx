import { MouseEvent, useEffect, useState } from "react";

import { postUsersByState } from "@/apis/user";
import Pagination from "@/components/Pagination";
import TableFilterButton from "@/pages/Admin/components/TableFilterButton";
import UserTable from "@/pages/Admin/components/UserInfo/UserTable";
import { UserStateCode } from "@/types/user";

const filterButtons = [
  { name: "승인 요청", type: "00" },
  { name: "승인 완료", type: "01" },
];

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState<UserStateCode | "">("");
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  // TODO: API 응답 결과 수정되는 대로 numberOfElements -> totalElements 수정
  const getUsers = async () => {
    // const { content, totalElements, totalPages } = await postUsersByState(
    //   page,
    //   10,
    //   selectedFilter,
    // );
    const { content, numberOfElements, totalPages } = await postUsersByState(
      page,
      10,
      selectedFilter,
    );

    setUsers(content);
    setPageCount(totalPages);
    // selectedFilter === "00" && setRequestCount(totalElements);
    selectedFilter === "00" && setRequestCount(numberOfElements);
  };

  // TODO: API 응답 결과 수정되는 대로 numberOfElements -> totalElements 수정
  const getRequestCount = async () => {
    // const { totalElements } = await postUsersByState(page, 10, "00");
    // setRequestCount(totalElements);

    const { numberOfElements } = await postUsersByState(page, 10, "00");
    setRequestCount(numberOfElements);
  };

  const handleClickFilterButton = (e: MouseEvent<HTMLButtonElement>) => {
    const filterType = e.currentTarget.dataset.filter as UserStateCode | "";

    setSelectedFilter(filterType);
    setPage(0);
  };

  const updateUsers = () => {
    getUsers();
  };

  useEffect(() => {
    getUsers();
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
          data-filter=""
          isActive={selectedFilter === ""}
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
            // isNew={type === "00" && requestCount > 0}
            isNew={type === "00" && requestCount > 0}
            onClick={handleClickFilterButton}
          >
            {name}
          </TableFilterButton>
        ))}
      </div>
      <div className="flex flex-col items-center gap-6 bg-white px-3 py-4">
        <UserTable users={users} updateUsers={updateUsers} />
        {pageCount > 0 && (
          <Pagination count={pageCount} page={page} onChange={setPage} />
        )}
      </div>
    </div>
  );
};

export default UserInfo;
