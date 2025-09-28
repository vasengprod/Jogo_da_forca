"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

const palavras = [
  "REACT", "NEXTJS", "JAVASCRIPT", "PYTHON", "NODE", "MYSQL", "GITHUB",
  "VERCEL", "HTML", "CSS", "ANGULAR", "JAVA", "LINUX", "DOCKER", "KUBERNETES",
  "MONGODB", "REDUX", "TYPESCRIPT", "PHP", "RUBY", "SWIFT", "CLOUD",
  "KOTLIN", "API", "FRONTEND", "BACKEND", "FULLSTACK", "PROGRAMAÇÃO", "ALGORITMO", "ENGENHARIA"
];

export default function JogoForca() {
  const [palavra, setPalavra] = useState("");
  const [tentativas, setTentativas] = useState(6);
  const [letrasUsadas, setLetrasUsadas] = useState([]);
  const [palavraOculta, setPalavraOculta] = useState([]);
  const [status, setStatus] = useState("jogando"); // jogando | venceu | perdeu
  const [inputLetra, setInputLetra] = useState("");

  // iniciar jogo
  useEffect(() => {
    iniciarJogo();
  }, []);

  function iniciarJogo() {
    const palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)];
    setPalavra(palavraAleatoria);
    setTentativas(6);
    setLetrasUsadas([]);
    setPalavraOculta(Array(palavraAleatoria.length).fill("_"));
    setStatus("jogando");
    setInputLetra("");
  }

  function tentarLetra(letra) {
    if (status !== "jogando") return;
    letra = letra.toUpperCase();

    if (letrasUsadas.includes(letra)) return;

    setLetrasUsadas([...letrasUsadas, letra]);

    if (palavra.includes(letra)) {
      const novaPalavra = [...palavraOculta];
      for (let i = 0; i < palavra.length; i++) {
        if (palavra[i] === letra) {
          novaPalavra[i] = letra;
        }
      }
      setPalavraOculta(novaPalavra);

      if (!novaPalavra.includes("_")) {
        setStatus("venceu");
      }
    } else {
      const novasTentativas = tentativas - 1;
      setTentativas(novasTentativas);
      if (novasTentativas === 0) {
        setStatus("perdeu");
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1>🎯 Jogo da Forca</h1>

      <div className={styles.palavra}>
        {palavraOculta.map((l, i) => (
          <span key={i} className={styles.letra}>{l}</span>
        ))}
      </div>

      <p>Tentativas restantes: {tentativas}</p>

      <input
        type="text"
        maxLength="1"
        value={inputLetra}
        onChange={(e) => setInputLetra(e.target.value)}
      />
      <button onClick={() => { tentarLetra(inputLetra); setInputLetra(""); }}>
        Jogar Letra
      </button>

      <div className={styles.letrasUsadas}>
        <p>Letras usadas:</p>
        {letrasUsadas.map((l, i) => (
          <span key={i} className={palavra.includes(l) ? styles.correta : styles.errada}>
            {l}
          </span>
        ))}
      </div>

      {status === "venceu" && <h2>🎉 Parabéns! Você acertou: {palavra}</h2>}
      {status === "perdeu" && <h2>💀 Você perdeu! A palavra era: {palavra}</h2>}

      <button onClick={iniciarJogo}>🔄 Reiniciar</button>
    </div>
  );
}
