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
import productClasses from "./ProductsPage.module.css";
import IconEdit from "../UI/Icons/IconEdit";
import IconTrash from "../UI/Icons/IconTrash";
import IconDetails from "../UI/Icons/IconDetails";
import Ingredients from "../Ingredients/Ingredients";

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
  const [ingredients, setIngredients] = useState(null);
  const [keyWord, setKeyWord] = useState("");
  const [action, setAction] = useState("get");
  const [productForm, setProductForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showIngredientsList, setShowIngredientsList] = useState(false);
  const { token } = useSelector((state) => state.userData);
  const [message, setMessage] = useState({
    isError: false,
    message: "",
  });
  const resetInputs = () => {
    resetProductId();
    /* resetProductName(); */
    resetProductDescription();
    resetProductPrice();
    resetProductStatus();
    resetProductCategories();
    resetIngredientProduct();
    resetProductDiscounts();
    resetProductTax();
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data: discountResponse } = await axios.get("discount/");
        const { data: categoryResponse } = await axios.get("category/");
        const { data: ingredientsResponse } = await axios.get("ingredient/");
        const { data: response } = await axios.get("product/");
        setDiscounts(discountResponse.data);
        setCategories(categoryResponse.data);
        setIngredients(ingredientsResponse.data);
        setProducts(response.data);
        setProductDiscounts(discountResponse.data[0].id);
        setProductCategories(categoryResponse.data[0].id);
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
            category_id: +productCategories,
            discount_id: +productDiscounts,
            pro_status: +productStatus === 0 ? true : false,
            percentage_tax: productTax,
          },
          { headers: { Authorization: token } }
        );
        setMessage({
          isError: false,
          message: "¡Se ha creado el producto con éxito!",
        });
      } catch (error) {
        console.log(error.response);
        setMessage({
          isError: true,
          message: "¡No se ha creado el producto!",
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
        await axios.delete(`product/${productId}`, {
          headers: {
            Authorization: token,
          },
        });
        setMessage({
          isError: false,
          message: "¡Se ha eliminado el producto de forma exitosa!",
        });
      } catch (error) {
        console.log(error.response);
        setMessage({
          isError: true,
          message: "!Ha ocurrido un error al eliminar el producto!",
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
    details: "Detalles del",
  };

  const {
    value: productId,
    isValid: productIdIsValid,
    setInputValue: setProductId,
    reset: resetProductId,
  } = useForm((value) => /^[0-9\b]+$/.test(value));

  /*   const {
    value: productName,
    isValid: productNameIsValid,
    hasError: productNameHasError,
    changeInputValueHandler: changeProductName,
    setInputValue: setProductName,
    inputBlurHandler: productNameBlurHandler,
    reset: resetProductName,
  } = useForm((value) => value.trim().length > 0); */

  const {
    value: productDescription,
    isValid: productDescriptionIsValid,
    hasError: productDescriptionHasError,
    changeInputValueHandler: changeProductDescription,
    setInputValue: setProductDescription,
    inputBlurHandler: productDescriptionBlurHandler,
    reset: resetProductDescription,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: productStatus,
    isValid: productStatusIsValid,
    hasError: productStatusHasError,
    changeInputValueHandler: changeProductStatus,
    setInputValue: setProductStatus,
    inputBlurHandler: productStatusBlurHandler,
    reset: resetProductStatus,
  } = useForm((value) => +value === 0 || +value === 1);

  const {
    value: productPrice,
    isValid: productPriceIsValid,
    hasError: productPriceHasError,
    changeInputValueHandler: changeProductPrice,
    setInputValue: setProductValue,
    inputBlurHandler: productPriceBlurHandler,
    reset: resetProductPrice,
  } = useForm((value) => /^[0-9\b]+$/.test(value));

  const {
    value: productTax,
    isValid: productTaxIsValid,
    hasError: productTaxHasError,
    changeInputValueHandler: changeProductTax,
    setInputValue: setProductTax,
    inputBlurHandler: productTaxBlurHandler,
    reset: resetProductTax,
  } = useForm((value) => /^[0-9\b]+$/.test(value));

  const {
    value: productCategories,
    isValid: productCategoriesIsValid,
    hasError: productCategoriesHasError,
    changeInputValueHandler: changeProductCategories,
    setInputValue: setProductCategories,
    inputBlurHandler: productCategoriesBlurHandler,
    reset: resetProductCategories,
  } = useForm((value) => /^[0-9\b]+$/.test(+value), 1);

  const {
    value: productDiscounts,
    isValid: productDiscountsIsValid,
    hasError: productDiscountsHasError,
    changeInputValueHandler: changeProductDiscounts,
    setInputValue: setProductDiscounts,
    inputBlurHandler: productDiscountsBlurHandler,
    reset: resetProductDiscounts,
  } = useForm((value) => /^[0-9\b]+$/.test(+value), 1);

  const {
    value: ingredientProduct,
    isValid: ingredientProductIsValid,
    setInputValue: setIngredientProduct,
    reset: resetIngredientProduct,
  } = useForm((value) => value.length > 0, []);

  let formIsValid =
    action === "delete"
      ? productStatusIsValid
      : /* productNameIsValid && */
        productDescriptionIsValid &&
        productPriceIsValid &&
        ingredientProductIsValid &&
        productCategoriesIsValid &&
        productTaxIsValid &&
        productDiscountsIsValid &&
        productStatusIsValid &&
        (action === "update" ? productIdIsValid : true);

  const setInputsForm = (product) => {
    setProductId(product.id);
    /* setProductName(product.) */
    setProductDescription(product.pro_description);
    setProductStatus(product.pro_status);
    setProductCategories(product.ProductCategory.id);
    setProductDiscounts(product.ProductDiscount.id);
    setIngredientProduct(product.IngredientProduct);
    setProductValue(product.price);
    setProductTax(product.percentage_tax);
  };

  const onSetKeyWord = (e) => {
    setKeyWord(e.target.value);
  };

  const openIngredientList = () => {
    setShowIngredientsList(true);
  };

  const closeIngredientList = () => {
    setShowIngredientsList(false);
  };

  const addIngredientsToProduct = (e) => {
    e.preventDefault();
    let arrIngredients = [];
    for (let input of e.target) {
      input.type === "checkbox" &&
        input.checked &&
        arrIngredients.push({ ingredient_name: input.name });
    }
    setIngredientProduct(arrIngredients);
    setShowIngredientsList(false);
  };

  const actionUpdate = () => {
    setAction("update");
    setProductForm(true);
  };

  const actionDelete = () => {
    setAction("delete");
    setProductForm(true);
  };

  const showDetails = () => {
    setAction("details");
    setProductForm(true);
  };

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
          {showIngredientsList ? (
            <Modal show={showIngredientsList}>
              <h1>Ingredientes</h1>
              <form onSubmit={addIngredientsToProduct}>
                <input
                  value={keyWord}
                  onChange={onSetKeyWord}
                  className={productClasses.search_item}
                  placeholder="Buscar"
                />
                <div className={productClasses.ingredient_list}>
                  {ingredients
                    .filter((ingredient) =>
                      ingredient.ingredient_name
                        .toLowerCase()
                        .trim()
                        .includes(keyWord)
                    )
                    .map((ingredient, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          name={ingredient.ingredient_name}
                        />
                        {ingredient.ingredient_name}
                      </label>
                    ))}
                  <div className={productClasses.ingredient_buttons}>
                    <Button>Agregar Ingredientes</Button>
                    <Button action={closeIngredientList}>Cancelar</Button>
                  </div>
                </div>
              </form>
            </Modal>
          ) : (
            <Modal show={productForm} closeModal={closeProductForm}>
              <h1>{optionsAction[action]} Producto</h1>
              <form
                onSubmit={submitDiscount}
                className={
                  action === "details"
                    ? classes.form_details
                    : classes.form_control
                }
              >
                {action === "delete" && (
                  <div>
                    <h5 style={{ textAlign: "center" }}>
                      ¿Está seguro que desea eliminar {productDescription}?
                    </h5>
                  </div>
                )}
                {action !== "delete" && (
                  <Fragment>
                    {/*                   <InputForm
                    id="name__input"
                    labelMessage="Nombre"
                    change={changeProductName}
                    value={productName}
                    blur={productNameBlurHandler}
                    typeInput="text"
                    inputHasError={productNameHasError}
                    errorMessage="Ingresa un nombre válido."
                  /> */}
                    <InputForm
                      inputClass={classes.input_details}
                      labelClass={classes.label_details}
                      id="description__input"
                      labelMessage="Descripción"
                      change={changeProductDescription}
                      value={productDescription}
                      blur={productDescriptionBlurHandler}
                      typeInput="text"
                      inputHasError={productDescriptionHasError}
                      errorMessage="Ingresa una descripción válida."
                      disabled={action === "details"}
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
                      disabled={action === "details"}
                    />
                    <InputForm
                      inputClass={classes.input_details_two}
                      id="tax__input"
                      labelMessage="IVA"
                      change={changeProductTax}
                      value={productTax}
                      blur={productTaxBlurHandler}
                      typeInput="text"
                      keyPress={true}
                      inputHasError={productTaxHasError}
                      errorMessage="Ingresa un valor válido."
                      disabled={action === "details"}
                    />
                    <label htmlFor="categories__input">Categorías</label>
                    <select
                      onChange={changeProductCategories}
                      onBlur={productCategoriesBlurHandler}
                      value={productCategories}
                      required
                      id="categories__input"
                      disabled={action === "details"}
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
                      className={classes.input_details_three}
                      onChange={changeProductDiscounts}
                      onBlur={productDiscountsBlurHandler}
                      value={productDiscounts}
                      required
                      id="discounts__input"
                      disabled={action === "details"}
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
                      disabled={action === "details"}
                    >
                      <option value={0}>Hay stock</option>
                      <option value={1}>No hay</option>
                    </select>
                    {productStatusHasError && (
                      <p className={classes.error_message}>
                        Seleccione una opción válida.
                      </p>
                    )}
                    <label className={classes.label_title__ingredients}>
                      Ingredientes
                    </label>
                    {ingredientProduct.length > 0 && (
                      <Ingredients list={ingredientProduct} />
                    )}
                    {action === "create" && (
                      <Button submitFor="button" action={openIngredientList}>
                        Agregar Ingredientes
                      </Button>
                    )}
                    <label className={classes.label_title__ingredients}>
                      Promos asociadas
                    </label>
                  </Fragment>
                )}
                <div
                  className={
                    action === "details"
                      ? classes.form_details__buttons
                      : classes.form_control__buttons
                  }
                >
                  {action !== "details" && (
                    <Button isInvalid={!formIsValid} submitFor="submit">
                      {optionsAction[action]}
                    </Button>
                  )}
                  <Button submitFor="button" action={closeProductForm}>
                    {action === "details" ? "Cerrar" : "Cancelar"}
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
          )}
          <h1>Productos Disponibles</h1>
          <div className={classes.product_list__header}>
            <Button
              submitFor="button"
              action={(e) => {
                setAction("create");
                resetInputs();
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
                    {categories.length === 0
                      ? "No tiene"
                      : product.ProductCategory.cat_name}
                  </td>
                  <td>
                    $
                    {new Intl.NumberFormat("es-CO", {
                      maximumSignificantDigits: 3,
                    }).format(product.price)}
                  </td>
                  <td>
                    {discounts.length === 0
                      ? "No tiene"
                      : product.ProductDiscount.title}
                  </td>
                  <td>{product.pro_status ? "Sí" : "No"}</td>
                  <td className={classes.product_list__table__edit}>
                    <IconEdit
                      action={() => {
                        setInputsForm(product);
                        actionUpdate();
                      }}
                    />
                    <IconTrash
                      action={() => {
                        setInputsForm(product);
                        actionDelete();
                      }}
                    />
                    <IconDetails
                      action={() => {
                        setInputsForm(product);
                        showDetails();
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

export default ProductsPage;
