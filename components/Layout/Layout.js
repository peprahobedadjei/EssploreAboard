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
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-white border-opacity-30 rounded-full animate-spin border-t-white mx-auto mb-4"></div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 animate-pulse">EssploreAboard</h1>
            <p className="text-blue-200 animate-pulse">Loading...</p>
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