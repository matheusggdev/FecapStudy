import { Disciplina } from './Disciplina.js'
import { Administrador } from './usuarios/Administrador.js'

/**
 * Missão 7 — Agregação (TrilhaEstudo ◇── Disciplina).
 * As disciplinas são criadas fora e continuam existindo se a trilha for apagada.
 */
export class TrilhaEstudo {
  #titulo
  #administrador // associação com quem montou a trilha
  #disciplinas = []

  constructor(titulo, administrador) {
    if (!(administrador instanceof Administrador)) {
      throw new TypeError('A trilha precisa de um Administrador responsável.')
    }
    this.#titulo = titulo
    this.#administrador = administrador
  }

  getTitulo() {
    return this.#titulo
  }

  getAdministrador() {
    return this.#administrador
  }

  getDisciplinas() {
    return [...this.#disciplinas]
  }

  /** Recebe uma disciplina pronta (o new acontece fora daqui). */
  adicionarDisciplina(disciplina) {
    if (!(disciplina instanceof Disciplina)) {
      throw new TypeError('adicionarDisciplina() espera um objeto Disciplina.')
    }
    if (this.#disciplinas.includes(disciplina)) return false
    this.#disciplinas.push(disciplina)
    return true
  }

  calcularCargaHorariaTotal() {
    return this.#disciplinas.reduce((total, d) => total + d.getCargaHorariaSemanalHoras(), 0)
  }

  exibirResumo() {
    return `${this.#titulo} (por ${this.#administrador.getNome()}) — ` +
      `${this.#disciplinas.length} disciplina(s), ${this.calcularCargaHorariaTotal()}h/semana`
  }
}
