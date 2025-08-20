import { useState } from 'react';
import './styles2.css'
export default function CardReverse({imgSource, imgTitle, className = ""}) {
    
    return (
        <div className={`relative w-full h-full min-h-[254px] overflow-visible ${className}`}>
            <div className="w-full h-full transition-transform duration-300 transform hover:rotate-y-180 shadow-lg rounded-md group">
                {/* Front Side - Now shows the image/content by default */}
                <div className="absolute w-full h-full bg-[#151515] rounded-md overflow-hidden backface-visibility-hidden text-white">
                    <img className='w-full h-full object-fill' src={imgSource} alt="" />
                </div>

                {/* Back Side - Now shows on hover */}
                <div className="absolute w-full h-full bg-[#151515] rounded-md overflow-hidden backface-visibility-hidden rotate-y-180">
                    {/* Neon Effect Container */}
                    <div className="absolute w-full h-full overflow-hidden">
                        <div className="neon-effect"></div>
                    </div>

                    <div className="absolute inset-[0.5%] bg-[#151515] rounded-md text-white flex flex-col justify-center items-center gap-8">
                        <strong className="text-center px-4">{imgTitle}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}