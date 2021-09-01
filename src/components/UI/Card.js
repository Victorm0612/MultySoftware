import classes from "./Card.module.css";
const Card = ({ classNames = "card", children }) => {
  return <div className={classes[classNames]}>{children}</div>;
};

export default Card;
