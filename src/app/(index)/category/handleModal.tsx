"use client";

import Button from "@/components/button";
import FormField from "@/components/formField";
import Modal from "@/components/modal";
import ModalBody from "@/components/modalBody";
import ModalFooter from "@/components/modalFooter";
import apiService from "@/service/apiService";
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

interface errorFetch {
  message?: string;
  error?: string;
  status?: number;
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

  const submitData = async () => {
    try {
      const body = {
        name: name,
      };
      let response;
      if (isDelete) {
        response = await apiService.put(
          `/category/delete/${category?.id}`,
          null
        );
      } else {
        if (category?.name != null) {
          response = await apiService.put(`/category/${category.id}`, body);
        } else {
          response = await apiService.post("/category/add", body);
        }
      }
      if (response?.status === 200 || response?.status === 201) {
        onClose();
        fetchData();
      }
    } catch (error) {
      if ((error as errorFetch).status === 409) {
        const errors = (error as errorFetch).error as { name?: string };
        setErrorName(errors?.name || "");
      }
    }
  };
  return (
    <Modal
      active={isActive}
      handleModal={onClose}
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
              onClick={onClose}
              value={"Cancel"}
              type={"secondary"}
            />
          )}

          <Button
            loading={false}
            onClick={submitData}
            value={isDelete ? "Delete" : category ? "Update Changes" : "Save"}
            type={isDelete ? "danger" : "primary"}
          />
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default HandleModalCategory;
