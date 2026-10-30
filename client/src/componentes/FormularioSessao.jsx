import { useState } from 'react'
import { SessaoPomodoro } from '../dominio/sessoes/SessaoPomodoro.js'
import { SessaoExercicios } from '../dominio/sessoes/SessaoExercicios.js'
import { SessaoLeitura } from '../dominio/sessoes/SessaoLeitura.js'

// Cada modalidade sabe qual subclasse de SessaoEstudo criar.
// A fórmula de XP NÃO fica aqui: quem calcula é o próprio objeto.
const MODALIDADES = {
  Pomodoro: {
    rotuloExtra: 'Ciclos completos',
    extraPadrao: 1,
    criar: (disciplina, duracao, campos) => new SessaoPomodoro(disciplina, duracao, campos.extra),
  },
  Exercicios: {
    rotuloExtra: 'Acertos',
    extraPadrao: 8,
    criar: (disciplina, duracao, campos) =>
      new SessaoExercicios(disciplina, duracao, campos.totalQuestoes, campos.extra),
  },
  Leitura: {
    rotuloExtra: 'Páginas lidas',
    extraPadrao: 10,
    criar: (disciplina, duracao, campos) =>
      new SessaoLeitura(disciplina, duracao, campos.extra, campos.fezResumo),
  },
}

function FormularioSessao({ disciplinas, onRegistrar, onErro }) {
  const [codigo, setCodigo] = useState(disciplinas[0]?.getCodigo() ?? '')
  const [modalidade, setModalidade] = useState('Pomodoro')
  const [duracao, setDuracao] = useState(25)
  const [extra, setExtra] = useState(MODALIDADES.Pomodoro.extraPadrao)
  const [totalQuestoes, setTotalQuestoes] = useState(10)
  const [fezResumo, setFezResumo] = useState(true)

  function trocarModalidade(nova) {
    setModalidade(nova)
    setExtra(MODALIDADES[nova].extraPadrao)
  }

  function enviar(evento) {
    evento.preventDefault()
    const disciplina = disciplinas.find((d) => d.getCodigo() === codigo)
    try {
      const sessao = MODALIDADES[modalidade].criar(disciplina, Number(duracao), {
        extra: Number(extra),
        totalQuestoes: Number(totalQuestoes),
        fezResumo,
      })
      onRegistrar(sessao)
    } catch (erro) {
      onErro(erro.message)
    }
  }

  return (
    <form className="cartao formulario" onSubmit={enviar}>
      <h2>Nova sessão de estudo</h2>

      <label>
        Disciplina
        <select value={codigo} onChange={(e) => setCodigo(e.target.value)}>
          {disciplinas.map((d) => (
            <option key={d.getCodigo()} value={d.getCodigo()}>
              {d.getNome()}
            </option>
          ))}
        </select>
      </label>

      <label>
        Modalidade
        <select value={modalidade} onChange={(e) => trocarModalidade(e.target.value)}>
          {Object.keys(MODALIDADES).map((nome) => (
            <option key={nome} value={nome}>
              {nome}
            </option>
          ))}
        </select>
      </label>

      <div className="linha">
        <label>
          Duração (min)
          <input type="number" min="1" value={duracao} onChange={(e) => setDuracao(e.target.value)} />
        </label>

        {modalidade === 'Exercicios' && (
          <label>
            Total de questões
            <input
              type="number"
              min="0"
              value={totalQuestoes}
              onChange={(e) => setTotalQuestoes(e.target.value)}
            />
          </label>
        )}

        <label>
          {MODALIDADES[modalidade].rotuloExtra}
          <input type="number" min="0" value={extra} onChange={(e) => setExtra(e.target.value)} />
        </label>
      </div>

      {modalidade === 'Leitura' && (
        <label className="checkbox">
          <input type="checkbox" checked={fezResumo} onChange={(e) => setFezResumo(e.target.checked)} />
          Fiz um resumo do conteúdo (+25 XP)
        </label>
      )}

      <button type="submit" className="botao-principal">Registrar Estudo</button>
    </form>
  )
}

export default FormularioSessao
