import { Usuario } from './Usuario.js'

export class Discente extends Usuario {
  #ra
  #xpTotal = 0

  constructor(id, nome, email, senha, ra) {
    super(id, nome, email, senha)
    this.#ra = ra
  }

  getRa() {
    return this.#ra
  }

  getXpTotal() {
    return this.#xpTotal
  }

  adicionarXp(pontos) {
    const valor = Math.trunc(Number(pontos))
    if (!Number.isFinite(valor) || valor <= 0) return false
    this.#xpTotal += valor
    return true
  }

  obterTipoPerfil() {
    return 'Discente'
  }

  gerarPainelResumo() {
    return `${this.obterTipoPerfil()} ${this.getNome()} | RA: ${this.#ra} | XP: ${this.#xpTotal}`
  }
}
