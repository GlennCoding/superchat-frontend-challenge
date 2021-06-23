interface Props {
  color: string;
  url: string;
}

const StatsItem: React.FC<Props> = ({ children, color, url }) => {
  return (
    <div className="mb-4 mx-8 sm:mx-0">
      <a href={url} className="flex justify-center">
        <div
          className={`w-full max-w-60 sm:w-40 py-2 bg-${color}-300 rounded-md shadow-md hover:bg-${color}-400`}
        >
          {children}
        </div>
      </a>
    </div>
  );
};

export default StatsItem;
