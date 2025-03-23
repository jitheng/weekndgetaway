import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400 mb-4">
              Discover the best hiking trails and outdoor adventures. Join our community of nature enthusiasts and explore the wilderness.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <FaYoutube size={24} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/treks" className="text-gray-400 hover:text-white">
                  All Treks
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Trek Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Trek Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/easy-treks" className="text-gray-400 hover:text-white">
                  Easy Treks
                </Link>
              </li>
              <li>
                <Link href="/moderate-treks" className="text-gray-400 hover:text-white">
                  Moderate Treks
                </Link>
              </li>
              <li>
                <Link href="/difficult-treks" className="text-gray-400 hover:text-white">
                  Difficult Treks
                </Link>
              </li>
              <li>
                <Link href="/family-treks" className="text-gray-400 hover:text-white">
                  Family Treks
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: </li>
              <li>Address: Kogilu Main Road, Bengaluru, Karnataka, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} HikeExplorer. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 