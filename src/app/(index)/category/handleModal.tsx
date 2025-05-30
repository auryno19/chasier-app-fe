"use client";

import Button from "@/components/button";
import FormField from "@/components/formField";
import Modal from "@/components/modal";
import ModalBody from "@/components/modalBody";
import ModalFooter from "@/components/modalFooter";
// import apiService from "@/service/apiService";
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
      } else if (category?.id) {
        await apiServiceAxios.put(`/category/${category.id}`, body);
      } else {
        await apiServiceAxios.post("/category/add", body);
      }

      onClose();
      fetchData();
    } catch (error) {
      if (error instanceof CustomApiError) {
        if (error.status === 409) {
          // Handle conflict error (e.g., duplicate category name)
          setErrorName(error.errors?.name || "Category name already exists");
        } else if (error.status === 400) {
          // Handle validation errors
          setErrorName(error.errors?.name || "Invalid category name");
        } else {
          // Generic error message
          setErrorName(error.message);
        }
      } else {
        // Non-API errors (network, etc.)
        setErrorName("An unexpected error occurred");
        console.error("Submission error:", error);
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
              loading={false}
              onClick={() => {
                onClose();
                clearData();
              }}
              value={"Cancel"}
              type={"secondary"}
            />
          )}

          <Button
            loading={false}
            onClick={() => {
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
