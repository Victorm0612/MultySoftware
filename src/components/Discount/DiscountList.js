import DiscountItem from "./DiscountItem";
import classes from "./DiscountList.module.css";

const DiscountList = (props) => {
  return (
    <ul className={classes.list}>
      {props.list.length === 0 ? (
        <DiscountItem disName="" />
      ) : (
        props.list.map((item, index) => (
          <DiscountItem key={index} disName={item.discount_name} />
        ))
      )}
    </ul>
  );
};

export default DiscountList;
