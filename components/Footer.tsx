import Image from "next/image";
import Link from "next/link";
import React from "react";
import avatar from "../assets/Group 83.png";

import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
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
          <div className={styles.pox}>
            ©2022 Разработано Foki с целью ознакомления
          </div>
          <div className={styles.list}>
            <h3>Интересные страницы</h3>
            <Link href="/chat">
              <a href="/chat">Чат</a>
            </Link>
            <Link href="/albums">
              <a href="/albums">Альбомы</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
