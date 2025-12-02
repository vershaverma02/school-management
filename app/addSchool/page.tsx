"use client";
import { useState } from "react";

export default function AddSchool() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Failed to add school");
      } else {
        setMsg("School added successfully!");
        e.target.reset();
      }
    } catch (err) {
      setMsg("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New School
        </h1>

        {msg && (
          <p
            className={`mb-4 text-center font-medium ${
              msg.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">School Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              required
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">City</label>
              <input
                type="text"
                name="city"
                required
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">State</label>
              <input
                type="text"
                name="state"
                required
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Contact No.</label>
            <input
              type="text"
              name="contact"
              required
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email ID</label>
            <input
              type="email"
              name="email_id"
              required
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">School Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="w-full border px-3 py-2 rounded-md bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
          >
            {loading ? "Adding..." : "Add School"}
          </button>
        </form>
      </div>
    </div>
  );
}