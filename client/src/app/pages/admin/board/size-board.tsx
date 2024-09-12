import { ChangeEvent, FC, useEffect, useState } from "react";

import AdminLayout from "../../../components/admin/layout/layout";
import Pagination from "../../../components/common/pagination/pagination";
import SizeService from "../../../services/size.service";
import { Size } from "../../../types/size.type";
import { Modal } from "../../../components/common/modal/modal";
import useDebounce from "../../../hooks/useDebounce.hook";
import { SizeTable } from "../../../components/admin/table/size-table";
import { AdminSizeForm } from "../../../components/admin/forms/size-form";

export const AdminSizeBoardPage: FC = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [datas, setDatas] = useState<Size[]>([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  const sizeService = new SizeService();

  const fetchDatas = async (searchTerm = "") => {
    const response = await sizeService.findAll(
      `page=${page}&limit=100&search=${encodeURIComponent(searchTerm)}`
    );
    setDatas(response?.data.data);
    setTotal(response?.data.total);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = useDebounce(search, 2000);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchDatas(debouncedSearch);
  };

  useEffect(() => {
    fetchDatas(debouncedSearch);
  }, [page]);

  return (
    <AdminLayout>
      <header className="lg:flex lg:items-center lg:justify-between mx-8 my-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Sizes ( {total} )
        </h1>
        <button
          onClick={() => setShowModal(!showModal)}
          className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Create Size
        </button>
      </header>
      <section>
        <form onSubmit={handleSubmit} className="flex items-center mb-8">
          <input
            type="text"
            placeholder="Search item"
            className="border mx-8 mt-2 px-4 py-2 w-80"
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            className="rounded-md bg-orange-600 px-3.5 py-2.5 mt-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
        <SizeTable data={datas} setData={setDatas} />
        <Pagination
          total={datas.length}
          page={page}
          limit={100}
          setPage={setPage}
        />
        {showModal ? (
          <Modal title="Add new Size">
            <AdminSizeForm edit={false} setState={setDatas} />
          </Modal>
        ) : null}
      </section>
    </AdminLayout>
  );
};
