import { Usuario } from './Usuario.js'
import { Discente } from './Discente.js'
import { MetaEstudo } from '../MetaEstudo.js'

export class Responsavel extends Usuario {
  #parentesco
  #discentes = [] // Missão 7 — Associação: discentes criados FORA desta classe
  #metas = new Map() // Discente -> MetaEstudo

  constructor(id, nome, email, senha, parentesco) {
    super(id, nome, email, senha)
    this.#parentesco = parentesco
  }

  getParentesco() {
    return this.#parentesco
  }

  /** Recebe um Discente que já existe e passa a acompanhá-lo (sem duplicar). */
  vincularDiscente(discente) {
    if (!(discente instanceof Discente)) {
      throw new TypeError('vincularDiscente() espera um objeto Discente.')
    }
    if (this.#discentes.includes(discente)) return false
    this.#discentes.push(discente)
    return true
  }

  getDiscentes() {
    return [...this.#discentes]
  }

  definirMeta(discente, meta) {
    if (!this.#discentes.includes(discente)) {
      throw new Error('Vincule o discente antes de definir uma meta para ele.')
    }
    if (!(meta instanceof MetaEstudo)) {
      throw new TypeError('definirMeta() espera um objeto MetaEstudo.')
    }
    this.#metas.set(discente, meta)
  }

  obterMeta(discente) {
    return this.#metas.get(discente) ?? null
  }

  obterTipoPerfil() {
    return 'Responsável'
  }

  gerarPainelResumo() {
    return `${this.obterTipoPerfil()} ${this.getNome()} (${this.#parentesco}) | ` +
      `Acompanha ${this.#discentes.length} discente(s)`
  }
}
