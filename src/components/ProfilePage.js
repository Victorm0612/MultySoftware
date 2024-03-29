import Card from "./UI/Card";
import classes from "./ProfilePage.module.css";
import { Fragment, useCallback, useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { axiosInstance as axios } from "../config/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import Button from "./UI/Button";
import InputForm from "./Form/InputForm";
import SpinnerLoading from "./UI/SpinnerLoading";
import Modal from "./UI/Modal";
import { useHistory } from "react-router-dom";
import MessageBox from "./UI/MessageBox";
import { authActions } from "../store/auth";
import IconUser from "./UI/Icons/IconUser";

const ProfilePage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { id, token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [action, setAction] = useState("get");
  const [edit, setEdit] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [disabledAccount, setDisabledAccount] = useState(false);
  const [message, setMessage] = useState({
    isError: false,
    message: "",
  });

  const changeEditHandler = () => {
    setEdit((prevState) => !prevState);
  };

  const openPasswordForm = (e) => {
    e.preventDefault();
    setShowPasswordForm(true);
  };

  const closePasswordForm = (e) => {
    e.preventDefault();
    setShowPasswordForm(false);
    setMessage({ isError: false, message: "" });
  };

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
    setInputValue: setFirstName,
    inputBlurHandler: firstNameBlurHandler,
  } = useForm((inputName) => inputName.trim().length !== 0);
  // enteredLastName input
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    changeInputValueHandler: changeLastName,
    setInputValue: setLastName,
    inputBlurHandler: lastNameBlurHandler,
  } = useForm((lastName) => lastName.trim().length !== 0);

  // enteredDocumentType input
  const { value: documentType, setInputValue: setDocumentType } = useForm(
    (documentType) => documentType > 0 && documentType < 5,
    1
  );

  // enteredDocumentId input
  const {
    value: documentId,
    hasError: documentIdHasError,
    changeInputValueHandler: changeDocumentId,
    setInputValue: setDocumentId,
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
    setInputValue: setGender,
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
    setInputValue: setEmail,
    inputBlurHandler: emailBlurHandler,
  } = useForm((email) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(email).toLowerCase()
    )
  );

  //enteredPassword input
  const {
    value: oldPassword,
    isValid: oldPasswordIsValid,
    hasError: oldPasswordHasError,
    changeInputValueHandler: changeOldPassword,
    inputBlurHandler: oldPasswordBlurHandler,
    reset: resetOldPassword,
  } = useForm((password) => password.trim().length >= 8);

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

  //enteredPhone
  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    changeInputValueHandler: changePhone,
    setInputValue: setPhone,
    inputBlurHandler: phoneBlurHandler,
  } = useForm((phone) => phone.length === 10 && /^[0-9\b]+$/.test(phone));

  //birthDayEntered
  const {
    value: birthday,
    isValid: birthdayIsValid,
    hasError: birthdayHasError,
    changeInputValueHandler: changeBirthday,
    setInputValue: setBirthday,
    inputBlurHandler: birthdayBlurHandler,
  } = useForm(
    (birthday) =>
      new Date().getFullYear() - parseInt(birthday.split("-")[0]) >= 18
  );

  let newPasswordsAreEquals =
    newPassword.length > 0 && newPassword === newPasswordConfirmed;

  const setDataForm = useCallback(
    (data) => {
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setDocumentType(data.document_type);
      setDocumentId(data.document_id);
      setGender(data.gender);
      setEmail(data.email);
      setPhone(data.phone);
      setBirthday(data.birthday.split("T")[0]);
    },
    [
      setFirstName,
      setLastName,
      setDocumentType,
      setDocumentId,
      setGender,
      setEmail,
      setPhone,
      setBirthday,
    ]
  );
  useEffect(() => {
    let userType;
    let errorMessage = false;
    let message = "";
    const getData = async () => {
      let response;
      try {
        const { data } = await axios.get(`users/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        response = data;
        userType = response.data.user_type;
      } catch (error) {
        errorMessage = true;
        message =
          "¡Ha sucedido algo inesperado y no se ha podido mostrar tu información!";
      } finally {
        setIsLoading(false);
        setDataForm(response.data);
        setMessage({
          isError: errorMessage,
          message: message,
        });
        errorMessage = false;
        message = "";
      }
    };
    const sendData = async () => {
      try {
        await axios.put(
          `users/${id}`,
          {
            document_type: documentType,
            document_id: documentId,
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            phone: phone,
            birthday: birthday,
            user_type: userType,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        changeEditHandler();
        errorMessage = false;
        message = "¡Tu información se ha actualizado correctamente!";
      } catch (error) {
        errorMessage = true;
        message =
          "¡Ha sucedido algo inesperado y no se ha actualizado tu información!";
      } finally {
        setIsLoading(false);
        setAction("get");
        setMessage({
          isError: errorMessage,
          message: message,
        });
      }
    };
    const deleteAccount = async () => {
      try {
        await axios.put(
          `users/changeStatus/${id}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(authActions.logout());
        history.replace("/");
      } catch (error) {
        errorMessage = true;
        message =
          "¡Ha sucedido algo inesperado y no se ha deshabilitado tu cuenta!";
      } finally {
        setIsLoading(false);
        setDisabledAccount(false);
        setMessage({
          isError: errorMessage,
          message: message,
        });
        setAction("get");
      }
    };
    const changePassword = async () => {
      try {
        await axios.put(
          `users/changePassword/${id}`,
          {
            old_password: oldPassword,
            new_password: newPassword,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        errorMessage = false;
        message = "¡La contraseña ha sido actualizada correctamente!";
      } catch (error) {
        errorMessage = true;
        message =
          "¡Ha sucedido algo inesperado y no se ha actualizado la contraseña!";
      } finally {
        setIsLoading(false);
        resetNewPassword();
        resetOldPassword();
        resetNewPasswordConfirmed();
        setMessage({
          isError: errorMessage,
          message: message,
        });
        setAction("get");
      }
    };

    if (!isLoading) {
      return;
    }
    if (action === "get") {
      getData();
    }
    if (action === "put" && !showPasswordForm && !disabledAccount) {
      sendData();
    }
    if (action === "put" && showPasswordForm && !disabledAccount) {
      changePassword();
    }
    if (action === "put" && disabledAccount && !showPasswordForm) {
      deleteAccount();
    }
  }, [
    isLoading,
    action,
    showPasswordForm,
    disabledAccount,
    dispatch,
    history,
    token,
    firstName,
    gender,
    birthday,
    documentId,
    documentType,
    lastName,
    oldPassword,
    phone,
    resetNewPassword,
    resetNewPasswordConfirmed,
    resetOldPassword,
    setDataForm,
    id,
    newPassword,
  ]);

  let formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    genderIsValid &&
    emailIsValid &&
    (showPasswordForm
      ? oldPasswordIsValid &&
        newPasswordIsValid &&
        newPasswordConfirmedIsValid &&
        newPasswordsAreEquals
      : true) &&
    phoneIsValid &&
    birthdayIsValid;

  const submitHandler = (e) => {
    e.preventDefault();
    setAction("put");
    setIsLoading(true);
  };

  const submitPasswordHandler = (e) => {
    e.preventDefault();
    setAction("put");
    setIsLoading(true);
  };

  return (
    <Fragment>
      {isLoading ? (
        <div className={classes.profile}>
          <SpinnerLoading />
        </div>
      ) : (
        <div className={classes.profile}>
          <Modal
            size="big_card"
            show={showPasswordForm}
            closeModal={closePasswordForm}
          >
            <h1>Cambiar Contraseña</h1>
            <form
              onSubmit={submitPasswordHandler}
              className={classes.form_control}
            >
              <InputForm
                id="password_old__input"
                labelMessage="Contraseña anterior"
                change={changeOldPassword}
                blur={oldPasswordBlurHandler}
                value={oldPassword}
                typeInput="password"
                inputHasError={oldPasswordHasError}
                errorMessage="La contraseña debe contener al menos 8 carácteres."
                disabled={!edit}
              />
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
                disabled={!edit}
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
                disabled={!edit}
              />
              <div className={classes.form_control__buttons}>
                <Button submitFor="submit">Cambiar</Button>
                <Button
                  tag="close"
                  submitFor="button"
                  action={closePasswordForm}
                >
                  Cancelar
                </Button>
              </div>
              <MessageBox isError={message.isError} message={message.message} />
            </form>
          </Modal>
          <Card size="small_card">
            <div className={classes.profile_header}>
              <IconUser />
              <h1>{firstName}</h1>
            </div>
            <form onSubmit={submitHandler} className={classes.form_control}>
              <div className={classes.form_control__body}>
                <InputForm
                  id="name__input"
                  labelMessage="Nombre"
                  change={changeFirstName}
                  value={firstName}
                  blur={firstNameBlurHandler}
                  typeInput="text"
                  inputHasError={firstNameHasError}
                  errorMessage="Ingresa un nombre válido."
                  disabled={!edit}
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
                  disabled={!edit}
                />
                <InputForm
                  id="document_type__input"
                  labelMessage="Tipo de documento"
                  onlyValue={DOCUMENT_TYPES[documentType - 1]}
                  typeInput="text"
                  disabled={true}
                />
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
                  disabled={true}
                />

                <label htmlFor="gender__input">Género</label>
                <select
                  onChange={changeGender}
                  onBlur={genderBlurHandler}
                  value={gender}
                  required
                  id="gender__input"
                  disabled={!edit}
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
                  disabled={!edit}
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
                  disabled={!edit}
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
                  disabled={!edit}
                />
              </div>
              <div className={classes.form_control__buttons}>
                {!edit && <Button action={changeEditHandler}>Editar</Button>}
                {!edit && (
                  <Button
                    action={() => {
                      setAction("put");
                      setIsLoading(true);
                      setDisabledAccount(true);
                    }}
                  >
                    Suspender Cuenta
                  </Button>
                )}
                {edit && (
                  <Button isInvalid={!formIsValid} submitFor="submit">
                    Aplicar cambios
                  </Button>
                )}
                {edit && (
                  <Button tag="close" action={changeEditHandler}>
                    Cancelar
                  </Button>
                )}
              </div>
              <div className={classes.form_control__buttons}>
                {edit && (
                  <Button action={openPasswordForm}>Cambiar contraseña</Button>
                )}
              </div>
            </form>
            {!showPasswordForm && (
              <MessageBox isError={message.isError} message={message.message} />
            )}
          </Card>
        </div>
      )}
    </Fragment>
  );
};

export default ProfilePage;
