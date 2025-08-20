import React from 'react';
import banners from '/banners.png';

import headPhones from '/category/headphones.webp';
import businessCard from '/business-card.png';
import labeles from '/labeles.webp';
import posters from '/posters.jpg';
import storage from '/category/storage.webp';
import Skincare from '/category/moisturizer.webp';
import categories from '/category/categories.jpg';
import Fragrances from '/category/perfume.webp';
import personal from '/category/hair dryer.webp';
import Laptops from '/category/laptop.webp';
import Headphones from '/category/headphones.webp';
import Cameras from '/category/camera.webp';
import Gaming from '/category/gaming.webp';
import Audio from '/category/audio.webp';
import Accessories from '/category/accessories.webp'
import CardReverse from '../Shared/Cards/CardReverse';
import { key } from 'localforage';
import { Link } from 'react-router-dom';

const Categories = () => {
    // Define header style directly to ensure maximum control
    const headerStyle = {
        height: '24px',
        lineHeight: '24px',
        fontSize: '12px',
        paddingLeft: '4px',
        paddingRight: '4px',
        backgroundColor: '#1f2937', // bg-gray-800
        color: 'white',
        border: '1px dashed #6b7280', // border-gray-500
        overflow: 'hidden'
    };

    return (
        <div className="container mx-auto my-10 p-4 bg-base-100">
            <div className='flex flex-col justify-center gap-y-10 items-center mb-20'>
                <p className="text-3xl text-pink-600 font-bold">Our Services</p>
                <p className="font-bold text-5xl text-center">Printing Solutions For<br />All Your Need</p>
            </div>
            <div className="grid grid-cols-6 gap-1">
                {/* upper-left category */}
                <div className="col-span-2 row-span-2 col-start-1 row-start-2 bg-white text-white">
                    <div className="w-full h-[calc(100%)]">
                        <img className="w-full h-full object-cover" src="/category/categories.jpg" alt="Categories" />
                    </div>
                </div>

                {/* business card */}
                <div className="col-span-2 row-span-2 col-start-1 row-start-4 bg-white text-white">
                    <Link to="/businessCard">
                        <div className="w-full h-[calc(100%)]">
                            <CardReverse className="w-full h-full object-cover" imgSource={businessCard} imgTitle={"Business Cards"}></CardReverse>
                        </div>
                    </Link>
                </div>

                {/* upper-right category */}
                <div className="col-span-2 row-span-2 col-start-5 row-start-2 bg-white text-white">
                    <div className="w-full h-[calc(100%)]">
                        <img className="w-full h-full object-cover" src="/category/categories.jpg" alt="Categories" />
                    </div>
                </div>

                {/* banner */}
                <div className="row-span-2 col-start-3 col-span-2 row-start-2 bg-white text-white">
                    <Link to="/banner">
                        <div className="w-full h-full">
                            <CardReverse className="w-full h-full object-contain" imgSource={banners} imgTitle={"Banners"}></CardReverse>
                        </div>
                    </Link>
                </div>
                {/* center category */}
                <div className="col-span-2 row-span-2 col-start-3 row-start-4 bg-white text-white">
                    <div className="w-full h-[calc(100%)]">
                        <img className="w-full h-full object-cover" src="/category/categories.jpg" alt="Categories" />
                    </div>
                </div>
                {/* labels */}
                <div className="row-span-2 col-start-3 col-span-2 row-start-6 bg-white text-white">
                    <Link to="/label">
                        <div className="w-full h-[calc(100%)]">
                            <CardReverse className="w-full h-full object-cover" imgSource={labeles} imgTitle={"Labels"}></CardReverse>
                        </div>
                    </Link>
                </div>

                {/* lower left categories */}
                <div className="col-span-2 row-span-2 col-start-1 row-start-6 bg-white text-white">
                    <div className="w-full h-[calc(100%)]">
                        <img className="w-full h-full object-cover" src="/category/categories.jpg" alt="Categories" />
                    </div>
                </div>

                {/* posters */}
                <div className="col-span-2 row-span-2 col-start-5 row-start-4 bg-white text-white">
                    <Link to="/poster">
                        <div className="w-full h-[calc(100%)]">
                            <CardReverse className="w-full h-full object-contain" imgSource={posters} imgTitle={"Posters"}></CardReverse>
                        </div>
                    </Link>
                </div>
                {/* lower right categories */}
                <div className="col-span-2 row-span-2 col-start-5 row-start-6 bg-white text-white">
                    <div className="w-full h-[calc(100%)]">
                        <img className="w-full h-full object-cover" src="/category/categories.jpg" alt="Categories" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories; 