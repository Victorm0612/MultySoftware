import { Fragment, useEffect, useState } from "react";
import classes from "./MenuPage.module.css";
import ProductMenu from "./ProductMenu";
import { axiosInstance as axios } from "../../config/axiosConfig";
import SpinnerLoading from "../UI/SpinnerLoading";
import { sliceArray } from "../../helper/sliceArray";

const MenuPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data: response } = await axios.get("product/");
        console.log(response.data);
        setProducts(response.data);
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

  return (
    <div className={classes.menu}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Fragment>
          {sliceArray(products).map((arr, index) => (
            <div className="row" key={index}>
              {arr.map((product) => (
                <ProductMenu
                  key={product.id}
                  title={product.pro_name}
                  image={product.pro_image}
                  price={product.price}
                  description={product.pro_description}
                />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default MenuPage;
