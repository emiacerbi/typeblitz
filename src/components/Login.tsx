/* eslint-disable @typescript-eslint/no-misused-promises */
import { signIn } from 'next-auth/react';
import React from 'react';

const Login = () => {
  return (
    <div>
      <button onClick={() => signIn('discord')}>Sign in</button>
    </div>
  );
};

export default Login;
