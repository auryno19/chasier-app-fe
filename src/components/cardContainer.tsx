interface CardContainerProps {
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return (
    <div className="xl:w-1/3 md:w-1/2 w-full md:h-56 h-56 ">{children}</div>
  );
};

export default CardContainer;
