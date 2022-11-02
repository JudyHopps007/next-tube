import { XIcon } from '@heroicons/react/outline';
import useOutsideDetection from 'hooks/useOutsideDetection';
import React, { FC, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  isShowing: boolean;
  title: string;
  data?: any;
  onClose: () => void;
};

const Modal: FC<Props> = ({ isShowing, children, title, onClose }) => {
  const modalRef = useRef(null);
  useOutsideDetection(modalRef, onClose);
  return (
    <>
      {isShowing ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 mx-2 md:mx-0">
            <div
              className="relative max-w-lg md:max-w-xl lg:max-w-3xl mx-auto bg-background text-alternative shadow-lg border-2 border-primary/10 rounded-lg w-full"
              ref={modalRef}
            >
              <div className="absolute right-2 top-3" onClick={onClose}>
                <XIcon className="w-5 h-5 hover:text-alternative cursor-pointer" />
              </div>
              <div className="p-4 text-xl md:text-2xl font-semibold border-b border-primary/10  my-1 py-1">
                {title}
              </div>
              <div className="p-4 relative flex-auto">{children}</div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
