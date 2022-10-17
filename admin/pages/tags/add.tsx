import AddTagsSection from 'components/content/AddTagsSection';
import PanelHeadline from '@ui/Headline';
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { redirectUser } from 'utils/auth';

type Props = {};

const AddTags: NextPage<Props> = ({}) => {
  return (
    <>
      <PanelHeadline text="Add Tags" />
      <AddTagsSection />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { needRedirect, loginPath } = redirectUser(session);
  if (needRedirect) return loginPath;

  return {
    props: {},
  };
};

export default AddTags;
