import classes from "./RegisterPage.module.css";
import { Link } from "react-router-dom";
import Card from "./UI/Card";
import Button from "./UI/Button";
import useForm from "../hooks/useForm";
import InputForm from "./Form/InputForm";
const RegisterPage = () => {
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
    reset: resetFirstName,
  } = useForm((inputName) => inputName.trim().length !== 0);

  // enteredLastName input
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    changeInputValueHandler: changeLastName,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLasttName,
  } = useForm((lastName) => lastName.trim().length !== 0);

  // enteredDocumentType input
  const {
    value: documentType,
    isValid: documentTypeIsValid,
    hasError: documentTypeHasError,
    changeInputValueHandler: changeDocumentType,
    inputBlurHandler: documentTypeBlurHandler,
    reset: resetDocumentType,
  } = useForm((documentType) => documentType > 0 && documentType < 5, 1);

  // enteredDocumentId input
  const {
    value: documentId,
    isValid: documentIdIsValid,
    hasError: documentIdHasError,
    changeInputValueHandler: changeDocumentId,
    inputBlurHandler: documentIdBlurHandler,
    reset: resetDocumentId,
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
    reset: resetGender,
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
    reset: resetEmail,
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
    reset: resetPassword,
  } = useForm((password) => password.trim().length >= 8);

  //enteredPasswordConfirmed input
  const {
    value: passwordConfirmed,
    isValid: passwordConfirmedIsValid,
    hasError: passwordConfirmedHasError,
    changeInputValueHandler: changePasswordConfirmed,
    inputBlurHandler: passwordConfirmedBlurHandler,
    reset: resetPasswordConfirmed,
  } = useForm((password) => password.trim().length >= 8);

  //enteredPhone
  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    changeInputValueHandler: changePhone,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useForm((phone) => phone.length === 10 && /^[0-9\b]+$/.test(phone));

  //birthDayEntered
  const {
    value: birthday,
    isValid: birthdayIsValid,
    hasError: birthdayHasError,
    changeInputValueHandler: changeBirthday,
    inputBlurHandler: birthdayBlurHandler,
    reset: resetBirthday,
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

  const submitHandler = (e) => {
    e.preventDefault();

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
      user_type: 1,
      user_status: true,
    };
    console.log(userData);
    resetFirstName();
    resetLasttName();
    resetDocumentType();
    resetDocumentId();
    resetGender();
    resetEmail();
    resetPassword();
    resetPasswordConfirmed();
    resetPhone();
    resetBirthday();
  };

  return (
    <div className={classes.register}>
      <Card>
        <h1>Registrarse</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
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
    </div>
  );
};

export default RegisterPage;
