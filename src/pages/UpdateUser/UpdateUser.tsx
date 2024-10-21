import UserFeildsForm from '../../components/UserFeildsForm/UserFeildsForm';
import PageHeading from '../../components/PageHeading/PageHeading';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../utils/useFetch';
import { baseUrl } from '../../utils/baseUrl';
import { UserData } from '../../utils/InterFaces';
import Loader from '../../components/Loader/Loader';
import NotFound from '../NotFound/NotFound';

export default function UpdateUser() {
    const { id } = useParams();
    const [currData,loading,error] = useFetch<UserData>(`${baseUrl}/users/${id}`);

    if(loading){
        return <Loader />;
    };
    if(error){
        return <NotFound />;
    };

    return (
        <div className="page__handler py-3 px-4 d-flex flex-column w-100">
            <div className="profile_head pb-3 w-100 d-flex justify-content-between align-items-center">
                <PageHeading currPageHead="Add New User" />
            </div>
            <UserFeildsForm currData={currData} id={id} currPage={'update'} />
        </div>
    );
};
