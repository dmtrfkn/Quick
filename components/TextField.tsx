import React, { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import styles from "../styles/TextField.module.scss";

interface TextFiledProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  register?: UseFormRegisterReturn<"email" | "name" | "nick">;
  type?: "text" | "email" | 'range';
  errorMessage?: string;
}

const TextField: FC<TextFiledProps> = ({
  value,
  placeholder,
  errorMessage,
  onChange,
  register,
  type,
}) => {
  return (
    <>
      {onChange ? (
        <input
          value={value}
          placeholder={placeholder}
          type={type}
          autoComplete="off"
          className={styles.input}
          onChange={onChange}
        />
      ) : (
        <>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          <input
            value={value}
            placeholder={placeholder}
            {...register}
            type={type}
            autoComplete="off"
            className={styles.input}
          />
        </>
      )}
    </>
  );
};

export default TextField;
