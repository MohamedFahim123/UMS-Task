import { Outlet } from "react-router-dom";
import MySideBar from "../../components/MySideBar/MySideBar";
import MyNavBar from "../../components/MyNavBar/MyNavBar";

export default function View() {
    return (
        <div className="d-flex">
            <MySideBar />
            <div className="w-100">
                <MyNavBar />
                <Outlet />
            </div>
        </div>
    );
};