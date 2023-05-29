import Link from "next/link";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form>
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
            />
          </div>
          <div className="flex items-center justify-center p-2">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-center p-5 w-full">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
              Login
            </button>
          </div>
        </div>
      </form>

      <p>
        Don't have an account? <Link href="/register" className="underline text-red-400">Register</Link>
      </p>
    </main>
  );
}
