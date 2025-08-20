import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { div } from "motion/react-client";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import DropZone from "../Shared/DropZone/DropZone";

const UserProfile = () => {
    const { user, localUserInfo } = useContext(AuthContext);
    const [urls, setUrls] = useState([]);

    const axiosPublic = useAxiosPublic();

    // console.log(user);

    const handleImageUpload = (urls) => {
        // console.log(urls);
        
        setUrls(urls);
        console.log("Received from DropZone:", urls);
        const profilePic = urls[0];
        // console.log(profilePic);
        
        axiosPublic.put(`/updateProfileImage/${localUserInfo._id}`, {profilePic})
            .then(res => {
                if(res.status == '200'){
                    alert('Profile Picture Has Been Updated');
                }
            })
    };

    const handleSubmit = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const address = e.target.address.value;
        const number = e.target.number.value;
        const profilePic = urls[0];

        const info = { name, address, number, profilePic };

        console.log(info);

        axiosPublic.put(`/updateProfile/${localUserInfo._id}`, info)
            .then(res => {
                if(res.status == '200'){
                    alert('Profile updated');
                }
            })
    }
    // console.log(user);

    return (
        <div className="flex bg-base-200 justify-between">
            <div className="hero bg-base-200 min-h-screen flex items-start p-5">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={localUserInfo?.profilePic || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">{localUserInfo?.userName || 'No user name found!'}</h1>
                        <p className="py-6">{user?.email}</p>
                        <p className="text-sm">{localUserInfo?.address}</p>
                        <p className="text-sm">{localUserInfo?.number}</p>
                    </div>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-base-200 min-h-screen w-full mt-5">
                <div className="flex gap-x-2 items-center mb-2">
                    <p className="font-bold text-xl">Name: </p>
                    <input required name='name' type="text" placeholder="Type here" className="input input-accent" />
                </div>
                <div className="flex gap-x-2 items-center mb-2">
                    <p className="font-bold text-xl">Address: </p>
                    <input required name='address' type="text" placeholder="Type here" className="input input-accent" />
                </div>
                <div className="flex gap-x-2 items-center mb-2">
                    <p className="font-bold text-xl">Number: </p>
                    <input required name='number' type="number" placeholder="Type here" className="input input-accent" />
                </div>
                <DropZone folder='profilePic' onUploadComplete={handleImageUpload}></DropZone>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};

export default UserProfile;