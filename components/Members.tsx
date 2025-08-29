import axios from 'axios';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux';
import { setUsers } from '../store/slices/UsersSlice';
import { User } from '../types/User';
import TextField from './TextField';

import styles from '../styles/Members.module.scss';
import Image from 'next/image';

interface MemberProps {
  onClose: () => void;
  members: string[];
  setMembers: Dispatch<SetStateAction<string[]>>;
}

const Members: FC<MemberProps> = ({ members, setMembers, onClose }) => {
  const [query, setQuery] = useState('');
  let [active, setActive] = useState(false);
  const dispatch = useAppDispatch();

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const response = await axios.get('http://localhost:4000/users/search?query=' + e.target.value);
    dispatch(setUsers(response.data));
  };
  const { users } = useAppSelector((state) => state.users);

  const onClickUserHandler = (id: string) => {
    setActive((prev) => !prev);
    if (!members.includes(id)) {
      setMembers([...members, id]);
    } else {
      // members = members.filter((i) => i !== id);
      const index = members.indexOf(id);
      members.splice(index, 1);
    }
  };

  const onClickClose = () => {
    onClose();
  };

  return (
    <div className={styles.block}>
      <div className="container">
        <h1>Выберите участников</h1>
        <TextField placeholder="Поиск... " value={query} onChange={search} />
        <div className={styles.users}>
          {users &&
            users.map((user, i) => (
              <div
                onClick={() => onClickUserHandler(user._id)}
                className={members.includes(user._id) ? styles.active : styles.user}
                key={i}>
                <Image
                  className={styles.image}
                  alt="UserAvatar"
                  src={`http://localhost:4000/${user.pictureUrl}`}
                  height={40}
                  width={40}
                />
                {user.nick}
              </div>
            ))}
        </div>
        <div className={styles.add} onClick={onClickClose}>
          Добавить
        </div>
      </div>
    </div>
  );
};

export default Members;
