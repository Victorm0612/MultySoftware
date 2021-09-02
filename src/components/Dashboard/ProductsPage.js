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

const ProductsPage = () => {
  const TITLES = [
    "#",
    "Descripción",
    "Categoría",
    "Precio",
    "Descuento",
    "Disponible", //queda pendiente IVA en detalles
    "Opciones",
  ];
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [discounts, setDiscounts] = useState(null);
  const [action, setAction] = useState("get");
  const [productForm, setProductForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useSelector((state) => state.userData);
  const [message, setMessage] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    const resetInputs = () => {
      resetProductId();
      resetProductName();
      resetProductDescription();
      resetProductPrice();
      resetProductStatus();
      resetProductCategories();
      resetProductDiscounts();
      resetProductTax();
    };
    const getProducts = async () => {
      try {
        const { data: discountResponse } = await axios.get("discount/");
        const { data: categoryResponse } = await axios.get("category/");
        const { data: response } = await axios.get("product/");
        setDiscounts(discountResponse.data);
        setCategories(categoryResponse.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error.response);
      } finally {
        setIsLoading(false);
      }
    };
    const createProducts = async () => {
      try {
        await axios.post(
          "product/",
          {
            pro_description: productDescription,
            pro_image: null,
            price: productPrice,
            category_id: productCategories,
            discount_id: productDiscounts,
            pro_status: +productStatus === 0 ? true : false,
            percentage_tax: productTax,
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
    const updateProducts = async () => {
      try {
        const response = await axios.put(
          `product/${productId}`,
          {
            pro_description: productDescription,
            pro_image: null,
            price: productPrice,
            category_id: +productCategories,
            discount_id: +productDiscounts,
            pro_status: +productStatus === 0 ? true : false,
            percentage_tax: productTax,
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
    const deleteProducts = async () => {
      try {
        const response = await axios.delete(`product/${productId}`, {
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
      create: createProducts,
      get: getProducts,
      update: updateProducts,
      delete: deleteProducts,
    };
    if (isLoading) {
      actionToDo[action]();
    }
  }, [action, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const openProductForm = (e) => {
    e.preventDefault();
    setProductForm(true);
  };

  const closeProductForm = (e) => {
    e.preventDefault();
    setProductForm(false);
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
    value: productId,
    isValid: productIdIsValid,
    hasError: productIdHasError,
    changeInputValueHandler: changeProductId,
    /*     setInputValue: setProductId, */
    inputBlurHandler: productIdBlurHandler,
    reset: resetProductId,
  } = useForm((value) => /^[0-9\b]+$/.test(value));

  const {
    value: productName,
    isValid: productNameIsValid,
    hasError: productNameHasError,
    changeInputValueHandler: changeProductName,
    /* setInputValue: setProductName, */
    inputBlurHandler: productNameBlurHandler,
    reset: resetProductName,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: productDescription,
    isValid: productDescriptionIsValid,
    hasError: productDescriptionHasError,
    changeInputValueHandler: changeProductDescription,
    /* setInputValue: setProductDescription, */
    inputBlurHandler: productDescriptionBlurHandler,
    reset: resetProductDescription,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: productStatus,
    isValid: productStatusIsValid,
    hasError: productStatusHasError,
    changeInputValueHandler: changeProductStatus,
    /* setInputValue: setProductStatus, */
    inputBlurHandler: productStatusBlurHandler,
    reset: resetProductStatus,
  } = useForm((value) => +value === 0 || +value === 1);

  const {
    value: productPrice,
    isValid: productPriceIsValid,
    hasError: productPriceHasError,
    changeInputValueHandler: changeProductPrice,
    /* setInputValue: setProductValue, */
    inputBlurHandler: productPriceBlurHandler,
    reset: resetProductPrice,
  } = useForm((value) => /^[0-9\b]+$/.test(value));

  const {
    value: productTax,
    isValid: productTaxIsValid,
    hasError: productTaxHasError,
    changeInputValueHandler: changeProductTax,
    /* setInputValue: setProductTax, */
    inputBlurHandler: productTaxBlurHandler,
    reset: resetProductTax,
  } = useForm((value) => /^[0-9\b]+$/.test(value));

  const {
    value: productCategories,
    isValid: productCategoriesIsValid,
    hasError: productCategoriesHasError,
    changeInputValueHandler: changeProductCategories,
    /* setInputValue: setProductCategories, */
    inputBlurHandler: productCategoriesBlurHandler,
    reset: resetProductCategories,
  } = useForm((value) => /^[0-9\b]+$/.test(value), 0);

  const {
    value: productDiscounts,
    isValid: productDiscountsIsValid,
    hasError: productDiscountsHasError,
    changeInputValueHandler: changeProductDiscounts,
    /* setInputValue: setProductDiscounts, */
    inputBlurHandler: productDiscountsBlurHandler,
    reset: resetProductDiscounts,
  } = useForm((value) => /^[0-9\b]+$/.test(value), 0);

  let formIsValid =
    action === "delete"
      ? productStatusIsValid
      : productNameIsValid &&
        productDescriptionIsValid &&
        productPriceIsValid &&
        productCategoriesIsValid &&
        productTaxIsValid &&
        productDiscountsIsValid &&
        productStatusIsValid &&
        (action === "update" ? productIdIsValid : true);

  const submitDiscount = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className={classes.product_list}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Fragment>
          <Modal show={productForm} closeModal={closeProductForm}>
            <h1>{optionsAction[action]} Producto</h1>
            <form onSubmit={submitDiscount} className={classes.form_control}>
              {action !== "create" && (
                <InputForm
                  id="id__input"
                  labelMessage="Id del descuento"
                  change={changeProductId}
                  value={productId}
                  blur={productIdBlurHandler}
                  typeInput="text"
                  inputHasError={productIdHasError}
                  errorMessage="Ingrese un id válido."
                  keyPress={true}
                />
              )}
              {action !== "delete" && (
                <Fragment>
                  <InputForm
                    id="name__input"
                    labelMessage="Nombre"
                    change={changeProductName}
                    value={productName}
                    blur={productNameBlurHandler}
                    typeInput="text"
                    inputHasError={productNameHasError}
                    errorMessage="Ingresa un nombre válido."
                  />
                  <InputForm
                    id="description__input"
                    labelMessage="Descripción"
                    change={changeProductDescription}
                    value={productDescription}
                    blur={productDescriptionBlurHandler}
                    typeInput="text"
                    inputHasError={productDescriptionHasError}
                    errorMessage="Ingresa una descripción válida."
                  />
                  <InputForm
                    id="value__input"
                    labelMessage="Valor"
                    change={changeProductPrice}
                    value={productPrice}
                    blur={productPriceBlurHandler}
                    typeInput="text"
                    keyPress={true}
                    inputHasError={productPriceHasError}
                    errorMessage="Ingresa un valor válido."
                  />
                  <InputForm
                    id="tax__input"
                    labelMessage="IVA"
                    change={changeProductTax}
                    value={productTax}
                    blur={productTaxBlurHandler}
                    typeInput="text"
                    keyPress={true}
                    inputHasError={productTaxHasError}
                    errorMessage="Ingresa un valor válido."
                  />
                  <label htmlFor="categories__input">Categorías</label>
                  <select
                    onChange={changeProductCategories}
                    onBlur={productCategoriesBlurHandler}
                    value={productCategories}
                    required
                    id="categories__input"
                  >
                    {categories.length === 0 ? (
                      <option value="0">No hay categorias</option>
                    ) : (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.cat_name}
                        </option>
                      ))
                    )}
                  </select>
                  {productCategoriesHasError && (
                    <p className={classes.error_message}>
                      Seleccione una opción válida.
                    </p>
                  )}
                  <label htmlFor="discounts__input">Descuentos</label>
                  <select
                    onChange={changeProductDiscounts}
                    onBlur={productDiscountsBlurHandler}
                    value={productDiscounts}
                    required
                    id="discounts__input"
                  >
                    {discounts.length === 0 ? (
                      <option value="0">No hay descuentos</option>
                    ) : (
                      discounts.map((discount) => (
                        <option key={discount.id} value={discount.id}>
                          {discount.title}
                        </option>
                      ))
                    )}
                  </select>
                  {productDiscountsHasError && (
                    <p className={classes.error_message}>
                      Seleccione una opción válida.
                    </p>
                  )}
                  <label htmlFor="status__input">Estado</label>
                  <select
                    onChange={changeProductStatus}
                    onBlur={productStatusBlurHandler}
                    value={productStatus}
                    required
                    id="status__input"
                  >
                    <option value={0}>Activo</option>
                    <option value={1}>Inactivo</option>
                  </select>
                  {productStatusHasError && (
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
                <Button submitFor="button" action={closeProductForm}>
                  Cancelar
                </Button>
              </div>
              <MessageBox isError={message.isError} message={message.message} />
            </form>
          </Modal>
          <h1>Productos Disponibles</h1>
          <div className={classes.product_list__header}>
            <Button
              submitFor="button"
              action={(e) => {
                setAction("create");
                openProductForm(e);
              }}
            >
              Añadir Producto
            </Button>
          </div>
          <InventoryTable titles={TITLES}>
            {products.length === 0 ? (
              <tr></tr>
            ) : (
              products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.pro_description}</td>
                  <td>
                    {
                      categories.filter(
                        (category, index) => index === product.category_id
                      )[0].cat_name
                    }
                  </td>
                  <td>{product.price}</td>
                  <td>
                    {
                      discounts.filter(
                        (discount, index) => index === product.discount_id
                      )[0].title
                    }
                  </td>
                  <td>{product.pro_status ? "Sí" : "No"}</td>
                  <td className={classes.product_list__table__edit}>
                    <svg
                      onClick={() => {
                        setAction("update");
                        setProductForm(true);
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
                        setProductForm(true);
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

export default ProductsPage;
