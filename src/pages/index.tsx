import Header from '@/components/Header';
import UserInput from '@/components/UserInput';
import { WORDS } from '@/constants';
import { Session } from '@/types';
import { shuffledArray } from '@/utils/shuffleArray';
import { PrismaClient } from '@prisma/client';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

export default function Home({
  arrayOfWords,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Type Blitz</title>
        <meta name="description" content="Type racing game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header user={user} />

        <main className="grid flex-1 place-content-center bg-neutral-900 text-neutral-100">
          <UserInput user={user} arrayOfWords={arrayOfWords} />
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const rawParagraph = shuffledArray(WORDS);
  const arrayOfWords = rawParagraph.slice(0, 40).join(' ').split('');
  const session = (await getSession(context)) as Session;

  let user;

  try {
    const prisma = new PrismaClient();
    user = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    await prisma.$disconnect();

    return {
      props: { arrayOfWords, user },
    };
  } catch (error) {
    user = null;
    return {
      props: { arrayOfWords, user },
    };
  }
};
