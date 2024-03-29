import React from "react";

import ChartBar from "./ChartBar";
import classes from "./Chart.module.css";

const Chart = (props) => {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <div
      className={`${classes.chart} ${
        props.isHorizontal ? classes.horizontal : classes.vertical
      }`}
    >
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
          isHorizontal={props.isHorizontal}
        />
      ))}
    </div>
  );
};

export default Chart;
