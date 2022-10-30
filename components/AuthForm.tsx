import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import PasswordTextField from "./PasswordTextField";
import TextField from "./TextField";

import styles from "../styles/AuthForm.module.scss";
import axios from "axios";

interface AuthFormProps {
  setOpen: () => void;
}

type AuthData = {
  nick: string;
  email: string;
  password: string;
};

const AuthForm: FC<AuthFormProps> = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthData>();

  const onSubmit = (data: {}) => {
    axios.post("http://localhost:4000/users", data);
    setOpen();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        register={{
          ...register("email", {
            required: "Введите email",
          }),
        }}
        placeholder="Email..."
        type="email"
        errorMessage={errors.email?.message}
      />
      <TextField
        register={{
          ...register("nick", {
            required: "Введите Никнейм",
          }),
        }}
        placeholder="Никнейм..."
        type="text"
        errorMessage={errors.email?.message}
      />
      <PasswordTextField
        register={{
          ...register("password", {
            required: "Введите пароль",
          }),
        }}
        placeholder="Пароль..."
        errorMessage={errors.password?.message}
      />
      <PasswordTextField
        register={{
          ...register("password", {
            required: "Введите пароль",
          }),
        }}
        placeholder="Повторите пароль..."
        errorMessage={errors.password?.message}
      />
      <button className={styles.button}>Зарегестрироваться</button>
    </form>
  );
};

export default AuthForm;
