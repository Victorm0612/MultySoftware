import classes from "./RegisterPage.module.css";
import { Link, useHistory } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import useForm from "../../hooks/useForm";
import InputForm from "../Form/InputForm";
import { axiosInstance as axios } from "../../config/axiosConfig";
import { useState, useEffect } from "react";
import SpinnerLoading from "../UI/SpinnerLoading";
import IconRegister from "../UI/Icons/IconRegister";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory();
  const DOCUMENT_TYPES = [
    "Cédula de Ciudadania",
    "Cédula de extranjería",
    "Pasaporte",
    "NIT",
  ];
  const GENDERS = ["Masculino", "Femenino", "Otro"];

  // enteredFirstName input
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    changeInputValueHandler: changeFirstName,
    inputBlurHandler: firstNameBlurHandler,
  } = useForm((inputName) => inputName.trim().length !== 0);

  // enteredLastName input
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    changeInputValueHandler: changeLastName,
    inputBlurHandler: lastNameBlurHandler,
  } = useForm((lastName) => lastName.trim().length !== 0);

  // enteredDocumentType input
  const {
    value: documentType,
    isValid: documentTypeIsValid,
    hasError: documentTypeHasError,
    changeInputValueHandler: changeDocumentType,
    inputBlurHandler: documentTypeBlurHandler,
  } = useForm((documentType) => documentType > 0 && documentType < 5, 1);

  // enteredDocumentId input
  const {
    value: documentId,
    isValid: documentIdIsValid,
    hasError: documentIdHasError,
    changeInputValueHandler: changeDocumentId,
    inputBlurHandler: documentIdBlurHandler,
  } = useForm(
    (documentId) => documentId.length >= 8 && /^[0-9\b]+$/.test(documentId)
  );

  //enteredGender Input
  const {
    value: gender,
    isValid: genderIsValid,
    hasError: genderHasError,
    changeInputValueHandler: changeGender,
    inputBlurHandler: genderBlurHandler,
  } = useForm(
    (gender) => gender === "M" || gender === "F" || gender === "O",
    "M"
  );

  //enteredEmail input
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeInputValueHandler: changeEmail,
    inputBlurHandler: emailBlurHandler,
  } = useForm((email) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(email).toLowerCase()
    )
  );

  //enteredPassword input
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeInputValueHandler: changePassword,
    inputBlurHandler: passwordBlurHandler,
  } = useForm((password) => password.trim().length >= 8);

  //enteredPasswordConfirmed input
  const {
    value: passwordConfirmed,
    isValid: passwordConfirmedIsValid,
    hasError: passwordConfirmedHasError,
    changeInputValueHandler: changePasswordConfirmed,
    inputBlurHandler: passwordConfirmedBlurHandler,
  } = useForm((password) => password.trim().length >= 8);

  //enteredPhone
  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    changeInputValueHandler: changePhone,
    inputBlurHandler: phoneBlurHandler,
  } = useForm((phone) => phone.length === 10 && /^[0-9\b]+$/.test(phone));

  //birthDayEntered
  const {
    value: birthday,
    isValid: birthdayIsValid,
    hasError: birthdayHasError,
    changeInputValueHandler: changeBirthday,
    inputBlurHandler: birthdayBlurHandler,
  } = useForm(
    (birthday) =>
      new Date().getFullYear() - parseInt(birthday.split("-")[0]) >= 18
  );

  let passwordsAreEquals =
    password.length > 0 && password === passwordConfirmed;

  let formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    documentTypeIsValid &&
    documentIdIsValid &&
    genderIsValid &&
    emailIsValid &&
    passwordIsValid &&
    passwordConfirmedIsValid &&
    passwordsAreEquals &&
    phoneIsValid &&
    birthdayIsValid;

  useEffect(() => {
    const sendData = async () => {
      try {
        const userData = {
          first_name: firstName,
          last_name: lastName,
          document_type: documentType,
          document_id: documentId,
          gender,
          email,
          password,
          phone,
          birthday,
          user_status: true,
        };
        const response = await axios.post("auth/signup/", userData);
        console.log(response);
        history.push("/login");
      } catch (error) {
        console.log(error.response);
        setErrorMessage(error.response.data.message);
        setShowError(true);
        setIsLoading(false);
      }
    };
    if (isLoading) {
      sendData();
    }
  }, [
    history,
    isLoading,
    firstName,
    lastName,
    documentType,
    documentId,
    gender,
    email,
    password,
    phone,
    birthday,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className={classes.register}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Card>
          <h1>Registrarse</h1>
          <IconRegister />
          <form onSubmit={submitHandler} className={classes["form-control"]}>
            <InputForm
              id="name__input"
              labelMessage="Nombre"
              change={changeFirstName}
              value={firstName}
              blur={firstNameBlurHandler}
              typeInput="text"
              inputHasError={firstNameHasError}
              errorMessage="Ingresa un nombre válido."
            />
            <InputForm
              id="last_name__input"
              labelMessage="Apellido"
              change={changeLastName}
              blur={lastNameBlurHandler}
              value={lastName}
              typeInput="text"
              inputHasError={lastNameHasError}
              errorMessage="Ingresa un apellido válido"
            />
            <label htmlFor="document-type__input">Tipo de documento</label>
            <select
              onChange={changeDocumentType}
              onBlur={documentTypeBlurHandler}
              value={documentType}
              required
              id="document-type__input"
            >
              {DOCUMENT_TYPES.map((type, index) => {
                return (
                  <option key={index} value={index + 1}>
                    {type}
                  </option>
                );
              })}
            </select>
            {documentTypeHasError && (
              <p className={classes.error_message}>
                Seleccione una opción válida.
              </p>
            )}
            <InputForm
              id="document-number__input"
              labelMessage="Número de documento"
              change={changeDocumentId}
              blur={documentIdBlurHandler}
              value={documentId}
              typeInput="text"
              inputHasError={documentIdHasError}
              errorMessage="El documento es inválido o contiene menos de 8 carácteres."
              keyPress={true}
            />

            <label htmlFor="gender__input">Género</label>
            <select
              onChange={changeGender}
              onBlur={genderBlurHandler}
              value={gender}
              required
              id="gender__input"
            >
              {GENDERS.map((gender, index) => {
                return (
                  <option key={index} value={gender.substr(0, 1)}>
                    {gender}
                  </option>
                );
              })}
            </select>
            {genderHasError && (
              <p className={classes.error_message}>
                Seleccione una opción válida.
              </p>
            )}
            <InputForm
              id="email__input"
              labelMessage="Correo electrónico"
              change={changeEmail}
              blur={emailBlurHandler}
              value={email}
              typeInput="email"
              inputHasError={emailHasError}
              errorMessage="El email debe ser válido."
            />
            <InputForm
              id="password__input"
              labelMessage="Contraseña"
              change={changePassword}
              checkPassword={!passwordsAreEquals}
              blur={passwordBlurHandler}
              value={password}
              typeInput="password"
              inputHasError={passwordHasError}
              errorMessage="La contraseña debe contener al menos 8 carácteres."
            />
            <InputForm
              id="password-confirmed__input"
              labelMessage="Confirmar contraseña"
              change={changePasswordConfirmed}
              checkPassword={!passwordsAreEquals}
              blur={passwordConfirmedBlurHandler}
              value={passwordConfirmed}
              typeInput="password"
              inputHasError={passwordConfirmedHasError}
              errorMessage="La contraseña debe contener al menos 8 carácteres."
            />
            <InputForm
              id="phone__input"
              labelMessage="Teléfono"
              change={changePhone}
              blur={phoneBlurHandler}
              value={phone}
              typeInput="text"
              inputHasError={phoneHasError}
              errorMessage="El teléfono es inválido o contiene menos de 10 carácteres."
              keyPress={true}
            />
            <InputForm
              id="birthday__input"
              labelMessage="Fecha de Nacimiento"
              blur={birthdayBlurHandler}
              change={changeBirthday}
              value={birthday}
              typeInput="date"
              inputHasError={birthdayHasError}
              errorMessage="Debe ser mayor de 18 años."
            />
            <Button isInvalid={!formIsValid} submitFor="submit">
              Registrarse
            </Button>
          </form>
          <p>
            ¿Ya tienes cuenta? <Link to="/login">¡Haz click aquí!</Link>
          </p>
          <Link to="/reset-password">Olvide mi contraseña</Link>
        </Card>
      )}
      {showError && (
        <div className={classes.error}>
          <span
            onClick={() => {
              setShowError(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </span>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
