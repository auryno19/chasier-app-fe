"use client";

import Button from "@/components/button";
import apiService from "@/service/apiService";
import { useEffect, useState } from "react";
import HandleAddCategory from "./HandleAddCategory";
interface Category {
  id: number;
  name: string;
}
const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | null>([]);

  const fetchData = async () => {
    try {
      const response = await apiService.get<{ data: Category[] }>("/category");
      if (response.status === 200) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <HandleAddCategory fetchData={fetchData} />
      <div className="px-5 py-3">
        <table className="w-full text-center">
          <thead>
            <tr className="border-b-2 border-slate-300 ">
              <th className="max-w-4 ">No</th>
              <th className="min-w-72">Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category, index) => (
                <tr className="border-b-2 border-slate-200" key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="flex justify-center gap-2">
                    <Button
                      loading={false}
                      onClick={() => {}}
                      value={"Edit"}
                      type="warning"
                      size="sm"
                      iconStart={
                        <span className="mynaui--delete-solid mr-2"></span>
                      }
                    />
                    <Button
                      loading={false}
                      onClick={() => {}}
                      value={"Delete"}
                      type="danger"
                      size="sm"
                      iconStart={<span className="tabler--edit mr-2"></span>}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;
