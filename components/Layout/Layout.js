import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      <Navbar />
      {loading && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="text-center">
            {/* Enhanced Loading Spinner */}
            <div className="relative mb-8">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-gradient-to-r border-t-[#450f8c] mx-auto"></div>
              <div className="w-12 h-12 border-4 border-transparent rounded-full animate-spin border-t-[#f96714] absolute top-2 left-1/2 transform -translate-x-1/2"></div>
            </div>

            {/* Brand Name with Gradient */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#450f8c] to-[#f96714] bg-clip-text text-transparent mb-3 tracking-wide">
              EssploreAboard
            </h1>

            {/* Loading Text with Animation */}
            <div className="flex items-center justify-center space-x-1 text-gray-600">
              <span className="text-lg font-medium">Loading</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-[#450f8c] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-1 bg-[#f96714] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-1 bg-[#450f8c] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>

            {/* Subtle Progress Line */}
            <div className="mt-6 w-48 h-1 bg-gray-100 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-[#450f8c] to-[#f96714] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}