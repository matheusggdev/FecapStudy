function HistoricoSessoes({ sessoes }) {
  return (
    <section className="cartao">
      <h2>Histórico desta sessão</h2>
      {sessoes.length === 0 ? (
        <p className="vazio">Nenhum estudo registrado ainda.</p>
      ) : (
        <ol className="historico">
          {/* mais recente primeiro; o feedback vem do próprio objeto (polimorfismo) */}
          {[...sessoes].reverse().map((sessao, indice) => (
            <li key={sessoes.length - indice}>{sessao.gerarFeedback()}</li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default HistoricoSessoes
