interface ModalBodyProps {
  children?: React.ReactNode;
  long?: boolean;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, long = false }) => {
  return (
    <div
      className={`w-full ${
        long ? "h-[400px] " : "h-[186px] "
      } px-4 py-2 overflow-y-auto`}
    >
      {children}
    </div>
  );
};

export default ModalBody;
