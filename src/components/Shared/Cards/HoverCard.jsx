import React, { useState } from "react";
import './styles.css'; // Assuming you put the CSS in a separate file named App.css

const HoverCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card w-48 h-64 overflow-visible relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`content w-full h-full transform-style preserve-3d transition-transform duration-300 shadow-lg rounded-lg ${
          isHovered ? "rotate-y-180" : ""
        }`}
      >
        {/* Back Side */}
        <div className="back inset-0 bg-gray-900 rounded-lg flex justify-center items-center overflow-hidden relative">
          {/* Neon Lighting (moving gradient behind the text) */}
          <div className="neon-light absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 animate-rotation"></div>

          {/* Centering the "Hover Me" Text */}
          <div className="back-content absolute w-full h-full flex justify-center items-center text-center">
            <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M20.84375 0.03125C20.191406 0.0703125 19.652344 0.425781 19.21875 1.53125C18.988281 2.117188 18.5 3.558594 18.03125 4.9375C17.792969 5.636719 17.570313 6.273438 17.40625 6.75C17.390625 6.796875 17.414063 6.855469 17.40625 6.90625C17.398438 6.925781 17.351563 6.949219 17.34375 6.96875L17.25 7.25C18.566406 7.65625 19.539063 8.058594 19.625 8.09375C22.597656 9.21875 28.351563 11.847656 33.28125 16.78125C38.5 22 41.183594 28.265625 42.09375 30.71875C42.113281 30.761719 42.375 31.535156 42.75 32.84375C42.757813 32.839844 42.777344 32.847656 42.78125 32.84375C43.34375 32.664063 44.953125 32.09375 46.3125 31.625C47.109375 31.351563 47.808594 31.117188 48.15625 31C49.003906 30.714844 49.542969 30.292969 49.8125 29.6875C50.074219 29.109375 50.066406 28.429688 49.75 27.6875C49.605469 27.347656 49.441406 26.917969 49.25 26.4375C47.878906 23.007813 45.007813 15.882813 39.59375 10.46875C33.613281 4.484375 25.792969 1.210938 22.125 0.21875C21.648438 0.0898438 21.234375 0.0078125 20.84375 0.03125 Z" />
            </svg>
            <strong>Hover Me</strong>
          </div>
        </div>

        {/* Front Side */}
        <div className="front absolute inset-0 bg-gray-900 rounded-lg text-white transform rotate-y-180">
          <div className="img relative w-full h-full object-cover">
            {/* Floating circles */}
            <div className="circle absolute w-24 h-24 bg-orange-400 rounded-full blur-xl animation-floating"></div>
            <div className="circle absolute w-36 h-36 bg-red-500 rounded-full blur-xl animation-floating animation-delay-200"></div>
            <div className="circle absolute w-24 h-24 bg-yellow-500 rounded-full blur-xl animation-floating animation-delay-400"></div>
          </div>

          {/* Front content */}
          <div className="front-content absolute inset-0 p-3 flex flex-col justify-between">
            <small className="badge bg-black bg-opacity-40 py-1 px-2 rounded-full backdrop-blur-md">Pasta</small>
            <div className="description shadow-lg w-full p-3 bg-black bg-opacity-80 backdrop-blur-md rounded-md">
              <div className="title flex justify-between items-center text-xs">
                <p className="w-1/2 font-bold">Spaghetti Bolognese</p>
                <svg className="w-4 h-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                  <path d="M25 27l-9-6.75l-9 6.75v-23h18z"></path>
                </svg>
              </div>
              <p className="card-footer text-xs text-gray-400 mt-1">30 Mins | 1 Serving</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
