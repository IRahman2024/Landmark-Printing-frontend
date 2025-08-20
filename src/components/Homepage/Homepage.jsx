import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories(unused)";
import Categories2 from "../Categories/Categories2";
import FlashSale from "../Flash Sale/FlashSale";
import Card from "../Shared/Cards/Card";
import CardReverse from "../Shared/Cards/CardReverse";
import HoverCard from "../Shared/Cards/HoverCard";
import furniture from '/category/sofa.webp';
import SearchBox from "../Shared/SeacahBar/SearchBar";
import Portion1 from "./Portion1";
import Testimonials from "./Testimonials";

const Homepage = () => {
    return (
        <div className="bg-[#f1f0eb]">
            <div>
                <Banner></Banner>
            </div>
            <div className="my-2">
                <Portion1></Portion1>
            </div>
            {/* <div className="mt-6">
                <Categories2></Categories2>
            </div> */}

            <div>
                <Testimonials></Testimonials>
            </div>
        </div>
    );
};

export default Homepage;