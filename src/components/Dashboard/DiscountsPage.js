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
import IconEdit from "../UI/Icons/IconEdit";
import IconTrash from "../UI/Icons/IconTrash";
import IconDetails from "../UI/Icons/IconDetails";
import SelectForm from "../Form/SelectForm";
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
  const { token } = useSelector((state) => state.auth);
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
        await axios.put(
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
        await axios.delete(`discount/${discountId}`, {
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
    details: "Detalles",
  };

  const {
    value: discountId,
    isValid: discountIdIsValid,
    setInputValue: setDiscountId,
    reset: resetDiscountId,
  } = useForm((value) => /^[0-9\b]+$/.test(value));

  const {
    value: discountName,
    isValid: discountNameIsValid,
    hasError: discountNameHasError,
    changeInputValueHandler: changeDiscountName,
    setInputValue: setDiscountName,
    inputBlurHandler: discountNameBlurHandler,
    reset: resetDiscountName,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: discountDescription,
    isValid: discountDescriptionIsValid,
    hasError: discountDescriptionHasError,
    changeInputValueHandler: changeDiscountDescription,
    setInputValue: setDiscountDescription,
    inputBlurHandler: discountDescriptionBlurHandler,
    reset: resetDiscountDescription,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: discountInitDate,
    isValid: discountInitDateIsValid,
    hasError: discountInitDateHasError,
    changeInputValueHandler: changeDiscountInitDate,
    setInputValue: setDiscountInitDate,
    inputBlurHandler: discountInitDateBlurHandler,
    reset: resetDiscountInitDate,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: discountEndDate,
    isValid: discountEndDateIsValid,
    hasError: discountEndDateHasError,
    changeInputValueHandler: changeDiscountEndDate,
    setInputValue: setDiscountEndDate,
    inputBlurHandler: discountEndDateBlurHandler,
    reset: resetDiscountEndDate,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: discountStatus,
    isValid: discountStatusIsValid,
    hasError: discountStatusHasError,
    changeInputValueHandler: changeDiscountStatus,
    setInputValue: setDiscountStatus,
    inputBlurHandler: discountStatusBlurHandler,
    reset: resetDiscountStatus,
  } = useForm((value) => +value === 0 || +value === 1);

  const {
    value: discountValue,
    isValid: discountValueIsValid,
    hasError: discountValueHasError,
    changeInputValueHandler: changeDiscountValue,
    setInputValue: setDiscountValue,
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

  const setDiscountData = (discount) => {
    setDiscountId(discount.id);
    setDiscountName(discount.discount_name);
    setDiscountDescription(discount.discount_description);
    setDiscountInitDate(discount.ini_date);
    setDiscountEndDate(discount.final_date);
    setDiscountValue(discount.discount_value);
    setDiscountStatus(discount.discount_status ? 0 : 1);
  };

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
          <Modal
            size={action === "delete" ? "small_card" : "big_card"}
            show={discountForm}
            closeModal={closeDiscountForm}
          >
            <h1>{optionsAction[action]} Descuento</h1>
            <form onSubmit={submitDiscount} className={classes.form_control}>
              {action === "delete" && (
                <div>
                  <h5 style={{ textAlign: "center" }}>
                    ¿Está seguro que desea eliminar {discountName}?
                  </h5>
                </div>
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
                    disabled={action === "details"}
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
                    disabled={action === "details"}
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
                    disabled={action === "details"}
                  />
                  <SelectForm
                    id="status__input"
                    change={changeDiscountStatus}
                    blur={discountStatusBlurHandler}
                    value={discountStatus}
                    list={["Activo", "Inactivo"]}
                    accesKey="cat_name"
                    disabled={action === "details"}
                    labelMessage="Estado"
                    errorMessage="Seleccione una opción válida."
                    expression={(value, index) => index}
                  />
                  <label htmlFor="status__input">Estado</label>
                  <select
                    onChange={changeDiscountStatus}
                    onBlur={discountStatusBlurHandler}
                    value={discountStatus}
                    required
                    id="status__input"
                    disabled={action === "details"}
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
                    disabled={action === "details"}
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
                    disabled={action === "details"}
                  />
                </Fragment>
              )}
              <div className={classes.form_control__buttons}>
                {action !== "details" && (
                  <Button isInvalid={!formIsValid} submitFor="submit">
                    {optionsAction[action]}
                  </Button>
                )}
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
                  <td>{discount.discount_name}</td>
                  <td>{discount.discount_description}</td>
                  <td>{discount.ini_date.split("T")[0]}</td>
                  <td>{discount.final_date.split("T")[0]}</td>
                  <td>{discount.discount_status ? "Activo" : "Inactivo"}</td>
                  <td className={classes.product_list__table__edit}>
                    <IconEdit
                      action={() => {
                        setAction("update");
                        setDiscountData(discount);
                        setDiscountForm(true);
                      }}
                    />
                    <IconTrash
                      action={() => {
                        setAction("delete");
                        setDiscountData(discount);
                        setDiscountForm(true);
                      }}
                    />
                    <IconDetails
                      action={() => {
                        setAction("details");
                        setDiscountData(discount);
                        setDiscountForm(true);
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

export default DiscountsPage;
