import React from "react";
import { useSelector } from "react-redux";
import { translations } from "../utils/lang/translations";

const Info = () => {
  const selectedLanguage = useSelector((state) => state.language);
  return (
    <div className="info_container">
      <h2>{translations[selectedLanguage].credits}</h2>
      <p className="info_item">Images by jcomp on Freepik</p>
      <p className="info_item">Images by topntp26 on Freepik</p>
      <p className="info_item">Images by pch.vector on Freepik</p>
      <p className="info_item">Images by mrsiraphol on Freepik</p>
      <p className="info_item">Images by Vectonauta on Freepik</p>
      <p className="info_item">Images by artbutenkov on Freepik</p>
      <p className="info_item">Images by Racool_studio on Freepik</p>
      <p className="info_item">Images by ededchechine on Freepik</p>
      <p className="info_item">Images by chandlervid85 on Freepik</p>
      <p className="info_item">Images by azerbaijan_stockers on Freepik</p>
      <p className="info_item">Images by asier_relampagoestudio on Freepik</p>
    </div>
  );
};

export default Info;
