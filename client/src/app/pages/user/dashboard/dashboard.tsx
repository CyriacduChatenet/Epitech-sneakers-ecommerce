import { FC } from "react";
import { SignoutButton } from "../../../components/auth/signoutButton";

const Dashboard: FC = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <SignoutButton/>
        </div>
    );
}

export default Dashboard;