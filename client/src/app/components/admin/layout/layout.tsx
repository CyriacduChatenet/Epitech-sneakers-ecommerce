import { FC } from "react";

import { Navigation } from "../navigation/navigation";

interface IProps {
  children: React.ReactNode;
}

const AdminLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <div className="flex">
        <div className="fixed top-0 left-0 h-full">
          <Navigation />
        </div>
        <main className="w-full ml-[275px]">{children}</main>
      </div>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 KicksFactory</p>
      </footer>
    </>
  );
};

export default AdminLayout;
