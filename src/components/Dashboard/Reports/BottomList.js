import { useEffect } from "react";
import { useState } from "react";
import { getBottomProducts } from "../../../helper/httpHelpers/reportsHttp";
import Card from "../../UI/Card";
import Chart from "../../UI/Chart";
const BottomList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bottomProducts, setBottomProducts] = useState([]);

  useEffect(() => {
    const getProductList = async () => {
      try {
        const newList = await getBottomProducts();
        setBottomProducts(newList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getProductList();
  }, []);

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
        <div>
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
