import { Usuario } from './Usuario.js'

export class Administrador extends Usuario {
  #cargo

  constructor(id, nome, email, senha, cargo) {
    super(id, nome, email, senha)
    this.#cargo = cargo
  }

  getCargo() {
    return this.#cargo
  }

  obterTipoPerfil() {
    return 'Administrador'
  }

  gerarPainelResumo() {
    return `${this.obterTipoPerfil()} ${this.getNome()} | Cargo: ${this.#cargo}`
  }
}
