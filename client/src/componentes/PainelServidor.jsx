function PainelServidor({ relatorio, carregando, onCarregar }) {
  return (
    <section className="cartao">
      <div className="linha alinhada entre">
        <h2>Dados do servidor (MySQL)</h2>
        <button type="button" onClick={onCarregar} disabled={carregando}>
          {carregando ? 'Carregando…' : 'Carregar Histórico do Servidor / Relatório'}
        </button>
      </div>

      {!relatorio ? (
        <p className="vazio">Clique no botão para buscar o relatório gravado no banco.</p>
      ) : (
        <>
          <div className="resumo-servidor">
            <div>
              <strong>{relatorio.totalSessoes}</strong>
              <span>sessões</span>
            </div>
            <div>
              <strong>{relatorio.totalMinutosEstudados}</strong>
              <span>minutos</span>
            </div>
            <div>
              <strong>{relatorio.totalXpAcumulado}</strong>
              <span>XP</span>
            </div>
            <div>
              <strong>{relatorio.percentualMetaConcluida}%</strong>
              <span>da meta de {relatorio.metaMinutosSemana} min</span>
            </div>
          </div>
          <p>{relatorio.statusAcompanhamento}</p>

          {relatorio.sessoesRecentes.length > 0 && (
            <div className="tabela-rolagem">
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Disciplina</th>
                    <th>Modalidade</th>
                    <th>Min</th>
                    <th>XP</th>
                  </tr>
                </thead>
                <tbody>
                  {relatorio.sessoesRecentes.map((sessao) => (
                    <tr key={sessao.id}>
                      <td>{sessao.dataRegistro}</td>
                      <td>{sessao.disciplina}</td>
                      <td>{sessao.tipoModalidade}</td>
                      <td>{sessao.duracaoMinutos}</td>
                      <td>{sessao.xpGanho}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default PainelServidor
