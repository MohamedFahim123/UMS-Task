import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import PageHeading from "../../components/PageHeading/PageHeading";
import UserFeildsForm from "../../components/UserFeildsForm/UserFeildsForm";

export default function AddUser() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 800);
    }, []);

    if (loading) {
        return <Loader />
    };

    return (
        <div className="page__handler py-3 px-4 d-flex flex-column w-100">
            <div className="profile_head pb-3 w-100 d-flex justify-content-between align-items-center">
                <PageHeading currPageHead="Add New User" />
            </div>
            <UserFeildsForm currPage={'add'} id={""} currData={null} />
        </div>
    );
};