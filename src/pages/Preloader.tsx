export function Preloader() {
  return (
    <main className="preloader" aria-label="Carregando o Desafio BQ">
      <div className="loader-orbit" aria-hidden="true">
        <div className="loader-logo"><img src="/assets/logo-bq.png" alt="" /></div>
        <i className="orbit-dot" />
      </div>
      <p>Preparando o desafio</p>
      <div className="loader-track" aria-hidden="true"><span /></div>
    </main>
  )
}

