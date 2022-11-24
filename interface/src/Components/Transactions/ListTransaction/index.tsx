import { useEffect, useState } from "react";
import api from "../../../Api/Connect";
import Loading from "../../../assets/Loading";
import styled from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
}

interface ITransaction {
  id: number;
  createdAt: string;
  debitedAccountId: number;
  crediteAccountId: number;
  value: string;
}

function ListTransactions({ isOpen, setIsOpen }: Props) {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [userId, setUserId] = useState(0);
  const [navSelect, setNavSelect] = useState("data");

  useEffect(() => {
    const token = "Barrel " + localStorage.getItem("token");

    setLoading(true);

    api({
      method: "get",
      url: "/sync",
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      setTransactions(res.data[2][0]);
      setUserId(res.data[1].id);
      setLoading(false);
    });
  }, []);

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
        {loading ? (
          <Loading />
        ) : (
          <>
            <nav>
              Filtros:{" "}
              <a
                onClick={() => setNavSelect("data")}
                className={navSelect === "data" ? styled.Selected : ""}
              >
                Data
              </a>{" "}
              |&nbsp;
              <a
                onClick={() => setNavSelect("send")}
                className={navSelect === "send" ? styled.Selected : ""}
              >
                Enviadas
              </a>{" "}
              |&nbsp;
              <a
                onClick={() => setNavSelect("received")}
                className={navSelect === "received" ? styled.Selected : ""}
              >
                Recebidas
              </a>
            </nav>
            <hr />
            {filterTransactions(navSelect, transactions, userId)}
          </>
        )}
      </div>
    </div>
  );
}
export default ListTransactions;

function filterTransactions(
  navSelect: string,
  transactions: ITransaction[],
  userId: number
) {
  let selectFilter;

  switch (navSelect) {
    case "data":
      selectFilter = (
        <table className={styled.TableTransaction}>
          <thead>
            <tr>
              <th>Enviou</th>
              <th>Recebeu</th>
              <th>value</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, idx) => (
              <tr key={idx}>
                <td>{item.debitedAccountId}</td>
                <td>{item.crediteAccountId}</td>
                <td>
                  R$ {parseFloat(item.value).toFixed(2).replace(".", ",")}
                </td>
                <td>{getDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
      break;

    case "send":
      const filterTransactions = transactions.filter(
        (item) => item.debitedAccountId === userId
      );

      selectFilter = (
        <table className={styled.TableTransaction}>
          <thead>
            <tr>
              <th>Enviou</th>
              <th>Recebeu</th>
              <th>value</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {filterTransactions.map((item, idx) => (
              <tr key={idx}>
                <td>{item.debitedAccountId}</td>
                <td>{item.crediteAccountId}</td>
                <td>
                  R$ {parseFloat(item.value).toFixed(2).replace(".", ",")}
                </td>
                <td>{getDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );

      break;

    case "received":
      const filterTransactionsRec = transactions.filter(
        (item) => item.crediteAccountId === userId
      );

      selectFilter = (
        <table className={styled.TableTransaction}>
          <thead>
            <tr>
              <th>Enviou</th>
              <th>Recebeu</th>
              <th>value</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {filterTransactionsRec.map((item, idx) => (
              <tr key={idx}>
                <td>{item.debitedAccountId}</td>
                <td>{item.crediteAccountId}</td>
                <td>
                  R$ {parseFloat(item.value).toFixed(2).replace(".", ",")}
                </td>
                <td>{getDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );

      break;
  }

  return selectFilter;
}

function getDate(date: string) {
  const dateNow = new Date(date);

  const formatterDate = `${dateNow.getDate()}/${dateNow.getMonth()} ${
    dateNow.getHours() < 10 ? `0${dateNow.getHours()}` : dateNow.getHours()
  }:${dateNow.getMinutes()}`;

  return formatterDate;
}
