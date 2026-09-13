function App() {
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

        <button className="action">
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
