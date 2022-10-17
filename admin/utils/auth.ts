import type { Session } from 'next-auth';

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
