/** Um horário planejado. Só é criado dentro de PlanoEstudo (composição). */
export class ItemCronograma {
  #diaSemana
  #minutosPlanejados

  constructor(diaSemana, minutosPlanejados) {
    this.#diaSemana = diaSemana
    this.#minutosPlanejados = minutosPlanejados
  }

  getDiaSemana() {
    return this.#diaSemana
  }

  getMinutosPlanejados() {
    return this.#minutosPlanejados
  }

  exibirResumo() {
    return `${this.#diaSemana}: ${this.#minutosPlanejados} min`
  }
}
