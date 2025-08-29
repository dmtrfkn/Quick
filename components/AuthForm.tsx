import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import PasswordTextField from './PasswordTextField';
import TextField from './TextField';

import styles from '../styles/AuthForm.module.scss';
import axios from 'axios';

interface AuthFormProps {
  setOpen: () => void;
}

interface RegistrationValues {
  email: string;
  nick: string;
  password: string;
  passwordConfirmation: string;
}

const AuthForm: FC<AuthFormProps> = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<RegistrationValues>();

  const onSubmit = (data: {}) => {
    axios
      .post('http://localhost:4000/users', data)
      .catch((error) => setError('email', { message: error.response.data.message }));
    if (!errors) {
      setOpen();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        placeholder="Email..."
        message={errors.email?.message}
        register={{
          ...register('email', {
            required: 'Укажите email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
              message: 'Укажие корректный email',
            },
          }),
        }}
      />
      <TextField
        register={{
          ...register('nick', {
            required: 'Введите Никнейм',
          }),
        }}
        placeholder="Никнейм..."
        type="text"
        errorMessage={errors.email?.message}
      />
      <PasswordTextField
        placeholder="Пароль..."
        message={errors.password?.message}
        register={{
          ...register('password', {
            required: 'Укажите пароль',
            validate: (password: string) => {
              if (!password.trim()) {
                return 'Укажите корректный пароль';
              }
            },
          }),
        }}
      />
      <PasswordTextField
        placeholder="Повторите пароль..."
        message={errors.password?.message}
        register={{
          ...register('password', {
            required: 'Укажите пароль',
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return password === value || 'Пароли не совпадают';
              },
            },
          }),
        }}
      />
      <button className={styles.button}>Зарегестрироваться</button>
    </form>
  );
};

export default AuthForm;
