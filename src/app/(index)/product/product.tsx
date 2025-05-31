"use client";

import Button from "@/components/button";
import Card from "../components/card";
import CardContainer from "../components/cardContainer";
import Image from "next/image";
import apiServiceAxios from "@/service/apiServiceAxios";
import { useEffect, useState } from "react";
import CustomApiError from "@/service/cutomApiError";
import Toast from "@/components/toast";
import FormField from "@/components/formField";
import HandleModalProduct from "./handleModal";
import Paginate from "@/components/paginate";
import { formatCurrency } from "@/service/formatCurrency";

interface Product {
  id?: number;
  name: string;
  category: string;
  stock: number;
  price: number;
}

const ListProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      const { data } = await apiServiceAxios.get<Product[]>(
        "/product/paginate",
        undefined,
        { page: page.toString(), search: search || "" }
      );
      setError("");
      setProducts(data.data.datas as unknown as Product[]);
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
    setEditingProduct(null);
    setIsModalActive(true);
  };
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalActive(true);
  };
  const openDeleteModal = (product: Product) => {
    setEditingProduct(product);
    setIsDeleteModal(true);
    setIsModalActive(true);
  };
  const closeModal = () => {
    setIsModalActive(false);
    setTimeout(() => {
      setIsDeleteModal(false);
      setEditingProduct(null);
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
      <div className="w-full px-4 flex justify-between items-center ">
        <Button
          onClick={openAddModal}
          value={"Add Product"}
          iconStart={<span className="typcn--plus mr-2"></span>}
        />
        <div className="w-1/3">
          <FormField
            id={"search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Product"
          />
        </div>
      </div>
      <HandleModalProduct
        isActive={isModalActive}
        product={editingProduct}
        onClose={closeModal}
        fetchData={() => fetchData(page)}
        isDelete={isDeleteModal}
        setActiveToast={setActiveToast}
        setHeaderToast={setHeaderToast}
        setMessageToast={setMessageToast}
        setStatusToast={setStatusToast}
      />
      {error ? (
        <div className="text-center text-xl font-semibold">{error}</div>
      ) : (
        <div className="flex flex-wrap">
          {products &&
            products.map((product, index) => (
              <CardContainer key={index}>
                <Card>
                  <div className="2-full h-full flex">
                    <div className="w-1/3 flex items-center justify-center">
                      <Image
                        src="/default.png"
                        alt="Product image"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="w-2/3  px-3 py-2 flex flex-col justify-between">
                      <div>
                        <p className="text-lg font-semibold">{product.name}</p>
                        <p className="text-sm font-light">{product.category}</p>
                        <p className="mt-3 font-semibold">
                          {formatCurrency(product.price)}
                        </p>
                        <p className="text-sm">Stock : {product.stock} pcs</p>
                      </div>
                      <div className="flex justify-around">
                        <Button
                          onClick={() => openEditModal(product)}
                          value={"Edit"}
                          type="warning"
                          size="sm"
                          iconStart={
                            <span className="tabler--edit mr-2"></span>
                          }
                        />
                        <Button
                          onClick={() => openDeleteModal(product)}
                          value={"Delete"}
                          type="danger"
                          size="sm"
                          iconStart={
                            <span className="mynaui--delete-solid mr-2"></span>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </CardContainer>
            ))}
        </div>
      )}
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

export default ListProduct;
