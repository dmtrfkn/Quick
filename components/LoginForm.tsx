import React, { FC } from "react";
import { useForm } from "react-hook-form";
import PasswordTextField from "./PasswordTextField";
import TextField from "./TextField";
import axios from "axios";

import styles from "../styles/LoginForm.module.scss";
import { useAppDispatch } from "../store/hooks/redux";
import { login } from "../store/slices/UserSlice";

interface LoginFormProps {
  setOpen: () => void;
}

type LoginData = {
  nick: string;
  email: string;
  password: string;
};

const LoginForm: FC<LoginFormProps> = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginData>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: {}) => {
    axios.post("http://localhost:4000/users/login", data).then((res) => {
      if (res.data) {
        dispatch(login(res.data.user));
        window.localStorage.setItem("token", res.data.token);
      } else {
        setError("email", { message: "Неверный логин или парольasd" });
        return "Error";
      }
      setOpen();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        register={{
          ...register("email", {
            required: "Неверно указан логин или пароль!",
          }),
        }}
        placeholder="Email..."
        type="email"
        errorMessage={errors.email?.message}
      />

      <PasswordTextField
        register={{
          ...register("password", {}),
        }}
        placeholder="Пароль..."
        errorMessage={errors.password?.message}
      />
      <button className={styles.button}>Войти</button>
    </form>
  );
};

export default LoginForm;
