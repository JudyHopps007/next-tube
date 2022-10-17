/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Spinner from '@ui/Spinner';
import TextInput from '@ui/TextInput';
import Headline from '@ui/Headline';
import { signIn } from 'next-auth/react';

type Props = {};

const LoginPage: FC<Props> = ({}) => {
  const router = useRouter();
  const [checkSession, setCheckSession] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push('/');
      } else {
        setCheckSession(false);
      }
    });
  }, []);

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      name: username,
      password,
    });
    if (!res?.ok) {
      setError(true);
    } else {
      setError(false);
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col max-w-sm space-y-2 mx-auto bg-slate-800 p-5 rounded-md text-gray-100 shadow-lg border-b-4 border-b-indigo-900">
      {!checkSession ? (
        <>
          <Headline text="Login" />
          <TextInput
            label="Username"
            value={username}
            handleChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextInput
            label="Password"
            value={password}
            inputType="password"
            handleChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pb-2"></div>
          <button
            onClick={handleLogin}
            className="p-2 rounded-md shadow-lg md:w-full bg-indigo-600 hover:bg-indigo-500"
          >
            Login
          </button>

          {error && (
            <div className="text-center text-red-400">
              Wrong username or password entered!
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default LoginPage;
