import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosPrivate";
import { lineSpinner } from 'ldrs';
import { Link } from "react-router-dom";

const ManageListing = () => {
    const [products, setProducts] = useState();
    const [loader, setLoader] = useState();
    const [refresh, setRefresh] = useState(false);
    const { user, role } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    lineSpinner.register();

    useEffect(() => {
        if (role == 'Seller') {
            axiosSecure.get(`/getSellerProduct/${user.email}`)
                .then(data => setProducts(data.data));
        }
        axiosSecure.get(`/allProducts`)
            .then(data => setProducts(data.data));

    }, [user?.email, refresh])

    const approval = (id) => {
        // console.log(id);
        axiosSecure.put(`/updateStatus?id=${id}`, { 'status': 'approved' })
            .then(res => {
                console.log(res)
                setRefresh(!refresh);
                setLoader(false);
            })
    }

    const denial = (id) => {
        console.log(id);
        setLoader(true);
        axiosSecure.put(`/updateStatus?id=${id}`, { 'status': 'pending' })
            .then(res => {
                console.log(res)
                setRefresh(!refresh);
                setLoader(false);
            })
    }

    console.log(products);



    return (
        <div className="p-5 flex w-full">
            <div>
                {
                    (loader) && <div className="fixed z-20 flex h-full w-3/4 items-center justify-center bg-white opacity-55">
                        <l-line-spinner
                            size="121"
                            stroke="6"
                            speed="1"
                            color="black"
                        ></l-line-spinner>
                    </div>
                }
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Tags</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            products?.map((product, idx) => (
                                <tr key={idx}>
                                    <th>
                                        <label>
                                            {idx + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <p>{product.name}</p>
                                        </div>
                                    </td>
                                    <td>
                                        {product?.price}
                                    </td>
                                    <td>{product?.type}</td>
                                    <td>{product?.tags.join(', ')}</td>
                                    {
                                        role == 'Seller' && <th>
                                            {
                                                product?.status == 'pending' ? <p
                                                    className="badge badge-warning">Pending</p> : <p
                                                        className="badge badge-success">Approved</p>
                                            }
                                        </th>
                                    }
                                    {
                                        role == 'Admin' && <th>
                                            {
                                                product?.status == 'pending' ? <button
                                                    onClick={() => approval(product._id)}
                                                    className="btn btn-xs btn-warning">Pending</button> : <button
                                                    onClick={() => denial(product._id)}    
                                                    className="btn btn-xs btn-success">Approved</button>
                                            }
                                        </th>
                                    }
                                    <th>
                                        <Link to={`/details/${product._id}`} className="btn btn-ghost btn-xs">details</Link>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Tags</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default ManageListing;