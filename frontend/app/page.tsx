import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl text-red-400 font-semibold font-sans">
        Welcome to Collborative Markdown Editor made with Next JS and Golang
      </h1>
      <div className="flex items-center justify-center p-5">
        <Link href="/login">Login | </Link>
        <Link href="/register">&nbsp;Register</Link>
      </div>
    </main>
  );
}
