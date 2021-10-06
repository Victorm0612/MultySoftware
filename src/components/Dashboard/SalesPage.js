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
import { jsPDF } from "jspdf";
import logo from "../../images/Logo.png";

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

  const createPDF = (sale) => {
    let saleFixed = { ...sale, amount: 0 };
    const mainLabels = [
      "Fecha:",
      "Hora:",
      "--------- Información del cliente ---------",
      "Documento de identidad:",
      "Email:",
      "Nombre Completo:",
      "Teléfono:",
      "--------- Información del Restaurante ---------",
      "Sede:",
      "Teléfono:",
      "Dirección:",
      "Horario de atención:",
      "------------- Productos vendidos -------------",
    ];
    const data = [
      saleFixed.sale_date.split("T")[0],
      saleFixed.sale_time,
      "",
      saleFixed.User.document_id,
      saleFixed.User.email,
      `${saleFixed.User.first_name} ${saleFixed.User.last_name}`,
      saleFixed.User.phone,
      "",
      saleFixed.Restaurant.restaurant_name,
      saleFixed.Restaurant.phone,
      saleFixed.Restaurant.restaurant_address,
      `${saleFixed.Restaurant.ini_attention_time} - ${saleFixed.Restaurant.final_attention_time}`,
      "",
    ];
    let n = 100;
    const doc = new jsPDF("landscape", "px", "a4", "false");
    doc.addImage(logo, "PNG", 40, 10, 100, 60);
    doc.setFont("Helvetica", "bold");
    for (let i = 1; i <= mainLabels.length; i++) {
      if (mainLabels[i - 1].includes("----")) {
        n += 40;
        doc.text(60, n, `${mainLabels[i - 1]}`);
      } else {
        n += 20;
        doc.text(60, n, `${mainLabels[i - 1]}`);
      }
      if (n > 360) {
        doc.addPage();
        n = 100;
      }
    }
    const labels = ["Nombre:", "Precio/u:", "IVA:", "Cantidad:"];
    const keys = ["pro_name", "price", "percentage_tax", "amount"];
    for (let i = 1; i <= saleFixed.Products.length; i++) {
      n += 40;
      doc.text(60, n, `--------- Producto #${i} ---------`);
      for (let j = 1; j <= labels.length; j++) {
        n += 20;
        doc.text(60, n, `${labels[j - 1]}\n`);
      }
      n = n + labels.length * 20;
    }
    doc.text(60, n + 20, "--------------------------", {
      align: "left",
    });
    doc.text(60, n + 40, "Total a pagar:");
    doc.setFont("Helvetica", "Normal");
    doc.setPage(1);
    n = 100;
    for (let i = 1; i <= data.length; i++) {
      if (mainLabels[i - 1].includes("----")) {
        n += 40;
        doc.text(300, n, `${data[i - 1]}`);
      } else {
        n += 20;
        doc.text(300, n, `${data[i - 1]}`);
      }
      if (n > 360) {
        doc.addPage();
        n = 100;
      }
    }
    doc.setPage(2);
    for (let i = 1; i <= saleFixed.Products.length; i++) {
      n += 40;
      doc.text(300, n, "");
      for (let j = 1; j <= labels.length; j++) {
        n += 20;
        doc.text(300, n, `${saleFixed.Products[keys[i]]}\n`);
      }
      n = n + labels.length * 20;
    }
    doc.text(300, n + 20, "");
    doc.text(300, n + 40, `${"0"}`);
    doc.save(
      `${
        saleFixed.sale_date.split("T")[0]
      }__${saleFixed.Restaurant.restaurant_name.replace(/\s/g, "_")}.pdf`
    );
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getSales(token);
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
                      <IconPrinter action={() => createPDF(sale)} />
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
