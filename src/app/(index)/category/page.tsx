import { Metadata } from "next";
import ListCategory from "./category";

export const metadata: Metadata = {
  title: "Category",
};

const CategoryPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-2xl mb-5">Category Page</p>

      <ListCategory />
    </div>
  );
};

export default CategoryPage;
