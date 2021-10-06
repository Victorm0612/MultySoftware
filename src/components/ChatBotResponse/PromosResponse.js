import { Fragment } from "react";

const PromosResponse = ({ data }) => {
  return (
    <Fragment>
      {data.map((product, index) => (
        <div key={index} className="row">
          <div className="row">
            <div className="col-6">
              <p>
                <b>Nombre:</b>
              </p>
              <br />
              <p>{product.pro_name}</p>
            </div>
            <div className="col-6">
              <p>
                <b>Precio:</b>
              </p>
              <br />
              <p>{product.price}</p>
            </div>
          </div>
          <div className="row">
            {product.Discounts.map((discount, index) => (
              <div key={index} className="col-6">
                <p>
                  <b>Descuento:</b>
                </p>
                <br />
                <p>{discount.discount_value * 100}%</p>
              </div>
            ))}

            <div>
              <div className="col-12">
                <p>
                  <b>Imagen:</b>
                </p>
                <br />
                <img
                  style={{
                    display: "block",
                    margin: "0.5rem auto",
                    boxShadow: "0 0 5px black",
                    borderRadius: "10px",
                  }}
                  src={product.pro_image}
                  alt="imagen del producto"
                  width="150px"
                  height="auto"
                />
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </Fragment>
  );
};

export default PromosResponse;
