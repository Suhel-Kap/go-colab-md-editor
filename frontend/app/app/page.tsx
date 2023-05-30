import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>App Page</title>
      </Head>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1>Page</h1>
          <p>This is the page</p>
        </div>
      </main>
    </>
  );
}
