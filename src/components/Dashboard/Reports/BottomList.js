import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getBottomProducts } from "../../../helper/httpHelpers/reportsHttp";
import Card from "../../UI/Card";
import Chart from "../../UI/Chart";
import classes from "./shared.module.css";
const BottomList = () => {
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [bottomProducts, setBottomProducts] = useState([]);

  useEffect(() => {
    const getProductList = async () => {
      try {
        const newList = await getBottomProducts(token);
        setBottomProducts(newList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getProductList();
  }, [token]);

  let chartDataPoints = isLoading
    ? []
    : bottomProducts.map((product) => ({
        label: product.pro_name.split(" ")[0],
        value: +product.suma,
      }));

  return (
    <Card>
      {isLoading ? (
        <div></div>
      ) : (
        <div className={classes.restaurant_info}>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              margin: "1rem 0",
            }}
          >
            Top 20 menos vendidos
          </h1>
          <Chart isHorizontal={true} dataPoints={chartDataPoints} />
        </div>
      )}
    </Card>
  );
};

export default BottomList;
