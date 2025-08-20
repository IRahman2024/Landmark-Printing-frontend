import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { axiosSecure } from "../../../Hooks/useAxiosPrivate";

import './style.css';

const Details = () => {
    const { localUserInfo: user } = useContext(AuthContext);
    const [product, setProduct] = useState([]);
    let [quantity, setQuantity] = useState(1);
    const [review, setReview] = useState([]);
    const [showReview, setShowReview] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    // Utility functions for localStorage
    const getCartFromStorage = () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    };

    const saveCartToStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const clearCartFromStorage = () => {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
    };

    useEffect(() => {
        axiosPublic.get(`/product/${id}`)
            .then((data) => setProduct(data.data))
        axiosPublic.get(`/reviews/${id}`)
            .then(res => {
                setShowReview(res.data);
            })

    }, [refresh, product.id, id])

    const handleChange = (e) => {
        setReview(e.target.value);
    };

    const handleCart = (id) => {

        const name = product?.name;
        const price = product?.price;
        const type = product?.type;

        const info = { id, name, price, quantity, type };

        const cart = getCartFromStorage();

        const existingItemIndex = cart.findIndex((item) => item.id === id);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push(info);
        }
        console.log(info);

        saveCartToStorage(cart);

        console.log('Cart updated:', cart);

        // Reset quantity after adding to cart (optional)
        setQuantity(1);
    }

    const handleReview = (e) => {
        e.preventDefault();

        const productId = product._id;
        const sellerId = product.sellerId;
        const userName = user?.userName;
        const email = user?.email;
        const userId = user?._id;

        const info = { review, productId, userName, email, userId, sellerId };

        axiosSecure.post('/reviews', info)
            .then(data => {
                if (data.data.acknowledged) {
                    alert('Review Added Successfully!');
                    setRefresh(!refresh);
                }

            })

        console.log(info);

    }

    const handleWish = () => {
        const userId = user._id;
        const productId = id;

        const request = { userId, productId };

        // console.log(productId, userId);
        
        axiosPublic.post('/addWish', request)
        .then((data) => {
            if (data.data.acknowledged) {
                alert('Wish updated!');
            }
        })
    }

    // console.log(product);
    // console.log(product);


    return (
        <div className="min-h-screen bg-white">
            {/* name */}
            <div className="p-4">
                <p className="text-6xl font-bold">{product.name}</p>
            </div>
            {/* carosuol */}
            <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto my-3">
                <div className="carousel w-3/4">
                    {product?.urls?.map((url, idx) => (
                        <div key={idx} id={idx} className="carousel-item w-full">
                            <img src={url} className="w-full" alt={`Image ${idx}`} />
                        </div>
                    ))}
                </div>
                <div className="flex w-48 justify-center gap-2 py-2">
                    {product?.urls?.map((url, idx) => (
                        <a key={idx} href={`#${idx}`} className="btn btn-xs">{idx + 1}</a>
                    ))}
                </div>
            </div>
            {/* infos */}
            <div className="p-4 w-1/2 bg-white flex gap-3">
                <p className="text-3xl font-bold">Description: </p>
                <p className="text-wrap text-3xl">{product.about}</p>
            </div>
            {/* money */}
            <div className="p-4 w-1/2 bg-white flex items-center gap-2">
                <p className="text-3xl font-bold">Price: </p>
                {product?.type == 'Lend' && <p className="text-3xl text-wrap text-red-500 font-bold">{product.price} taka/month</p>}
                {product?.type == 'Sell' && <p className="text-3xl text-wrap text-red-500 font-bold">{product.price} taka</p>}
            </div>
            {/* quantity */}
            <div className="flex gap-4 p-4 items-center">
                <p className="text-3xl font-bold">Select Quantity: </p>
                <div className="flex items-center gap-2 m-0 border border-black rounded-lg border-dotted">
                    <button
                        onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
                        className="btn btn-square bg-red-400 text-white font-bold text-xl w-10 h-10"
                    >
                        -
                    </button>
                    <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="btn btn-square bg-green-400 text-white font-bold text-xl w-10 h-10"
                    >
                        +
                    </button>
                </div>
            </div>
            {/* actions */}
            <div className="flex gap-4 p-4 items-center">

                <div className="button-custom">
                    <div
                        onClick={() => handleCart(product?._id)}
                        className="button-custom-wrapper size-8">
                        <div className="text">Add To Cart</div>
                        <span className="icon">
                            <svg
                                viewBox="0 0 16 16"
                                className="bi bi-cart2"
                                fill="currentColor"
                                height="16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                            </svg>
                        </span>
                    </div>
                </div>

                <button onClick={handleWish} className="btn bg-black text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="0" stroke="currentColor" className="size-8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                    Add To Wish List
                </button>
            </div>
            {/* reviews */}
            <p className="text-6xl my-4 text-center"> Reviews</p>
            <div className="flex w-full items-center mt-10">
                <div className="w-1/2">
                    <div className="p-4 w-full">
                        <div className="w-full flex flex-col">
                            <p className="text-4xl my-2 font-bold">Leave a review</p>
                            <textarea
                                value={review}
                                onChange={handleChange}
                                placeholder="Success" className="textarea textarea-success max-w-96"></textarea>
                            <button onClick={handleReview} className="btn btn-info max-w-xs my-3">Submit</button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 w-full gap-3 mb-4">
                    {
                        showReview?.map((review, idx) => {
                            return (
                                <div key={idx} className="card bg-green-300 text-black w-80">
                                    <div className="card-body">
                                        <h2 className="card-title">{review.userName}</h2>
                                        <p>{review.review}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </div>
    );
};

export default Details;