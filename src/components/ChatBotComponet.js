import ChatBot, { Loading } from "react-simple-chatbot";
import classes from "./ChatBotComponent.module.css";
import { ThemeProvider } from "styled-components";
import { Fragment, useEffect, useState } from "react";
import { axiosInstance as axios } from "../config/axiosConfig";
import ReactDOM from "react-dom";
import RestaurantsResponse from "./ChatBotResponse/RestaurantsResponse";
import PromosResponse from "./ChatBotResponse/PromosResponse";
import ProductResponse from "./ChatBotResponse/ProductResponse";

const theme = {
  background: "#f5f8fb",
  fontFamily: "inherit",
  headerBgColor: "#EF6C00",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#EF6C00",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const CheckComponent = (props) => {
  const request = props.steps.action;
  const [isLoading, setIsLoading] = useState(true);
  const [isMessage, setIsMessage] = useState(false);
  const [dataReq, setDataReq] = useState("");

  const transformData = (data) => {
    if (data.pro_name) {
      return <ProductResponse product={data} />;
    }
    if (data[0].restaurant_name) {
      return <RestaurantsResponse data={data} />;
    }
    if (data[0].pro_name) {
      return <PromosResponse data={data} />;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: response } = await axios.post("bot/", {
          message: request.value.trim().toLowerCase(),
        });
        if (response.data) {
          setDataReq(response.data);
          console.log(response.data);
        } else {
          setDataReq(response.message);
          setIsMessage(true);
        }
      } catch (error) {
        setDataReq("Ups! ha habido un error...");
      } finally {
        setIsLoading(false);
        props.triggerNextStep();
      }
    };
    if (!isLoading) return;
    getData();
  });
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>{isMessage ? dataReq : transformData(dataReq)}</div>
      )}
    </div>
  );
};

const ChatBotComponent = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classes.chat}>
          <ThemeProvider theme={theme}>
            <ChatBot
              bubbleStyle={{ maxWidth: "70%" }}
              floating={true}
              recognitionLang="es"
              placeholder="Escribe un mensaje..."
              steps={[
                {
                  id: "1",
                  message: "Bienvenido! Cual es tu nombre?",
                  trigger: "2",
                },
                {
                  id: "2",
                  user: true,
                  trigger: "3",
                },
                {
                  id: "3",
                  message:
                    "Hola {previousValue}, un gusto conocerte! ¿Qué deseas hacer?",
                  trigger: "action",
                },
                {
                  id: "action",
                  user: true,
                  trigger: "5",
                },
                {
                  id: "5",
                  component: <CheckComponent />,
                  asMessage: true,
                  waitAction: true,
                  trigger: "6",
                },
                {
                  id: "6",
                  message: "¿Qué más deseas hacer?",
                  trigger: "7",
                },
                {
                  id: "7",
                  options: [
                    { value: 1, label: "Salir", trigger: "8" },
                    {
                      value: 2,
                      label: "Preguntar de nuevo",
                      trigger: "action",
                    },
                  ],
                },
                {
                  id: "8",
                  message: "Que tengas buen día!",
                  end: true,
                },
              ]}
            />
            )
          </ThemeProvider>
        </div>,
        document.getElementById("chatbot")
      )}
    </Fragment>
  );
};

export default ChatBotComponent;
