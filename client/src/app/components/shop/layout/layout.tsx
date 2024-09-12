import { FC } from "react";
import { Navigation } from "../navigation/navigation";
import { Footer } from "../footer/footer";

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
      <Footer />
    </div>
  );
};

export default ShopLayout;
