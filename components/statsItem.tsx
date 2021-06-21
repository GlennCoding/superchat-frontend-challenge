interface Props {
  children: React.ReactNode;
  color: string;
}

const StatsItem: React.FC<Props> = ({ children, color }) => {
  return (
    <div className={`w-40 py-2 bg-${color}-300 rounded-md mb-4 shadow-md`}>
      {children}
    </div>
  );
};

export default StatsItem;
