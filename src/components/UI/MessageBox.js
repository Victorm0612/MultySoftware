import classes from "./MessageButton.module.css";
const MessageBox = (props) => {
  return (
    <div
      className={`${classes.message_box} ${
        props.isError ? classes.error_message : classes.success_message
      }`}
    >
      {props.message}
    </div>
  );
};

export default MessageBox;
