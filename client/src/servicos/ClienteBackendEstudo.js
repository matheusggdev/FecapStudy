import { IExportavelJson } from '../contratos/IExportavelJson.js'
import { garantirImplementacao } from '../contratos/contrato.js'

const URL_PADRAO = 'http://localhost:5080'

/**
 * Missão 10 — Conversa com o BackendEstudoAPI.exe (C# + MySQL).
 * Dependência: recebe sessões e metas por parâmetro e usa o paraJson() delas.
 */
export class ClienteBackendEstudo {
  #urlBase

  constructor(urlBase = import.meta.env?.VITE_API_URL || URL_PADRAO) {
    this.#urlBase = urlBase.replace(/\/+$/, '')
  }

  getUrlBase() {
    return this.#urlBase
  }

  async #requisitar(caminho, opcoes = {}) {
    const resposta = await fetch(`${this.#urlBase}${caminho}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opcoes,
    })
    const corpo = await resposta.json().catch(() => null)
    if (!resposta.ok) {
      throw new Error(corpo?.erro ?? `Erro HTTP ${resposta.status} em ${caminho}`)
    }
    return corpo
  }

  /** GET /api/status */
  obterStatus() {
    return this.#requisitar('/api/status')
  }

  /** GET /api/sessoes?discente=... */
  listarSessoes(nomeDiscente = '') {
    return this.#requisitar(`/api/sessoes?discente=${encodeURIComponent(nomeDiscente)}`)
  }

  /** POST /api/sessoes */
  salvarSessao(nomeDiscente, sessao) {
    garantirImplementacao(sessao, IExportavelJson)
    const dados = { discenteNome: nomeDiscente, ...JSON.parse(sessao.paraJson()) }
    return this.#requisitar('/api/sessoes', { method: 'POST', body: JSON.stringify(dados) })
  }

  /** POST /api/metas */
  salvarMeta(nomeDiscente, nomeResponsavel, meta) {
    garantirImplementacao(meta, IExportavelJson)
    const dados = {
      discenteNome: nomeDiscente,
      responsavelNome: nomeResponsavel,
      ...JSON.parse(meta.paraJson()),
    }
    return this.#requisitar('/api/metas', { method: 'POST', body: JSON.stringify(dados) })
  }

  /** GET /api/relatorio/{nome} */
  obterRelatorio(nomeDiscente) {
    return this.#requisitar(`/api/relatorio/${encodeURIComponent(nomeDiscente)}`)
  }
}
