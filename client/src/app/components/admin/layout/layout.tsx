import { FC } from "react";

import { Navigation } from "../navigation/navigation";

interface IProps {
  children: React.ReactNode;
}

const AdminLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Navigation />
        <main>{children}</main>
      </div>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 Sneaker City</p>
      </footer>
    </>
  );
};

export default AdminLayout;
