export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Go<span className="text-orange-500">Drive</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              The first digital vehicle booking platform
              built for Bertoua, East Region, Cameroon.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-orange-500 transition">
                Home</a></li>
              <li><a href="/vehicles" className="hover:text-orange-500 transition">
                Vehicles</a></li>
              <li><a href="/about" className="hover:text-orange-500 transition">
                About Us</a></li>
              <li><a href="/contact" className="hover:text-orange-500 transition">
                Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-orange-500 transition cursor-pointer">
                Vehicle Rental</li>
              <li className="hover:text-orange-500 transition cursor-pointer">
                Airport Transfers</li>
              <li className="hover:text-orange-500 transition cursor-pointer">
                City Tours</li>
              <li className="hover:text-orange-500 transition cursor-pointer">
                Corporate Rides</li>
              <li className="hover:text-orange-500 transition cursor-pointer">
                Inter-city Travel</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Bertoua, East Region, Cameroon</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+237 694 99 76 08</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>wouambaserge21@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Mon - Sun: 24/H</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-6
          flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center">
            © 2026 GoDrive. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-orange-500 transition">
              Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition">
              Terms of Service</a>
            <a href="#" className="hover:text-orange-500 transition">
              Support</a>
          </div>
        </div>

      </div>
    </footer>
  );
}