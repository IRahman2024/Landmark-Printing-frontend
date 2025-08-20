import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Furnitures = () => {
    const [products, setProducts] = useState(null);
    const category = useParams().category;
    const axiosPublic = useAxiosPublic();

    console.log(products);

    useEffect(() => {
        axiosPublic.get(`/products/${category}`)
            .then(data => setProducts(data.data))
            .catch((err) => console.error('Error loading category.json:', err));
    }, [category]);

    products?.map((product) => console.log(product?._id));

    if(!products?.length)
        return (
            <div className="text-6xl font-black p-4">Sorry. No product available yet. Come another day...</div>
        )

    return (
        <div className='p-4 flex gap-7 justify-center'>
            {
                products?.map((product, id) => (
                    <div key={id} className="card w-96 shadow-sm bg-gray-400">
                        <figure>
                            <img
                                src={product?.urls[0]}
                                alt={product?.name} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{product?.name}</h2>
                            <p>{product?.about?.slice(0, 50) + (product?.about?.length > 50 ? '...' : '')}</p>
                            <div className="flex items-center text-sm">
                                <span className="text-red-600 font-bold mr-1">Price:</span>
                                <span className="text-green-600 font-semibold mr-1">{product?.price} Taka</span>
                                {product?.oldPrice && (
                                    <span className="line-through text-gray-400">{product?.oldPrice} taka</span>
                                )}
                            </div>
                            {product?.type == 'Lend' && <div className="badge badge-info">
                                <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><path d="m12,17v-5.5c0-.276-.224-.5-.5-.5h-1.5" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></path><circle cx="12" cy="7.25" r="1.25" fill="currentColor" strokeWidth="2"></circle></g></svg>
                                Borrowing option available
                            </div>}
                            <div className="card-actions justify-end">
                                <Link to={`/details/${product?._id}`} className="btn btn-primary">Show Details</Link>
                                { product?.type !== 'Lend' && <button className="btn btn-primary">Buy Now</button> }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Furnitures;