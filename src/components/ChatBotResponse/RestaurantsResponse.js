import { Fragment } from "react";

const RestaurantsResponse = ({ data }) => {
  return (
    <Fragment>
      {data.map((restaurant, index) => (
        <div key={index} className="row">
          <div className="row">
            <div className="col-6">
              <p>
                <b>Nombre:</b>
              </p>
              <br />
              <p>{restaurant.restaurant_name}</p>
            </div>
            <div className="col-6">
              <p>
                <b>Dirección:</b>
              </p>
              <br />
              <p>{restaurant.restaurant_address}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>
                <b>Teléfono:</b>
              </p>
              <br />
              <p>{restaurant.restaurant_name}</p>
            </div>
            <div className="col-6">
              <p>
                <b>Horario:</b>
              </p>
              <br />
              <p>
                {restaurant.ini_attention_time.split(":")[0]}
                {restaurant.ini_attention_time.split(":")[0] > 11 ? "pm" : "am"}
                -{restaurant.final_attention_time.split(":")[0]}
                {+restaurant.final_attention_time.split(":")[0] > 11
                  ? "pm"
                  : "am"}
              </p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </Fragment>
  );
};

export default RestaurantsResponse;
