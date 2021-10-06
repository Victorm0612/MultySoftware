import { Fragment, useEffect, useState } from "react";
import classes from "./MenuPage.module.css";
import ProductMenu from "./ProductMenu";
import { axiosInstance as axios } from "../../config/axiosConfig";
import SpinnerLoading from "../UI/SpinnerLoading";
import { sliceArray } from "../../helper/sliceArray";
import Dropdown from "../UI/Dropdown";

const MenuPage = () => {
  const STATUS_LIST = [
    { id: 1, status: "Disponible" },
    { id: 2, status: "No disponible" },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [optionsDiscount, setOptionsDiscount] = useState(null);
  const [optionsCategory, setOptionsCategory] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [discountKeyword, setDiscountKeyword] = useState("");
  const [categoryKeyword, setCategoryKeyword] = useState("");
  const [statusKeyword, setStatusKeyword] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data: response } = await axios.get("product/");
        const { data: discountResponse } = await axios.get("discount/");
        const { data: categoryResponse } = await axios.get("category/");
        setProducts(
          response.data.map((product) => ({
            ...product,
            Discounts: product.Discounts.filter(
              (disc) =>
                discountResponse.data.find(
                  (realDisc) => realDisc.id === disc.id
                ).discount_status
            ),
          }))
        );
        setOptionsDiscount(discountResponse.data);
        setOptionsCategory(categoryResponse.data);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      getProducts();
    }
  }, [isLoading]);

  const onSetKeyword = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const onSetDiscountKeyword = (e) => {
    e.target.value === "Limpiar filtros"
      ? setDiscountKeyword("")
      : setDiscountKeyword(e.target.value);
  };

  const onSetCategoryKeyword = (e) => {
    e.target.value === "Limpiar filtros"
      ? setCategoryKeyword("")
      : setCategoryKeyword(e.target.value);
  };

  const onSetStatusKeyword = (e) => {
    e.target.value === "Limpiar filtros"
      ? setStatusKeyword("")
      : setStatusKeyword(e.target.value);
  };

  return (
    <Fragment>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Fragment>
          <div className={`${classes.navigation}`}>
            <div className={classes.search}>
              <label>Buscador</label>
              <input
                value={keyword}
                onChange={onSetKeyword}
                className={classes.search_item}
                placeholder="Buscar"
              />
            </div>
            <Dropdown
              classes="dropdown"
              dropName="Categorias"
              action={onSetCategoryKeyword}
              list={optionsCategory}
              keyName="cat_name"
              id="id"
            />
            <Dropdown
              classes="dropdown"
              dropName="Descuentos"
              action={onSetDiscountKeyword}
              list={optionsDiscount}
              keyName="discount_name"
              id="id"
            />
            <Dropdown
              classes="dropdown"
              dropName="Estado"
              action={onSetStatusKeyword}
              list={STATUS_LIST}
              keyName="status"
              id="id"
            />
            <span className={`badge rounded-pill bg-primary ${classes.badge}`}>
              {categoryKeyword}
            </span>
            <span className={`badge rounded-pill bg-primary ${classes.badge}`}>
              {discountKeyword}
            </span>
            <span className={`badge rounded-pill bg-primary ${classes.badge}`}>
              {statusKeyword}
            </span>
          </div>
          <div className={classes.menu}>
            <Fragment>
              {sliceArray(
                products
                  .filter((product) =>
                    product.pro_name
                      .concat(", ", product.pro_description)
                      .toLowerCase()
                      .trim()
                      .includes(keyword.trim().toLowerCase())
                  )
                  .filter(
                    (product) =>
                      (categoryKeyword !== ""
                        ? product.Category.cat_name === categoryKeyword
                        : true) &&
                      (discountKeyword !== ""
                        ? product.Discounts.map(
                            (el) => el.discount_name
                          ).includes(discountKeyword)
                        : true) &&
                      (statusKeyword !== ""
                        ? product.pro_status ===
                          (statusKeyword === "Disponible")
                        : true)
                  )
              ).map((arr, index) => (
                <div className="row" key={index}>
                  {arr.map((product) => (
                    <ProductMenu
                      key={product.id}
                      id={product.id}
                      title={product.pro_name}
                      discounts={product.Discounts}
                      categories={product.Category}
                      image={product.pro_image}
                      price={product.price}
                      tax={product.percentage_tax}
                      description={product.pro_description}
                      productStatus={product.pro_status}
                    />
                  ))}
                </div>
              ))}
            </Fragment>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MenuPage;
