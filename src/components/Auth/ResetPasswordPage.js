import { useEffect, useState } from "react";
import { axiosInstance as axios } from "../../config/axiosConfig";
import classes from "./ResetPasswordPage.module.css";
import useForm from "../../hooks/useForm";
import InputForm from "../Form/InputForm";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const ResetPasswordPage = () => {
  const { id, token } = useSelector((state) => state.userData);
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    isError: false,
    message: "",
  });
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeInputValueHandler: changeEmail,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useForm((email) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(email).toLowerCase()
    )
  );

  useEffect(() => {
    const changePassword = async () => {
      try {
        await axios.post(
          `users/resetPasswordEmail/${id}`,
          {
            email,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        history.replace("/login");
      } catch (error) {
        setMessage({
          isError: true,
          message:
            "Hubo un error al enviar el email." + error.response.data.message,
        });
      } finally {
        setIsLoading(false);
        resetEmail();
      }
    };
    if (isLoading) {
      changePassword();
    }
  }, [isLoading, message, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };
  return (
    <div className={classes.reset}>
      <Card>
        <h1>Cambio de contraseña</h1>
        <p>
          Para recuperar tu contraseña por favor digita tu correo electrónico.
          Te enviaremos, a tu bandeja de entrada las indicaciones para que
          puedas cambiar a una nueva contraseña.
        </p>
        <form onSubmit={submitHandler} className={classes["form-control"]}>
          <InputForm
            id="email-input"
            labelMessage="Correo electrónico"
            change={changeEmail}
            blur={emailBlurHandler}
            value={email}
            typeInput="email"
            inputHasError={emailHasError}
            errorMessage="El email es inválido."
          />
          <Button isInvalid={!emailIsValid}>Enviar</Button>
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
