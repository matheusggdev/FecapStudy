import { SessaoEstudo } from './SessaoEstudo.js'

export class SessaoExercicios extends SessaoEstudo {
  #totalQuestoes
  #acertos

  constructor(disciplina, duracaoMinutos, totalQuestoes, acertos) {
    super(disciplina, duracaoMinutos)
    this.#totalQuestoes = Math.max(0, Math.trunc(Number(totalQuestoes) || 0))
    // acertos nunca passam do total de questões
    this.#acertos = Math.min(this.#totalQuestoes, Math.max(0, Math.trunc(Number(acertos) || 0)))
  }

  getTotalQuestoes() {
    return this.#totalQuestoes
  }

  getAcertos() {
    return this.#acertos
  }

  calcularPercentualAcerto() {
    if (this.#totalQuestoes === 0) return 0
    return (this.#acertos * 100) / this.#totalQuestoes
  }

  obterModalidade() {
    return 'Exercicios'
  }

  calcularXp() {
    return this.getDuracaoMinutos() + this.#acertos * 10
  }

  gerarFeedback() {
    return `${super.gerarFeedback()} | ${this.#acertos}/${this.#totalQuestoes} acertos ` +
      `(${this.calcularPercentualAcerto().toFixed(0)}%)`
  }
}
