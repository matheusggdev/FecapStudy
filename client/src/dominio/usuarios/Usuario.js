/**
 * Missão 3 — Classe Abstrata.
 * Não existe "usuário genérico": todo usuário é Administrador, Responsavel ou Discente.
 */
export class Usuario {
  #id
  #nome
  #email
  #senha // sem getter: só pode ser verificada por autenticar()

  constructor(id, nome, email, senha) {
    // JS não tem "abstract": bloqueamos o new direto na classe mãe
    if (new.target === Usuario) {
      throw new TypeError('Usuario é uma classe abstrata e não pode ser instanciada diretamente.')
    }
    this.#id = id
    this.#nome = nome
    this.#email = email
    this.#senha = senha
  }

  getId() {
    return this.#id
  }

  getNome() {
    return this.#nome
  }

  getEmail() {
    return this.#email
  }

  autenticar(senhaDigitada) {
    return senhaDigitada === this.#senha
  }

  /** Método abstrato: cada subclasse deve sobrescrever. */
  obterTipoPerfil() {
    throw new Error(`${this.constructor.name} deve implementar obterTipoPerfil().`)
  }

  /** Método abstrato: cada subclasse deve sobrescrever. */
  gerarPainelResumo() {
    throw new Error(`${this.constructor.name} deve implementar gerarPainelResumo().`)
  }
}
