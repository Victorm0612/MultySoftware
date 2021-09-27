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
import IconTrash from "../UI/Icons/IconTrash";
import IconEdit from "../UI/Icons/IconEdit";
import IconDetails from "../UI/Icons/IconDetails";

const CategoriesPage = () => {
  const TITLES = ["#", "Nombre", "Descripción", "Estado", "Opciones"];
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [keyWord, setKeyWord] = useState("");
  const [categoryForm, setCategoryForm] = useState(false);
  const [action, setAction] = useState("get");
  const { token } = useSelector((state) => state.auth);
  const [message, setMessage] = useState({
    isError: false,
    message: "",
  });

  const resetForm = () => {
    resetCategoryId();
    resetCategoryName();
    resetCategoryDescription();
    resetCategoryStatus();
  };

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
        resetForm();
        setMessage({ isError: false, message: "" });
      }
    };
    const getCategories = async () => {
      try {
        const { data: response } = await axios.get("category/");
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
        resetForm();
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
        resetForm();
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

  const changeKeyWord = (e) => {
    setKeyWord(e.target.value);
  };

  const openCategoryForm = (e) => {
    e.preventDefault();
    setCategoryForm(true);
  };

  const closeCategoryForm = (e) => {
    e.preventDefault();
    setCategoryForm(false);
    resetForm();
  };

  const {
    value: categoryId,
    isValid: categoryIdIsValid,
    setInputValue: setCategoryId,
    reset: resetCategoryId,
  } = useForm((value) => /^[0-9\b]+$/.test(value));

  const {
    value: categoryName,
    isValid: categoryNameIsValid,
    hasError: categoryNameHasError,
    changeInputValueHandler: changeCategoryName,
    setInputValue: setCategoryName,
    inputBlurHandler: categoryNameBlurHandler,
    reset: resetCategoryName,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: categoryDescription,
    isValid: categoryDescriptionIsValid,
    hasError: categoryDescriptionHasError,
    changeInputValueHandler: changeCategoryDescription,
    setInputValue: setCategoryDescription,
    inputBlurHandler: categoryDescriptionBlurHandler,
    reset: resetCategoryDescription,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: categoryStatus,
    isValid: categoryStatusIsValid,
    hasError: categoryStatusHasError,
    changeInputValueHandler: changeCategoryStatus,
    setInputValue: setCategoryStatus,
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
    details: "Detalles de",
  };

  const setInputsForm = (category) => {
    setCategoryId(category.id);
    setCategoryName(category.cat_name);
    setCategoryDescription(category.cat_description);
    setCategoryStatus(category.cat_status ? 0 : 1);
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
          <Modal
            size={action === "delete" ? "small_card" : "big_card"}
            show={categoryForm}
            closeModal={closeCategoryForm}
          >
            <h1>{optionsAction[action]} Categoría</h1>
            <form
              onSubmit={submitCreateCategory}
              className={classes.form_control}
            >
              {action === "delete" && (
                <div>
                  <h5 style={{ textAlign: "center" }}>
                    ¿Está seguro que desea eliminar {categoryName}?
                  </h5>
                </div>
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
                    disabled={action === "details"}
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
                    disabled={action === "details"}
                  />
                  <label htmlFor="status__input">Estado</label>
                  <select
                    onChange={changeCategoryStatus}
                    onBlur={categoryStatusBlurHandler}
                    value={categoryStatus}
                    required
                    id="status__input"
                    disabled={action === "details"}
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
                {action !== "details" && (
                  <Button isInvalid={!formIsValid} submitFor="submit">
                    {optionsAction[action]}
                  </Button>
                )}
                <Button submitFor="button" action={closeCategoryForm}>
                  Cancelar
                </Button>
              </div>
              <MessageBox isError={message.isError} message={message.message} />
            </form>
          </Modal>
          <h1>Categorías</h1>
          <div className={classes.categories__header}>
            <input
              value={keyWord}
              onChange={changeKeyWord}
              className={classes.search_item}
              placeholder="Buscar"
            />
            <Button
              submitFor="button"
              action={(e) => {
                setAction("create");
                openCategoryForm(e);
              }}
            >
              Añadir Categoría
            </Button>
          </div>
          <InventoryTable titles={TITLES}>
            {categories.length === 0 ? (
              <tr></tr>
            ) : (
              categories
                .filter((category) =>
                  category.cat_name
                    .trim()
                    .toLowerCase()
                    .includes(keyWord.trim().toLowerCase())
                )
                .map((category, index) => (
                  <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.cat_name}</td>
                    <td>{category.cat_description}</td>
                    <td>{category.cat_status ? "Activo" : "Inactivo"}</td>
                    <td className={classes.product_list__table__edit}>
                      <IconEdit
                        action={() => {
                          setAction("update");
                          setInputsForm(category);
                          setCategoryForm(true);
                        }}
                      />
                      <IconTrash
                        action={() => {
                          setAction("delete");
                          setInputsForm(category);
                          setCategoryForm(true);
                        }}
                      />
                      <IconDetails
                        action={() => {
                          setAction("details");
                          setInputsForm(category);
                          setCategoryForm(true);
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

export default CategoriesPage;
