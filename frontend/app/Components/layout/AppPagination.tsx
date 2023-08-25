import { useEffect, useState } from "react";

type Props = {
  currentPage: number;
  pageCount: number;
  pageChanged: (page: number) => void;
};
export default function AppPagination(props: Props) {
  const { currentPage, pageCount, pageChanged } = props;

  const [activePage, setActivePage] = useState(currentPage);
  const handlePageClick = (page: number) => {
    if (page !== activePage) {
      setActivePage(page);
      pageChanged(page);
    }
  };

  const handlePrevClick = () => {
    if (activePage > 1) {
      handlePageClick(activePage - 1);
    }
  };

  const handleNextClick = () => {
    if (activePage < pageCount) {
      handlePageClick(activePage + 1);
    }
  };

  return (
    <div className="join">
      <button className="join-item btn" onClick={handlePrevClick}>
        «
      </button>
      {[...Array(pageCount)].map((_, index) => (
        <button
          key={index}
          className={`join-item btn ${
            activePage === index + 1 ? "btn-active" : ""
          }`}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button className="join-item btn" onClick={handleNextClick}>
        »
      </button>
    </div>
  );
}
