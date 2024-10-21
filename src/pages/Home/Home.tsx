import { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const { decodedToken } = useContext(AuthContext) || {};

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 800);
    }, []);

    if (loading) {
        return <Loader />
    };

    return (
        <div className="page__handler">
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-md-6 shadow px-3 py-4 rounded">
                        <h2>
                            {
                                decodedToken?.firstName ? `Hello ${decodedToken?.firstName} ` : 'Hello Admin'
                            }
                            {
                                decodedToken?.lastName ? decodedToken?.lastName : ''
                            }
                        </h2>
                        <ul className="d-flex justify-content-between text-dark flex-wrap gy-2 my-3">
                            <li className="fs-4">All Users : 30</li>
                            <li className="fs-4">New Users : 3</li>
                            <li className="fs-4">Deleted Users : 1</li>
                        </ul>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas debitis ea modi aliquam sit? Fugit, impedit laborum fuga sit vero quasi eos nemo, eaque aliquid recusandae voluptatum accusantium dolorem culpa!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
