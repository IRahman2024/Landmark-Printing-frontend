import { CiCreditCard1 } from "react-icons/ci";
import { CiNoWaitingSign } from "react-icons/ci";
import { FiPackage } from "react-icons/fi";

const Portion1 = () => {
    return (
        <div className="flex flex-col justify-center my-9">
            <div className="flex flex-col text-start justify-start mt-5 mx-20 text-black font-openSans">
                <p className="text-sm font-black">LANDMARK PRINTING</p>
                {/* <br /> */}
                <p className="text-6xl font-bold mt-6">
                    Print Your
                    <br />
                    Vision to Life
                </p>
            </div>
            <div className="flex justify-between items-center mx-20 gap-x-7">
                <div className="flex flex-col my-10 text-black font-openSans">
                    <p className="font-bold my-5">About Us</p>
                    <p className="font-semibold my-5 text-4xl">The go-to experts for all your <br /> printing needs</p>
                    <p className="max-w-[45rem] mt-5 text-sm">Landmark Printing has been a trusted provider of high-quality, affordable print solutions for over 20 years, serving clients locally and internationally. Based in a purpose-built facility in Braeside, just 20km from Melbourne CBD, we’re ideally located for fast, reliable service, including next-day interstate delivery. Our advanced technology includes offset presses, wide-format and UV printers, and a full range of finishing services like embossing, lamination, and binding. Backed by expert staff and a strong focus on customer satisfaction, we deliver every job with precision, care, and on-time reliability.</p>
                    <button className="btn btn-outline w-44 rounded-3xl mt-16">Get Quote</button>
                </div>
                <div>
                    <img className="rounded-2xl w-[45rem] ml-20" src="/New Images/DIGITAL_PRINT_COMPANY_0000_2-topaz-sharpen-enhance.webp" alt="" />
                </div>
            </div>
            <hr className="mx-28 border-1 my-24 border-[#cac9c3] rounded-full" />
            <div className="mx-20">
                <div className="flex justify-between">
                    <p className="text-black font-semibold font-openSans text-3xl">Our Projects</p>
                    <button className="btn btn-outline rounded-full">All Projects</button>
                </div>
                <div className="flex font-openSans w-full gap-2 mt-10 overflow-x-hidden">
                    <div className="min-w-80 flex flex-col flex-shrink-0">
                        <img className="rounded-2xl w-full h-auto object-cover" src="/New Images/11062b_02baea3e22b345cc9f0fa710cfd7235d~mv2.jpeg" alt="" />
                        <p className="text-lg mt-5 font-semibold">Booklets</p>
                    </div>
                    <div className="min-w-80 flex flex-col flex-shrink-0">
                        <img className="rounded-2xl w-full h-auto object-cover" src="/New Images/11062b_6c733de8c0db44dca81dd9ff906219ea~mv2.jpeg" alt="" />
                        <p className="text-lg mt-5 font-semibold">Business Cards</p>
                    </div>
                </div>
            </div>
            <div className="flex font-openSans p-10 mx-20 mt-32 text-black bg-[#c9c4b7] rounded-2xl">
                <div className="max-w-[45rem]">
                    <p className="text-xl font-semibold">OUR PRINTING SERVICES</p>
                    <p className="font-semibold my-3 w-[35rem]">At Landmark Printing, we offer a wide range of high-quality printing services to meet your business, marketing, and personal needs. From eye-catching labels and premium cards to custom signage and packaging, our team delivers precision, speed, and style in every print. With advanced printing technology and a commitment to excellence, we help bring your ideas to life — on paper, vinyl, board, or box.</p>
                    <button className="btn btn-outline rounded-full">All Services</button>
                </div>
                <div className="grid grid-cols-2 gap-10 ml-5">
                    <div>
                        <img className="w-10" src="/New Images/label.png" alt="" />
                        <p className="font-bold text-xl my-5">LABELS AND STICKERS</p>
                        <p className="w-72 text-sm">Make your brand stick with custom labels and stickers that are as durable as they are beautiful.
                            Perfect for product packaging, branding, events, and promotions, our stickers are available in various shapes, sizes, and finishes — including gloss, matte, clear, and waterproof options. Whether you need roll labels for bottles or promotional stickers for giveaways, we ensure sharp print quality and long-lasting adhesion.
                        </p>
                    </div>
                    <div>
                        <CiCreditCard1 className="size-11" />
                        <p className="font-bold text-xl my-4">CARDS</p>
                        <p className="w-72 text-sm">Leave a lasting impression with professionally printed cards tailored to your purpose.

                            We print a wide range of cards including business cards, thank you cards, loyalty cards, greeting cards, and invitations. Choose from high-end finishes like foil stamping, spot UV, embossing, or soft-touch lamination. Whether formal or creative, our cards reflect the personality of your brand or event.
                        </p>
                    </div>
                    <div>
                        <CiNoWaitingSign className="size-11" />
                        <p className="font-bold text-xl my-4">SIGNS</p>
                        <p className="w-72 text-sm">
                            Get noticed with bold, custom signage built to last — indoors or out.

                            We produce a variety of signs including shop signage, A-frames, event backdrops, banners, window decals, and safety signage. Printed on durable materials like corflute, ACM, foamboard, or vinyl, our signs are designed to capture attention and withstand the elements. Ideal for promotions, exhibitions, storefronts, or directional use.
                        </p>
                    </div>
                    <div>
                        <FiPackage className="size-11" />
                        <p className="font-bold text-xl my-4">PACKAGING</p>
                        <p className="w-72 text-sm">Elevate your product with professionally designed packaging that speaks for your brand.

                            From custom boxes and sleeves to product wraps and inserts, our packaging solutions are built for both beauty and function. Whether you’re in retail, food, cosmetics, or e-commerce, we help create a memorable unboxing experience with top-quality materials, clear print, and sleek finishes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portion1;