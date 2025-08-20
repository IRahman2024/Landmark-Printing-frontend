import React from 'react';

const AboutUs = () => {

    const teamMembers = [
        {
            name: 'Rafi',
            image: 'Rafi.jpg', // Replace with your photo URL or local path
        },
        {
            name: 'Ifti',
            image: 'IFTI.jpg', // Replace with teammate's photo
        },
        {
            name: 'Fahim',
            image: 'Fahim.jpg', // Replace with teammate's photo
        },
    ];

    return (
        <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-6 md:px-20 lg:px-40">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-5xl font-extrabold text-blue-900 mb-8 tracking-wide">About Buy and Borrow</h2>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    <span className="text-blue-700 font-semibold">Buy and Borrow</span> is not just another e-commerce
                    site — it's a bold, new idea designed for modern consumers. In a world where owning everything
                    doesn't always make sense, we've built a smart platform that lets you <span className="font-medium">either purchase or temporarily borrow</span> the products you need.
                </p>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    Our mission is to create a sustainable, flexible shopping ecosystem where access matters more
                    than ownership. With verified buyers, secure payments through <span className="italic">Stripe, SSLCommerz, and PayPal</span>,
                    and a clean, user-friendly interface — we make online transactions feel effortless.
                </p>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    Whether you're a student needing a projector for a day, a traveler borrowing a camera, or a seller
                    offering your items for dual-use (sale or rent), <span className="text-blue-600 font-semibold">Buy and Borrow</span> gives you the freedom
                    to choose, save money, and reduce waste.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                    We believe the future of e-commerce is flexible, sustainable, and user-centered — and Buy and Borrow
                    is here to lead the way. 🌱
                </p>
            </div>
            
            <section className="bg-white py-16 px-6 md:px-20 lg:px-40">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-10">Built By Us</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-40 h-40 rounded-full object-cover shadow-lg mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-700">{member.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
};

export default AboutUs;