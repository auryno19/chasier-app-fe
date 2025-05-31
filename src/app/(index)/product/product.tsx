"use client";

import Button from "@/components/button";
import Card from "../components/card";
import CardContainer from "../components/cardContainer";
import Image from "next/image";

const ListProduct: React.FC = () => {
  return (
    <div className="flex flex-wrap">
      <CardContainer>
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
                <p className="text-lg font-semibold">Product Name</p>
                <p className="text-sm font-light">Category</p>
                <p className="mt-3 font-semibold">Rp. 200.000</p>
                <p className="text-sm">Stock : 20 pcs</p>
              </div>
              <div className="flex justify-around">
                <Button
                  onClick={() => {}}
                  value={"Edit"}
                  type="warning"
                  size="sm"
                  iconStart={<span className="tabler--edit mr-2"></span>}
                />
                <Button
                  onClick={() => {}}
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
    </div>
  );
};

export default ListProduct;
