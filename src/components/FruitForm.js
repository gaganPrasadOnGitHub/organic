import React, { useState } from "react";
import useFruitForm from "../hooks/useFruitForm";
import InputField from "./InputField";
import { useSelector } from "react-redux";
import { translations } from "../utils/lang/translations";

const FruitForm = () => {
  const {
    formData,
    errors,
    operationError,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleAddNewFruit,
  } = useFruitForm();
  const selectedLanguage = useSelector((state) => state.language);

  const [loading, setLoading] = useState(false);
  if (!formData) {
    return (
      <div className="loading">
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <div className="update_from__container">
      <form className="update_form" onSubmit={(e) => e.preventDefault()}>
        {formData?.id && (
          <button
            className="add_button hover_underline_button"
            type="button"
            onClick={handleAddNewFruit}
            disabled={loading}
          >
            {translations[selectedLanguage].addNew}
          </button>
        )}
        <div className="form_group">
          <InputField
            label={translations[selectedLanguage].name}
            name="name"
            type="text"
            value={formData?.name}
            onChange={handleInputChange}
            error={errors.name}
            required
          />
          <InputField
            label={translations[selectedLanguage].family}
            name="family"
            type="text"
            value={formData?.family}
            onChange={handleInputChange}
            error={errors.family}
            required
          />
        </div>
        <div className="form_group">
          <InputField
            label={translations[selectedLanguage].order}
            name="order"
            type="text"
            value={formData?.order}
            onChange={handleInputChange}
            error={errors.order}
            required
          />
          <InputField
            label={translations[selectedLanguage].genus}
            name="genus"
            type="text"
            value={formData?.genus}
            onChange={handleInputChange}
            error={errors.genus}
            required
          />
        </div>

        <div className="from-group">
          <legend className="form-item">
            {translations[selectedLanguage].season}
          </legend>
          <div className="form_group checkbox__wrapper">
            <InputField
              label={translations[selectedLanguage].spring}
              name="spring"
              type="checkbox"
              value={formData?.season?.spring}
              onChange={handleInputChange}
            />
            <InputField
              label={translations[selectedLanguage].summer}
              name="summer"
              type="checkbox"
              value={formData?.season?.summer}
              onChange={handleInputChange}
            />
            <InputField
              label={translations[selectedLanguage].autumn}
              name="autumn"
              type="checkbox"
              value={formData?.season?.autumn}
              onChange={handleInputChange}
            />
            <InputField
              label={translations[selectedLanguage].winter}
              name="winter"
              type="checkbox"
              value={formData?.season?.winter}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form_group">
          <InputField
            label={translations[selectedLanguage].description}
            name="description"
            type="textarea"
            value={formData?.description}
            onChange={handleInputChange}
            error={errors.description}
            required
          />
        </div>
        <div className="form_group">
          <InputField
            label={translations[selectedLanguage].imageUrl}
            name="imageUrl"
            type="url"
            value={formData?.imageUrl}
            onChange={handleInputChange}
            error={errors.imageUrl}
            required
          />
        </div>

        <div className="form_group">
          <InputField
            label={translations[selectedLanguage].fat}
            name="fat"
            type="number"
            value={formData?.nutrition?.fat}
            onChange={handleInputChange}
            required
          />
          <InputField
            label={translations[selectedLanguage].sugar}
            name="sugar"
            type="number"
            value={formData?.nutrition?.sugar}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form_group">
          <InputField
            label={translations[selectedLanguage].protein}
            name="protein"
            type="number"
            value={formData?.nutrition?.protein}
            onChange={handleInputChange}
            required
          />
          <InputField
            label={translations[selectedLanguage].calories}
            name="calories"
            type="number"
            value={formData?.nutrition?.calories}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form_group">
          <InputField
            label={translations[selectedLanguage].carbohydrates}
            name="carbohydrates"
            type="number"
            value={formData?.nutrition?.carbohydrates}
            onChange={handleInputChange}
            required
          />

          <div className="flex-1">
            {operationError && (
              <div>
                <small className="error_message">{operationError}</small>
              </div>
            )}
          </div>
        </div>

        <div className="form_group update_form_buttons__container">
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              handleSubmit().finally(() => setLoading(false));
            }}
            disabled={loading}
          >
            {formData?.id
              ? translations[selectedLanguage].update
              : translations[selectedLanguage].save}
          </button>

          {formData?.id && (
            <button
              className="delete_button"
              type="button"
              onClick={() => {
                setLoading(true);
                handleDelete().finally(() => setLoading(false));
              }}
              disabled={loading}
            >
              {translations[selectedLanguage].delete}
            </button>
          )}

          {loading && (
            <div className="overlay update_overlay">
              {translations[selectedLanguage].updating}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FruitForm;
