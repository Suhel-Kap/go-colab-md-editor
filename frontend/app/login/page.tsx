"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const json = await res.json();
      console.log(json);
      console.log(res.body);
      setForm({
        email: "",
        password: "",
      });
      router.push("/app");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center p-5">
          <h1 className="text-2xl text-red-400 font-semibold font-sans">
            Login
          </h1>
          <div className="flex items-center justify-center p-2">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
            />
          </div>
          <div className="flex items-center justify-center p-2">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
          </div>
          {error && (
            <div className="flex items-center justify-center p-2">
              <p className="text-red-400">{error}</p>
            </div>
          )}
          <div className="flex items-center justify-center p-5 w-full">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
              Login
            </button>
          </div>
        </div>
      </form>

      <p>
        Don't have an account?{" "}
        <Link href="/register" className="underline text-red-400">
          Register
        </Link>
      </p>
    </main>
  );
}
