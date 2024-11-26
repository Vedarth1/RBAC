import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-6 max-w-6xl mx-auto px-4">
        <div className="flex items-center space-x-2">
          <span className="text-pink-600 text-2xl font-bold">R-BAC</span>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/signup" className="text-pink-600 hover:bg-pink-100 px-4 py-2 rounded-md">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-pink-600 hover:bg-pink-100 px-4 py-2 rounded-md">
              Login
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center mt-12 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Role-Based Access Control</h1>
        <p className="text-lg text-gray-600 mb-8">
          💰 Implementation of secure authentication mechanisms (password hashing, JWT).
          <br />
          💰 Implementation of authorization (ensuring that users only access resources they are authorized to).
          <br />
          💰 Effectiveness and flexibility of your RBAC system in managing user roles and permissions.
        </p>
        <Link
          to="/login"
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-md"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
}

export default App;
