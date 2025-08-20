import { useEffect, useRef, useState } from 'react';

const Banner = () => {
    // const totalItems = 4;
    // const [currentIndex, setCurrentIndex] = useState(0);
    // const carouselRef = useRef(null);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentIndex(prev => (prev + 1) % totalItems);
    //     }, 3000); // Change every 3 seconds

    //     return () => clearInterval(interval); // cleanup
    // }, []);

    // useEffect(() => {
    //     if (carouselRef.current) {
    //         const scrollWidth = carouselRef.current.scrollWidth / totalItems;
    //         carouselRef.current.scrollTo({
    //             left: scrollWidth * currentIndex,
    //             behavior: 'smooth',
    //         });
    //     }
    // }, [currentIndex]);

    return (
        <div>
            <img src="/New Images/c837a6_1d5f201e63994552ba2cf5357c5b6571mv2.webp" alt="" />
        </div>
    );
};

export default Banner;
