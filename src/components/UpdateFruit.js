import React from "react";
import FruitForm from "./FruitForm";
import { useModalHeight } from "../hooks/useModalHeight";

const UpdateFruit = () => {
  const modalHeight = useModalHeight();
  return (
    <div
      style={{ height: modalHeight }}
      className="update_product product__container mobile_container_shadow"
    >
      <FruitForm />
    </div>
  );
};

export default UpdateFruit;
