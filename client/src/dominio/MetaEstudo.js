/**
 * Missão 2 — Encapsulamento.
 * A meta semanal só pode ser alterada por métodos que validam as regras.
 * Não existe setter livre para minutosCumpridos.
 */
export class MetaEstudo {
  static META_MINIMA = 30
  static META_MAXIMA = 3000
  static LIMITE_POR_SESSAO = 480

  #metaMinutosSemana
  #minutosCumpridos = 0

  constructor(metaMinutosSemana) {
    this.redefinirMeta(metaMinutosSemana)
  }

  getMetaMinutosSemana() {
    return this.#metaMinutosSemana
  }

  getMinutosCumpridos() {
    return this.#minutosCumpridos
  }

  /** Única forma de somar minutos. Retorna false se o valor for recusado. */
  registrarAvanco(minutos) {
    const valor = Number(minutos)
    if (!Number.isFinite(valor) || valor <= 0 || valor > MetaEstudo.LIMITE_POR_SESSAO) {
      return false
    }
    this.#minutosCumpridos += valor
    return true
  }

  /** Usado pelo Responsável. Mantém a meta entre 30 e 3000 minutos. */
  redefinirMeta(novaMeta) {
    let valor = Math.trunc(Number(novaMeta))
    if (!Number.isFinite(valor) || valor < MetaEstudo.META_MINIMA) valor = MetaEstudo.META_MINIMA
    if (valor > MetaEstudo.META_MAXIMA) valor = MetaEstudo.META_MAXIMA
    this.#metaMinutosSemana = valor
  }

  /** Percentual de 0 a 100 (travado no máximo). */
  calcularPercentual() {
    return Math.min(100, (this.#minutosCumpridos * 100) / this.#metaMinutosSemana)
  }

  estaCumprida() {
    return this.calcularPercentual() >= 100
  }
}
