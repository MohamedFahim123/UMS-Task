import { Outlet } from "react-router-dom";
import MySideBar from "../../components/MySideBar/MySideBar";
import MyNavBar from "../../components/MyNavBar/MyNavBar";

export default function View() {
    return (
        <div className="d-flex w-100">
            <MySideBar />
            <div className="container-fluid px-0">
                <MyNavBar />
                <Outlet />
            </div>
        </div>
    );
};