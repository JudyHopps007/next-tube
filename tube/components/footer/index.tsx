import { useState } from 'react';
import dynamic from 'next/dynamic';

type FooterProps = {};

const Modal = dynamic(() => import('components/feedback/Feedback'));

const Footer = (props: FooterProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <footer className="py-4 text-center border-t border-primary/10">
      <div className="mb-2 text-sm max-w-5xl mx-auto text-alternative brightness-90">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        voluptates magni eveniet velit cum vero nobis soluta ipsa{' '}
        <button
          className="text-color brightness-125 hover:brightness-150"
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          feedback
        </button>
      </div>
      <span className="text-alternative text-sm font-semibold">
        NextTube Copyright 2022
      </span>
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
