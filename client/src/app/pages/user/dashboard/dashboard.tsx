import { FC } from "react";
import SignoutButton from "../../../components/auth/signoutButton";
import ShopLayout from "../../../components/shop/layout/layout";

const Dashboard: FC = () => {
  return (
    <ShopLayout>
      <div>
        <h1>Dashboard</h1>
        <SignoutButton />
      </div>
    </ShopLayout>
  );
};

export default Dashboard;
