import { Usuario } from './Usuario.js'

export class Responsavel extends Usuario {
  #parentesco

  constructor(id, nome, email, senha, parentesco) {
    super(id, nome, email, senha)
    this.#parentesco = parentesco
  }

  getParentesco() {
    return this.#parentesco
  }

  obterTipoPerfil() {
    return 'Responsável'
  }

  gerarPainelResumo() {
    return `${this.obterTipoPerfil()} ${this.getNome()} (${this.#parentesco})`
  }
}
