import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance as axios } from "../../config/axiosConfig";
import useForm from "../../hooks/useForm";
import InputForm from "../Form/InputForm";
import SelectForm from "../Form/SelectForm";
import Button from "../UI/Button";
import SpinnerLoading from "../UI/SpinnerLoading";
import classes from "./PayCardForm.module.css";

const PayCardForm = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bankList, setBankList] = useState(null);
  const [documentOwner, setDocumentOwner] = useState(null);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getBanks = async () => {
      try {
        const { data: response } = await axios.get("bank/");
        setBankList(response.data);
        setDocumentOwner(props.documentUser);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoading) return;
    getBanks();
  });

  const {
    value: cardNumber,
    isValid: cardNumberIsValid,
    hasError: cardNumberHasError,
    changeInputValueHandler: changeCardNumber,
    setInputValue: setCardNumber,
    inputBlurHandler: cardNumberBlurHandler,
  } = useForm(
    (cardNumber) =>
      cardNumber.toString().length === 16 && /^[0-9\b]+$/.test(cardNumber)
  );

  //expDateEntered
  const {
    value: expDate,
    isValid: expDateIsValid,
    hasError: expDateHasError,
    changeInputValueHandler: changeExpDate,
    setInputValue: setExpDate,
    inputBlurHandler: expDateBlurHandler,
  } = useForm(
    (expDate) => parseInt(expDate.split("-")[0]) - new Date().getFullYear() >= 1
  );

  //expDateEntered
  const {
    value: feesNumber,
    isValid: feesNumberIsValid,
    hasError: feesNumberHasError,
    changeInputValueHandler: changeFeesNumber,
    setInputValue: setFeesNumber,
    inputBlurHandler: feesNumberBlurHandler,
  } = useForm((feesNumber) => +feesNumber <= 36);

  //bankEntered
  const {
    value: bank,
    isValid: bankIsValid,
    hasError: bankHasError,
    changeInputValueHandler: changeBank,
    setInputValue: setBank,
    inputBlurHandler: bankBlurHandler,
  } = useForm((bank) => typeof +bank === "number", 0);

  let formIsValid = cardNumberIsValid && expDateIsValid && bankIsValid;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({
      card_number: cardNumber,
      owner_id: documentOwner,
      exp_date: expDate.split("T")[0],
      card_type: props.isCredit ? "Credito" : "Debito",
      bank: bankList[bank].id,
    });
  };
  return (
    <div>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <form onSubmit={submitHandler} className={classes.form_control}>
          <InputForm
            id="card_number__input"
            labelMessage="Número de tarjeta"
            change={changeCardNumber}
            blur={cardNumberBlurHandler}
            value={cardNumber}
            typeInput="text"
            inputHasError={cardNumberHasError}
            errorMessage="El número de tarjeta debe contener 16 carácteres."
            keyPress={true}
          />
          <InputForm
            id="exp_date__input"
            labelMessage="Fecha de Expedición"
            blur={expDateBlurHandler}
            change={changeExpDate}
            value={expDate}
            typeInput="date"
            inputHasError={expDateHasError}
            errorMessage="Fecha inválida."
          />
          {props.isCredit && (
            <InputForm
              id="fees_number__input"
              labelMessage="Cuotas"
              change={changeFeesNumber}
              blur={feesNumberBlurHandler}
              value={feesNumber}
              typeInput="text"
              inputHasError={feesNumberHasError}
              errorMessage="El máximo de cuotas debe ser 36."
              keyPress={true}
            />
          )}
          <SelectForm
            id="bank__input"
            change={changeBank}
            blur={bankBlurHandler}
            value={bank}
            hasError={bankHasError}
            list={bankList}
            accesKey="bank_name"
            labelMessage="Seleccionar método de pago"
            errorMessage="Seleccione una opción válida."
            expression={(value, index) => value.id}
          />
          <div>
            <div className={classes.card_figure}>
              <div className={classes.card_info}>
                <p>{props.isCredit ? "Crédito" : "Débito"}</p>
                <div>
                  <h3>{cardNumber}</h3>
                  <p>{expDate.split("T")[0]}</p>
                </div>
              </div>
              <div className={classes.shadow}></div>
            </div>
          </div>
          <div className={classes.form_control__buttons}>
            <Button isInvalid={!formIsValid}>Guardar</Button>
            <Button action={props.closeForm}>Cancelar</Button>
          </div>
        </form>
      )}
    </div>
  );
};
export default PayCardForm;
