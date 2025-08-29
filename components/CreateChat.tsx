import axios from 'axios';
import Image from 'next/image';
import { FC, useRef, useState } from 'react';
import { useAppSelector } from '../store/hooks/redux';
import styles from '../styles/CreateChat.module.scss';
import Members from './Members';
import Modal from './Modal';
import TextField from './TextField';

interface CreateChatProps {
  setOpen: () => void;
}

const CreateChat: FC<CreateChatProps> = ({ setOpen }) => {
  const { user } = useAppSelector((state) => state.user);
  const [image, setImage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  let [members, setMembers] = useState<string[]>([]);

  const inputFileRef = useRef(null);
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      formData.append('type', 'CHAT');
      await axios
        .post('http://localhost:4000/files', formData)
        .then((res) => setImage(res.data.url));
    } catch (error) {
      console.log(error);
      alert('Ошибка при загрузке картинки');
    }
  };

  const onChangeHandler = (value: string) => {
    setValue(value);
  };

  const onCloseHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const sendData = () => {
    if (value && members) {
      members.push(user._id);
      axios
        .post('http://localhost:4000/chats', {
          picture: image,
          roomName: value,
          members: members,
        })
        .then((res) => {
          console.log(res.data);
          setOpen();
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <div className={styles.block}>
        <div className="container">
          <h1>Создание чата</h1>
          <div>
            <div className={styles.cursor} onClick={() => inputFileRef.current.click()}>
              Выберите изображение чата
            </div>
            <input onChange={handleChangeFile} type="file" ref={inputFileRef} hidden />
            <div className={styles.image}>
              {image && (
                <Image
                  className={styles.image}
                  src={`http://localhost:4000/${image}`}
                  width={70}
                  height={70}
                  alt="chatImage"
                />
              )}
            </div>
            <div>
              <TextField
                value={value}
                onChange={(e) => onChangeHandler(e.target.value)}
                placeholder="Введите название чата"
              />
            </div>
            {members.length !== 0 ? (
              <div className={styles.cursor} onClick={onCloseHandler}>
                Изменить участников
              </div>
            ) : (
              <div className={styles.cursor} onClick={onCloseHandler}>
                Добавить участников{' '}
              </div>
            )}
            <div onClick={sendData} className={styles.add}>
              Создать чат
            </div>

            {isOpen && (
              <Members onClose={onCloseHandler} setMembers={setMembers} members={members}></Members>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChat;
