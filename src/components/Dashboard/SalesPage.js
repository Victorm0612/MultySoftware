import { Fragment, useEffect, useState } from "react";
import IconDetails from "../UI/Icons/IconDetails";
import IconTrash from "../UI/Icons/IconTrash";
import InventoryTable from "../UI/InventoryTable";
import SpinnerLoading from "../UI/SpinnerLoading";
import classes from "./shared.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useSelector } from "react-redux";
import { deleteSale, getSales } from "../../helper/httpHelpers/saleHttp";
import { sliceArray } from "../../helper/sliceArray";
import IconPrinter from "../UI/Icons/IconPrinter";
import SalesForm from "./Sales/SalesForm";

const SalesPage = () => {
  const TITLES = ["#", "Fecha", "Restaurante", "Estado", "Cobro", "Opciones"];
  const { token } = useSelector((state) => state.auth);

  const [oneSale, setOneSale] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [keyWord, setKeyWord] = useState("");
  const [action, setAction] = useState("get");
  const [sales, setSales] = useState([]);
  const [salesForm, setSalesForm] = useState(false);

  const changeKeyWord = (e) => {
    setKeyWord(e.target.value);
  };

  const changePage = (amount) => {
    setPage(amount);
  };
  const increasePage = (e) => {
    e.preventDefault();
    setPage((prevState) =>
      prevState + 1 > sales.length - 1 ? prevState : prevState + 1
    );
  };
  const decreasePage = (e) => {
    e.preventDefault();
    setPage((prevState) => (prevState - 1 < 0 ? prevState : prevState - 1));
  };

  const openSalesForm = (e) => {
    e.preventDefault();
    setSalesForm(true);
  };

  const closeSalesForm = () => {
    setSalesForm(false);
  };

  const generateAction = (action, sale) => {
    setAction(action);
    setOneSale(sale);
    setSalesForm(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getSales(token);
        console.log(data);
        setSales(sliceArray(data));
      } catch (error) {
        console.error(error);
      } finally {
        setAction("create");
        setIsLoading(false);
      }
    };
    const deleteASale = async () => {
      try {
        await deleteSale(oneSale.id, token);
      } catch (error) {
        console.error(error);
      } finally {
        setAction("get");
        setIsLoading(false);
      }
    };

    const actionToDo = {
      create: getData,
      get: getData,
      delete: deleteASale,
    };

    if (isLoading) {
      actionToDo[action]();
    }
  }, [isLoading, action, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.sales}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Fragment>
          <Modal show={salesForm} size="big_card">
            <SalesForm
              onSetLoading={setIsLoading}
              actionToDo={action}
              closeForm={closeSalesForm}
              oneSale={oneSale}
            />
          </Modal>
          <h1>Ventas</h1>
          <div className={classes.sales__header}>
            <input
              value={keyWord}
              onChange={changeKeyWord}
              className={classes.search_item}
              placeholder="Buscar"
            />
            <Button
              submitFor="button"
              action={(e) => {
                setAction("create");
                openSalesForm(e);
              }}
            >
              Añadir Venta
            </Button>
          </div>
          <InventoryTable titles={TITLES}>
            {sales.length === 0 ? (
              <tr></tr>
            ) : (
              sales
                .map((saleSlice) =>
                  saleSlice.filter((sale) =>
                    sale.sale_date
                      .split("T")[0]
                      .trim()
                      .toLowerCase()
                      .includes(keyWord.trim().toLowerCase())
                  )
                )
                [page].map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.id}</td>
                    <td>{sale.sale_date.split("T")[0]}</td>
                    <td>{sale.Restaurant.restaurant_name}</td>
                    <td>{sale.sale_status ? "Activo" : "Inactivo"}</td>
                    <td>{sale.Products[0].SaleItem.subtotal}</td>
                    <td className={classes.product_list__table__edit}>
                      <IconTrash
                        action={() => {
                          generateAction("delete", sale);
                        }}
                      />
                      <IconDetails
                        action={() => {
                          generateAction("details", sale);
                        }}
                      />
                      <IconPrinter />
                    </td>
                  </tr>
                ))
            )}
          </InventoryTable>
          <div>
            <ul className={classes.pagination}>
              <li>
                <button onClick={decreasePage}>«</button>
              </li>
              {sales.map((n, index) => (
                <li key={index}>
                  <button
                    className={page === index ? classes.active : ""}
                    onClick={() => changePage(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={increasePage}>»</button>
              </li>
            </ul>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default SalesPage;
