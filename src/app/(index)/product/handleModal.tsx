"use client";

import Button from "@/components/button";
import FormField from "@/components/formField";
import Modal from "@/components/modal";
import ModalBody from "@/components/modalBody";
import ModalFooter from "@/components/modalFooter";
import apiServiceAxios from "@/service/apiServiceAxios";
import CustomApiError from "@/service/cutomApiError";
import { useEffect, useState } from "react";

interface Product {
  id?: number;
  name: string;
  category: string;
  stock: number;
  price: number;
}

interface HandleModalProductProps {
  isActive: boolean;
  product: Product | null;
  isDelete: boolean;
  fetchData: () => void;
  onClose: () => void;
  setStatusToast?: React.Dispatch<
    React.SetStateAction<"error" | "success" | "warning">
  >;
  setHeaderToast?: React.Dispatch<React.SetStateAction<string>>;
  setMessageToast?: React.Dispatch<React.SetStateAction<string>>;
  setActiveToast?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HandleModalProduct: React.FC<HandleModalProductProps> = ({
  isActive,
  product,
  fetchData,
  onClose,
  isDelete,
  setActiveToast,
  setHeaderToast,
  setMessageToast,
  setStatusToast,
}) => {
  const [name, setName] = useState<string>(product?.name || "");
  const [category, setCategory] = useState<string>(product?.category || "");
  const [stock, setStock] = useState<number>(product?.stock || 0);
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [errorName, setErrorName] = useState<string>("");
  const [errorCategory, setErrorCategory] = useState<string>("");
  const [errorStock, setErrorStock] = useState<string>("");
  const [errorPrice, setErrorPrice] = useState<string>("");

  useEffect(() => {
    console.log("Product:", product);
    console.log("Initial Category ID:", product?.category);
    setName(product?.name || "");
    setCategory(product?.category || "");
    setStock(product?.stock || 0);
    setPrice(product?.price || 0);
  }, [product]);

  const clearData = () => {
    setName("");
    setCategory("");
    setStock(0);
    setPrice(0);
    setErrorName("");
    setErrorCategory("");
    setErrorStock("");
    setErrorPrice("");
  };
  const submitData = async () => {
    try {
      const body = {
        name: name,
        category: category,
        stock: stock,
        price: price,
      };
      if (isDelete) {
        await apiServiceAxios.put(`/product/delete/${product?.id}`);
        if (setHeaderToast) setHeaderToast("Product Deleted");
        if (setMessageToast)
          setMessageToast(`Product "${name}" has been deleted successfully.`);
      } else if (product?.id) {
        await apiServiceAxios.put(`/product/${product.id}`, body);
        if (setHeaderToast) setHeaderToast("Product Edited");
        if (setMessageToast)
          setMessageToast(`Product "${name}" has been edited successfully.`);
      } else {
        await apiServiceAxios.post("/product/add", body);
        if (setHeaderToast) setHeaderToast("Product Added");
        if (setMessageToast)
          setMessageToast(`Product "${name}" has been added successfully.`);
      }
      if (setStatusToast) setStatusToast("success");
      if (setActiveToast) setActiveToast(true);

      setTimeout(() => {
        onClose();
        fetchData();
        clearData();
      }, 300);
    } catch (error) {
      if (error instanceof CustomApiError) {
        if (error.status === 409) {
          setErrorName(error.errors?.name || "");
          setErrorName(error.errors?.categoryId || "");
          setErrorName(error.errors?.stock || "");
          setErrorName(error.errors?.price || "");
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
      title={product ? "Edit Product" : "Add Product"}
    >
      <ModalBody long={true}>
        {isDelete ? (
          <div className="w-full flex justify-center items-center mt-10 px-5 text-center">
            <p className="text-2xl">
              Are you sure want to <br></br> delete &quot;{product?.name}&quot;
              Product?
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
                label={"Product Name"}
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setErrorName("")}
                error={errorName}
              />
            </div>
            <label className="text-sm text-slate-600">Category</label>
            <div className="relative mt-3">
              <select
                name="cars"
                id="cars"
                className=" w-full bg-slate-300 px-4 py-[0.4rem] focus:outline-none focus:ring-2 focus:ring-sky-600 rounded-md cursor-pointer hover:ring-2 hover:ring-sky-600 appearance-none"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setErrorCategory("");
                  console.log(e.target.value);
                }}
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.2"
                stroke="currentColor"
                className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
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
            onClick={() => {
              submitData();
              clearData();
            }}
            value={isDelete ? "Delete" : product ? "Update Changes" : "Save"}
            type={isDelete ? "danger" : "primary"}
          />
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default HandleModalProduct;
