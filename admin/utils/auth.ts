import { NextApiRequest } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export const redirectUser = (session: Session | null) => {
  let needRedirect = false;
  const loginPath = {
    redirect: { permanent: true, destination: '/login' },
  };
  if (!session) {
    needRedirect = true;
  }

  return { needRedirect, loginPath };
};

export const hasSession = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  if (session && session?.user?.name === process.env.USERNAME) {
    return true;
  }
  return false;
};
