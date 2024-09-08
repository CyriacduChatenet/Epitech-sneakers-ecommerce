import { FC } from "react";
import { Navigation } from "../navigation/navigation";

interface IProps {
  children: React.ReactNode;
}

const ShopLayout: FC<IProps> = ({ children }) => {
  return (
    <div>
      <Navigation />
      <main>
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 Sneaker City</p>
      </footer>
    </div>
  );
};

export default ShopLayout;
