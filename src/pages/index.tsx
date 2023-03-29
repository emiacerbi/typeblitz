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
      <main className="grid min-h-screen place-content-center bg-neutral-900 text-neutral-100">
        <UserInput />
      </main>
    </>
  );
}
