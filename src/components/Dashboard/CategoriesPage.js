import classes from "./shared.module.css";
import Button from "../UI/Button";
import InventoryTable from "../UI/InventoryTable";
import { axiosInstance as axios } from "../../config/axiosConfig";
import { Fragment, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import InputForm from "../Form/InputForm";
import useForm from "../../hooks/useForm";
import MessageBox from "../UI/MessageBox";
import SpinnerLoading from "../UI/SpinnerLoading";
import { useSelector } from "react-redux";

const CategoriesPage = () => {
  const TITLES = ["#", "Nombre", "Descripción", "Estado", "Opciones"];
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [categoryForm, setCategoryForm] = useState(false);
  const [action, setAction] = useState("get");
  const { token } = useSelector((state) => state.userData);
  const [message, setMessage] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    const createCategories = async () => {
      try {
        const response = await axios.post(
          "category/",
          {
            cat_name: categoryName,
            cat_description: categoryDescription,
            cat_status: +categoryStatus === 0 ? true : false,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        setMessage({
          isError: false,
          message: "¡Se ha creado la categoría con éxito!",
        });
      } catch (error) {
        setMessage({
          isError: true,
          message:
            "¡Ha ocurrido un error al crear la categoría! " +
            error.response.data.message,
        });
      } finally {
        setAction("get");
        setIsLoading(false);
        resetCategoryName();
        resetCategoryDescription();
        resetCategoryStatus();
        setMessage({ isError: false, message: "" });
      }
    };
    const getCategories = async () => {
      try {
        const { data: response } = await axios.get("category/");
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.log(error.response);
      } finally {
        setIsLoading(false);
        setAction("create");
      }
    };
    const updateCategories = async () => {
      try {
        const response = await axios.put(
          `category/${categoryId}`,
          {
            cat_name: categoryName,
            cat_description: categoryDescription,
            cat_status: +categoryStatus === 0 ? true : false,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        setMessage({
          isError: false,
          message: "¡Se ha actualizado la categoría con éxito!",
        });
      } catch (error) {
        console.log(error.response);
        setMessage({
          isError: true,
          message:
            "¡Ha ocurrido un error al crear la categoría! " +
            error.response.data.message,
        });
      } finally {
        setAction("get");
        setIsLoading(false);
        resetCategoryId();
        resetCategoryName();
        resetCategoryDescription();
        resetCategoryStatus();
        setMessage({ isError: false, message: "" });
      }
    };
    const deleteCategories = async () => {
      try {
        const response = await axios.delete(`category/${categoryId}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response);
        setMessage({
          isError: false,
          message: "¡Se ha eliminado la categoría con éxito!",
        });
      } catch (error) {
        console.log(error.response);
        setMessage({
          isError: true,
          message:
            "¡Ha ocurrido un error al eliminar la categoría! " +
            error.response.data.message,
        });
      } finally {
        setAction("get");
        setIsLoading(false);
        resetCategoryId();
        resetCategoryName();
        resetCategoryDescription();
        resetCategoryStatus();
        setMessage({ isError: false, message: "" });
      }
    };

    if (action === "get" && isLoading) {
      getCategories();
    }
    if (action === "create" && isLoading) {
      createCategories();
    }
    if (action === "update" && isLoading) {
      updateCategories();
    }
    if (action === "delete" && isLoading) {
      deleteCategories();
    }
  }, [action, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const openCategoryForm = (e) => {
    e.preventDefault();
    setCategoryForm(true);
  };

  const closeCategoryForm = (e) => {
    e.preventDefault();
    setCategoryForm(false);
  };

  const {
    value: categoryId,
    isValid: categoryIdIsValid,
    hasError: categoryIdHasError,
    changeInputValueHandler: changeCategoryId,
    /* setInputValue: setCategoryId, */
    inputBlurHandler: categoryIdBlurHandler,
    reset: resetCategoryId,
  } = useForm((value) => /^[0-9\b]+$/.test(value));

  const {
    value: categoryName,
    isValid: categoryNameIsValid,
    hasError: categoryNameHasError,
    changeInputValueHandler: changeCategoryName,
    /* setInputValue: setCategoryName, */
    inputBlurHandler: categoryNameBlurHandler,
    reset: resetCategoryName,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: categoryDescription,
    isValid: categoryDescriptionIsValid,
    hasError: categoryDescriptionHasError,
    changeInputValueHandler: changeCategoryDescription,
    /* setInputValue: setCategoryDescription, */
    inputBlurHandler: categoryDescriptionBlurHandler,
    reset: resetCategoryDescription,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: categoryStatus,
    isValid: categoryStatusIsValid,
    hasError: categoryStatusHasError,
    changeInputValueHandler: changeCategoryStatus,
    /* setInputValue: setCategoryStatus, */
    inputBlurHandler: categoryStatusBlurHandler,
    reset: resetCategoryStatus,
  } = useForm((value) => +value === 0 || +value === 1);

  let formIsValid =
    action === "delete"
      ? categoryStatusIsValid
      : categoryNameIsValid &&
        categoryDescriptionIsValid &&
        categoryStatusIsValid &&
        (action === "update" ? categoryIdIsValid : true);

  const optionsAction = {
    get: "Crear",
    create: "Crear",
    update: "Actualizar",
    delete: "Eliminar",
  };
  const submitCreateCategory = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };
  return (
    <div className={classes.categories}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Fragment>
          <Modal show={categoryForm} closeModal={closeCategoryForm}>
            <h1>{optionsAction[action]} Categoría</h1>
            <form
              onSubmit={submitCreateCategory}
              className={classes.form_control}
            >
              {action !== "create" && (
                <InputForm
                  id="id__input"
                  labelMessage="Id de la categoría"
                  change={changeCategoryId}
                  value={categoryId}
                  blur={categoryIdBlurHandler}
                  typeInput="text"
                  inputHasError={categoryIdHasError}
                  errorMessage="Ingrese un id válido."
                  keyPress={true}
                />
              )}
              {action !== "delete" && (
                <Fragment>
                  <InputForm
                    id="name__input"
                    labelMessage="Nombre"
                    change={changeCategoryName}
                    value={categoryName}
                    blur={categoryNameBlurHandler}
                    typeInput="text"
                    inputHasError={categoryNameHasError}
                    errorMessage="Ingresa un nombre válido."
                  />
                  <InputForm
                    id="description__input"
                    labelMessage="Descripción"
                    change={changeCategoryDescription}
                    value={categoryDescription}
                    blur={categoryDescriptionBlurHandler}
                    typeInput="text"
                    inputHasError={categoryDescriptionHasError}
                    errorMessage="Ingresa una descripción válida."
                  />
                  <label htmlFor="status__input">Estado</label>
                  <select
                    onChange={changeCategoryStatus}
                    onBlur={categoryStatusBlurHandler}
                    value={categoryStatus}
                    required
                    id="status__input"
                  >
                    <option value={0}>Activo</option>
                    <option value={1}>Inactivo</option>
                  </select>
                  {categoryStatusHasError && (
                    <p className={classes.error_message}>
                      Seleccione una opción válida.
                    </p>
                  )}
                </Fragment>
              )}
              <div className={classes.form_control__buttons}>
                <Button isInvalid={!formIsValid} submitFor="submit">
                  {optionsAction[action]}
                </Button>
                <Button submitFor="button" action={closeCategoryForm}>
                  Cancelar
                </Button>
              </div>
              <MessageBox isError={message.isError} message={message.message} />
            </form>
          </Modal>
          <h1>Categorías</h1>
          <div className={classes.categories__header}>
            <Button
              submitFor="button"
              action={(e) => {
                setAction("create");
                openCategoryForm(e);
              }}
            >
              Añadir Producto
            </Button>
          </div>
          <InventoryTable titles={TITLES}>
            {categories.length === 0 ? (
              <tr></tr>
            ) : (
              categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.id}</td>
                  <td>{category.cat_name}</td>
                  <td>{category.cat_description}</td>
                  <td>{category.cat_status ? "Activo" : "Inactivo"}</td>
                  <td className={classes.product_list__table__edit}>
                    <svg
                      onClick={() => {
                        setAction("update");
                        setCategoryForm(true);
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
                        setCategoryForm(true);
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

export default CategoriesPage;
