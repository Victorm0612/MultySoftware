import classes from "./Card.module.css";
const Card = ({ classNames = "small_card", children }) => {
  return (
    <div className={`${classes.card} ${classes[classNames]}`}>{children}</div>
  );
};

export default Card;
