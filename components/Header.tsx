import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import auth from "../assets/Group 82.png";
import avatar from "../assets/Group 83.png";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { logout, UserSlice } from "../store/slices/UserSlice";

import styles from "../styles/Header.module.scss";
import LoginPopup from "./LoginPopup";
import Modal from "./Modal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuth, user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    window.localStorage.removeItem('token')
    dispatch(logout());
  };

  const setIsOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Image
              className={styles.img}
              src={avatar}
              alt="quick"
              width={60.04}
              height={60}
            />
            <div>Quick</div>
          </div>
          <div className={styles.links}>
            <Link href="/">
              <a className={styles.link}>ГЛАВНАЯ</a>
            </Link>
            <Link href="/tracks">
              <a className={styles.link}>МУЗЫКА</a>
            </Link>
            <Link href="/">
              <a className={styles.link}>МОИ ТРЕКИ</a>
            </Link>
            <Link href="/">
              <a className={styles.link}>ЧАТ</a>
            </Link>
            <Link href="/">
              <a className={styles.link}>АЛЬБОМЫ</a>
            </Link>
          </div>
          <div className={`${styles.auth} ${user ? styles.hov : ""}`}>
            {user ? (
              <div onClick={logoutHandler}>{user.nick}</div>
            ) : (
              <>
                <Image src={auth} alt="вход" width={32.01} height={32} />
                <div onClick={setIsOpenHandler}>Войти</div>
              </>
            )}
          </div>
          <Modal isOpen={isOpen} setOpen={setIsOpenHandler}>
            <LoginPopup SetOpen={setIsOpenHandler} />
          </Modal>
        </div>
      </div>
    </header>
  );
};

export default Header;
