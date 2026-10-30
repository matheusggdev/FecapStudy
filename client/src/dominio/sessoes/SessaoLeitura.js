import { SessaoEstudo } from './SessaoEstudo.js'

export class SessaoLeitura extends SessaoEstudo {
  #paginasLidas
  #fezResumo

  constructor(disciplina, duracaoMinutos, paginasLidas, fezResumo) {
    super(disciplina, duracaoMinutos)
    this.#paginasLidas = Math.max(0, Math.trunc(Number(paginasLidas) || 0))
    this.#fezResumo = Boolean(fezResumo)
  }

  getPaginasLidas() {
    return this.#paginasLidas
  }

  getFezResumo() {
    return this.#fezResumo
  }

  obterModalidade() {
    return 'Leitura'
  }

  calcularXp() {
    return this.getDuracaoMinutos() + this.#paginasLidas * 3 + (this.#fezResumo ? 25 : 0)
  }

  gerarFeedback() {
    const resumo = this.#fezResumo ? ' + resumo' : ''
    return `${super.gerarFeedback()} | ${this.#paginasLidas} página(s)${resumo}`
  }
}
