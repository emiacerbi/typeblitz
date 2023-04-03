import { signIn, signOut } from 'next-auth/react';
import Wrapper from './Wrapper';
import { User } from '@prisma/client';
import { FallBackImage } from './FallBackImage';

type Props = {
  user: User | null;
};

const Header = ({ user }: Props) => {
  const login = () => {
    void signIn('discord');
  };

  const logout = () => {
    void signOut();
  };

  return (
    <header className="bg-neutral-800 p-4 text-neutral-100 ">
      <Wrapper styles="flex items-center">
        <p className="text-primary">Type Blitz</p>
        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <>
              <FallBackImage
                src={user.image as string}
                alt={user.name as string}
                width={25}
                height={25}
              />
              <p>{user.name}</p>

              <button className="p-2 hover:bg-neutral-700" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <p>Guest</p>
              <button className="p-2 hover:bg-neutral-700" onClick={login}>
                Sign in
              </button>
            </>
          )}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
