import { useContext, useEffect, useState } from "react";
import PageHeading from "../../components/PageHeading/PageHeading";
import UserFeildsForm from "../../components/UserFeildsForm/UserFeildsForm";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader/Loader";


export default function Profile() {
    const { decodedToken } = useContext(AuthContext) || {};
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
                <PageHeading currPageHead={`Hello ${decodedToken?.firstName}`} />
            </div>
            <UserFeildsForm currPage={'profile'} id={""} currData={decodedToken || null} />
        </div>
    );
}
