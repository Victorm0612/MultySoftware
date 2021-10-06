import classes from "./shared.module.css";
import Button from "../UI/Button";
import InventoryTable from "../UI/InventoryTable";
import { Fragment, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import SpinnerLoading from "../UI/SpinnerLoading";
import { useSelector } from "react-redux";
import IconTrash from "../UI/Icons/IconTrash";
import IconEdit from "../UI/Icons/IconEdit";
import IconDetails from "../UI/Icons/IconDetails";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurants,
  Restaurant,
  updateRestaurant,
} from "../../helper/httpHelpers/resturantHttp";
import RestaurantForm from "./Restaurants/RestaurantForm";

const RestaurantsPage = () => {
  const { token, typeUser } = useSelector((state) => state.auth);
  const [messageBox, setMessageBox] = useState({
    message: "",
    isError: false,
  });
  const TITLES = ["#", "Nombre", "Dirección", "Horario", "Estado", "Opciones"];
  const [isLoading, setIsLoading] = useState(true);
  const [keyWord, setKeyWord] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [action, setAction] = useState("get");
  const [showForm, setShowForm] = useState(false);
  const [oneRestaurant, setOneRestaurant] = useState(null);

  const changeKeyWord = (e) => {
    setKeyWord(e.target.value);
  };

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsLoading(true);
    setAction("get");
  };

  useEffect(() => {
    const getData = async () => {
      let message = "";
      let isError = false;
      try {
        const allRestaurants = await getRestaurants(token);
        setRestaurants(allRestaurants);
      } catch (error) {
        message = error;
        isError = true;
      } finally {
        setIsLoading(false);
        setAction("create");
        setMessageBox({
          message,
          isError,
        });
      }
    };
    const createData = async () => {
      let message = "";
      let isError = false;
      try {
        await createRestaurant(
          new Restaurant(
            oneRestaurant.restaurant_name,
            oneRestaurant.restaurant_address,
            oneRestaurant.phone,
            oneRestaurant.ini_attention_time,
            oneRestaurant.final_attention_time,
            oneRestaurant.restaurant_status
          ),
          token
        );
        message = "Se ha creado de manera éxitosa!";
      } catch (error) {
        message = error;
        isError = true;
      } finally {
        setIsLoading(false);
        setMessageBox({
          message,
          isError,
        });
      }
    };
    const updateData = async () => {
      let message = "";
      let isError = false;
      try {
        await updateRestaurant(
          new Restaurant(
            oneRestaurant.restaurant_name,
            oneRestaurant.restaurant_address,
            oneRestaurant.phone,
            oneRestaurant.ini_attention_time,
            oneRestaurant.final_attention_time,
            oneRestaurant.restaurant_status
          ),
          oneRestaurant.id,
          token
        );
        message = "Se ha actualizado de manera éxitosa!";
      } catch (error) {
        message = error;
        isError = true;
      } finally {
        setIsLoading(false);
        setMessageBox({
          message,
          isError,
        });
      }
    };
    const deleteData = async () => {
      let message = "";
      let isError = false;
      try {
        await deleteRestaurant(oneRestaurant.id, token);
        message = "Se ha eliminado de manera éxitosa!";
      } catch (error) {
        message = error;
        isError = true;
      } finally {
        setShowForm(false);
        setAction("get");
        setIsLoading(false);
        setMessageBox({
          message,
          isError,
        });
      }
    };

    const actions = {
      get: getData,
      create: createData,
      update: updateData,
      delete: deleteData,
    };

    if (!isLoading) return;

    actions[action]();
  }, [isLoading, action, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.restaurants}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Fragment>
          {showForm && (
            <Modal size="small_card" show={showForm}>
              <RestaurantForm
                restaurant={action === "create" ? null : oneRestaurant}
                setRestaurant={setOneRestaurant}
                loading={setIsLoading}
                action={action}
                closeForm={closeForm}
                messageBox={messageBox}
              />
            </Modal>
          )}
          <h1>Sedes</h1>
          <div className={classes.restaurants__header}>
            <input
              value={keyWord}
              onChange={changeKeyWord}
              className={classes.search_item}
              placeholder="Buscar"
            />
            <Button
              submitFor="button"
              action={() => {
                setAction("create");
                openForm();
              }}
            >
              Nueva sede
            </Button>
          </div>
          <InventoryTable titles={TITLES}>
            {restaurants.length === 0 ? (
              <tr></tr>
            ) : (
              restaurants
                .filter((restaurant) =>
                  restaurant.restaurant_name
                    .trim()
                    .toLowerCase()
                    .includes(keyWord.trim().toLowerCase())
                )
                .map((restaurant, index) => (
                  <tr key={index}>
                    <td>{restaurant.id}</td>
                    <td>{restaurant.restaurant_name}</td>
                    <td>{restaurant.restaurant_address}</td>
                    <td>
                      {restaurant.ini_attention_time.split(":")[0]}
                      {restaurant.ini_attention_time.split(":")[0] > 11
                        ? "pm"
                        : "am"}{" "}
                      -{restaurant.final_attention_time.split(":")[0]}
                      {+restaurant.final_attention_time.split(":")[0] > 11
                        ? "pm"
                        : "am"}
                    </td>
                    <td>
                      {restaurant.restaurant_status ? "Activo" : "Inactivo"}
                    </td>
                    <td className={classes.restaurants__table__edit}>
                      {typeUser === 3 && (
                        <IconEdit
                          action={() => {
                            setAction("update");
                            setOneRestaurant(restaurant);
                            openForm();
                          }}
                        />
                      )}
                      {typeUser === 3 && (
                        <IconTrash
                          action={() => {
                            setAction("delete");
                            setOneRestaurant(restaurant);
                            openForm();
                          }}
                        />
                      )}
                      <IconDetails
                        action={() => {
                          setAction("details");
                          setOneRestaurant(restaurant);
                          openForm();
                        }}
                      />
                    </td>
                  </tr>
                ))
            )}
          </InventoryTable>
        </Fragment>
      )}
    </div>
  );
};

export default RestaurantsPage;
