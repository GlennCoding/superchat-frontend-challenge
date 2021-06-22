interface Props {
  color: string;
}

const BackgroundColor: React.FC<Props> = ({color}) => {
    return (
      <div
        className={`fixed bg-${color}-500 -z-10 inset-0 w-full h-full transition-colors duration-300`}
      ></div>
    );
}

export default BackgroundColor