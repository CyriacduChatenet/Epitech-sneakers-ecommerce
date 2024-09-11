import { FC, useEffect, useState } from "react";

import AdminLayout from "../../../components/admin/layout/layout";
import { UserTable } from "../../../components/admin/table/user-table";
import Pagination from "../../../components/common/pagination/pagination";
import UserService from "../../../services/user.service";
import { User } from "../../../types/user.type";
import { Modal } from "../../../components/common/modal/modal";

export const AdminBoardPage: FC = () => {
  const pathname = window.location.pathname;
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const userService = new UserService();

  const fetchUsers = async () => {
      const response = await userService.findAll(`page=${page}&limit=100`);
      setUsers(response?.data.data);
  };

  useEffect(() => {
      fetchUsers();
  }, [page])


  return (
    <AdminLayout>
      <header className="lg:flex lg:items-center lg:justify-between mx-8 my-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {pathname.split("/")[2]}
        </h1>
        <button onClick={() => setShowModal(!showModal)} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          add {pathname.split("/")[2]}
        </button>
      </header>
      <section>
        <div>
          <input
            type="text"
            placeholder="Search item"
            className="border mx-8 mt-2 mb-4"
          />
        </div>
        <UserTable data={users} setData={setUsers} />
        <Pagination
          total={users.length}
          page={page}
          limit={100}
          setPage={setPage}
        />
        {showModal ? <Modal title="Add new user"><></></Modal> : null}
      </section>
    </AdminLayout>
  );
};
