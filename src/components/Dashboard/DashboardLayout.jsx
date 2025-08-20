import { useContext, useEffect, useState } from "react"
import { LayoutDashboard, BellRing, MailWarning, HomeIcon as House, ChevronsRight, Users, UserSearch, ListRestart, SquareUserRound, ListOrdered, CircleDollarSign, Grid2x2X, Star, CalendarDays } from "lucide-react"
import { FaMoneyCheckAlt } from "react-icons/fa";
import { BsChatSquareDots } from "react-icons/bs";
import { TbFaceIdError } from "react-icons/tb";
import { FaCalendarCheck } from "react-icons/fa";

import { NavLink, Outlet } from "react-router-dom";

import { motion } from "motion/react";
import { } from "lucide-react";

import { AuthContext } from "../../Provider/AuthProvider";

const DashboardLayout = () => {
    return (
        <div className="flex w-full text-black text-3xl font-semibold">
            <Sidebar />
            <Outlet />
            {/* <>cont</> */}
        </div>
    )
}

const Sidebar = () => {
    const { role: userRole } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(!false)
    const [selected, setSelected] = useState("Dashboard")
    // const [notifs, setNotifs] = useState(3);
    const [role, setRole] = useState("Buyer");
    // console.log(role);


    useEffect(() => {
        // console.log(userRole);
        if (userRole === ('no role found' || undefined))
            setRole('Buyer');
        else {
            // const role = userRole?.toLowerCase();
            // console.log(role);

            setRole(userRole);
        }
    }, [userRole]);
    // console.log(role);

    const buyerOptions = [
        // dashboard e click korlei direct user profile dekhabe
        { title: "Dashboard", Icon: LayoutDashboard, target: '/dashboard', selected: selected, setSelected: setSelected, isOpen: isOpen },
        { title: "Home", Icon: House, target: '/', selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "Cart", Icon: CalendarDays, target: '/dashboard/cart', selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "Notifications", Icon: BellRing, target: '', selected: selected, setSelected: setSelected, isOpen: isOpen, notifs: notifs },
        { title: "Cart and Transactions", Icon: FaMoneyCheckAlt, target: '/dashboard/cart', selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "Chat with seller", Icon: BsChatSquareDots, target: '/email-temp', selected: selected, setSelected: setSelected, isOpen: isOpen, },
        // { title: "My Reviews", Icon: Star, target: '/dashboard/myReviews', selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "My Complains", Icon: MailWarning, target: '/dashboard/myComplains', selected: selected, setSelected: setSelected, isOpen: isOpen, notifs: 2 },
        // { title: "Order History", Icon: MailWarning, target: '/dashboard/cart', selected: selected, setSelected: setSelected, isOpen: isOpen, notifs: 2 },
        // { title: "Borrowings", Icon: MailWarning, target: '/dashboard/myComplains', selected: selected, setSelected: setSelected, isOpen: isOpen, notifs: 2 },
    ];

    const adminOptions = [
        { title: "Dashboard", Icon: LayoutDashboard, target: '/dashboard', selected: selected, setSelected: setSelected, isOpen: isOpen },
        { title: "Home", Icon: House, target: '/', selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "User Overview", Icon: Users, target: '/dashboard/allUsers', selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "Complains Overview", Icon: TbFaceIdError, target: '/dashboard/allComplains', selected: selected, setSelected: setSelected, isOpen: isOpen },
        // admin er earning er kaj baki
        // { title: "Earnings", Icon: CircleDollarSign, target: '/dashboard/earning', selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "Search User", Icon: UserSearch, target: '', selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "Chat with seller", Icon: BsChatSquareDots, target: '', selected: selected, setSelected: setSelected, isOpen: isOpen, notifs: notifs },
        { title: "Manage Product Listings", Icon: ListRestart, target: '/dashboard/manageListing', selected: selected, setSelected: setSelected, isOpen: isOpen },
        { title: "Contact", Icon: SquareUserRound, target: '', selected: selected, setSelected: setSelected, isOpen: isOpen }
    ];

    const sellerOptions = [
        { title: "Home", Icon: House, target: "/", selected: selected, setSelected: setSelected, isOpen: isOpen },
        // dashboard e click korlei direct user profile dekhabe
        { title: "Dashboard", Icon: LayoutDashboard, target: '/dashboard', selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "Chats", Icon: LayoutDashboard, target: '/dashboard', selected: selected, setSelected: setSelected, isOpen: isOpen },
        { title: "All Product Listings", Icon: ListOrdered, target: "/dashboard/manageListing", selected: selected, setSelected: setSelected, isOpen: isOpen },
        { title: "Add Product", Icon: ListOrdered, target: "/dashboard/addProduct", selected: selected, setSelected: setSelected, isOpen: isOpen },
        { title: "Earnings", Icon: CircleDollarSign, target: "/dashboard/earning", selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "Sales history", Icon: FaCalendarCheck, target: "/dashboard/sellerBookings", selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "Borrow History", Icon: Grid2x2X, target: "", selected: selected, setSelected: setSelected, isOpen: isOpen },
        // { title: "Complains", Icon: MailWarning, target: "/dashboard/sellerComplain", selected: selected, setSelected: setSelected, isOpen: isOpen },
        { title: "Reviews", Icon: Star, target: "/dashboard/reviewListing", selected: selected, setSelected: setSelected, isOpen: isOpen }
    ];
    // console.log(role);


    let options = buyerOptions;
    // if (userRole === 'Seller') { options = sellerOptions; }
    // else if (userRole === 'Admin') { options = adminOptions; }
    // else if (userRole === 'undefined' || 'Buyer') { options = buyerOptions; }

    return (
        <motion.nav
            layout
            className={`border-r border-slate-300 min-h-screen w-1/5 p-5 bg-white relative
        ${isOpen ? "md:w-1/5 w-36" : "w-20"}`}

        >
            <div className="flex flex-col h-full">
                <TitleSection isOpen={isOpen} />
                <div className="space-y-1 flex-grow">
                    {
                        options?.map((option, idx) => (
                            <Option
                                key={idx}
                                target={option?.target}
                                Icon={option?.Icon}
                                title={option?.title}
                                selected={option?.selected}
                                setSelected={option?.setSelected}
                                isOpen={option?.isOpen}
                                notifs={option?.notifs}
                            />
                        ))
                    }
                </div>
                <ToggleClose isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </motion.nav>
    )
}

const Content = () => {
    return <div className="flex-1">Content goes here</div>
}

const TitleSection = ({ isOpen }) => {
    return (
        <motion.div
            layout
            className="mb-3 border-b border-slate-500 pb-3">
            <div className="flex items-center justify-between hover:bg-slate-300 rounded-md transition-colors p-1">
                <div
                    className="flex items-center gap-2">
                    {/* <img className="w-8 flex-shrink-0" src="/home-icon-silhouette.png" alt="Home icon" /> */}

                    <motion.div
                        layout
                        className="w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                    </motion.div>

                    {isOpen && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: .125 }}
                        >
                            <span className="md:text-base text-base font-bold block md:font-semibold text-blue-600">Landmark Printing</span>
                            <span className="text-xs font-bold block md:font-semibold text-black">Dashboard</span>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

const Option = ({ Icon, target, title, selected, setSelected, isOpen, notifs }) => {
    // console.log(target);
    return (
        <NavLink
            to={target}
        >
            <motion.button
                layout
                onClick={() => setSelected(title)}
                className={`relative flex h-10 w-full items-center hover:bg-slate-300 rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-500" : "text-slate-500 hover:bg-slate-900"
                    }`}
            >
                <motion.div layout className="grid h-full w-10 text-lg place-content-center">
                    <Icon />
                </motion.div>
                {isOpen && <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="text-xs font-medium">{title}</motion.span>}

                {notifs && (
                    <motion.span
                        key={isOpen}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ y: "-50%" }}
                        transition={{ delay: .50 }}
                        className="absolute right-2 bg-red-500 text-white rounded size-4 text-xs flex items-center justify-center"
                    >
                        {notifs}
                    </motion.span>
                )}
            </motion.button>
        </NavLink>
    )
}

const ToggleClose = ({ isOpen, setIsOpen }) => {
    return (
        <button
            onClick={() => setIsOpen((pv) => !pv)}
            className="absolute bottom-0 left-0 right-0 border-t border-slate-300
                transition-colors hover:bg-slate-300 w-full"
        >
            <div className="flex items-center">
                <div className="grid size-10 place-content-center text-lg">
                    <ChevronsRight
                        className={`transition-transform ${isOpen && 'rotate-180'}`}
                    />
                </div>
                {isOpen && <span className="text-xs font-medium">Hide</span>}
            </div>
        </button>
    )
}



export default DashboardLayout;