export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-white border-opacity-30 rounded-full animate-spin border-t-white mx-auto mb-4"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-300 rounded-full animate-spin animation-delay-150 mx-auto"></div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 animate-pulse">EssploreAboard</h1>
        <p className="text-blue-200 animate-pulse">Your Journey Begins Here...</p>
      </div>
      
      <style jsx>{`
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
}