import { useState } from "react";
import { IRegister } from "../../types";
import { validatePassword } from "../../utils/regex";
import styled from "./style.module.scss";

interface IForm {
  button: string | JSX.Element;
  action: ({ username, password }: IRegister) => void;
  title: string;
}

function FormUser({ button, action, title }: IForm) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (passwordErr) return;
  }

  const validate = () => {
    if (!validatePassword.test(password)) setPasswordErr(true);
    else {
      action({ username, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styled.Container}>
      <h1>{title}</h1>
      <label htmlFor="username">Nome do Usuário</label>
      <input
        type="text"
        name="username"
        id="username"
        required
        minLength={3}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <label htmlFor="password">Senha</label>
      {passwordErr && (
        <p>
          Por favor digite uma senha válida{" "}
          <ul>
            Requisitos mínimos:
            <li>* mínimo 8 dígitos</li>
            <li>* 1 letra maiúscula</li>
            <li>* 1 letra minuscula</li>
            <li>* 1 numero</li>
          </ul>
        </p>
      )}
      <input
        type="password"
        name="password"
        id="password"
        minLength={8}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      <button onClick={validate}>{button}</button>
    </form>
  );
}

export default FormUser;
