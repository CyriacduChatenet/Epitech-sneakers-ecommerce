import { FC } from "react";
import AdminLayout from "../../../components/admin/layout/layout";
import { Link } from "react-router-dom";

const AdminDashboard: FC = () => {
  return (
    <AdminLayout>
      <header className="lg:flex lg:items-center lg:justify-between mx-8 my-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard
        </h1>
      </header>
      <main className="mx-8 my-8 h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to={"/admin/users"}>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Users</h2>
              <p>Content for card 1</p>
            </div>
          </Link>

          <Link to={"/admin/sneakers"}>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Sneakers</h2>
              <p>Content for card 2</p>
            </div>
          </Link>

          <Link to={"/admin/sizes"}>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Sizes</h2>
              <p>Content for card 3</p>
            </div>
          </Link>

          <Link to={"/admin/stocks"}>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Stocks</h2>
              <p>Content for card 4</p>
            </div>
          </Link>

          <Link to={"#"}>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Stripe customers</h2>
              <p>Content for card 5</p>
            </div>
          </Link>

          <Link to={"#"}>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Stripe invoices</h2>
              <p>Content for card 6</p>
            </div>
          </Link>

          <Link to={"#"}>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Stripe products</h2>
              <p>Content for card 7</p>
            </div>
          </Link>

          <Link to={"#"}>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">Settings</h2>
              <p>Content for card 8</p>
            </div>
          </Link>
        </div>
      </main>
    </AdminLayout>
  );
};

export default AdminDashboard;
