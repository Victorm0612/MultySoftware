import { useEffect } from "react";
import { useState } from "react";
import {
  getMostSeller,
  getLessSeller,
} from "../../../helper/httpHelpers/reportsHttp";
import SelectForm from "../../Form/SelectForm";
import Card from "../../UI/Card";
import Chart from "../../UI/Chart";

const RestaurantSales = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [optionSelected, setOptionSelected] = useState(0);

  const changeOptionSelected = (e) => {
    setOptionSelected(+e.target.value);
  };

  useEffect(() => {
    const getResturantSales = async () => {
      let newList;
      try {
        if (optionSelected === 0) {
          newList = await getMostSeller();
        } else {
          newList = await getLessSeller();
        }
        setRestaurant(newList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getResturantSales();
  }, [optionSelected]);

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
            {`Resturante con ${optionSelected === 0 ? "más" : "menos"} ventas`}
          </h1>
          <SelectForm
            id="select__more_less"
            labelMessage="Seleccionar una opción"
            value={optionSelected}
            change={changeOptionSelected}
            list={[
              "restaurante con más ventas",
              "restaurante con menos ventos",
            ]}
            expression={(value, index) => index}
          />
          <ul></ul>
        </div>
      )}
    </Card>
  );
};

export default RestaurantSales;
