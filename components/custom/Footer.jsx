import React from 'react';
import Image from "next/image";

function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="px-6 md:px-20 lg:px-32 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <Image src={"/logo.svg"} alt="logo" width={140} height={100} className="opacity-80 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>

                <div className="text-sm text-gray-500">
                    © {new Date().getFullYear()} AutoMailr AI. All rights reserved.
                </div>

                <div className="flex gap-6 text-sm text-gray-600">
                    <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-purple-600 transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
