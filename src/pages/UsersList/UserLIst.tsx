import { Table } from "react-bootstrap";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline, MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { FetchedData, User } from "../../utils/InterFaces";
import { useFetch } from "../../utils/useFetch";
import { baseUrl } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import NotFound from "../NotFound/NotFound";

export default function UserLIst() {
    const [currData, loading, error] = useFetch<FetchedData>(`${baseUrl}/users`);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5);
    const [paginatedData, setPaginatedData] = useState<User[]>([]);
    const totalPages: number = Math.ceil(currData?.users?.length / itemsPerPage);
    const navigate = useNavigate();

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedData(currData?.users?.slice(startIndex, endIndex));
    }, [currData, currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDeleteUser = async (id: number) => {
        const userSelected: User | undefined = currData?.users?.find(user => user?.id === id);
        if (userSelected) {
            Swal.fire({
                title: `Are you sure you want to delete ${userSelected?.firstName}?`,
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "green",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    (async () => {
                        try {
                            await axios.delete(`${baseUrl}/users/${userSelected?.id}`);
                            Swal.fire({
                                title: `${userSelected?.firstName} Deleted!`,
                                text: "The user has been deleted.",
                                icon: "success",
                            });
                        } catch (error: any) {
                            Swal.fire({
                                icon: 'error',
                                text: error?.response?.data?.message || 'Something went wrong!',
                            });
                        }
                    })();
                };
            });
        };
    };

    if(loading){
        return <Loader />;
    };
    if(error){
        return <NotFound />;
    };

    return (
        <div className="page__handler pt-3 px-4 d-flex flex-column w-100">
            <div className="profile_head pb-3 w-100 d-flex justify-content-between align-items-center">
                <h2>Users List</h2>
                <button onClick={() => navigate('/dashboard/add-user')} className="btn text-light fw-medium btn-warning px-4">Add New User</button>
            </div>
            <div className="users_table">
                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Birth Date</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData?.map((user: User) => (
                            <tr key={user.id}>
                                <td><img src={user.image} alt={`${user.firstName} ${user.lastName}`} /></td>
                                <td>{user.firstName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.birthDate}</td>
                                <td>{user.address?.address}</td>
                                <td>
                                    <BiSolidEdit
                                        onClick={()=> navigate(`/dashboard/update-user/${user?.id}`)}
                                        size={30}
                                        className="text-warning cursorPointer"
                                    />
                                    <MdOutlineDeleteOutline
                                        onClick={() => handleDeleteUser(user.id)}
                                        size={30}
                                        className="text-warning cursorPointer"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="d-flex justify-content-end px-3 align-items-center">
                <button
                    className="btn btn-warning text-light"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <MdOutlineSkipPrevious size={25} />
                </button>
                <span className="px-2"> Page {currentPage} of {totalPages} </span>
                <button
                    className="btn btn-warning text-light"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <MdOutlineSkipNext size={25} />
                </button>
            </div>
        </div>
    );
};