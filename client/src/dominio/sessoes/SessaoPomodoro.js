import { SessaoEstudo } from './SessaoEstudo.js'

export class SessaoPomodoro extends SessaoEstudo {
  #ciclosCompletos

  constructor(disciplina, duracaoMinutos, ciclosCompletos) {
    super(disciplina, duracaoMinutos)
    this.#ciclosCompletos = Math.max(0, Math.trunc(Number(ciclosCompletos) || 0))
  }

  getCiclosCompletos() {
    return this.#ciclosCompletos
  }

  obterModalidade() {
    return 'Pomodoro'
  }

  calcularXp() {
    return this.getDuracaoMinutos() * 2 + this.#ciclosCompletos * 15
  }

  gerarFeedback() {
    return `${super.gerarFeedback()} | ${this.#ciclosCompletos} ciclo(s) concluído(s)`
  }
}
