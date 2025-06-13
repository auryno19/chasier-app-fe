"use client";

import { useToast } from "@/app/context/toastContext";
import Button from "@/components/button";
import FormField from "@/components/formField";
import Modal from "@/components/modal";
import ModalBody from "@/components/modalBody";
import ModalFooter from "@/components/modalFooter";
import apiServiceAxios from "@/service/apiServiceAxios";
import CustomApiError from "@/service/cutomApiError";
import { useEffect, useState } from "react";

interface Category {
  id?: number;
  name: string;
}

interface HandleModalCategoryProps {
  isActive: boolean;
  category: Category | null;
  isDelete: boolean;
  fetchData: () => void;
  onClose: () => void;
}
const HandleModalCategory: React.FC<HandleModalCategoryProps> = ({
  isActive,
  category,
  fetchData,
  onClose,
  isDelete,
}) => {
  const toast = useToast();
  const [name, setName] = useState<string>(category?.name || "");
  const [errorName, setErrorName] = useState<string>("");

  useEffect(() => {
    setName(category?.name || "");
  }, [category]);

  const clearData = () => {
    setName("");
    setErrorName("");
  };
  const submitData = async () => {
    try {
      const body = {
        name: name,
      };

      if (isDelete) {
        await apiServiceAxios.put(`/category/delete/${category?.id}`);
        toast.showToast(
          "success",
          "Category Deleted",
          `Category "${name}" has been deleted successfully.`
        );
      } else if (category?.id) {
        await apiServiceAxios.put(`/category/${category.id}`, body);
        toast.showToast(
          "success",
          "Category Edited",
          `Category "${name}" has been edited successfully.`
        );
      } else {
        await apiServiceAxios.post("/category/add", body);
        toast.showToast(
          "success",
          "Category Added",
          `Category "${name}" has been added successfully.`
        );
      }
      onClose();
      fetchData();
      clearData();
      // setTimeout(() => {

      // }, 300);
    } catch (error) {
      if (error instanceof CustomApiError) {
        if (error.status === 409) {
          setErrorName(error.errors?.name || "");
        } else {
          setErrorName(error.message);
        }
      } else {
        setErrorName("An unexpected error occurred");
      }
    }
  };
  return (
    <Modal
      active={isActive}
      handleModal={() => {
        onClose();
        clearData();
      }}
      title={category ? "Edit Category" : "Add Category"}
    >
      <ModalBody>
        {isDelete ? (
          <div className="w-full flex justify-center items-center mt-10 px-5 text-center">
            <p className="text-2xl">
              Are you sure want to <br></br> delete &quot;{category?.name}&quot;
              Category?
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              console.log("cek cek");
              e.preventDefault();
              submitData();
              clearData();
            }}
          >
            <div className="mt-4">
              <FormField
                id={"name"}
                label={"Category Name"}
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setErrorName("")}
                error={errorName}
              />
            </div>
          </form>
        )}
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-end gap-2">
          {isDelete && (
            <Button
              onClick={() => {
                onClose();
                clearData();
              }}
              value={"Cancel"}
              type={"secondary"}
            />
          )}

          <Button
            onClick={(e) => {
              e.preventDefault();
              submitData();
              clearData();
            }}
            value={isDelete ? "Delete" : category ? "Update Changes" : "Save"}
            type={isDelete ? "danger" : "primary"}
          />
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default HandleModalCategory;
