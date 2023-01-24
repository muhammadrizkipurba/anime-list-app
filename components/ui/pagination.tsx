type PaginationProps = {
  data: AnimeData[] | [];
  currentPage: number;
  limit: number;
  totalData: number;
  setPaginate: (pageNumber: number) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
};

// const Pagination = ({ data, currentPage, limit, totalData, setPaginate, onClickNextPage, onClickPrevPage }: PaginationProps) => {
//   const indexOfLastPost = currentPage * limit;
//   const indexOfFirstPost = indexOfLastPost - limit;
//   const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalData / limit); i++) {
//     pageNumbers.push(i);
//   };

//   return (
//       <div className="pagination-container">
//         <ul className="pagination flex">
//           <li onClick={onClickPrevPage} className="page-number">
//             Prev
//           </li>
//           {pageNumbers.map((number) => (
//             <li key={number} onClick={() => setPaginate(number)} className="page-number">
//               {number}
//             </li>
//           ))}
//           <li onClick={onClickNextPage} className="page-number">
//             Next
//           </li>
//         </ul>

//         <nav aria-label="Pagination" className="flex items-center text-gray-600">
//           <a href="#" className="p-2 mr-4 rounded hover:bg-gray-100">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
//             </svg>
//           </a>
//           <a href="#" className="px-4 py-2 rounded hover:bg-gray-100"> 1 </a>
//           <a href="#" className="px-4 py-2 rounded bg-gray-200 text-gray-900 font-medium hover:bg-gray-100"> 2 </a>
//           <a href="#" className="px-4 py-2 rounded hover:bg-gray-100"> 3 </a>
//           <a href="#" className="px-4 py-2 rounded hover:bg-gray-100"> ... </a>
//           <a href="#" className="px-4 py-2 rounded hover:bg-gray-100"> 9 </a>
//           <a href="#" className="p-2 ml-4 rounded hover:bg-gray-100">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
//             </svg>
//           </a>
//         </nav>
//       </div>
//   );
// };

// export default Pagination;

import React from 'react';
import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i.toString());
    i += step;
  }

  return range;
};

const Pagination = (props: PaginationProps) => {
  const { currentPage, limit, totalData, onClickNextPage, onClickPrevPage, setPaginate } = props;
  const pageNeighbours = 1;
  const totalPages = Math.ceil(totalData / limit);
  const [pages, setPages] = useState<string[]>([]);

  const fetchPageNumbers = useCallback(() => {
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;
    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      };

      return ["1", ...pages, totalPages.toString()];
    };

    return range(1, totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    let pages = fetchPageNumbers();
    setPages(pages);
  }, [fetchPageNumbers]);

  return (
    <div id='custom_pagination' className='d-flex justify-content-end align-items-center'>
      <div id='pagination' aria-label="Search Result Pagination">
        <ul className="pagination justify-center">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE) return (
              <li key={index} className="page-item">
                <button className="page-link flex items-center" aria-label="Previous" onClick={onClickPrevPage}>
                  <ChevronRightIcon height={15} className='rotate-180 mr-1' />
                  <span className="fs-12 mr-1">Prev</span>
                </button>
              </li>
            );

            if (page === RIGHT_PAGE) return (
              <li key={index} className="page-item">
                <button className="page-link flex items-center" aria-label="Next" onClick={onClickNextPage}>
                  <span className="fs-12 mr-1">Next</span>
                  <ChevronRightIcon height={15} />
                </button>
              </li>
            );

            return (
              <li key={index} className={`page-item${currentPage === Number(page) ? ' active' : ''}`}>
                <button className="page-link" onClick={() => setPaginate(Number(page))}>{page}</button>
              </li>
            );

          })}

        </ul>
      </div>
    </div>
  );
};

export default Pagination;