import ChatBot, { Loading } from "react-simple-chatbot";
import classes from "./ChatBotComponent.module.css";
import { ThemeProvider } from "styled-components";
import { Fragment, useEffect, useState } from "react";
import { axiosInstance as axios } from "../config/axiosConfig";
import ReactDOM from "react-dom";

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
  const [request, setRequest] = useState(props.steps.action);
  const [isLoading, setIsLoading] = useState(true);
  const [dataReq, setDataReq] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: response } = await axios.post("bot/", {
          message: request.value.trim().toLowerCase(),
        });
        setDataReq(response.data);
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
    <div>{isLoading ? <Loading /> : <div>{JSON.stringify(dataReq)}</div>}</div>
  );
};

const ChatBotComponent = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classes.chat}>
          <ThemeProvider theme={theme}>
            <ChatBot
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
