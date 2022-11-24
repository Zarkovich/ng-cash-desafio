import { useState } from "react";
import api from "../../../Api/Connect";
import Loading from "../../../assets/Loading";
import styled from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
}

function CreateTransaction({ isOpen, setIsOpen }: Props) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [value, setValue] = useState("");

  async function handleTransaction() {
    setLoading(true);

    const token = "Barrel " + localStorage.getItem("token");

    api({
      method: "post",
      url: "/transaction",
      data: {
        creditUsername: username,
        value,
      },
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      if (res.data.status === "Error") {
        alert(res.data.message);
        setLoading(false);
      } else {
        setLoading(false);
        setIsOpen(false);
      }
    });
  }

  return (
    <div
      className={
        isOpen ? `${styled.Container} ${styled.Open}` : styled.Container
      }
    >
      <button className={styled.CloseButton} onClick={() => setIsOpen(false)}>
        X
      </button>

      <div>
        <label htmlFor="username">Para quem você que transferir?</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="value">Qual valor da transferência</label>
        <input
          type="number"
          name="value"
          id="value"
          placeholder="0,00"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(",", "."))}
        />
        {loading ? (
          <Loading />
        ) : (
          <button onClick={handleTransaction}>Transferir</button>
        )}
      </div>
    </div>
  );
}

export default CreateTransaction;
