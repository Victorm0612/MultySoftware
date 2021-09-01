import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import InputForm from "../Form/InputForm";
import Button from "../UI/Button";
import InventoryTable from "../UI/InventoryTable";
import MessageBox from "../UI/MessageBox";
import Modal from "../UI/Modal";
import SpinnerLoading from "../UI/SpinnerLoading";
import { axiosInstance as axios } from "../../config/axiosConfig";

import classes from "./shared.module.css";
const DiscountsPage = () => {
  const TITLES = [
    "#",
    "Titulo",
    "Descripción",
    "Inicio",
    "Final",
    "Valor",
    "Estado",
  ];
  const [discounts, setDiscounts] = useState(null);
  const [action, setAction] = useState("get");
  const [discountForm, setDiscountForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useSelector((state) => state.userData);
  const [message, setMessage] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    const resetInputs = () => {
      resetDiscountDescription();
      resetDiscountEndDate();
      resetDiscountInitDate();
      resetDiscountValue();
      resetDiscountStatus();
      resetDiscountName();
      resetDiscountId();
    };
    const getDiscounts = async () => {
      try {
        const { data: response } = await axios.get("discount/", {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data);
        setDiscounts(response.data);
      } catch (error) {
        console.log(error.response);
      } finally {
        setIsLoading(false);
      }
    };
    const createDiscounts = async () => {
      try {
        await axios.post(
          "discount/",
          {
            title: discountName,
            dis_description: discountDescription,
            ini_date: discountInitDate,
            final_date: discountEndDate,
            discount_status: +discountStatus === 0 ? true : false,
            dis_value: discountValue,
          },
          { headers: { Authorization: token } }
        );
        setMessage({
          isError: false,
          message: "¡Se ha creado el descuento con éxito!",
        });
      } catch (error) {
        console.log(error.response);
        setMessage({
          isError: true,
          message: "¡No se ha creado el descuento!",
        });
      } finally {
        setAction("get");
        setIsLoading(false);
        resetInputs();
      }
    };
    const updateDiscounts = async () => {
      try {
        const response = await axios.put(
          `discount/${discountId}`,
          {
            title: discountName,
            dis_description: discountDescription,
            ini_date: discountInitDate,
            final_date: discountEndDate,
            discount_status: +discountStatus === 0 ? true : false,
            dis_value: discountValue,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setMessage({
          isError: false,
          message: "¡Se ha actualizado la información correctamente!",
        });
      } catch (error) {
        console.log(error.response);
        setMessage({
          isError: true,
          message: "¡Ha ocurrido un error al actualizar la información!",
        });
      } finally {
        setAction("get");
        setIsLoading(false);
        resetInputs();
      }
    };
    const deleteDiscounts = async () => {
      try {
        const response = await axios.delete(`discount/${discountId}`, {
          headers: {
            Authorization: token,
          },
        });
        setMessage({
          isError: false,
          message: "¡Se ha eliminado el descuento de forma exitosa!",
        });
      } catch (error) {
        console.log(error.response);
        setMessage({
          isError: true,
          message: "!Ha ocurrido un error al eliminar el descuento!",
        });
      } finally {
        setAction("get");
        setIsLoading(false);
      }
    };

    const actionToDo = {
      create: createDiscounts,
      get: getDiscounts,
      update: updateDiscounts,
      delete: deleteDiscounts,
    };
    if (isLoading) {
      actionToDo[action]();
    }
  }, [action, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const openDiscountForm = (e) => {
    e.preventDefault();
    setDiscountForm(true);
  };

  const closeDiscountForm = (e) => {
    e.preventDefault();
    setDiscountForm(false);
    setMessage({
      isError: false,
      message: "",
    });
  };

  const optionsAction = {
    get: "Crear",
    create: "Crear",
    update: "Actualizar",
    delete: "Eliminar",
  };

  const {
    value: discountId,
    isValid: discountIdIsValid,
    hasError: discountIdHasError,
    changeInputValueHandler: changeDiscountId,
    /* setInputValue: setDiscountId, */
    inputBlurHandler: discountIdBlurHandler,
    reset: resetDiscountId,
  } = useForm((value) => /^[0-9\b]+$/.test(value));

  const {
    value: discountName,
    isValid: discountNameIsValid,
    hasError: discountNameHasError,
    changeInputValueHandler: changeDiscountName,
    /* setInputValue: setDiscountName, */
    inputBlurHandler: discountNameBlurHandler,
    reset: resetDiscountName,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: discountDescription,
    isValid: discountDescriptionIsValid,
    hasError: discountDescriptionHasError,
    changeInputValueHandler: changeDiscountDescription,
    /* setInputValue: setDiscountDescription, */
    inputBlurHandler: discountDescriptionBlurHandler,
    reset: resetDiscountDescription,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: discountInitDate,
    isValid: discountInitDateIsValid,
    hasError: discountInitDateHasError,
    changeInputValueHandler: changeDiscountInitDate,
    /* setInputValue: setDiscountInitDate, */
    inputBlurHandler: discountInitDateBlurHandler,
    reset: resetDiscountInitDate,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: discountEndDate,
    isValid: discountEndDateIsValid,
    hasError: discountEndDateHasError,
    changeInputValueHandler: changeDiscountEndDate,
    /* setInputValue: setDiscountEndDate, */
    inputBlurHandler: discountEndDateBlurHandler,
    reset: resetDiscountEndDate,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: discountStatus,
    isValid: discountStatusIsValid,
    hasError: discountStatusHasError,
    changeInputValueHandler: changeDiscountStatus,
    /* setInputValue: setDiscountStatus, */
    inputBlurHandler: discountStatusBlurHandler,
    reset: resetDiscountStatus,
  } = useForm((value) => +value === 0 || +value === 1);

  const {
    value: discountValue,
    isValid: discountValueIsValid,
    hasError: discountValueHasError,
    changeInputValueHandler: changeDiscountValue,
    /* setInputValue: setDiscountValue, */
    inputBlurHandler: discountValueBlurHandler,
    reset: resetDiscountValue,
  } = useForm((value) => /^[0-9\b]+$/.test(value));

  let formIsValid =
    action === "delete"
      ? discountStatusIsValid
      : discountNameIsValid &&
        discountDescriptionIsValid &&
        discountValueIsValid &&
        discountStatusIsValid &&
        discountInitDateIsValid &&
        discountEndDateIsValid &&
        (action === "update" ? discountIdIsValid : true);

  const submitDiscount = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className={classes.discount_page}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Fragment>
          <Modal show={discountForm} closeModal={closeDiscountForm}>
            <h1>{optionsAction[action]} Descuento</h1>
            <form onSubmit={submitDiscount} className={classes.form_control}>
              {action !== "create" && (
                <InputForm
                  id="id__input"
                  labelMessage="Id del descuento"
                  change={changeDiscountId}
                  value={discountId}
                  blur={discountIdBlurHandler}
                  typeInput="text"
                  inputHasError={discountIdHasError}
                  errorMessage="Ingrese un id válido."
                  keyPress={true}
                />
              )}
              {action !== "delete" && (
                <Fragment>
                  <InputForm
                    id="name__input"
                    labelMessage="Nombre"
                    change={changeDiscountName}
                    value={discountName}
                    blur={discountNameBlurHandler}
                    typeInput="text"
                    inputHasError={discountNameHasError}
                    errorMessage="Ingresa un nombre válido."
                  />
                  <InputForm
                    id="description__input"
                    labelMessage="Descripción"
                    change={changeDiscountDescription}
                    value={discountDescription}
                    blur={discountDescriptionBlurHandler}
                    typeInput="text"
                    inputHasError={discountDescriptionHasError}
                    errorMessage="Ingresa una descripción válida."
                  />
                  <InputForm
                    id="value__input"
                    labelMessage="Valor"
                    change={changeDiscountValue}
                    value={discountValue}
                    blur={discountValueBlurHandler}
                    typeInput="text"
                    keyPress={true}
                    inputHasError={discountValueHasError}
                    errorMessage="Ingresa un valor válido."
                  />
                  <label htmlFor="status__input">Estado</label>
                  <select
                    onChange={changeDiscountStatus}
                    onBlur={discountStatusBlurHandler}
                    value={discountStatus}
                    required
                    id="status__input"
                  >
                    <option value={0}>Activo</option>
                    <option value={1}>Inactivo</option>
                  </select>
                  {discountStatusHasError && (
                    <p className={classes.error_message}>
                      Seleccione una opción válida.
                    </p>
                  )}
                  <InputForm
                    id="initDate__input"
                    labelMessage="Fecha de inicio"
                    blur={discountInitDateBlurHandler}
                    change={changeDiscountInitDate}
                    value={discountInitDate}
                    typeInput="date"
                    minDate={true}
                    inputHasError={discountInitDateHasError}
                    errorMessage="La fecha de inicio no puede ser una fecha vencida."
                  />
                  <InputForm
                    id="endDate__input"
                    labelMessage="Fecha final"
                    blur={discountEndDateBlurHandler}
                    change={changeDiscountEndDate}
                    value={discountEndDate}
                    typeInput="date"
                    minDate={true}
                    inputHasError={discountEndDateHasError}
                    errorMessage="La fecha de inicio no puede ser una fecha vencida."
                  />
                </Fragment>
              )}
              <div className={classes.form_control__buttons}>
                <Button isInvalid={!formIsValid} submitFor="submit">
                  {optionsAction[action]}
                </Button>
                <Button submitFor="button" action={closeDiscountForm}>
                  Cancelar
                </Button>
              </div>
              <MessageBox isError={message.isError} message={message.message} />
            </form>
          </Modal>
          <h1>Descuentos Disponibles</h1>
          <div className={classes.discount_page__header}>
            <Button
              submitFor="button"
              action={(e) => {
                setAction("create");
                openDiscountForm(e);
              }}
            >
              Añadir Descuento
            </Button>
          </div>
          <InventoryTable titles={TITLES}>
            {discounts.length === 0 ? (
              <tr></tr>
            ) : (
              discounts.map((discount, index) => (
                <tr key={index}>
                  <td>{discount.id}</td>
                  <td>{discount.title}</td>
                  <td>{discount.dis_description}</td>
                  <td>{discount.ini_date.split("T")[0]}</td>
                  <td>{discount.final_date.split("T")[0]}</td>
                  <td>{discount.discount_status ? "Activo" : "Inactivo"}</td>
                  <td className={classes.product_list__table__edit}>
                    <svg
                      onClick={() => {
                        setAction("update");
                        setDiscountForm(true);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                    <svg
                      onClick={() => {
                        setAction("delete");
                        setDiscountForm(true);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
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

export default DiscountsPage;
