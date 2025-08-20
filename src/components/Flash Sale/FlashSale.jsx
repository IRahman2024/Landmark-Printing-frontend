const FlashSale = () => {
    return (
        <div className="border border-red-500 p-6 bg-yellow-400">
            <div className="mb-5 text-3xl font-bold text-black">
                <p>Flash Sale</p>
            </div>
            <div className="flex gap-x-5 justify-center">
                <div className="card bg-base-100 w-48 shadow-sm">
                    <figure>
                        <img
                            src='dove shampoo.webp'
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Dove</h2>
                        <p>some info</p>
                        <div className="card-actions justify-end">
                            <div className=" badge badge-outline badge-error">56% off</div>
                            <button className="btn btn-primary btn-xs">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-48 shadow-sm">
                    <figure>
                        <img
                            src="fog.webp"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Fog desire</h2>
                        <p>some info</p>
                        <div className="card-actions justify-end">
                            <div className=" badge badge-outline badge-error">56% off</div>
                            <button className="btn btn-primary btn-xs">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-48 shadow-sm">
                    <figure>
                        <img
                            src="savlon.webp"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Savlon Cream</h2>
                        <p>some info</p>
                        <div className="card-actions justify-end">
                            <div className=" badge badge-outline badge-error">56% off</div>
                            <button className="btn btn-primary btn-xs">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-48 shadow-sm">
                    <figure>
                        <img
                            src="lifeboy.webp"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Lifeboy Soap</h2>
                        <p>some info</p>
                        <div className="card-actions justify-end">
                            <div className=" badge badge-outline badge-error">56% off</div>
                            <button className="btn btn-primary btn-xs">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-48 shadow-sm">
                    <figure>
                        <img
                            src="shoe.jpg"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Cat Six</h2>
                        <p>some info</p>
                        <div className="card-actions justify-end">
                            <div className=" badge badge-outline badge-error">56% off</div>
                            <button className="btn btn-primary btn-xs">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashSale;