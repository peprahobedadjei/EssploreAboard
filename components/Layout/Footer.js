import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              EssploreAboard
            </h3>
            <p className="text-gray-400">
              Your trusted partner for international education and study abroad success.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/#home" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services/university-selection" className="hover:text-white transition-colors">University Selection</Link></li>
              <li><Link href="/services/visa-guidance" className="hover:text-white transition-colors">Visa Assistance</Link></li>
              <li><Link href="/services/test-preparation" className="hover:text-white transition-colors">Test Preparation</Link></li>
              <li><Link href="/services/scholarship-support" className="hover:text-white transition-colors">Scholarship Guidance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>info@essploreaboard.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Education Street</li>
              <li>Learning City, LC 12345</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 EssploreAboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}