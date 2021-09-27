import classes from "./Dropdown.module.css";
const Dropdown = (props) => {
  return (
    <div className={`dropdown ${classes[props.classes]}`}>
      <button
        className="btn btn-default dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {props.dropName}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <input
            className="dropdown-item"
            type="button"
            onClick={props.action}
            value={"Limpiar filtros"}
          ></input>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        {props.list.map((element) => (
          <li key={element[props.id]}>
            <input
              className="dropdown-item"
              type="button"
              onClick={props.action}
              value={element[props.keyName]}
            ></input>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
