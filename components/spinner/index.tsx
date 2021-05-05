import styles from "./spinner.module.css";

export const Spinner: React.FC = () => {
  return (
    <div className={`${styles["lds-ellipsis"]}`}>
      <div className="bg-black dark:bg-white"></div>
      <div className="bg-black dark:bg-white"></div>
      <div className="bg-black dark:bg-white"></div>
      <div className="bg-black dark:bg-white"></div>
    </div>
  );
};
