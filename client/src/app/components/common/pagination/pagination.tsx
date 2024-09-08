import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Dispatch, FC, SetStateAction } from "react";

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

interface IProps {
  total: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination: FC<IProps> = ({ total, page, setPage }) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <button
              onClick={() => setPage(1)}
              aria-current="page"
              className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                page === 1
                  ? "focus-visible:outline-indigo-600 text-white bg-indigo-600"
                  : "text-gray-900"
              }`}
            >
              1
            </button>
            <button
              onClick={() => setPage(2)}
              aria-current="page"
              className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                page === 2
                  ? "focus-visible:outline-indigo-600 text-white bg-indigo-600"
                  : "text-gray-900"
              }`}
            >
              2
            </button>
            <button
              onClick={() => setPage(3)}
              aria-current="page"
              className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                page === 3
                  ? "focus-visible:outline-indigo-600 text-white bg-indigo-600"
                  : "text-gray-900"
              }`}
            >
              3
            </button>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <button
              onClick={() => setPage(8)}
              aria-current="page"
              className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                page === 8
                  ? "focus-visible:outline-indigo-600 text-white bg-indigo-600"
                  : "text-gray-900"
              }`}
            >
              8
            </button>
            <button
              onClick={() => setPage(9)}
              aria-current="page"
              className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                page === 9
                  ? "focus-visible:outline-indigo-600 text-white bg-indigo-600"
                  : "text-gray-900"
              }`}
            >
              9
            </button>
            <button
              onClick={() => setPage(10)}
              aria-current="page"
              className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                page === 10
                  ? "focus-visible:outline-indigo-600 text-white bg-indigo-600"
                  : "text-gray-900"
              }`}
            >
              10
            </button>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
