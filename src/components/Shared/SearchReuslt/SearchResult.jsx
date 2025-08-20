import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SearchResult = (products) => {

    const location = useLocation();
    const results = location.state?.results || [];

    console.log(results);

    if (!products?.length)
        return (
            <div className="text-6xl font-black p-4">Sorry. No product available yet. Come another day...</div>
        )

    return (
        <div className='grid grid-cols-3 gap-3 m-6'>
            {
                results?.map((result, idx) => {
                    return (
                        <div key={idx} className="card w-96 shadow-sm bg-gray-400">
                            <figure>
                                <img
                                    src={result?.urls[0]}
                                    alt={result?.name} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{result?.name}</h2>
                                <p>{result?.about?.slice(0, 50) + (result?.about?.length > 50 ? '...' : '')}</p>
                                <div className="flex items-center text-sm">
                                    <span className="text-red-600 font-bold mr-1">Price:</span>
                                    <span className="text-green-600 font-semibold mr-1">{result?.price} Taka</span>
                                    {result?.oldPrice && (
                                        <span className="line-through text-gray-400">{result?.oldPrice} taka</span>
                                    )}
                                </div>
                                {result?.type == 'Lend' && <div className="badge badge-info">
                                    <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><path d="m12,17v-5.5c0-.276-.224-.5-.5-.5h-1.5" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></path><circle cx="12" cy="7.25" r="1.25" fill="currentColor" strokeWidth="2"></circle></g></svg>
                                    Borrowing option available
                                </div>}
                                <div className="card-actions justify-end">
                                    <Link to={`/details/${result?._id}`} className="btn btn-primary">Show Details</Link>
                                    {result?.type !== 'Lend' && <button className="btn btn-primary">Buy Now</button>}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default SearchResult;