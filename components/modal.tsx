interface Props {
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children }) => {
  return (
    <div className="absolute pt-20 right-0 bottom-0 right-0 w-full h-full grid place-items-center bg-gray-200 bg-opacity-50 overflow-scroll px-5">
      <div className="px-8 py-10 w-full md:max-w-screen-sm bg-white rounded-2xl shadow-lg text-center h-auto display-none">
        {children}
      </div>
    </div>
  );
};

export default Modal;
