import { useState } from "react";

const useForm = (validateFunction, initialState = "") => {
  const [inputValue, setInputValue] = useState(initialState);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateFunction(inputValue);
  const hasError = !valueIsValid && isTouched;

  const changeInputValueHandler = (e) => {
    setInputValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setInputValue("");
    setIsTouched(false);
  };

  return {
    value: inputValue,
    isValid: valueIsValid,
    hasError,
    changeInputValueHandler,
    inputBlurHandler,
    reset,
  };
};

export default useForm;
