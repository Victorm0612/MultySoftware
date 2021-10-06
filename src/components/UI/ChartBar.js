import React from "react";
import classes from "./ChartBar.module.css";

const ChartBar = (props) => {
  let barFillHeight = "0%";

  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  return (
    <div
      className={`${classes["chart-bar"]} ${
        props.isHorizontal ? classes.horizontal : classes.vertical
      }`}
    >
      {props.isHorizontal ? (
        <div
          className={`${classes["chart-bar__label"]} ${classes.chart_label__horizontal}`}
        >
          {props.label}
        </div>
      ) : (
        <p style={{ margin: "0" }}>{props.value === 0 ? "" : props.value}</p>
      )}
      <div
        className={`${classes["chart-bar__inner"]} ${
          props.isHorizontal
            ? classes.horizontal__inner
            : classes.vertical__inner
        }`}
      >
        <div
          className={classes["chart-bar__fill"]}
          style={
            props.isHorizontal
              ? { width: barFillHeight }
              : { height: barFillHeight }
          }
        ></div>
      </div>
      {props.isHorizontal ? (
        <p style={{ margin: "0" }}>{props.value === 0 ? "" : props.value}</p>
      ) : (
        <div className={classes["chart-bar__label"]}>{props.label}</div>
      )}
    </div>
  );
};

export default ChartBar;
