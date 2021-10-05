import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getMostSeller,
  getLessSeller,
} from "../../../helper/httpHelpers/reportsHttp";
import SelectForm from "../../Form/SelectForm";
import Card from "../../UI/Card";
import classes from "./shared.module.css";

const RestaurantSales = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [optionSelected, setOptionSelected] = useState(0);
  const { token } = useSelector((state) => state.auth);

  const changeOptionSelected = (e) => {
    setOptionSelected(+e.target.value);
  };

  useEffect(() => {
    const getResturantSales = async () => {
      let newRestaurant;
      try {
        if (optionSelected === 0) {
          newRestaurant = await getMostSeller(token);
        } else {
          newRestaurant = await getLessSeller(token);
        }
        setRestaurant(newRestaurant);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getResturantSales();
  }, [optionSelected, token]);

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
          <hr />
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col-6">
              <h5>
                <b>Sede</b>
              </h5>
              <h6>{restaurant.restaurant_name}</h6>
            </div>
            <div className="col-6">
              <h5>
                <b>Teléfono</b>
              </h5>
              <h6>{restaurant.phone}</h6>
            </div>
          </div>
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col-12">
              <h5>
                <b>Horario</b>
              </h5>
              <h6>
                {restaurant.ini_attention_time.split(":")[0]}
                {restaurant.ini_attention_time.split(":")[0] > 11
                  ? "pm"
                  : "am"}{" "}
                -{restaurant.final_attention_time.split(":")[0]}
                {+restaurant.final_attention_time.split(":")[0] > 11
                  ? "pm"
                  : "am"}
              </h6>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default RestaurantSales;
