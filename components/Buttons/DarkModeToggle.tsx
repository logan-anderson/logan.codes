import styles from "./darkModeToggle.module.css";

export const DarkModeToggleButton = (props: {
  onClick: () => void;
  checked: boolean;
}) => {
  return (
    <div id={styles.bottomRight}>
      <div className={styles.toggle} title="toggle dark mode">
        <label>
          <input
            type="checkbox"
            name=""
            checked={props.checked}
            onChange={props.onClick}
          />
          <span></span>
        </label>
      </div>
    </div>
  );
};
