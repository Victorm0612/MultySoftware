import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Fragment } from "react/cjs/react.production.min";
import { axiosInstance as axios } from "../../config/axiosConfig";
import useForm from "../../hooks/useForm";
import InputForm from "../Form/InputForm";
import SelectForm from "../Form/SelectForm";
import Button from "../UI/Button";
import IconDetails from "../UI/Icons/IconDetails";
import IconEdit from "../UI/Icons/IconEdit";
import IconRegister from "../UI/Icons/IconRegister";
import IconTrash from "../UI/Icons/IconTrash";
import InventoryTable from "../UI/InventoryTable";
import Modal from "../UI/Modal";
import SpinnerLoading from "../UI/SpinnerLoading";
import MessageBox from "../UI/MessageBox";
import classes from "./shared.module.css";

const UsersPage = () => {
  const [keyWord, setKeyWord] = useState("");
  const [users, setUsers] = useState(null);
  const [action, setAction] = useState("get");
  const [isLoading, setIsLoading] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const { token, typeUser } = useSelector((state) => state.userData);
  const [message, setMessage] = useState({
    isError: false,
    message: "",
  });

  const TITLES = ["#", "Nombre", "Documento", "Rol", "Opciones"];
  const ROLES = ["Cliente", "Empleado", "Admin"];

  const optionsAction = {
    get: "Crear",
    create: "Crear",
    update: "Actualizar",
    delete: "Eliminar",
    details: "Detalles de",
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
    inputBlurHandler: firstNameBlurHandler,
    setInputValue: setFirstName,
    reset: resetFirstName,
  } = useForm((inputName) => inputName.trim().length !== 0);

  // enteredLastName input
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    changeInputValueHandler: changeLastName,
    inputBlurHandler: lastNameBlurHandler,
    setInputValue: setLastName,
    reset: resetLastName,
  } = useForm((lastName) => lastName.trim().length !== 0);

  // enteredDocumentType input
  const {
    value: documentType,
    isValid: documentTypeIsValid,
    hasError: documentTypeHasError,
    changeInputValueHandler: changeDocumentType,
    inputBlurHandler: documentTypeBlurHandler,
    setInputValue: setDocumentType,
    reset: resetDocumentType,
  } = useForm((documentType) => documentType > 0 && documentType < 5, 1);

  // enteredDocumentId input
  const {
    value: documentId,
    isValid: documentIdIsValid,
    hasError: documentIdHasError,
    changeInputValueHandler: changeDocumentId,
    inputBlurHandler: documentIdBlurHandler,
    setInputValue: setDocumentId,
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
    setInputValue: setGender,
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
    setInputValue: setEmail,
    reset: resetEmail,
  } = useForm((email) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(email).toLowerCase()
    )
  );

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
    setInputValue: setPhone,
    reset: resetPhone,
  } = useForm((phone) => phone.length === 10 && /^[0-9\b]+$/.test(phone));

  //birthDayEntered
  const {
    value: birthday,
    isValid: birthdayIsValid,
    hasError: birthdayHasError,
    changeInputValueHandler: changeBirthday,
    inputBlurHandler: birthdayBlurHandler,
    setInputValue: setBirthday,
    reset: resetBirthday,
  } = useForm(
    (birthday) =>
      new Date().getFullYear() - parseInt(birthday.split("-")[0]) >= 18
  );

  //RolEntered
  const {
    value: rol,
    isValid: rolIsValid,
    hasError: rolHasError,
    changeInputValueHandler: changeRol,
    inputBlurHandler: rolBlurHandler,
    setInputValue: setRol,
    reset: resetRol,
  } = useForm((rol) => rol > 0 && rol <= 3, 1);

  const resetInputsForm = useCallback(() => {
    resetFirstName();
    resetLastName();
    resetDocumentType();
    resetDocumentId();
    resetGender();
    resetEmail();
    resetOldPassword();
    resetPassword();
    resetPasswordConfirmed();
    resetPhone();
    resetBirthday();
    resetRol();
  }, [
    resetFirstName,
    resetLastName,
    resetDocumentId,
    resetDocumentType,
    resetGender,
    resetEmail,
    resetOldPassword,
    resetPassword,
    resetPasswordConfirmed,
    resetPhone,
    resetBirthday,
    resetRol,
  ]);

  const setInputsForm = (user) => {
    setUserId(user.id);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setDocumentType(user.document_type);
    setDocumentId(user.document_id.toString());
    setGender(user.gender);
    setEmail(user.email);
    setPhone(user.phone);
    setBirthday(user.birthday.split("T")[0]);
    setRol(user.user_type);
    setUserStatus(user.user_status);
  };

  const changeKeyWord = (e) => {
    setKeyWord(e.target.value);
  };

  const openUserForm = () => {
    setShowUserForm(true);
  };

  const closeUserForm = useCallback(() => {
    setShowUserForm(false);
    resetInputsForm();
  }, [resetInputsForm]);

  const openPasswordForm = () => {
    setShowPasswordForm(true);
  };

  const closePasswordForm = useCallback(() => {
    setShowPasswordForm(false);
    resetPassword();
    resetPasswordConfirmed();
  }, [resetPassword, resetPasswordConfirmed]);

  useEffect(() => {
    const getUsers = async () => {
      let message = "";
      let messageError = false;
      try {
        const { data: response } = await axios.get("users/", {
          headers: {
            Authorization: token,
          },
        });
        const arrUser = response.data.filter((user) =>
          typeUser === 2 ? user.user_type < 3 : true
        );
        setUsers(arrUser);
      } catch (error) {
        message = error.response.data.message;
        messageError = true;
      } finally {
        setMessage({
          IsError: messageError,
          message: message,
        });
        setIsLoading(false);
        setAction("create");
      }
    };
    const createUser = async () => {
      let message = "";
      let errorMessage = false;
      try {
        await axios.post(
          "users/register",
          {
            document_type: documentType,
            document_id: +documentId,
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            phone: phone,
            birthday: birthday,
            user_type: rol,
            user_status: true,
            email: email,
            password: password,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        message = "Se ha creado el usuario de manera éxitosa.";
      } catch (error) {
        errorMessage = true;
        message = error.response.data.message;
      } finally {
        setAction("get");
        setMessage({
          isError: errorMessage,
          message: message,
        });
        resetInputsForm();
        setIsLoading(false);
        closeUserForm();
      }
    };
    const updateUser = async () => {
      let message = "";
      let errorMessage = false;
      try {
        await axios.put(
          `users/${userId}`,
          {
            document_type: documentType,
            document_id: +documentId,
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            phone: phone,
            birthday: birthday,
            user_type: rol,
            user_status: userStatus,
            email: email,
            password: password,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        message = "Se ha actualizado el usuario de manera exitosa.";
      } catch (error) {
        errorMessage = true;
        message = "Ha ocurrido un error " + error.response.data.message;
      } finally {
        setAction("get");
        setMessage({
          isError: errorMessage,
          message: message,
        });
        resetInputsForm();
        setIsLoading(false);
        closeUserForm();
      }
    };
    const disabledAccount = async () => {
      let message = "";
      let errorMessage = false;
      try {
        await axios.put(`users/changeStatus/${userId}`, null, {
          headers: { Authorization: token },
        });
        message = "Se ha deshabilitado la cuenta.";
      } catch (error) {
        errorMessage = true;
        message = "Ha ocurrido un error: " + error.response.data.message;
      } finally {
        setAction("get");
        setMessage({
          isError: errorMessage,
          message: message,
        });
        setIsLoading(false);
        closeUserForm();
      }
    };
    const deleteUser = async () => {
      let message = "";
      let errorMessage = false;
      try {
        await axios.delete(
          `users/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          },
          null
        );
        message = "Se ha eliminado el usuario correctamente.";
      } catch (error) {
        errorMessage = true;
        message = "Ha ocurrido un error " + error.response.data.message;
      } finally {
        setAction("get");
        setMessage({
          isError: errorMessage,
          message: message,
        });
        setIsLoading(false);
        closeUserForm();
      }
    };
    const changePassword = async () => {
      let message = "";
      let errorMessage = false;
      try {
        await axios.put(
          `users/changePassword/${userId}`,
          {
            old_password: oldPassword,
            new_password: password,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        message = "¡Se ha actualizado la contraseña correctamente!";
      } catch (error) {
        errorMessage = true;
        message = "Ha ocurrido un error: " + error.response.data.message;
      } finally {
        setAction("get");
        setMessage({
          isError: errorMessage,
          message: message,
        });
        setIsLoading(false);
        closePasswordForm();
        closeUserForm();
      }
    };

    const actionToDo = {
      create: createUser,
      get: getUsers,
      update: showPasswordForm ? changePassword : updateUser,
      delete: deleteUser,
      disabled: disabledAccount,
    };
    if (isLoading) {
      actionToDo[action]();
    }
  }, [
    action,
    isLoading,
    token,
    firstName,
    lastName,
    documentId,
    documentType,
    gender,
    email,
    password,
    passwordConfirmed,
    oldPassword,
    birthday,
    phone,
    rol,
    typeUser,
    userId,
    userStatus,
    showPasswordForm,
    resetInputsForm,
    closeUserForm,
    closePasswordForm,
  ]);

  let passwordsAreEquals =
    password.length > 0 && password === passwordConfirmed;

  let formIsValid =
    action === "delete"
      ? true
      : firstNameIsValid &&
        lastNameIsValid &&
        documentTypeIsValid &&
        documentIdIsValid &&
        genderIsValid &&
        emailIsValid &&
        rolIsValid &&
        phoneIsValid &&
        birthdayIsValid &&
        (action === "create"
          ? passwordIsValid && passwordConfirmedIsValid && passwordsAreEquals
          : true) &&
        (action === "update" && showPasswordForm
          ? passwordIsValid &&
            passwordConfirmedIsValid &&
            passwordsAreEquals &&
            oldPasswordIsValid
          : true);

  const submitUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className={classes.users}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Fragment>
          <Modal show={showPasswordForm} closeModal={closePasswordForm}>
            <h1>Cambiar Contraseña</h1>
            <form onSubmit={submitUser} className={classes.form_control}>
              <InputForm
                id="password_old__input"
                labelMessage="Contraseña anterior"
                change={changeOldPassword}
                blur={oldPasswordBlurHandler}
                value={oldPassword}
                typeInput="password"
                inputHasError={oldPasswordHasError}
                errorMessage="La contraseña debe contener al menos 8 carácteres."
              />
              <InputForm
                id="password__input"
                labelMessage="Nueva contraseña"
                change={changePassword}
                checkPassword={!passwordsAreEquals}
                blur={passwordBlurHandler}
                value={password}
                typeInput="password"
                inputHasError={passwordHasError}
                errorMessage="La contraseña debe contener al menos 8 carácteres."
                disabled={action === "details"}
              />
              <InputForm
                id="password-confirmed__input"
                labelMessage="Confirmar nueva contraseña"
                change={changePasswordConfirmed}
                checkPassword={!passwordsAreEquals}
                blur={passwordConfirmedBlurHandler}
                value={passwordConfirmed}
                typeInput="password"
                inputHasError={passwordConfirmedHasError}
                errorMessage="La contraseña debe contener al menos 8 carácteres."
                disabled={action === "details"}
              />
              <div className={classes.form_control__buttons}>
                <Button
                  submitFor="submit"
                  isInvalid={!passwordsAreEquals && !oldPasswordIsValid}
                >
                  Cambiar
                </Button>
                <Button submitFor="button" action={closePasswordForm}>
                  Cancelar
                </Button>
              </div>
              <MessageBox isError={message.isError} message={message.message} />
            </form>
          </Modal>
          <Modal show={showUserForm}>
            <h1>{optionsAction[action]} Usuario</h1>
            <form onSubmit={submitUser} className={classes.form_control}>
              {action === "delete" && (
                <div>
                  <h5 style={{ textAlign: "center" }}>
                    ¿Está seguro que desea eliminar a {firstName}?
                  </h5>
                </div>
              )}
              {action !== "delete" && (
                <Fragment>
                  <IconRegister />
                  <InputForm
                    id="name__input"
                    labelMessage="Nombre"
                    change={changeFirstName}
                    value={firstName}
                    blur={firstNameBlurHandler}
                    typeInput="text"
                    inputHasError={firstNameHasError}
                    errorMessage="Ingresa un nombre válido."
                    disabled={action === "details"}
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
                    disabled={action === "details"}
                  />
                  <SelectForm
                    id="document-type__input"
                    change={changeDocumentType}
                    blur={documentTypeBlurHandler}
                    hasError={documentTypeHasError}
                    value={documentType}
                    list={DOCUMENT_TYPES}
                    labelMessage="Tipo de documento"
                    errorMessage="Seleccione una opción válida."
                    expression={(value, index) => index + 1}
                    disabled={action === "details"}
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
                    disabled={action === "details"}
                  />
                  <SelectForm
                    id="gender__input"
                    change={changeGender}
                    blur={genderBlurHandler}
                    value={gender}
                    hasError={genderHasError}
                    list={GENDERS}
                    labelMessage="Género"
                    errorMessage="Seleccione una opción válida."
                    expression={(value, index) => value.substr(0, 1)}
                    disabled={action === "details"}
                  />
                  <SelectForm
                    id="rol_input"
                    change={changeRol}
                    blur={rolBlurHandler}
                    value={rol}
                    hasError={rolHasError}
                    list={ROLES}
                    labelMessage="Rol"
                    errorMessage="Seleccione una opción válida."
                    expression={(value, index) => index + 1}
                    disabled={action === "details"}
                  />
                  <InputForm
                    id="email__input"
                    labelMessage="Correo electrónico"
                    change={changeEmail}
                    blur={emailBlurHandler}
                    value={email}
                    typeInput="email"
                    inputHasError={emailHasError}
                    errorMessage="El email debe ser válido."
                    disabled={action === "details"}
                  />
                  {action !== "update" && action !== "details" && (
                    <InputForm
                      id="password_create__input"
                      labelMessage="Contraseña"
                      change={changePassword}
                      checkPassword={!passwordsAreEquals}
                      blur={passwordBlurHandler}
                      value={password}
                      typeInput="password"
                      inputHasError={passwordHasError}
                      errorMessage="La contraseña debe contener al menos 8 carácteres."
                      disabled={action === "details"}
                    />
                  )}
                  {action !== "update" && action !== "details" && (
                    <InputForm
                      id="password_create-confirmed__input"
                      labelMessage="Confirmar contraseña"
                      change={changePasswordConfirmed}
                      checkPassword={!passwordsAreEquals}
                      blur={passwordConfirmedBlurHandler}
                      value={passwordConfirmed}
                      typeInput="password"
                      inputHasError={passwordConfirmedHasError}
                      errorMessage="La contraseña debe contener al menos 8 carácteres."
                      disabled={action === "details"}
                    />
                  )}
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
                    disabled={action === "details"}
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
                    disabled={action === "details"}
                  />
                  {action === "details" && (
                    <InputForm
                      labelMessage="Estado del usuario"
                      id="user_status__input"
                      value={userStatus ? "Activo" : "Deshabilitado"}
                      disabled={true}
                    />
                  )}
                </Fragment>
              )}
              <div className={classes.form_control__buttons}>
                {action === "delete" && (
                  <Button
                    action={() => {
                      setAction("disabled");
                      setIsLoading(true);
                    }}
                    submitFor="button"
                  >
                    {userStatus ? "Deshabilitar" : "Habilitar"}
                  </Button>
                )}
                {action !== "details" && (
                  <Button isInvalid={!formIsValid} submitFor="submit">
                    {optionsAction[action]}
                  </Button>
                )}
                {action === "update" && (
                  <Button submitFor="button" action={openPasswordForm}>
                    Cambiar contraseña
                  </Button>
                )}
                <Button submitFor="button" action={closeUserForm}>
                  Cerrar
                </Button>
              </div>
              {message.message.length > 0 && (
                <MessageBox
                  isError={message.isError}
                  message={message.message}
                />
              )}
            </form>
          </Modal>
          <h1>Usuarios</h1>
          <div className={classes.users__header}>
            <input
              value={keyWord}
              onChange={changeKeyWord}
              className={classes.search_item}
              placeholder="Buscar usuario por nombre"
            />
            <Button
              submitFor="button"
              action={(e) => {
                setAction("create");
                openUserForm();
              }}
            >
              Añadir Usuario
            </Button>
          </div>
          <InventoryTable titles={TITLES}>
            {users.length === 0 ? (
              <tr></tr>
            ) : (
              users
                .filter((user) =>
                  `${user.first_name} ${user.last_name}`
                    .trim()
                    .toLowerCase()
                    .includes(keyWord.trim().toLowerCase())
                )
                .map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>{user.document_id}</td>
                    <td>{ROLES[user.user_type - 1]}</td>
                    <td className={classes.users__table__edit}>
                      <IconEdit
                        action={() => {
                          setAction("update");
                          setInputsForm(user);
                          openUserForm();
                        }}
                      />
                      <IconTrash
                        action={() => {
                          setAction("delete");
                          setInputsForm(user);
                          openUserForm();
                        }}
                      />
                      <IconDetails
                        action={() => {
                          setAction("details");
                          setInputsForm(user);
                          openUserForm();
                        }}
                      />
                    </td>
                  </tr>
                ))
            )}
          </InventoryTable>
        </Fragment>
      )}
    </div>
  );
};

export default UsersPage;
