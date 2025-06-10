import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center px-4">
      {/* Error Code */}
      <h1 className="text-8xl md:text-9xl font-bold text-blue-400 animate-pulse">404</h1>

      {/* Error Message */}
      <h2 className="text-3xl md:text-4xl font-semibold text-white mt-4 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-gray-400 text-center max-w-md mb-8">
        It looks like you’ve wandered off the project board. Let’s get you back to managing your tasks!
      </p>

      {/* Call-to-Action Button */}
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Back to Home
      </Link>

      {/* Decorative Element */}
      <div className="mt-12 flex space-x-4">
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-200"></div>
      </div>

      {/* Footer Links */}
      <div className="mt-16 text-gray-400 text-sm">
        <p>Need help? <Link to="/help" className="text-blue-400 hover:underline">Visit our Help Center</Link></p>
        <p className="mt-2">
          <Link to="/dashboard" className="text-blue-400 hover:underline">Go to Dashboard</Link> |{' '}
          <Link to="/kanban" className="text-blue-400 hover:underline">View Kanban Board</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;