import { useEffect, useState } from "react";
import { axiosInstance as axios } from "../../config/axiosConfig";
import useForm from "../../hooks/useForm";
import InputForm from "../Form/InputForm";
import SelectForm from "../Form/SelectForm";
import Button from "../UI/Button";
import SpinnerLoading from "../UI/SpinnerLoading";
import classes from "./PayCardForm.module.css";
import MessageBox from "../UI/MessageBox";
import { validationPay } from "../../helper/validationPay";

const PayCardForm = (props) => {
  const PAY_METHODS = ["Efectivo", "Crédito", "Débito"];
  const [isLoading, setIsLoading] = useState(true);
  const [bankList, setBankList] = useState(null);
  const [documentOwner, setDocumentOwner] = useState(null);
  const [messageBox, setMessageBox] = useState({
    message: "",
    isError: false,
  });

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
    reset: resetCardNumber,
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
    reset: resetExpDate,
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
    reset: resetFeesNumber,
    inputBlurHandler: feesNumberBlurHandler,
  } = useForm((feesNumber) => +feesNumber <= 36);

  //expDateEntered
  const {
    value: amountToPay,
    isValid: amountToPayIsValid,
    hasError: amountToPayHasError,
    changeInputValueHandler: changeAmountToPay,
    reset: resetAmountToPay,
    inputBlurHandler: amountToPayBlurHandler,
  } = useForm(
    (amountToPay) =>
      amountToPay.toString().length > 3 && /^[0-9\b]+$/.test(amountToPay),
    props.onePay ? props.totalAmount : ""
  );

  //bankEntered
  const {
    value: bank,
    isValid: bankIsValid,
    hasError: bankHasError,
    changeInputValueHandler: changeBank,
    reset: resetBank,
    inputBlurHandler: bankBlurHandler,
  } = useForm((bank) => typeof +bank === "number", 0);

  const resetInputs = () => {
    resetCardNumber();
    resetExpDate();
    resetAmountToPay();
    resetFeesNumber();
    resetBank();
  };

  let formIsValid =
    amountToPayIsValid &&
    (props.type !== "Efectivo"
      ? cardNumberIsValid &&
        expDateIsValid &&
        bankIsValid &&
        (props.type === "Crédito" ? feesNumberIsValid : true)
      : true);

  const submitHandler = (e) => {
    e.preventDefault();
    let data;
    props.type === "Efectivo"
      ? (data = {
          type: PAY_METHODS.findIndex((el) => el === props.type),
          total_amount: amountToPay,
          one_pay: props.onePay,
        })
      : (data = {
          type: PAY_METHODS.findIndex((el) => el === props.type),
          card_number: cardNumber,
          owner_id: documentOwner,
          exp_date: expDate.split("T")[0],
          fees_number: feesNumber,
          card_type: props.isCredit ? "Credito" : "Debito",
          bank: bankList[bank].id,
          total_amount: amountToPay,
          one_pay: props.onePay,
        });
    const message = validationPay(
      props.currentMethods,
      data,
      props.totalAmount,
      props.onePay
    );
    if (message.length > 0) {
      return setMessageBox({
        message,
        isError: true,
      });
    }
    props.onSaveInfo(data);
    resetInputs();
    props.closeForm();
  };
  return (
    <div>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <form onSubmit={submitHandler} className={classes.form_control}>
          {props.type !== "Efectivo" && (
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
          )}
          {props.type !== "Efectivo" && (
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
          )}
          {props.type === "Crédito" && (
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
          <InputForm
            id="amount_to_pay"
            labelMessage="Valor a pagar"
            change={changeAmountToPay}
            blur={amountToPayBlurHandler}
            value={amountToPay}
            typeInput="text"
            inputHasError={amountToPayHasError}
            errorMessage="Error con el valor ingresado"
            keyPress={true}
            disabled={props.onePay}
          />
          {props.type !== "Efectivo" && (
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
          )}
          {props.type !== "Efectivo" && (
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
          )}
          <div className={classes.form_control__buttons}>
            <Button tag="close" action={props.closeForm}>
              Cancelar
            </Button>
            <Button isInvalid={!formIsValid}>Guardar</Button>
          </div>
          {messageBox.message.length > 0 && (
            <MessageBox
              message={messageBox.message}
              isError={messageBox.isError}
            />
          )}
        </form>
      )}
    </div>
  );
};
export default PayCardForm;
