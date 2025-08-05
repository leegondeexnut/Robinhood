"use client";

import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Fooder() {
  return (
    <footer className="bg-gray-600 text-gray-300 px-6 py-10 mt-10 w-full absolute bottom-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white">MyApp</h2>
          <p className="mt-2 text-sm">
            Creating powerful experiences through design and code.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/" className="hover:text-red-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-red-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-red-300">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm mb-3">Get updates right in your inbox.</p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded bg-gray-800 text-sm border border-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-300 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="ml-30">
          <h3 className="text-white font-semibold mb-2 ml-12">Follow Us</h3>
          <div className="flex space-x-4 mt-2 text-xl">
            <Link href="https://facebook.com" target="_blank">
              <FaFacebook className="w-8 h-8 hover:bg-red-300 hover:animate-bounce cursor-pointer"></FaFacebook>
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <FaTwitter className="w-8 h-8 hover:bg-red-300 hover:animate-bounce cursor-pointer"></FaTwitter>
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <FaInstagram className="w-8 h-8 hover:bg-red-300 hover:animate-bounce cursor-pointer"></FaInstagram>
            </Link>
            <Link href="https://whatsapp.com" target="_blank">
              <FaWhatsapp className="w-8 h-8 hover:bg-red-300 hover:animate-bounce cursor-pointer"></FaWhatsapp>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}
