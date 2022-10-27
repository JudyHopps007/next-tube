import { useState } from 'react';
import dynamic from 'next/dynamic';

type FooterProps = {};

const Modal = dynamic(() => import('components/feedback/Feedback'));

const Footer = (props: FooterProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <footer className="py-4 text-center border-t border-primary/10">
      <span className="text-md font-semibold">NextTube Copyright 2022</span>
      <button
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        Test Modal
      </button>
      {showModal && (
        <Modal
          showModal={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </footer>
  );
};

export default Footer;
