import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import InputForm from "./Form/InputForm";
import classes from "./LoginPage.module.css";
import Button from "./UI/Button";
import Card from "./UI/Card";
const LoginPage = () => {
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

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeInputValueHandler: changePassword,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useForm((password) => password.trim().length >= 8);

  let loginIsValid = emailIsValid && passwordIsValid;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ email, password });
    resetEmail();
    resetPassword();
  };

  return (
    <div className={classes.login}>
      <Card>
        <h1>Iniciar Sesión</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
          <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
        </svg>
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
          <InputForm
            id="password__input"
            labelMessage="Contraseña"
            change={changePassword}
            blur={passwordBlurHandler}
            value={password}
            typeInput="password"
            inputHasError={passwordHasError}
            errorMessage="La contraseña debe contener al menos 8 carácteres."
          />
          <Button isInvalid={!loginIsValid} submitFor="submit">
            Iniciar Sesión
          </Button>
        </form>
        <p>
          ¿Aun no estás registrado? <Link to="/register">¡Haz click aquí!</Link>
        </p>
        <Link to="/reset-password">Olvide mi contraseña</Link>
      </Card>
    </div>
  );
};

export default LoginPage;
