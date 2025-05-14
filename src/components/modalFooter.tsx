interface ModalFooterProps {
  children?: React.ReactNode;
}
const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return (
    <div className="py-3 px-6 border-t-2 border-slate-300 flex justify-end">
      {children}
    </div>
  );
};

export default ModalFooter;
