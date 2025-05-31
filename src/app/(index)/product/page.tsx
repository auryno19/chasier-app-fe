import { Metadata } from "next";
import ListProduct from "./product";

export const metadata: Metadata = {
  title: "Product",
};

const ProductPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-2xl font-semibold mt-3 mb-2 pl-5">Product Page</p>
      <ListProduct />
    </div>
  );
};

export default ProductPage;
