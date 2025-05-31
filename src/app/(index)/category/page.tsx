import { Metadata } from "next";
import ListCategory from "./category";

export const metadata: Metadata = {
  title: "Category",
};

const CategoryPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-2xl font-semibold mt-3 mb-2 pl-5">Category Page</p>

      <ListCategory />
    </div>
  );
};

export default CategoryPage;
