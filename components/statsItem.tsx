interface Props {
  children: React.ReactNode;
  color: string;
  url: string;
}

const StatsItem: React.FC<Props> = ({ children, color, url }) => {
  return (
    <a href={url}>
      <div
        className={`w-40 py-2 bg-${color}-300 rounded-md mb-4 shadow-md hover:bg-${color}-400`}
      >
        {children}
      </div>
    </a>
  );
};

export default StatsItem;
