"use client";

import Button from "@/components/button";
import apiService from "@/service/apiService";
import { useEffect, useState } from "react";
import HandleModalCategory from "./handleModal";
interface Category {
  id: number;
  name: string;
}
const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | null>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

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

  const openAddModal = () => {
    setEditingCategory(null);
    setIsModalActive(true);
  };
  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalActive(true);
  };
  const openDeleteModal = (category: Category) => {
    setEditingCategory(category);
    setIsDeleteModal(true);
    setIsModalActive(true);
  };
  const closeModal = () => {
    setIsModalActive(false);
    setTimeout(() => {
      setIsDeleteModal(false);
      setEditingCategory(null);
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full pl-10">
        <Button
          loading={false}
          onClick={openAddModal}
          value={"Add Category"}
          iconStart={<span className="typcn--plus mr-2"></span>}
        />
      </div>

      <HandleModalCategory
        isActive={isModalActive}
        category={editingCategory}
        onClose={closeModal}
        fetchData={fetchData}
        isDelete={isDeleteModal}
      />
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
                      onClick={() => openEditModal(category)}
                      value={"Edit"}
                      type="warning"
                      size="sm"
                      iconStart={
                        <span className="mynaui--delete-solid mr-2"></span>
                      }
                    />
                    <Button
                      loading={false}
                      onClick={() => openDeleteModal(category)}
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
