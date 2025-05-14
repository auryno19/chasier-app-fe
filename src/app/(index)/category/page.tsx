import { Metadata } from "next";
import HandleAddCategory from "./HandleAddCategory";

export const metadata: Metadata = {
  title: "Category",
};

const Category = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-2xl mb-5">Category Page</p>
      <HandleAddCategory />
    </div>
  );
};

export default Category;
