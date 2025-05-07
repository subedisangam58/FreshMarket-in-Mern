"use client";
import React from 'react'

function About() {
    return (
        <div className="pt-28 px-4 min-h-screen bg-white text-gray-800">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6 text-green-700">About Us</h1>
                <p className="text-lg mb-8">
                    Welcome to FreshMarket — your one-stop destination for fresh fruits,
                    vegetables, and daily market insights directly from Kalimati Market.
                </p>

                <div className="text-left space-y-6">
                    <p>
                        At FreshMarket, our mission is to make access to real-time market
                        prices transparent and available to everyone. Whether you're a
                        household shopper, small vendor, or large-scale retailer, our
                        platform helps you make informed decisions based on accurate
                        pricing.
                    </p>

                    <p>
                        Our data is sourced daily from the official Kalimati Market portal,
                        ensuring up-to-date and reliable information. We believe in
                        empowering people with knowledge and simplifying the way fresh
                        produce is traded in Nepal.
                    </p>

                    <p>
                        We're a passionate team of developers, designers, and agriculture
                        enthusiasts working together to bridge the digital gap in the local
                        market system.
                    </p>

                    <p className="font-semibold">
                        Thank you for being a part of our journey!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
