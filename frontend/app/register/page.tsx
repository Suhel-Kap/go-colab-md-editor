"use client";
import Link from "next/link";
import { useRouter} from "next/navigation"
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/register", {
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
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/app");
    } catch (err) {
      console.log(err);
      setError("An error occurred");
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center p-5">
          <h1 className="text-2xl text-red-400 font-semibold font-sans">
            Register
          </h1>

          <div className="flex items-center justify-center p-2">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="text"
              name="username"
              value={form.username}
              placeholder="Enter your username"
              required
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
            />
          </div>
          <div className="flex items-center justify-center p-2">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="email"
              name="email"
              value={form.email}
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
              value={form.password}
              placeholder="Enter your password"
              required
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
          </div>
          <div className="flex items-center justify-center p-2">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="password"
              name="password"
              value={form.confirmPassword}
              placeholder="Confirm your password"
              required
              onChange={(e) => {
                setForm({ ...form, confirmPassword: e.target.value });
              }}
            />
          </div>
          {error && <p className="text-red-400">{error}</p>}
          <div className="flex items-center justify-center p-5 w-full">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
              Register
            </button>
          </div>
        </div>
      </form>
      <p>
        Already have an account?{" "}
        <Link href="/login" className="underline text-red-400">
          Login
        </Link>
      </p>
    </main>
  );
}
