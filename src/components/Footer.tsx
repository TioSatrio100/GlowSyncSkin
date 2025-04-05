import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">GlowSync</h3>
            <p className="text-gray-600 text-sm">Your premium destination for skincare products with AI-powered recommendations.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-600 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-600 text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary-600 text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog?category=cleansers" className="text-gray-600 hover:text-primary-600 text-sm">
                  Cleansers
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=moisturizers" className="text-gray-600 hover:text-primary-600 text-sm">
                  Moisturizers
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=serums" className="text-gray-600 hover:text-primary-600 text-sm">
                  Serums
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <p className="text-gray-500 text-sm text-center">© {new Date().getFullYear()} GlowSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
