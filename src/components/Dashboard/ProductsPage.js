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
import DiscountList from "../Discount/DiscountList";
import SelectForm from "../Form/SelectForm";

const ProductsPage = () => {
  const TITLES = [
    "#",
    "Nombre",
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
  const [keyWordIngredient, setKeyWordIngredient] = useState("");
  const [keyWordProduct, setKeyWordProduct] = useState("");
  const [keyWordDiscounts, setKeyWordDiscounts] = useState("");
  const [action, setAction] = useState("get");
  const [productForm, setProductForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showIngredientsList, setShowIngredientsList] = useState(false);
  const [showDiscountsList, setShowDiscountsList] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [message, setMessage] = useState({
    isError: false,
    message: "",
  });
  const resetInputs = () => {
    resetProductId();
    resetProductName();
    resetProductImage();
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
            pro_name: productName,
            pro_description: productDescription,
            pro_image: productImage,
            price: productPrice,
            category_id: +productCategories,
            pro_status: +productStatus === 0 ? true : false,
            percentage_tax: productTax,
            discounts: productDiscounts,
            ingredients: ingredientProduct,
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
      let discountsFixed = productDiscounts.map((disc) => ({
        discount_id: disc.id ? disc.id : disc.discount_id,
      }));
      console.log(productStatus);
      try {
        await axios.put(
          `product/${productId}`,
          {
            pro_name: productName,
            pro_description: productDescription,
            pro_image: productImage,
            price: productPrice,
            category_id: +productCategories,
            pro_status:
              typeof productStatus === "boolean"
                ? productStatus
                : +productStatus === 0
                ? true
                : false,
            percentage_tax: productTax,
            discounts: discountsFixed,
            ingredients: ingredientProduct,
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

  const {
    value: productName,
    isValid: productNameIsValid,
    hasError: productNameHasError,
    changeInputValueHandler: changeProductName,
    setInputValue: setProductName,
    inputBlurHandler: productNameBlurHandler,
    reset: resetProductName,
  } = useForm((value) => value.trim().length > 0);

  const {
    value: productImage,
    isValid: productImageIsValid,
    hasError: productImageHasError,
    changeInputValueHandler: changeProductImage,
    setInputValue: setProductImage,
    inputBlurHandler: productImageBlurHandler,
    reset: resetProductImage,
  } = useForm((value) => value.trim().length > 0);

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
    setInputValue: setProductDiscounts,
    reset: resetProductDiscounts,
  } = useForm((value) => value.length > 0, []);

  const {
    value: ingredientProduct,
    isValid: ingredientProductIsValid,
    setInputValue: setIngredientProduct,
    reset: resetIngredientProduct,
  } = useForm((value) => value.length > 0, []);

  let formIsValid =
    action === "delete"
      ? productStatusIsValid
      : productNameIsValid &&
        productImageIsValid &&
        productDescriptionIsValid &&
        productPriceIsValid &&
        ingredientProductIsValid &&
        productCategoriesIsValid &&
        productTaxIsValid &&
        productDiscountsIsValid &&
        productStatusIsValid &&
        (action === "update" ? productIdIsValid : true);

  const setInputsForm = (product) => {
    let ingredientsFixed = product.Ingredients.map((element) => ({
      ingredient_id: element.id,
      ingredient_name: element.ingredient_name,
      amount: element.IngredientItem.amount,
    }));
    setProductId(product.id);
    setProductName(product.pro_name);
    setProductImage(product.pro_image);
    setProductDescription(product.pro_description);
    setProductStatus(product.pro_status ? 0 : 1);
    setProductCategories(product.Category.id);
    setProductDiscounts(product.Discounts);
    setIngredientProduct(ingredientsFixed);
    setProductValue(product.price);
    setProductTax(product.percentage_tax);
  };

  const onSetKeyWordProduct = (e) => {
    setKeyWordProduct(e.target.value);
  };

  const onSetKeyWordIngredient = (e) => {
    setKeyWordIngredient(e.target.value);
  };

  const onSetKeyWordDiscounts = (e) => {
    setKeyWordDiscounts(e.target.value);
  };

  const openIngredientList = () => {
    setShowIngredientsList(true);
  };

  const closeIngredientList = () => {
    setShowIngredientsList(false);
  };

  const openDiscountsList = () => {
    setShowDiscountsList(true);
  };

  const closeDiscountsList = () => {
    setShowDiscountsList(false);
  };

  let filterIngredients = isLoading
    ? []
    : ingredients.filter((ingredient) =>
        ingredient.ingredient_name
          .toLowerCase()
          .trim()
          .includes(keyWordIngredient.trim().toLowerCase())
      );

  const addIngredientsToProduct = (newArr) => {
    setIngredientProduct(newArr);
    setShowIngredientsList(false);
  };

  const addDiscountsToProduct = (e) => {
    e.preventDefault();
    let arrDiscounts = [];
    for (let input of e.target) {
      input.type === "checkbox" &&
        input.checked &&
        arrDiscounts.push({
          discount_id: +input.name.split("-")[1],
          discount_name: input.name.split("-")[0],
        });
    }
    setProductDiscounts([...arrDiscounts]);
    setShowDiscountsList(false);
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

  const submitHandler = (e) => {
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
            <Modal show={showIngredientsList} size="big_card">
              <h1>Ingredientes</h1>
              <form onSubmit={addIngredientsToProduct}>
                <input
                  value={keyWordIngredient}
                  onChange={onSetKeyWordIngredient}
                  className={classes.search_item}
                  placeholder="Buscar"
                />
                <div className={productClasses.ingredient_list}>
                  <Ingredients
                    list={filterIngredients}
                    onAdd={addIngredientsToProduct}
                    ingredientsToAdd={ingredientProduct}
                    closeList={closeIngredientList}
                  />
                </div>
              </form>
            </Modal>
          ) : showDiscountsList ? (
            <Modal size="big_card" show={showDiscountsList}>
              <h1>Descuentos</h1>
              <form onSubmit={addDiscountsToProduct}>
                <input
                  value={keyWordDiscounts}
                  onChange={onSetKeyWordDiscounts}
                  className={classes.search_item}
                  placeholder="Buscar descuento"
                />
                <div className={productClasses.discount_list}>
                  {discounts
                    .filter((discount) =>
                      discount.discount_name
                        .toLowerCase()
                        .trim()
                        .includes(keyWordDiscounts.trim().toLowerCase())
                    )
                    .map((discount, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          name={`${discount.discount_name}-${discount.id}`}
                        />
                        {discount.discount_name}
                      </label>
                    ))}
                  <div className={productClasses.discount_buttons}>
                    <Button>Agregar Descuentos</Button>
                    <Button tag="close" action={closeDiscountsList}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </form>
            </Modal>
          ) : (
            <Modal
              size={action === "delete" ? "small_card" : "big_card"}
              show={productForm}
              closeModal={closeProductForm}
            >
              <h1>{optionsAction[action]} Producto</h1>
              {action === "details" && (
                <img
                  className={productClasses.product_img}
                  src={productImage}
                  alt="Describe a visual way the product"
                  width="200"
                  height="auto"
                />
              )}
              <form onSubmit={submitHandler} className={classes.form_control}>
                {action === "delete" && (
                  <div>
                    <h5 style={{ textAlign: "center" }}>
                      ¿Está seguro que desea eliminar {productName}?
                    </h5>
                  </div>
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
                      disabled={action === "details"}
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
                      disabled={action === "details"}
                    />
                    {action === "create" && (
                      <InputForm
                        id="image__input"
                        labelMessage="Url imagen"
                        change={changeProductImage}
                        value={productImage}
                        blur={productImageBlurHandler}
                        typeInput="text"
                        inputHasError={productImageHasError}
                        errorMessage="Ingresa una url válida."
                        disabled={action === "details"}
                      />
                    )}
                    {action === "update" && (
                      <InputForm
                        id="image__input"
                        labelMessage="Url imagen"
                        change={changeProductImage}
                        value={productImage}
                        blur={productImageBlurHandler}
                        typeInput="text"
                        inputHasError={productImageHasError}
                        errorMessage="Ingresa una url válida."
                        disabled={action === "details"}
                      />
                    )}
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
                    <SelectForm
                      id="categories__input"
                      change={changeProductCategories}
                      blur={productCategoriesBlurHandler}
                      value={productCategories}
                      hasError={productCategoriesHasError}
                      list={categories}
                      accesKey="cat_name"
                      disabled={action === "details"}
                      labelMessage="Categorías"
                      errorMessage="Seleccione una opción válida."
                      expression={(value, index) => value.id}
                    />
                    <SelectForm
                      id="status__input"
                      change={changeProductStatus}
                      blur={productStatusBlurHandler}
                      value={productStatus}
                      disabled={action === "details"}
                      hasError={productStatusHasError}
                      labelMessage="Estado"
                      errorMessage="Seleccione una opción válida."
                      list={["Hay Stock", "No hay Stock"]}
                      expression={(value, index) => index}
                    />
                    <label className={classes.label_title__ingredients}>
                      Ingredientes
                    </label>
                    {ingredientProduct.length > 0 && (
                      <ul>
                        {ingredientProduct.map((ing, index) => (
                          <li key={index}>
                            {ing.ingredient_name} - x {ing.amount}
                          </li>
                        ))}
                      </ul>
                    )}
                    {action === "create" && (
                      <Button submitFor="button" action={openIngredientList}>
                        Agregar Ingredientes
                      </Button>
                    )}
                    {action === "update" && (
                      <Button submitFor="button" action={openIngredientList}>
                        Agregar Ingredientes
                      </Button>
                    )}
                    <label className={classes.label_title__ingredients}>
                      Descuentos asociados
                    </label>
                    {productDiscounts.length > 0 && (
                      <DiscountList list={productDiscounts} />
                    )}
                    {action === "create" && (
                      <Button submitFor="button" action={openDiscountsList}>
                        Agregar Descuentos
                      </Button>
                    )}
                    {action === "update" && (
                      <Button submitFor="button" action={openDiscountsList}>
                        Agregar Descuentos
                      </Button>
                    )}
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
                  <Button
                    tag="close"
                    submitFor="button"
                    action={closeProductForm}
                  >
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
            <input
              value={keyWordProduct}
              onChange={onSetKeyWordProduct}
              className={classes.search_item}
              placeholder="Buscar"
            />
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
              products
                .filter((product) =>
                  product.pro_description
                    .toLowerCase()
                    .trim()
                    .includes(keyWordProduct.trim().toLowerCase())
                )
                .map((product, index) => (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.pro_name}</td>
                    <td>
                      {categories.length === 0
                        ? "No tiene"
                        : product.Category.cat_name}
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
                        : product.Discounts[0].discount_name}
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
