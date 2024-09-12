import { FC } from "react";
import { Link } from "react-router-dom";

export const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Policies</h3>
            <ul>
              <li>
                <Link to="/refund-policy" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:underline">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/terms-of-sale" className="hover:underline">
                  Terms of Sale
                </Link>
              </li>
              <li>
                <Link to="/legal-notice" className="hover:underline">
                  Legal Notice
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Help</h3>
            <ul>
              <li>
                <Link to="/q-a" className="hover:underline">
                  Q&A
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Company
            </h3>
            <p>KicksFactory</p>
            <p>123 Rue de la Mode</p>
            <p>75001 Paris, France</p>
            <p>Email: contact@kicksfactory.com</p>
            <p>Téléphone: +33 1 23 45 67 89</p>
          </div>
        </div>
        <div className="mt-8">
          <p>&copy; 2024 KicksFactory</p>
        </div>
      </div>
    </footer>
  );
};
