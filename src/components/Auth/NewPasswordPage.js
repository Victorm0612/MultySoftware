import { useEffect, useState } from "react";
import { axiosInstance as axios } from "../../config/axiosConfig";
import classes from "./NewPasswordPage.module.css";
import useForm from "../../hooks/useForm";
import InputForm from "../Form/InputForm";
import Button from "../UI/Button";
import Card from "../UI/Card";
import MessageBox from "../UI/MessageBox";
import SpinnerLoading from "../UI/SpinnerLoading";
import { Redirect, useParams } from "react-router";

const NewPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tokenIsValid, setTokenIsValid] = useState(true);
  const [message, setMessage] = useState({
    isError: false,
    message: "",
  });
  const { token } = useParams();

  //enteredPassword input
  const {
    value: newPassword,
    isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    changeInputValueHandler: changeNewPassword,
    inputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPassword,
  } = useForm((password) => password.trim().length >= 8);

  //enteredPasswordConfirmed input
  const {
    value: newPasswordConfirmed,
    isValid: newPasswordConfirmedIsValid,
    hasError: newPasswordConfirmedHasError,
    changeInputValueHandler: changeNewPasswordConfirmed,
    inputBlurHandler: newPasswordConfirmedBlurHandler,
    reset: resetNewPasswordConfirmed,
  } = useForm((password) => password.trim().length >= 8);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.post("auth/verifyToken", null, {
          headers: {
            Authorization: token,
          },
        });
      } catch (error) {
        if (error.response.data.message === "jwt malformed") {
          setTokenIsValid(false);
        }
      }
    };
    const changePassword = async () => {
      let errorMessage, message;
      try {
        await axios.put(`users/resetPassword/${token}`, {
          new_password: newPassword,
        });
        errorMessage = false;
        message = "¡Se ha cambiado la contraseña de manera exitosa!";
      } catch (error) {
        errorMessage = true;
        message = "Ha ocurrido un error " + error.response.data.message;
      } finally {
        setIsLoading(false);
        setMessage({
          isError: errorMessage,
          message: message,
        });
        resetNewPassword();
        resetNewPasswordConfirmed();
      }
    };
    verifyToken();
    if (isLoading) {
      changePassword();
    }
  }, [
    token,
    isLoading,
    newPassword,
    resetNewPassword,
    resetNewPasswordConfirmed,
  ]);

  let newPasswordsAreEquals =
    newPassword.length > 0 && newPassword === newPasswordConfirmed;

  let formIsValid = newPasswordIsValid && newPasswordConfirmedIsValid;

  const submitPasswordHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };
  return (
    <div className={classes.new_password}>
      {isLoading ? (
        <SpinnerLoading />
      ) : !tokenIsValid ? (
        <Redirect to="/" />
      ) : (
        <Card>
          <h1>Cambiar Contraseña</h1>
          <form
            onSubmit={submitPasswordHandler}
            className={classes.form_control}
          >
            <InputForm
              id="password_new__input"
              labelMessage="Nueva contraseña"
              change={changeNewPassword}
              checkPassword={!newPasswordsAreEquals}
              blur={newPasswordBlurHandler}
              value={newPassword}
              typeInput="password"
              inputHasError={newPasswordHasError}
              errorMessage="La contraseña debe contener al menos 8 carácteres."
            />
            <InputForm
              id="password_new_confirmed__input"
              labelMessage="Confirmar contraseña"
              change={changeNewPasswordConfirmed}
              checkPassword={!newPasswordsAreEquals}
              blur={newPasswordConfirmedBlurHandler}
              value={newPasswordConfirmed}
              typeInput="password"
              inputHasError={newPasswordConfirmedHasError}
              errorMessage="La contraseña debe contener al menos 8 carácteres."
            />
            <div className={classes.form_control__buttons}>
              <Button isInvalid={!formIsValid} submitFor="submit">
                Cambiar
              </Button>
            </div>
            <MessageBox isError={message.isError} message={message.message} />
          </form>
        </Card>
      )}
    </div>
  );
};

export default NewPasswordPage;
