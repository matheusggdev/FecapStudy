import { ItemCronograma } from './ItemCronograma.js'
import { Discente } from './usuarios/Discente.js'

/**
 * Missão 8 — Composição (PlanoEstudo ◆── ItemCronograma).
 * Os itens nascem aqui dentro e nenhuma referência a eles sai desta classe.
 */
export class PlanoEstudo {
  #discente // associação: de quem é o plano
  #itens = []

  constructor(discente) {
    if (!(discente instanceof Discente)) {
      throw new TypeError('O plano de estudo precisa de um Discente.')
    }
    this.#discente = discente
  }

  getDiscente() {
    return this.#discente
  }

  /** Recebe dados primitivos e faz o new ItemCronograma(...) aqui dentro. */
  adicionarItem(diaSemana, minutos) {
    const valor = Math.trunc(Number(minutos))
    if (!diaSemana || !Number.isFinite(valor) || valor <= 0) return false
    this.#itens.push(new ItemCronograma(diaSemana, valor))
    return true
  }

  /** Devolve apenas textos, nunca os objetos ItemCronograma. */
  listarItens() {
    return this.#itens.map((item) => item.exibirResumo())
  }

  calcularMinutosPlanejados() {
    return this.#itens.reduce((total, item) => total + item.getMinutosPlanejados(), 0)
  }
}
