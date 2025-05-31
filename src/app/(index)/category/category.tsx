"use client";

import Button from "@/components/button";
import { useEffect, useState } from "react";
import HandleModalCategory from "./handleModal";
import apiServiceAxios from "@/service/apiServiceAxios";
import Paginate from "@/components/paginate";
import CustomApiError from "@/service/cutomApiError";
import Toast from "@/components/toast";
import FormField from "@/components/formField";
interface Category {
  id: number;
  name: string;
}
const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | null>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [statusToast, setStatusToast] = useState<
    "error" | "success" | "warning"
  >("success");
  const [headerToast, setHeaderToast] = useState("");
  const [messageToast, setMessageToast] = useState("");
  const [activeToast, setActiveToast] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = async (page: number) => {
    try {
      const { data } = await apiServiceAxios.get<Category[]>(
        "/category/paginate",
        undefined,
        { page: page.toString(), search: search || "" }
      );
      setError("");
      setCategories(data.data.datas as unknown as Category[]);
      setTotalPage(data.data.total_pages || 1);
      setPage(data.data.page || 1);
      setPerPage(data.data.per_page || 5);
    } catch (error) {
      if (error instanceof CustomApiError) {
        if (error.status === 404) {
          if (page > 1) {
            fetchData(page - 1);
          } else {
            setError(error.message || "Data not found");
          }
        }
      }
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
    fetchData(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  return (
    <>
      <Toast
        status={statusToast}
        header={headerToast}
        message={messageToast}
        active={activeToast}
      />

      <div className="w-full pl-5 flex justify-between items-center ">
        <Button
          loading={false}
          onClick={openAddModal}
          value={"Add Category"}
          iconStart={<span className="typcn--plus mr-2"></span>}
        />
        <div className="w-1/3">
          <FormField
            id={"search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Category"
          />
        </div>
      </div>
      <HandleModalCategory
        isActive={isModalActive}
        category={editingCategory}
        onClose={closeModal}
        fetchData={() => fetchData(page)}
        isDelete={isDeleteModal}
        setActiveToast={setActiveToast}
        setHeaderToast={setHeaderToast}
        setMessageToast={setMessageToast}
        setStatusToast={setStatusToast}
      />
      <div className="p-5">
        {error != "" ? (
          <div className="text-center text-xl font-semibold">{error}</div>
        ) : (
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
                    <td>{(page - 1) * perPage + index + 1}</td>
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
        )}
      </div>
      {!error && (
        <Paginate
          page={page}
          totalPage={totalPage}
          onPageChange={(pages) => fetchData(pages)}
        />
      )}
    </>
  );
};

export default Category;
