import Promo from "./Promo";

const Promotions = (props) => {
  return (
    <ul>
      {props.list.length === 0 ? (
        <Promo promoName="" />
      ) : (
        props.list.map((promo, index) => (
          <Promo key={index} promoName={promo.promo_name} />
        ))
      )}
    </ul>
  );
};

export default Promotions;
