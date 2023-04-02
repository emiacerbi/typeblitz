import UserInput from '@/components/UserInput';
import { WORDS } from '@/constants';
import { shuffledArray } from '@/utils/shuffleArray';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

export default function Home({
  arrayOfWords,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Type Blitz</title>
        <meta name="description" content="Type racing game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid min-h-screen place-content-center bg-neutral-900 text-neutral-100">
        <UserInput arrayOfWords={arrayOfWords} />
      </main>
    </>
  );
}

export const getStaticProps = () => {
  const rawParagraph = shuffledArray(WORDS);
  const arrayOfWords = rawParagraph.slice(0, 20).join(' ').split('');

  return {
    props: { arrayOfWords },
  };
};
