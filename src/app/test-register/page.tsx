"use client";
import { useState } from "react";

export default function TestRegister() {
  const [result, setResult] = useState("");

  const testAPI = async () => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
          firstName: "Test",
          lastName: "User"
        }),
      });
      
      const text = await res.text();
      setResult(`Status: ${res.status}\n\nResponse: ${text}`);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Test Register API</h1>
      <button 
        onClick={testAPI}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test API
      </button>
      <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
        {result}
      </pre>
    </div>
  );
}