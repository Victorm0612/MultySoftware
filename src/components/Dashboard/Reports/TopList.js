import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getTopProducts } from "../../../helper/httpHelpers/reportsHttp";
import Card from "../../UI/Card";
import Chart from "../../UI/Chart";
import classes from "./shared.module.css";

const TopList = () => {
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const getProductList = async () => {
      try {
        const newList = await getTopProducts(token);
        setTopProducts(newList);
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
    : topProducts.map((product) => ({
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
            Top 20 más vendidos
          </h1>
          <Chart isHorizontal={true} dataPoints={chartDataPoints} />
        </div>
      )}
    </Card>
  );
};

export default TopList;
