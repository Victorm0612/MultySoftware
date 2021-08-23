import classes from "./WelcomePage.module.css";
import PolloImage from "../images/Pollo.jpg";
const WelcomePage = () => {
  return (
    <section className={classes.section}>
      <h1>¡Bienvenido a ChickRest!</h1>
      <div className={classes.section__description}>
        <div>
          <img
            src={PolloImage}
            alt="gente en un buffet"
            width="700"
            height="auto"
          />
        </div>
        <p>
          Disfruta de nuestro nuevo Buffet en los horarios nocturos. Cuenta con
          multiples platos, todos con nuestro especial{" "}
          <strong>Pollo de la Casa</strong> y nuestra nueva salsa{" "}
          <strong>BBQ</strong>!
        </p>
      </div>
    </section>
  );
};

export default WelcomePage;
