import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import DropZone from "../DropZone/DropZone";
import useAxiosSecure from "../../../Hooks/useAxiosPrivate";

const AddProduct = () => {
    const [seller, setSeller] = useState([]);
    const [urls, setUrls] = useState([]);
    const [type, setType] = useState('select');
    const [category, setCategory] = useState('select');
    const { user } = useContext(AuthContext);
    // console.log(user);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`users/${user.email}`)
            .then((data) => setSeller(data.data))
    }, [])

    // console.log(seller);


    const handleImageUpload = (urls) => {
        setUrls(urls);
        console.log("Received from DropZone:", urls);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!urls.length) {
            alert('No image found. You need to upload images first!!!');
            return;
        }


        const name = e.target.Name.value;
        const price = e.target.Price.value;
        const about = e.target.About.value;
        const tags = e.target
            .Tags.value
            .toLowerCase()
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        const status = 'pending';
        const sellerId = seller._id;
        const sellerEmail = seller.email;

        const productInfo = { name, price, tags, urls, sellerEmail, sellerId, status, about, type, category };

        // console.log(productInfo);

        axiosSecure.post('/addProduct', productInfo)
            .then(res => {
                console.log(res.data.acknowledged);

                if (res.data.acknowledged){
                    alert('Product added successfully!')
                    e.target.reset(); 
                    setType('select'); 
                    setCategory('select'); 
                    setUrls([]);
                }
            })

    }


    return (
        <div className="w-full border border-red-600">
            <form onSubmit={handleSubmit} className="bg-base-200">
                <div className="flex flex-col justify-center mb-4">
                    <div className="text-center my-5">
                        <h1 className="text-5xl font-bold">Add Product!</h1>
                    </div>
                    <div className="card bg-base-100 shadow-2xl w-full max-w-xl mx-auto">
                        <div className="card-body w-full">
                            <fieldset className="fieldset grid justify-center">
                                <label className="label">Product Name</label>
                                <input type="text" className="input border-black border-1" name="Name" placeholder="Name" />

                                <label className="label">Price</label>
                                <input type="number" className="input border-black border-1" name="Price" placeholder="Price" />
                                
                                <label className="label">Tags</label>
                                <input type="text" className="input border-black border-1" name="Tags" placeholder="Tags" />

                                <label className="label">About</label>
                                <textarea className="textarea" name="About" placeholder="About"></textarea>

                                <label className="label">Type</label>
                                <div className="dropdown z-20">
                                    <div tabIndex={0} role="button" className="btn btn-wide m-1">{type}</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        <li onClick={() => setType('Sell')}><a>Sell</a></li>
                                        <li onClick={() => setType('Lend')}><a>Lend</a></li>
                                    </ul>
                                </div>

                                <label className="label">Category</label>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn btn-wide m-1">{category}</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm max-h-[200px] overflow-x-auto">
                                        <li onClick={() => setCategory('furnitures')}><a>Furniture</a></li>
                                        <li onClick={() => setCategory('skinCare')}><a>Skincare</a></li>
                                        <li onClick={() => setCategory('hairCare')}><a>Hair Care</a></li>
                                        <li onClick={() => setCategory('laptops')}><a>Laptops</a></li>
                                        <li onClick={() => setCategory('kitchenWare')}><a>Kitchenware</a></li>
                                        <li onClick={() => setCategory('headPhones')}><a>Headphones</a></li>
                                        <li onClick={() => setCategory('beddings')}><a>Bedding</a></li>
                                        <li onClick={() => setCategory('homeDecore')}><a>Home Decorations</a></li>
                                        <li onClick={() => setCategory('fragrances')}><a>Fragrances</a></li>
                                        <li onClick={() => setCategory('personal')}><a>Personal Care Appliances</a></li>
                                        <li onClick={() => setCategory('cameras')}><a>Camera</a></li>
                                        <li onClick={() => setCategory('gaming')}><a>Gaming</a></li>
                                        <li onClick={() => setCategory('equipment')}><a>Equipments</a></li>
                                        <li onClick={() => setCategory('storage')}><a>Storage</a></li>
                                        <li onClick={() => setCategory('audio')}><a>Audio</a></li>
                                        <li onClick={() => setCategory('accessories')}><a>Accessories</a></li>
                                    </ul>
                                </div>

                                <div className="my-3">
                                    <DropZone folderName={`products/${category}`} onUploadComplete={handleImageUpload}></DropZone>
                                </div>

                                <button type="submit" className="btn btn-accent mt-4">Add</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default AddProduct;