// src/app/account/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SignOutButton } from "./signOutButton";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Account Information</h2>
                  <p className="mt-2"><strong>Email:</strong> {session.user?.email}</p>
                  <p><strong>Role:</strong> {session.user?.role}</p>
                  <p><strong>User ID:</strong> {session.user?.id}</p>
                </div>
                
                <div className="border-t pt-4">
                  <SignOutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}