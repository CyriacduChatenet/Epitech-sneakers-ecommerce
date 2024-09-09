import { FC, useEffect, useState } from "react";

import AdminLayout from "../../../components/admin/layout/layout";
import { AdminUserTable } from "../../../components/admin/table/user/user";
import UserService from "../../../services/user.service";

const AdminUserBoard: FC = () => {
  const [data, setData] = useState([]);
  const userService = new UserService();

  const fetchData = async () => {
    const response = await userService.findAll('page=1&limit=100');
    setData(response?.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <>
        <header className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Users
            </h1>
          </div>
        </header>
        <div className="px-4 pb-6 sm:px-6 lg:px-8">
          <AdminUserTable data={data} />
        </div>
      </>
    </AdminLayout>
  );
};

export default AdminUserBoard;
