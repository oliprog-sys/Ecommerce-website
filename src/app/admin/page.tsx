// src/app/admin/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to login
  if (!session) {
    redirect("/login");
  }

  // If logged in but not admin, show access denied
  if (session.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You need administrator privileges to access this page.</p>
          <a 
            href="/account" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Account
          </a>
        </div>
      </div>
    );
  }

  // If admin, show admin dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Admin Information</h2>
                  <p className="mt-2"><strong>Email:</strong> {session.user?.email}</p>
                  <p><strong>Role:</strong> {session.user?.role}</p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium">Admin Actions</h3>
                  <ul className="mt-2 list-disc list-inside">
                    <li>Manage Users</li>
                    <li>Manage Products</li>
                    <li>View Orders</li>
                    <li>Site Settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 