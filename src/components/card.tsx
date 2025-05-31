interface CardProps {
  children: React.ReactNode;
  id?: string;
}

const Card: React.FC<CardProps> = ({ children, id }) => {
  return (
    <div id={id} className="px-4 py-4 w-full h-full">
      <div className="bg-slate-200 h-full w-full rounded-lg shadow-slate-400 shadow-lg px-4 py-2">
        {children}
      </div>
    </div>
  );
};

export default Card;
