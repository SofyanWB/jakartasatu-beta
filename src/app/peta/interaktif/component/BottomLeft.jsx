import Kordinat from "@/components/peta/interaktif/Kordinat";
import Skala from "@/components/peta/interaktif/Skala";
import React from "react";

const BottomLeft = ({ view }) => {
  return (
    <>
      <Kordinat view={view} />
      <Skala view={view} />
    </>
  );
};

export default BottomLeft;
