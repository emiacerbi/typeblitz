import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Type Blitz</title>
        <meta name="description" content="Type racing game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-red-200">Tailwind Setup</h1>
      </main>
    </>
  );
}
