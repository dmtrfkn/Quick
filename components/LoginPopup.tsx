import React, { FC, useState } from "react";
import AuthForm from "./AuthForm";
import LoginForm from "./LoginForm";

interface LoginPopupProps {
  SetOpen: () => void;
}

import styles from "../styles/LoginPopup.module.scss";

const LoginPopup: FC<LoginPopupProps> = ({ SetOpen }) => {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.popup}>
      <div className={styles.buttons}>
        <button
          onClick={() => setActive(0)}
          className={`${styles.button} ${active === 0 ? styles.active : ""}`}
        >
          Авторизация
        </button>
        <button
          onClick={() => setActive(1)}
          className={`${styles.button} ${active ? styles.active : ""}`}
        >
          Регистрация
        </button>
      </div>
      {active === 1 ? (
        <AuthForm setOpen={SetOpen} />
      ) : (
        <LoginForm setOpen={SetOpen} />
      )}
    </div>
  );
};

export default LoginPopup;
