import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import InputForm from "../../Form/InputForm";
import SelectForm from "../../Form/SelectForm";
import Card from "../../UI/Card";
import Chart from "../../UI/Chart";
import { getAllProducts } from "../../../helper/httpHelpers/productHttp";
import {
  getAllSales,
  getProductSales,
} from "../../../helper/httpHelpers/reportsHttp";

const SalesChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const init = `${new Date().getFullYear()}${
    new Date().getMonth() + 1 < 9 ? "-0" : "-"
  }${new Date().getMonth() + 1}${
    new Date().getDate() < 9 ? "-0" : "-"
  }${new Date().getDate()}`;
  const options = ["Últimos 6 meses", "Fecha específica"];
  const [optionSelected, setOptionSelected] = useState(0);
  const [productSelected, setProductSelected] = useState(0);
  const [products, setProducts] = useState([]);
  const [initDate, setInitDate] = useState(init);
  const [finalDate, setFinalDate] = useState(init);
  const [sales, setSales] = useState([]);

  const changeHandlerOptionSelected = (e) => {
    setOptionSelected(e.target.value);
  };

  const changeProductSelected = (e) => {
    setProductSelected(e.target.value);
  };

  const changeInitDate = (e) => {
    setInitDate(e.target.value);
  };

  const changeFinalDate = (e) => {
    setFinalDate(e.target.value);
  };

  const isAnotherYear = (max) => {
    return max - 5 < 0 ? 12 + (max - 5) : max - 5;
  };

  const min =
    +optionSelected === 0
      ? isAnotherYear(new Date().getMonth())
      : new Date(initDate).getMonth();
  const max =
    +optionSelected === 0
      ? new Date().getMonth()
      : new Date(finalDate).getMonth();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts([{ id: 0, pro_name: "Todos" }, ...allProducts]);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        if (+productSelected === 0) {
          const allSales = await getAllSales(
            optionSelected,
            min,
            max,
            initDate,
            finalDate,
            token
          );
          setSales(allSales);
        } else {
          const parcialSales = await getProductSales(
            productSelected,
            initDate,
            finalDate
          );
          setSales(parcialSales);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [initDate, finalDate, token, optionSelected, productSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  const chartDataPoints = [
    { label: "Ene", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Abr", value: 0 },
    { label: "Mayo", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Ago", value: 0 },
    { label: "Sept", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dic", value: 0 },
  ];

  if (sales.length > 0) {
    for (let sale of sales) {
      if (!sale.sale_date) break;
      const saleMonth = new Date(sale.sale_date).getMonth(); // starting at 0 => January => 0
      console.log(saleMonth);
      chartDataPoints[saleMonth].value += 1;
    }
  }

  return (
    <Card>
      {isLoading ? (
        <div></div>
      ) : (
        <Fragment>
          <div className="row">
            <div className="col-12">
              <h1
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: "1rem 0",
                }}
              >
                Reporte de ventas
              </h1>
              <SelectForm
                change={changeHandlerOptionSelected}
                value={optionSelected}
                labelMessage="Seleccionar Fecha"
                list={options}
                expression={(value, index) => index}
              />
              <SelectForm
                change={changeProductSelected}
                value={productSelected}
                labelMessage="Seleccionar Producto"
                list={products}
                expression={(value, index) => value.id}
                accesKey="pro_name"
              />
            </div>
          </div>
          {+optionSelected === 1 && (
            <Fragment>
              <div className="row">
                <div className="col-6">
                  <InputForm
                    id="init__input"
                    labelMessage="Fecha Inicial"
                    change={changeInitDate}
                    value={initDate}
                    typeInput="date"
                    errorMessage="El rango de fechas debe ser de 6 meses"
                  />
                </div>
                <div className="col-6">
                  <InputForm
                    id="final__input"
                    labelMessage="Fecha Final"
                    change={changeFinalDate}
                    value={finalDate}
                    typeInput="date"
                    errorMessage="El rango de fechas debe ser de 6 meses"
                  />
                </div>
              </div>
            </Fragment>
          )}
          <Chart
            dataPoints={
              max < min
                ? [
                    ...chartDataPoints.slice(min),
                    ...chartDataPoints.slice(0, max),
                  ]
                : chartDataPoints.slice(min, max + 1)
            }
          />
        </Fragment>
      )}
    </Card>
  );
};

export default SalesChart;
