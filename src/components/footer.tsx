"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white py-8 w-full md:py-16">
      <div className="w-full mx-auto max-w-[1440px] px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-[72px] leading-[100%] font-italianno italic mb-4">
                ArcaneHeritage
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Jelajah budaya budaya Indonesia
              </p>
              <Link
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                aria-label="LinkedIn"
              >
                <Instagram />
              </Link>
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Platforms</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Mobile App
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Website App
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Features</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Bangunan
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Makanan
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Tari Tradisional
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Text to Speech
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Museum Panorama 360
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Video Introduction Detail
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Social Media</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Linkedin
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Copyright © 2025 ArcaneHeritage
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms and Conditions
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Responsible AI Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
