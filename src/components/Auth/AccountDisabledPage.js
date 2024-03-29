import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance as axios } from "../../config/axiosConfig";
import Button from "../UI/Button";
import Card from "../UI/Card";
import MessageBox from "../UI/MessageBox";
import SpinnerLoading from "../UI/SpinnerLoading";
import classes from "./AccountDisabledPage.module.css";
import { authActions } from "../../store/auth";

const AccountDisabledPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id, token } = useSelector((state) => state.auth);
  const [message, setMessage] = useState({
    isError: false,
    message: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const changeStatus = async () => {
      try {
        const response = await axios.put(
          `users/changeStatus/${id}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        dispatch(authActions.logout());
      } catch (error) {
        console.log(error);
        setMessage({
          isError: true,
          message: `Hay un error al habilitar tu cuenta: ${error.response}`,
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (isLoading) {
      changeStatus();
    }
  }, [isLoading, id, token, dispatch]);

  const enableAccount = () => {
    setIsLoading(true);
  };

  return (
    <div className={classes.disabled}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Card>
          <h1>Tu cuenta está deshabilitada</h1>
          <p>
            En estos momentos no puedes disfrutar de nuestros servicios debido a
            que tu cuenta se encuentra deshabilitada. Si deseas habilitarla
            nuevamente, por favor, haz clic en el siguiente botón.
          </p>
          <Button action={enableAccount}>Habilitar mi cuenta</Button>
          <MessageBox isError={message.isError} message={message.message} />
        </Card>
      )}
    </div>
  );
};

export default AccountDisabledPage;
