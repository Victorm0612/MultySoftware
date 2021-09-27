import classes from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={`${classes.card} ${classes[props.size]}`}>
      {props.children}
    </div>
  );
};

export default Card;
