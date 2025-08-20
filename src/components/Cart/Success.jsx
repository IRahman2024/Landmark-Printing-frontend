import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosPublic } from '../../Hooks/useAxiosPublic';
import { CircleCheck } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Reuleaux } from 'ldrs/react'
import 'ldrs/react/Reuleaux.css'
import { Bounce, toast, ToastContainer } from 'react-toastify';
import EmailTemp from './EmailTemp';


const Success = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('sessionId');
    const navigate = useNavigate();


    useEffect(() => {
        if (!sessionId) {
            console.error('No sessionId found in URL');
            return;
        }

        const date = new Date();
        const pad = n => n.toString().padStart(2, '0');
        const formatted = `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}, ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

        const handlePaymentVerification = async () => {
            try {
                const paymentDetailsRes = await axiosPublic.get(`/payment-details/${sessionId}`);
                const paymentDataWithTime = {
                    ...paymentDetailsRes.data,
                    time: formatted
                };
                setPaymentData(paymentDataWithTime);
                // console.log(paymentDetailsRes);


                const verificationRes = await axiosPublic.post('/verify-payment', {
                    sessionId
                });

                if (verificationRes.data.success) {
                    toast.success('Your Payment Has Been Recorded!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error('Something went wrong. Please contact (number)!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            } catch (error) {
                // Handle any errors from either API call
                console.error('Error during payment process:', error);
                toast.error('Something went wrong. Please contact (number)!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        };

        handlePaymentVerification();

    }, [sessionId]);

    useEffect(() => {
        if (paymentData) {
            axiosPublic.get(`/order-details/${paymentData.order_id}`)
                .then(res => {
                    setOrderData(res.data);
                })
                .catch(err => {
                    console.error('Error fetching order details:', err);
                });
        }
    }, [paymentData]);

    useEffect(() => {
        if (orderData && orderData[0]?.contact_email) {
            // console.log(orderData);
            
            const htmlString = EmailTemp( orderData[0], paymentData );
            // console.log(htmlString);
            
            axiosPublic.post(`/send-email/${orderData[0]?.contact_email}`, { htmlString })
            .then(res => {
                console.log(res);
                
                if(res.status == 200) {
                    toast.success(`A Receipt of billing will be emailed to ${orderData[0]?.contact_email} shortly!`, {
                        position: "top-center",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
        }
    }, [orderData]);

    // console.log(htmlContent);
    console.log(paymentData);


    if (!paymentData) {
        return (
            <div className='flex flex-col justify-center items-center h-screen'>
                <Reuleaux
                    size="96"
                    stroke="5"
                    strokeLength="0.15"
                    bgOpacity="0.1"
                    speed="1.2"
                    color="black"
                />
                <p className="text-2xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className='bg-gray-300'>
            <div className='flex justify-center items-center h-screen'>
                <div className="card bg-base-100 w-[25rem] shadow-sm">
                    <div className="card-body">
                        <div className='flex justify-center items-center mb-4'>
                            <FaCheckCircle className='size-20 text-[#23A26D]'></FaCheckCircle>
                        </div>
                        <div className='flex flex-col items-center space-y-2'>
                            <p className="text-center">Payment Was Successfull !</p>
                            <h2 className="card-title text-3xl font-bold uppercase">{paymentData?.amount.toLocaleString() || 'null'} {paymentData?.currency}</h2>
                        </div>
                        <hr className='my-5' />
                        <div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-lg font-semibold'>Transaction ID:</p>
                                <p className='text-sm break-words max-w-40 text-right'>{paymentData?.transaction_id || 'N/A'}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-lg font-semibold'>Payment Time:</p>
                                <p className='text-sm break-words text-right'>{paymentData?.time || 'N/A'}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2 w-full'>
                                <p className='text-lg font-semibold'>Payment Method:</p>
                                <p className='text-sm uppercase text-right'>{paymentData?.method || 'N/A'}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2 w-full'>
                                <p className='text-lg font-semibold'>Cardholder Name:</p>
                                <p className='text-sm uppercase text-right'>{paymentData?.name || 'N/A'}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2 w-full'>
                                <p className='text-lg font-semibold'>Cardholder Email:</p>
                                <p className='text-sm uppercase text-right'>{paymentData?.email || 'N/A'}</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center mt-5'>
                            <button onClick={() => navigate('/dashboard/cart')} className="btn btn-outline btn-success">Go To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div>

            </div>
        </div>
    );
};

export default Success;
/*
email, name, 
*/