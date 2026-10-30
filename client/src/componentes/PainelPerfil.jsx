function PainelPerfil({ discente, responsavel }) {
  return (
    <section className="perfis">
      <div className="perfil">
        <span className="perfil-rotulo">Discente</span>
        <p>{discente.gerarPainelResumo()}</p>
      </div>
      <div className="perfil">
        <span className="perfil-rotulo">Responsável</span>
        <p>{responsavel.gerarPainelResumo()}</p>
      </div>
    </section>
  )
}

export default PainelPerfil
