import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { lineSpinner } from 'ldrs';

const ReviewListing = () => {
    const { localUserInfo: user } = useContext(AuthContext);
    const [reviews, setReview] = useState([]);
    const [loader, setLoader] = useState([]);
    const axiosPublic = useAxiosPublic();

    lineSpinner.register();

    useEffect(() => {
        axiosPublic.get(`/reviews-seller/${user?._id}`)
            .then(res => {
                setReview(res.data)
                setLoader(false)
            });
    }, [user])

    console.log(reviews);


    return (
        <div className="p-5">
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
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            reviews?.map((review, idx) => (
                                <tr key={idx}>
                                    <th>
                                        <label>
                                            {idx + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <p>{review.userName}</p>
                                        </div>
                                    </td>
                                    <td>
                                        {review?.email}
                                    </td>
                                    <td>
                                        {review?.review}
                                    </td>
                                    <th>
                                        <Link to={`/details/${review.productId}`} className="btn btn-success btn-xs">details</Link>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Review</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default ReviewListing;