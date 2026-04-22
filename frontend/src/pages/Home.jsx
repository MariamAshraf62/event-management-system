import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <span className="inline-block text-6xl mb-4">🎉</span>
            <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Welcome to <span className="text-purple-600">EventHub</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover amazing events, connect with people, and create unforgettable memories together! ✨
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/events"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              🌟 Explore Events
            </Link>
            <Link
              to="/create-event"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-purple-200"
            >
              🎨 Create Event
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why You'll Love Us 💕
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-pink-100">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Safe</h3>
              <p className="text-gray-600">Your data is protected with top-notch security measures.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-blue-100">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Management</h3>
              <p className="text-gray-600">Manage event capacity and registrations effortlessly.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-green-100">
              <div className="text-4xl mb-4">🏷️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Categories</h3>
              <p className="text-gray-600">Find events by categories that match your interests.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-yellow-100">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Simple Browsing</h3>
              <p className="text-gray-600">Browse through events with our easy pagination system.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-purple-100">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Experience smooth and fast performance everywhere.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-pink-100">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Made with Love</h3>
              <p className="text-gray-600">Designed with care to make event planning enjoyable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
        <div className="mx-auto max-w-4xl text-center text-white">
          <div className="mb-8">
            <span className="text-5xl mb-4 block">🚀</span>
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join our community of event lovers and create amazing experiences together!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              🌈 Join Now - It's Free!
            </Link>
            <Link
              to="/login"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-200"
            >
              👋 Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;