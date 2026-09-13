import { supabase } from "./services/supabase";
import React, { useState } from "react";

const categorias = [
  {
    id: "saude",
    icone: "🏥",
    nome: "Saúde e Bem-Estar",
    descricao: "Atendimento, medicamentos, exames e unidades",
  },
  {
    id: "educacao",
    icone: "🏫",
    nome: "Educação",
    descricao: "Escolas, alimentação, materiais e estrutura",
  },
  {
    id: "infraestrutura",
    icone: "🛣️",
    nome: "Infraestrutura e Obras",
    descricao: "Ruas, calçadas, obras e pavimentação",
  },
  {
    id: "iluminacao",
    icone: "💡",
    nome: "Iluminação Pública",
    descricao: "Postes, lâmpadas e pontos sem iluminação",
  },
  {
    id: "estradas",
    icone: "🌾",
    nome: "Estradas e Acessos Rurais",
    descricao: "Estradas, pontes, mata-burros e acessos",
  },
  {
    id: "agua",
    icone: "🚰",
    nome: "Água e Saneamento",
    descricao: "Abastecimento, esgoto e saneamento",
  },
];

function App() {
  const [tela, setTela] = useState("inicio");

  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const [localizacao, setLocalizacao] = useState("");

  const [endereco, setEndereco] = useState("");

  const [descricao, setDescricao] = useState("");

  const [impacto, setImpacto] = useState("");

  const [gpsStatus, setGpsStatus] = useState("");

  const [protocolo, setProtocolo] = useState("");

  function selecionarCategoria(categoria) {
    setCategoriaSelecionada(categoria);
    setTela("localizacao");
  }

  function usarLocalizacao() {
    setGpsStatus("Obtendo sua localização...");

    if (!navigator.geolocation) {
      setGpsStatus("Seu navegador não permite obter a localização.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        const latitude = posicao.coords.latitude.toFixed(6);
        const longitude = posicao.coords.longitude.toFixed(6);

        setLocalizacao(`GPS: ${latitude}, ${longitude}`);
        setGpsStatus("Localização obtida com sucesso.");
        setTela("descricao");
      },
      () => {
        setGpsStatus(
          "Não foi possível obter sua localização. Verifique a permissão do navegador."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  function escolherNoMapa() {
    setTela("mapa");
  }

  function pesquisarEndereco() {
    setTela("endereco");
  }

  function confirmarEndereco() {
    if (!endereco.trim()) {
      return;
    }

    setLocalizacao(endereco);
    setTela("descricao");
  }

  function confirmarMapa() {
    setLocalizacao("Ponto selecionado no mapa");
    setTela("descricao");
  }

  function continuarDescricao() {
    if (!descricao.trim()) {
      return;
    }

    setTela("impacto");
  }

  function selecionarImpacto(valor) {
    setImpacto(valor);
    setTela("revisao");
  }

  function enviarDemanda() {
    const numero = Math.floor(100000 + Math.random() * 900000);

    setProtocolo(`CI-2026-${numero}`);
    setTela("sucesso");
  }

  function voltarInicio() {
    setTela("inicio");
    setCategoriaSelecionada(null);
    setLocalizacao("");
    setEndereco("");
    setDescricao("");
    setImpacto("");
    setGpsStatus("");
    setProtocolo("");
  }

  if (tela === "registrar") {
    return (
      <main className="app">
        <header className="header">
          <button className="voltar" onClick={() => setTela("inicio")}>
            ← Voltar
          </button>

          <div>
            <h1>Registrar demanda</h1>
            <p>Ajude a identificar o que precisa melhorar.</p>
          </div>
        </header>

        <section className="welcome">
          <h2>O que você quer informar?</h2>
          <p>Escolha uma opção para continuar.</p>
        </section>

        <section className="actions">
          <button
            className="action"
            onClick={() => setTela("problema")}
          >
            <span>⚠️</span>
            <div>
              <strong>Problema</strong>
              <small>Informe algo que precisa ser resolvido</small>
            </div>
          </button>

          <button className="action">
            <span>💡</span>
            <div>
              <strong>Sugestão</strong>
              <small>Dê uma ideia para melhorar nossa cidade</small>
            </div>
          </button>

          <button className="action">
            <span>📍</span>
            <div>
              <strong>Utilidade pública</strong>
              <small>Compartilhe uma informação útil para a comunidade</small>
            </div>
          </button>
        </section>
      </main>
    );
  }

  if (tela === "problema") {
    return (
      <main className="app">
        <header className="header">
          <button className="voltar" onClick={() => setTela("registrar")}>
            ← Voltar
          </button>

          <div>
            <h1>Qual é o problema?</h1>
            <p>Escolha a área relacionada à demanda.</p>
          </div>
        </header>

        <section className="welcome">
          <h2>Selecione uma área</h2>
          <p>Isso ajuda a organizar e encaminhar sua demanda.</p>
        </section>

        <section className="actions">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              className="action"
              onClick={() => selecionarCategoria(categoria)}
            >
              <span>{categoria.icone}</span>

              <div>
                <strong>{categoria.nome}</strong>
                <small>{categoria.descricao}</small>
              </div>
            </button>
          ))}
        </section>
      </main>
    );
  }

  if (tela === "localizacao") {
    return (
      <main className="app">
        <header className="header">
          <button className="voltar" onClick={() => setTela("problema")}>
            ← Voltar
          </button>

          <div>
            <h1>Onde está o problema?</h1>
            <p>Localize a demanda para ajudar na identificação.</p>
          </div>
        </header>

        <section className="welcome">
          <h2>{categoriaSelecionada?.nome}</h2>
          <p>Escolha como deseja informar a localização.</p>
        </section>

        <section className="actions">
          <button className="action" onClick={usarLocalizacao}>
            <span>📍</span>
            <div>
              <strong>Usar minha localização</strong>
              <small>Usar o GPS do celular</small>
            </div>
          </button>

          <button className="action" onClick={escolherNoMapa}>
            <span>🗺️</span>
            <div>
              <strong>Escolher no mapa</strong>
              <small>Marcar o ponto diretamente no mapa</small>
            </div>
          </button>

          <button className="action" onClick={pesquisarEndereco}>
            <span>🔎</span>
            <div>
              <strong>Pesquisar endereço</strong>
              <small>Informar rua, bairro ou comunidade</small>
            </div>
          </button>

          {gpsStatus && (
            <p style={{ padding: "15px", textAlign: "center" }}>
              {gpsStatus}
            </p>
          )}
        </section>
      </main>
    );
  }

  if (tela === "mapa") {
    return (
      <main className="app">
        <header className="header">
          <button className="voltar" onClick={() => setTela("localizacao")}>
            ← Voltar
          </button>

          <div>
            <h1>Escolher no mapa</h1>
            <p>Marque aproximadamente onde está o problema.</p>
          </div>
        </header>

        <section className="welcome">
          <h2>Mapa da ocorrência</h2>
          <p>
            Nesta etapa você poderá selecionar o ponto onde o problema
            está localizado.
          </p>
        </section>

        <section
          style={{
            margin: "20px",
            height: "300px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, #dfe8d8, #b9d1ad, #e8e2c8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <div>
            <div style={{ fontSize: "55px" }}>📍</div>
            <h2>Selecione o ponto</h2>
            <p>
              O mapa interativo será conectado nesta área na próxima
              etapa.
            </p>
          </div>
        </section>

        <section className="actions">
          <button className="action primary" onClick={confirmarMapa}>
            <span>✓</span>
            <div>
              <strong>Confirmar localização</strong>
              <small>Continuar para a descrição</small>
            </div>
          </button>
        </section>
      </main>
    );
  }

  if (tela === "endereco") {
    return (
      <main className="app">
        <header className="header">
          <button className="voltar" onClick={() => setTela("localizacao")}>
            ← Voltar
          </button>

          <div>
            <h1>Pesquisar endereço</h1>
            <p>Informe onde está o problema.</p>
          </div>
        </header>

        <section className="welcome">
          <h2>Qual é o endereço?</h2>
          <p>
            Você pode informar uma rua, número, bairro ou comunidade.
          </p>
        </section>

        <section style={{ padding: "20px" }}>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Ex.: Rua Fazendinha, São Geraldo"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </section>

        <section className="actions">
          <button
            className="action primary"
            onClick={confirmarEndereco}
          >
            <span>✓</span>
            <div>
              <strong>Confirmar endereço</strong>
              <small>Continuar para a descrição</small>
            </div>
          </button>
        </section>
      </main>
    );
  }

  if (tela === "descricao") {
    return (
      <main className="app">
        <header className="header">
          <button className="voltar" onClick={() => setTela("localizacao")}>
            ← Voltar
          </button>

          <div>
            <h1>Descreva o problema</h1>
            <p>Conte o que está acontecendo.</p>
          </div>
        </header>

        <section className="welcome">
          <h2>{categoriaSelecionada?.nome}</h2>
          <p>Local: {localizacao}</p>
        </section>

        <section style={{ padding: "20px" }}>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex.: Existe um buraco grande na rua e os veículos estão tendo dificuldade para passar."
            rows="7"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
        </section>

        <section className="actions">
          <button
            className="action primary"
            onClick={continuarDescricao}
          >
            <span>→</span>
            <div>
              <strong>Continuar</strong>
              <small>Informar o impacto da situação</small>
            </div>
          </button>
        </section>
      </main>
    );
  }

  if (tela === "impacto") {
    return (
      <main className="app">
        <header className="header">
          <button className="voltar" onClick={() => setTela("descricao")}>
            ← Voltar
          </button>

          <div>
            <h1>Qual é o impacto?</h1>
            <p>Ajude a definir a prioridade da demanda.</p>
          </div>
        </header>

        <section className="welcome">
          <h2>Selecione a urgência</h2>
          <p>Escolha a opção que melhor representa a situação.</p>
        </section>

        <section className="actions">
          <button
            className="action"
            onClick={() => selecionarImpacto("Pouco urgente")}
          >
            <span>🟢</span>
            <div>
              <strong>Pouco urgente</strong>
              <small>Problema que pode aguardar</small>
            </div>
          </button>

          <button
            className="action"
            onClick={() => selecionarImpacto("Importante")}
          >
            <span>🟡</span>
            <div>
              <strong>Importante</strong>
              <small>Precisa de atenção</small>
            </div>
          </button>

          <button
            className="action"
            onClick={() => selecionarImpacto("Urgente")}
          >
            <span>🔴</span>
            <div>
              <strong>Urgente</strong>
              <small>Problema que precisa de atenção rápida</small>
            </div>
          </button>
        </section>
      </main>
    );
  }

  if (tela === "revisao") {
    return (
      <main className="app">
        <header className="header">
          <button className="voltar" onClick={() => setTela("impacto")}>
            ← Voltar
          </button>

          <div>
            <h1>Confira sua demanda</h1>
            <p>Verifique as informações antes de enviar.</p>
          </div>
        </header>

        <section className="welcome">
          <h2>Resumo</h2>

          <p>
            <strong>Categoria:</strong>{" "}
            {categoriaSelecionada?.nome}
          </p>

          <p>
            <strong>Local:</strong> {localizacao}
          </p>

          <p>
            <strong>Impacto:</strong> {impacto}
          </p>

          <p>
            <strong>Descrição:</strong> {descricao}
          </p>
        </section>

        <section className="actions">
          <button className="action primary" onClick={enviarDemanda}>
            <span>📤</span>
            <div>
              <strong>Enviar demanda</strong>
              <small>Registrar oficialmente esta solicitação</small>
            </div>
          </button>
        </section>
      </main>
    );
  }

  if (tela === "sucesso") {
    return (
      <main className="app">
        <section
          style={{
            textAlign: "center",
            padding: "60px 25px",
          }}
        >
          <div style={{ fontSize: "70px" }}>✅</div>

          <h1>Demanda registrada!</h1>

          <p>
            Sua contribuição foi registrada no Conecta Itamarandiba.
          </p>

          <div
            style={{
              margin: "30px 0",
              padding: "25px",
              borderRadius: "16px",
              background: "#f1f7ef",
            }}
          >
            <small>Seu protocolo</small>

            <h2>{protocolo}</h2>
          </div>

          <p>
            Guarde este número para acompanhar o andamento da demanda.
          </p>

          <section className="actions">
            <button
              className="action primary"
              onClick={voltarInicio}
            >
              <span>🏠</span>
              <div>
                <strong>Voltar para o início</strong>
                <small>Continuar usando o Conecta Itamarandiba</small>
              </div>
            </button>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="header">
        <div className="logo">CI</div>

        <div>
          <h1>Conecta Itamarandiba</h1>
          <p>Sua voz no mapa. Uma cidade em movimento.</p>
        </div>
      </header>

      <section className="welcome">
        <h2>Como podemos ajudar?</h2>

        <p>
          Participe, registre uma demanda e acompanhe o que acontece
          em nossa cidade.
        </p>
      </section>

      <section className="actions">
        <button className="action primary">
          <span>🗺️</span>
          <div>
            <strong>Ver o mapa</strong>
            <small>Veja as demandas da cidade</small>
          </div>
        </button>

        <button
          className="action"
          onClick={() => setTela("registrar")}
        >
          <span>➕</span>
          <div>
            <strong>Registrar demanda</strong>
            <small>Informe um problema ou sugestão</small>
          </div>
        </button>

        <button className="action">
          <span>📋</span>
          <div>
            <strong>Acompanhar demanda</strong>
            <small>Veja o andamento da sua solicitação</small>
          </div>
        </button>

        <button className="action">
          <span>👤</span>
          <div>
            <strong>Meu perfil</strong>
            <small>Acesse seus registros e informações</small>
          </div>
        </button>
      </section>

      <footer>
        <p>Conecta Itamarandiba</p>
        <span>Sua voz no mapa. Uma cidade em movimento.</span>
      </footer>
    </main>
  );
}

export default App;