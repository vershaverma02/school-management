"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: string;
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch schools");
        return res.json();
      })
      .then((data) => setSchools(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load schools.");
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        School Directory
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-4 border border-gray-200"
          >
            {/* Image */}
            <div className="w-full h-48 overflow-hidden rounded-lg">
              <Image
                src={school.image}
                alt={school.name}
                width={400}
                height={300}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            {/* Content */}
            <h2 className="text-xl font-bold mt-4 text-gray-800">
              {school.name}
            </h2>

            <p className="text-gray-600 text-sm mt-1">
              📍 {school.address}, {school.city}, {school.state}
            </p>

            <p className="text-gray-700 text-sm mt-2">
              <span className="font-semibold">Contact:</span> {school.contact}
            </p>

            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Email:</span> {school.email_id}
            </p>

            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
