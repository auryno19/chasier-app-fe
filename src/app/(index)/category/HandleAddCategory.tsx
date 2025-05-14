"use client";

import Button from "@/components/button";
import FormField from "@/components/formField";
import Modal from "@/components/modal";
import ModalBody from "@/components/modalBody";
import ModalFooter from "@/components/modalFooter";
import apiService from "@/service/apiService";
import { useState } from "react";

const HandleAddCategory: React.FC = () => {
  const [modalIsActive, setModalIsActive] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");

  interface errorFetch {
    message?: string;
    error?: string;
    status?: number;
  }

  const handleModal = () => {
    setModalTitle("Add Category");
    setName("");
    setErrorName("");
    setModalIsActive(!modalIsActive);
  };

  const saveData = async () => {
    try {
      const body = {
        name: name,
      };
      const response = await apiService.post("/category/add", body);
      const statusCode = response.status;
      if (statusCode === 201 || statusCode === 200) {
        handleModal();
      }
    } catch (error) {
      if ((error as errorFetch).status === 409) {
        const errors = (error as errorFetch).error as { name?: string };
        setErrorName(errors?.name || "");
      }
    }
  };

  return (
    <>
      <Modal
        active={modalIsActive}
        handleModal={handleModal}
        title={modalTitle}
      >
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveData();
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
        </ModalBody>
        <ModalFooter>
          <Button
            loading={false}
            onClick={saveData}
            value={"Save"}
            type={"primary"}
          />
        </ModalFooter>
      </Modal>
      <div className="w-full pl-10">
        <Button
          loading={false}
          onClick={handleModal}
          value={"Add Category"}
          iconStart={<span className="typcn--plus mr-2"></span>}
        />
      </div>
    </>
  );
};

export default HandleAddCategory;
