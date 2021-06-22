interface Props {
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children }) => {
  return (
    <div className="fixed pt-20 right-0 bottom-0 right-0 w-full h-full grid place-items-center bg-black bg-opacity-30 overflow-scroll px-5 z-10">
      <div className="px-8 py-10 w-full md:max-w-screen-sm bg-white rounded-2xl shadow-lg text-center h-auto display-none">
        {children}
      </div>
    </div>
  );
};

export default Modal;
