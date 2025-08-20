import { useContext, useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosPrivate";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic, { axiosPublic } from "../../Hooks/useAxiosPublic";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "react-router-dom";
import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'

const Cart = ({ order_details }) => {
    const { user, localUserInfo } = useContext(AuthContext);
    const [cart, setCart] = useState();
    const [transactions, setTransactions] = useState(null);
    const [refetch, setRefetch] = useState(prev => !prev);

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    // console.log(sessionId);

    const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Publishable_Key);

    // stripe
    const handleCheckout = async (id, amount) => {
        // console.log(id);

        setLoading(true);
        try {
            const stripe = await stripePromise;
            const { data } = await axios.post('http://localhost:4000/create-checkout-session', {
                amount, // Send amount in cents
                id // id of order_details
            });
            const result = await stripe.redirectToCheckout({ sessionId: data.sessionId }); // this redirects to the end page
            console.log('now finding the transaction history');
            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
        setLoading(false);


    };

    const handleCancel = async (id) => {
        setLoading(true);
        console.log(id);

        axios.delete(`http://localhost:4000/landmarkPayments/del`, {
            data: { id: id }
        })
            .then(res => {
                console.log(res.data);
                setRefetch(prev => !prev);
                setLoading(false);
            })
            .catch(err => console.error("Error deleting payment:", err));
    }

    useEffect(() => {
        if (!user?.email) return;

        setLoading2(true);

        // setCart(getCartFromStorage);
        // transaction history
        axiosPublic.get(`/landmarkPayments/${user?.email}`)
            .then(res => {
                const unpaid = res.data.filter(item => !item?.paid_status);
                const paid = res.data.filter(item => item?.paid_status);
                setTransactions(paid);
                setCart(unpaid);
                setLoading2(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err)
                setLoading2(false);
            });

    }, [user?.email, refetch, localUserInfo?._id]);

    // console.log(cart);
    // console.log(transactions);

    if (loading2 || loading) {
        return (
            <div className="flex flex-col space-y-5 justify-center items-center h-screen w-full">
                <Grid
                    size="150"
                    speed="1.5"
                    color="#EA2A3D"
                />
                <p className="text-xl font-black">Loading...</p>
            </div>
        )
    }

    return (
        <div className="m-4 w-full">
            {/* this is payment section */}
            {/* list of dues */}
            <div className="w-full">
                <p className="font-bold text-3xl">Payment Due</p>
                <div className="overflow-x-auto rounded-box border border-base-content/2 bg-base-100 w-full mt-4">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product Type</th>
                                <th>Size</th>
                                <th>Order Name</th>
                                <th>Contact Email</th>
                                <th>Contact Number</th>
                                <th>Finishing Option</th>
                                <th>Paper Type</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Payment</th>
                                <th>Cancel Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart?.map((cart, idx) => (
                                    <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td>{cart?.product}</td>
                                        <td>{cart?.size}</td>
                                        <td>{cart?.order_name}</td>
                                        <td>{cart?.contact_email}</td>
                                        <td>{cart?.contact_number}</td>
                                        <td>{cart?.finishing_option}</td>
                                        <td>{cart?.paper_type}</td>
                                        <td>{cart?.quantity}</td>
                                        <td>{cart?.amount?.toLocaleString()} USD</td>
                                        {/* <td>{cart?.price * cart?.quantity} BDT</td> */}
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleCheckout(cart?._id, cart.amount)} disabled={loading}>
                                                {loading ? 'Processing...' : 'Proceed to Payment'}
                                            </button>
                                        </td>
                                        <td><button
                                            onClick={() => handleCancel(cart?._id)}
                                            className="btn btn-error">Cancel</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* list of Transaction */}
            <div className="w-full">
                <p className="font-bold text-3xl">Transaction History</p>
                <div className="overflow-x-auto rounded-box border border-base-content/2 bg-base-100 w-full mt-4">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product Type</th>
                                <th>Size</th>
                                <th>Order Name</th>
                                <th>Contact Email</th>
                                <th>Contact Number</th>
                                <th>Finishing Option</th>
                                <th>Paper Type</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactions?.map((transaction, idx) => (
                                    <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td>{transaction?.product}</td>
                                        <td>{transaction?.size}</td>
                                        <td>{transaction?.order_name}</td>
                                        <td>{transaction?.contact_email}</td>
                                        <td>{transaction?.contact_number}</td>
                                        <td>{transaction?.finishing_option}</td>
                                        <td>{transaction?.paper_type}</td>
                                        <td>{transaction?.quantity}</td>
                                        <td>{transaction?.amount?.toLocaleString()} USD</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;