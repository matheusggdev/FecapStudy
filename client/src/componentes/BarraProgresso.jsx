function BarraProgresso({ meta }) {
  const percentual = meta.calcularPercentual()

  return (
    <section className="cartao">
      <h2>Meta semanal</h2>
      <div
        className="barra"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percentual)}
      >
        <div
          className={`barra-preenchida ${meta.estaCumprida() ? 'cumprida' : ''}`}
          style={{ width: `${percentual}%` }}
        />
      </div>
      <p className="barra-legenda">
        <strong>{percentual.toFixed(0)}%</strong> — {meta.getMinutosCumpridos()} de{' '}
        {meta.getMetaMinutosSemana()} min
        {meta.estaCumprida() && ' · Meta cumprida!'}
      </p>
    </section>
  )
}

export default BarraProgresso
