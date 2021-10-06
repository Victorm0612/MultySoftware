const ProductResponse = ({ product }) => {
  return (
    <div className="row">
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
        <div className="row">
          <p>
            <b>Descripción:</b>
          </p>
          <br />
          <p>{product.pro_description}</p>
        </div>
      </div>
      <div className="row">
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
      <hr />
    </div>
  );
};

export default ProductResponse;
