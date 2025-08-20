import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosPrivate";

const Navbar = () => {
    const { user, logOut, localUserInfo } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [isScrolled, setIsScrolled] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const getCartFromStorage = () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    };

    const fetchCartCountFromAPI = async (email) => {
        try {
            const res = await axiosPublic.get(`/landmarkPayments/${email}`);
            // Filter for unpaid items if needed
            const unpaid = res.data.filter(item => !item?.paid_status);
            setCartCount(unpaid.length);
        } catch (err) {
            setCartCount(0);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchCartCountFromAPI(user.email);
        } else {
            setCartCount(0);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // console.log("Scroll Y:", window.scrollY);
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // console.log(isScrolled);

    // Update cart count when component updates (for same-page changes)
    useEffect(() => {
        const handleCartUpdate = () => {
            if (user?.email) fetchCartCountFromAPI(user.email);
        };
        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, [user?.email]);
    // console.log(user);

    const links = <>
        <li><NavLink to='/banner'>Banners</NavLink></li>
        <li><NavLink to='/poster'>Posters</NavLink></li>
        <li><NavLink to='/label'>Labels</NavLink></li>
        <li><NavLink to='/businessCard'>Business Cards</NavLink></li>
    </>

    return (
        <div className={`navbar shadow-sm z-50 opacity-85  font-faustina fixed top-0 left-0 transition-all duration-300 ${isScrolled ? "bg-black shadow-md" : "bg-transparent"}`}
        >
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
                        <Link className="btn btn-link text-white" to='/'>Home</Link>
                        <li>
                            <a>Products</a>
                            <ul className="p-2">
                                {
                                    links
                                }
                            </ul>
                        </li>
                        {user && <Link to='/dashboard'>Dashboard</Link>}
                    </ul>
                </div>
                <img src="landmarkPress logo.jpg" className='w-36 rounded-full' alt="" />
                {/* <a className="btn btn-ghost text-xl">Bzzz&B</a> */}
            </div>
            <div className="navbar-end hidden lg:flex text-white">
                <ul className="menu menu-horizontal px-1 text-xl font-semibold">
                    <li><Link className="btn btn-link text-white" to='/'>Home</Link></li>
                    <li>
                        <details className="btn btn-link text-white">
                            <summary>Products</summary>
                            <ul className="p-2 text-black">
                                {
                                    links
                                }
                            </ul>
                        </details>
                    </li>
                    {

                    }
                    <li><Link className="btn btn-link text-white" to='/dashboard/cart'>Cart {cartCount && <span className="indicator-item badge badge-secondary">{cartCount}</span>}</Link></li>
                    {user && <li><Link className="btn btn-link text-white" to='/dashboard'>Dashboard</Link></li>}
                </ul>
            </div>
            <div className=" text-black">
                {
                    user ? <>
                        <div className="flex gap-x-2 dropdown dropdown-end font-bold text-xl">
                            {/* <div>
                                <p>{user?.displayName}</p>
                                <p>{user?.email}</p>
                            </div> */}
                            <div>
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User Image"
                                            src={localUserInfo?.profilePic || '/New Images/icon-7797704_1920.png'} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li>
                                        <a href="http://localhost:5173/dashboard" className="justify-between">
                                            Profile
                                        </a>
                                    </li>
                                    <li onClick={logOut}><a>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </> : <NavLink state={location.pathname} to='/login' className="btn">Log In</NavLink>
                }
                {/* <NavLink to='/login' className="btn">Log In</NavLink> */}
            </div>
        </div>
    )
};

export default Navbar;