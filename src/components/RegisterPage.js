import classes from "./RegisterPage.module.css";
import { Link } from "react-router-dom";
import Card from "./UI/Card";
import Button from "./UI/Button";
import { useState } from "react";
const RegisterPage = () => {
  const DOCUMENT_TYPES = [
    "Cédula de Ciudadania",
    "Cédula de extranjería",
    "Pasaporte",
    "NIT",
  ];
  const GENDERS = ["Masculino", "Femenino", "Otro"];

  const [enteredData, setEnteredData] = useState({
    document_type: 1,
    document_id: "",
    first_name: "",
    last_name: "",
    gender: "M",
    phone: "",
    birthday: "",
    user_type: 1,
    user_status: true,
    email: "",
    password: "",
  });
  const [passwordConfirmed, setPasswordConfirmed] = useState("");

  const changeDocumentType = (e) => {
    setEnteredData((prevState) => {
      return {
        document_type: e.target.value,
        ...prevState,
      };
    });
  };

  const changeDocumentId = (e) => {
    setEnteredData((prevState) => {
      return {
        ...prevState,
        document_id: e.target.value,
      };
    });
  };

  const changeFirstName = (e) => {
    setEnteredData((prevState) => {
      return {
        ...prevState,
        first_name: e.target.value,
      };
    });
  };

  const changeLastName = (e) => {
    setEnteredData((prevState) => {
      return {
        ...prevState,
        last_name: e.target.value,
      };
    });
  };

  const changeGender = (e) => {
    setEnteredData((prevState) => {
      return {
        ...prevState,
        gender: e.target.value,
      };
    });
  };

  const changePhone = (e) => {
    setEnteredData((prevState) => {
      return {
        ...prevState,
        phone: e.target.value,
      };
    });
  };

  const changeBirthday = (e) => {
    setEnteredData((prevState) => {
      return {
        ...prevState,
        birthday: e.target.value,
      };
    });
  };

  const changeEmail = (e) => {
    setEnteredData((prevState) => {
      return {
        ...prevState,
        email: e.target.value,
      };
    });
  };

  const changePassword = (e) => {
    setEnteredData((prevState) => {
      return {
        ...prevState,
        password: e.target.value,
      };
    });
  };

  const changePasswordConfirmed = (e) => {
    setPasswordConfirmed(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(enteredData);
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
          <label htmlFor="name__input">Nombre</label>
          <input
            onChange={changeFirstName}
            value={enteredData.first_name}
            required
            id="name__input"
            type="text"
          />
          <label htmlFor="last_name__input">Apellido</label>
          <input
            onChange={changeLastName}
            value={enteredData.last_name}
            required
            id="last_name__input"
            type="text"
          />
          <label htmlFor="document-type__input">Tipo de documento</label>
          <select
            onChange={changeDocumentType}
            value={enteredData.document_type}
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
          <label htmlFor="document-number__input">Número de documento</label>
          <input
            onChange={changeDocumentId}
            value={enteredData.document_id}
            required
            id="document-number__input"
            type="number"
            minLength="8"
            min="0"
          />
          <label htmlFor="gender__input">Género</label>
          <select
            onChange={changeGender}
            value={enteredData.gender}
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
          <label htmlFor="email__input">Correo electrónico</label>
          <input
            onChange={changeEmail}
            value={enteredData.email}
            required
            id="email__input"
            type="email"
          />
          <label htmlFor="password__input">Contraseña</label>
          <input
            onChange={changePassword}
            value={enteredData.password}
            required
            id="password__input"
            type="password"
            minLength="8"
          />
          <label htmlFor="password-confirmed__input">
            Confirmar contraseña
          </label>
          <input
            onChange={changePasswordConfirmed}
            value={passwordConfirmed}
            required
            id="password-confirmed__input"
            type="password"
            minLength="8"
          />
          <label htmlFor="phone__input">Teléfono</label>
          <input
            onChange={changePhone}
            value={enteredData.phone}
            required
            id="phone__input"
            type="number"
            min="0"
            minLength="10"
          />
          <label htmlFor="birthday__input">Fecha de Nacimiento</label>
          <input
            onChange={changeBirthday}
            value={enteredData.birthday}
            required
            id="birthday__input"
            type="date"
          />
          <Button submitFor="submit">Registrarse</Button>
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
