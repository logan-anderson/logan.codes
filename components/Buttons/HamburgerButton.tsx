import styles from "./HamburgerButton.module.css";

interface BlobButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const BlobButton = ({ children, onClick }: BlobButtonProps) => {
  const animate = () => {
    const button = document.querySelector(`.${styles.button}`);
    const blobs = document.querySelectorAll(`.${styles.blob}`);
    const splashes = document.querySelectorAll(`.${styles.splash}`);

    blobs.forEach((el) => {
      el.classList.add(styles.animated);
      setTimeout(() => el.classList.remove(styles.animated), 600);
    });

    splashes.forEach((el) => {
      el.classList.add(styles.animated);
      setTimeout(() => el.classList.remove(styles.animated), 600);
    });

    button?.classList.add(styles.animated);
    setTimeout(() => button?.classList.remove(styles.animated), 600);

    if (onClick) onClick();
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ display: "none" }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="7 7"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={styles.container}>
        <div className={styles.button} onClick={animate}>
          {children}
          <div className={styles.blobs}>
            <div className={styles.blob}>
              <div className={styles.splash}></div>
              <div className={styles.splash}></div>
            </div>
            <div className={styles.blob}>
              <div className={styles.splash}></div>
              <div className={styles.splash}></div>
              <div className={styles.splash}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlobButton;
