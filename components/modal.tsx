interface Props {
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children }) => {
  return (
    <div className="fixed inset-0 w-full h-full grid place-items-center bg-gray-200 bg-opacity-50">
      <div className="px-8 py-10 w-full md:max-w-screen-sm bg-white rounded-2xl shadow-lg text-center h-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
