import UserInput from '@/components/UserInput';
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
      <main className="min-h-screen bg-neutral-900 text-neutral-100 grid place-content-center">
        <UserInput />
      </main>
    </>
  );
}
