function PainelTrilha({ trilha, plano }) {
  return (
    <section className="cartao">
      <h2>Trilha e cronograma</h2>
      <p>{trilha.exibirResumo()}</p>
      <ul className="lista-simples">
        {trilha.getDisciplinas().map((d) => (
          <li key={d.getCodigo()}>{d.exibirResumo()}</li>
        ))}
      </ul>
      <p>
        Plano de {plano.getDiscente().getNome()}: {plano.listarItens().join(' · ')} (
        {plano.calcularMinutosPlanejados()} min planejados)
      </p>
    </section>
  )
}

export default PainelTrilha
