const Categories = () => {
    return (
        <div className="grid justify-center">

            <div className="grid grid-cols-6 grid-rows-8 gap-4">
                <div className="border border-dashed col-span-2">Home and garden</div>
                <div className="border border-dashed col-span-2 row-span-2 col-start-1 row-start-2">
                    Furniture
                    <div
                        className="relative w-full aspect-[373/67]"
                    >
                        {/* <img
                            // style={{ paddingBottom: '17.74%' }}
                            className="object-cover w-full h-auto absolute top-0 left-0"
                            src="/category/sofa.webp" alt="" /> */}
                    </div>
                </div>
                <div className="border border-dashed col-span-2 row-span-2 col-start-1 row-start-4">
                    Kitchenware                    
                    <div
                        className="relative w-full aspect-[373/67]"
                    >
                        {/* <img 
                        // style={{ paddingBottom: '17.74%' }}
                        className="object-cover w-full h-auto absolute top-0 left-0"
                        src="/category/bowles.webp" alt="" /> */}
                    </div>
                </div>
                <div className="border border-dashed col-start-1 row-start-6">Bedding
                    <div>
                        {/* <img src="/category/beddings.webp" alt="" /> */}
                    </div>
                </div>
                <div className="border border-dashed col-start-2 row-start-6">
                    Home Decor
                    <div>
                        {/* <img 
                        className="w-full h-full object-cover"
                        src="/category/vase.webp" alt="" /> */}
                    </div>
                </div>
                <div className="border border-dashed col-start-1 row-start-7">
                    Equipment
                    <div
                    // style={{ paddingBottom: '37.43%' }}
                    >
                        {/* <img 
                        className="w-full h-full object-cover"
                        src="/category/tractor.webp" alt="" /> */}
                    </div>
                </div>
                <div
                    // style={{ paddingBottom: '37.43%' }}
                    className="border border-dashed col-start-2 row-start-7">
                    Storage & Organization
                    {/* <img 
                    className="w-full h-full object-cover"
                    src="/category/storage.webp" alt="" /> */}
                </div>
                <div className="border border-dashed col-span-2 col-start-3 row-start-1">Beauty & Personal Care</div>
                <div className="border border-dashed row-span-2 col-start-3 row-start-2">
                    Skincare
                    {/* <img
                        className="w-full h-full object-cover"
                        src="/category/moisturizer.webp" alt="" /> */}
                </div>
                <div className="border border-dashed row-span-2 col-start-4 row-start-2">
                    Hair Care
                    {/* <img
                        className="w-full h-full object-cover"
                        src="/category/shampoo.webp" alt="" /> */}
                </div>
                <div className="border border-dashed col-span-2 row-span-2 col-start-3 row-start-4">
                    Categories
                    {/* <img src="/category/categories.jpg" alt="" /> */}
                </div>
                <div className="border border-dashed row-span-2 col-start-3 row-start-6">
                    Fragrances
                    {/* <img 
                    className="w-full h-full object-cover"
                    src="/category/perfume.webp" alt="" /> */}
                </div>
                <div className="border border-dashed row-span-2 col-start-4 row-start-6">Personal Care Appliances
                    {/* <img src="/category/hair dryer.webp" alt="" /> */}
                </div>
                <div className="border border-dashed col-span-2 row-span-3 col-start-5 row-start-2">
                    Laptops
                    {/* <img 
                    className="w-full h-full object-fill"
                    src="/category/laptop.webp" alt="" /> */}
                </div>
                <div className="border border-dashed col-span-2 row-span-3 col-start-5 row-start-5">
                    Headphones
                    {/* <img 
                    className="w-full h-full object-cover"
                    src="/category/headphones.webp" alt="" /> */}
                </div>
                <div className="border border-dashed col-span-2 col-start-5 row-start-1">Electronics & Technology</div>
            </div>

        </div>

    );
};

export default Categories;