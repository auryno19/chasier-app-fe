"use client";

import Button from "@/components/button";
import FormField from "@/components/formField";
import FormSelect from "@/components/formSelect";
import Modal from "@/components/modal";
import ModalBody from "@/components/modalBody";
import ModalFooter from "@/components/modalFooter";
import apiServiceAxios from "@/service/apiServiceAxios";
import CustomApiError from "@/service/cutomApiError";
import { formatCurrency } from "@/service/formatCurrency";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

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
  const [optionsCategory, setOptionsCategory] = useState<
    { value: string; label: string }[]
  >([]);
  const [errorCategory, setErrorCategory] = useState<string>("");
  const [errorStock, setErrorStock] = useState<string>("");
  const [errorPrice, setErrorPrice] = useState<string>("");

  useEffect(() => {
    // console.log("Product:", product);
    // console.log("Initial Category ID:", product?.category);
    setName(product?.name || "");
    setCategory(product?.category || "");
    setStock(product?.stock || 0);
    setPrice(product?.price || 0);
  }, [product]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await apiServiceAxios.get<Category[]>("/category");
      const datas = data.data.data as unknown as Category[];
      const options = datas.map((category) => ({
        value: category.name,
        label: category.name,
      }));
      setOptionsCategory(options);
    } catch (error) {
      if (error instanceof CustomApiError) {
        if (error.status === 404) {
          setErrorCategory("No categories found");
        }
      }
    }
  };
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
          setErrorName(error.errors?.name || "cek");
          setErrorCategory(error.errors?.category || "");
          setErrorStock(error.errors?.stock || "");
          setErrorPrice(error.errors?.price || "");
          console.log(error.errors?.name);
          console.log(error.errors?.category);
          console.log(errorName);
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
      <form>
        <ModalBody long={true}>
          {isDelete ? (
            <div className="w-full flex justify-center items-center mt-10 px-5 text-center">
              <p className="text-2xl">
                Are you sure want to <br></br> delete &quot;{product?.name}
                &quot; Product?
              </p>
            </div>
          ) : (
            <div className="mt-3">
              <FormField
                id={"name"}
                label={"Product Name"}
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setErrorName("")}
                error={errorName}
              />
              <FormSelect
                id={"category"}
                label={"Category"}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onFocus={() => setErrorCategory("")}
                error={errorCategory}
                options={optionsCategory}
              />
              <FormField
                id={"price"}
                label={"Price"}
                type={"text"}
                value={price == 0 ? "" : formatCurrency(price)}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                  setPrice(Number(onlyNumbers));
                }}
                onFocus={() => setErrorPrice("")}
                error={errorPrice}
              />
              <FormField
                id={"stock"}
                label={"Stock"}
                type={"text"}
                value={stock == 0 ? "" : stock.toString()}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                  setStock(Number(onlyNumbers));
                }}
                onFocus={() => setErrorStock("")}
                error={errorStock}
              />
            </div>
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
              value={isDelete ? "Delete" : product ? "Update Changes" : "Save"}
              type={isDelete ? "danger" : "primary"}
              submit={true}
            />
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default HandleModalProduct;
