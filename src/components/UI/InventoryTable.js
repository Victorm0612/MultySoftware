import classes from "./InventoryTable.module.css";
const InventoryTable = (props) => {
  const TITLES = props.titles;
  return (
    <table className={classes.product_list__table}>
      <thead>
        <tr>
          {TITLES.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};

export default InventoryTable;
