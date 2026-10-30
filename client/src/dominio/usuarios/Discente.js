import { Usuario } from './Usuario.js'
import { Disciplina } from '../Disciplina.js'
import { SessaoEstudo } from '../sessoes/SessaoEstudo.js'
import { SessaoPomodoro } from '../sessoes/SessaoPomodoro.js'
import { SessaoLeitura } from '../sessoes/SessaoLeitura.js'

export class Discente extends Usuario {
  #ra
  #xpTotal = 0
  #historico = []

  constructor(id, nome, email, senha, ra) {
    super(id, nome, email, senha)
    this.#ra = ra
  }

  getRa() {
    return this.#ra
  }

  getXpTotal() {
    return this.#xpTotal
  }

  /** Devolve uma cópia: ninguém de fora altera o histórico diretamente. */
  getHistorico() {
    return [...this.#historico]
  }

  calcularTotalMinutos() {
    return this.#historico.reduce((total, sessao) => total + sessao.getDuracaoMinutos(), 0)
  }

  adicionarXp(pontos) {
    const valor = Math.trunc(Number(pontos))
    if (!Number.isFinite(valor) || valor <= 0) return false
    this.#xpTotal += valor
    return true
  }

  /**
   * Missão 5 — Polimorfismo Estático (sobrecarga).
   * JS não tem sobrecarga nativa, então um único método decide pela forma da chamada:
   *
   *   Forma 1: registrarEstudo(sessao)
   *   Forma 2: registrarEstudo(disciplina, minutos)                          -> Pomodoro
   *   Forma 3: registrarEstudo(disciplina, horaInicio, horaFim, paginasLidas) -> Leitura
   */
  registrarEstudo(a, b, c, d) {
    // Forma 1
    if (a instanceof SessaoEstudo && b === undefined) {
      return this.#registrarSessao(a)
    }

    // Forma 2 (atalho rápido)
    if (a instanceof Disciplina && b !== undefined && c === undefined) {
      const minutos = Number(b)
      const ciclos = Math.max(1, Math.floor(minutos / 25))
      return this.#registrarSessao(new SessaoPomodoro(a, minutos, ciclos))
    }

    // Forma 3 (por horário)
    if (a instanceof Disciplina && d !== undefined) {
      const minutos = (Number(c) - Number(b)) * 60
      return this.#registrarSessao(new SessaoLeitura(a, minutos, d, true))
    }

    throw new TypeError('Forma de chamada inválida para registrarEstudo().')
  }

  #registrarSessao(sessao) {
    this.#historico.push(sessao)
    this.adicionarXp(sessao.calcularXp())
    return sessao
  }

  obterTipoPerfil() {
    return 'Discente'
  }

  gerarPainelResumo() {
    return `${this.obterTipoPerfil()} ${this.getNome()} | RA: ${this.#ra} | XP: ${this.#xpTotal}`
  }
}
