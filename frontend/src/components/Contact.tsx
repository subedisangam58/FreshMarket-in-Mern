"use client";
import React from 'react';

function Contact() {
  return (
    <div className="pt-28 px-4 min-h-screen flex flex-col items-center justify-start text-center bg-gray-50">
      <h1 className="text-5xl font-bold mb-4 text-green-700">Contact Us</h1>
      <p className="text-lg mb-8 text-gray-700">We would love to hear from you!</p>

      <form className="flex flex-col items-center space-y-4 w-full max-w-lg">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-3 rounded-md border border-gray-300 h-32 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
