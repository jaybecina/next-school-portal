import styles from "../../../styles/spinner.module.css";

function Spinner() {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}

export default Spinner;
