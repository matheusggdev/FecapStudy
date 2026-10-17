/**
 * Missão 1 — Abstração, Classe e Objeto.
 * Representa uma disciplina do semestre com sua carga horária semanal.
 */
export class Disciplina {
  #codigo
  #nome
  #categoria
  #cargaHorariaSemanalHoras

  constructor(codigo, nome, categoria, cargaHorariaSemanalHoras) {
    this.#codigo = codigo
    this.#nome = nome
    this.#categoria = categoria

    // Regra: carga horária <= 0 (ou inválida) assume o padrão de 2h
    const horas = Math.trunc(Number(cargaHorariaSemanalHoras))
    this.#cargaHorariaSemanalHoras = Number.isFinite(horas) && horas > 0 ? horas : 2
  }

  getCodigo() {
    return this.#codigo
  }

  getNome() {
    return this.#nome
  }

  getCategoria() {
    return this.#categoria
  }

  getCargaHorariaSemanalHoras() {
    return this.#cargaHorariaSemanalHoras
  }

  calcularCargaEmMinutos() {
    return this.#cargaHorariaSemanalHoras * 60
  }

  exibirResumo() {
    return `[${this.#codigo}] ${this.#nome} (${this.#categoria}) — ` +
      `${this.#cargaHorariaSemanalHoras}h/semana (${this.calcularCargaEmMinutos()} min)`
  }
}
