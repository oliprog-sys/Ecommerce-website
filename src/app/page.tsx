// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to E-Commerce Store
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
              <div className="flex gap-4 justify-center">
                <Link 
                  href="/login"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Login
                </Link>
                <Link 
                  href="/register"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                >
                  Register
                </Link>
                <Link 
                  href="/account"
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
                >
                  Account
                </Link>
                <Link 
                  href="/admin"
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}