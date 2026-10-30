import { useState } from 'react'

function PainelResponsavel({ meta, canais, onRedefinirMeta, onNotificar }) {
  const [novaMeta, setNovaMeta] = useState(meta.getMetaMinutosSemana())
  const [canal, setCanal] = useState(canais[0])

  return (
    <section className="cartao">
      <h2>Área do responsável</h2>

      <div className="linha alinhada">
        <label>
          Meta semanal (min)
          <input type="number" value={novaMeta} onChange={(e) => setNovaMeta(e.target.value)} />
        </label>
        <button type="button" onClick={() => onRedefinirMeta(Number(novaMeta))}>
          Redefinir meta
        </button>
      </div>

      <div className="linha alinhada">
        <label>
          Canal de alerta
          <select value={canal} onChange={(e) => setCanal(e.target.value)}>
            {canais.map((nome) => (
              <option key={nome} value={nome}>
                {nome}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={() => onNotificar(canal)}>
          Notificar Responsável
        </button>
      </div>
    </section>
  )
}

export default PainelResponsavel
