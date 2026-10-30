import { Disciplina } from '../Disciplina.js'

/**
 * Missão 4 — Classe abstrata base das modalidades de estudo.
 * Cada subclasse sabe calcular o próprio XP (polimorfismo dinâmico).
 * Missão 6 — Implementa a interface IExportavelJson (paraJson).
 */
export class SessaoEstudo {
  #disciplina
  #duracaoMinutos

  constructor(disciplina, duracaoMinutos) {
    if (new.target === SessaoEstudo) {
      throw new TypeError('SessaoEstudo é uma classe abstrata e não pode ser instanciada diretamente.')
    }
    if (!(disciplina instanceof Disciplina)) {
      throw new TypeError('A sessão precisa de um objeto Disciplina.')
    }
    const minutos = Math.trunc(Number(duracaoMinutos))
    if (!Number.isFinite(minutos) || minutos <= 0) {
      throw new RangeError('A duração da sessão deve ser maior que 0 minutos.')
    }
    this.#disciplina = disciplina
    this.#duracaoMinutos = minutos
  }

  getDisciplina() {
    return this.#disciplina
  }

  getDuracaoMinutos() {
    return this.#duracaoMinutos
  }

  /** Método abstrato. */
  obterModalidade() {
    throw new Error(`${this.constructor.name} deve implementar obterModalidade().`)
  }

  /** Método abstrato. */
  calcularXp() {
    throw new Error(`${this.constructor.name} deve implementar calcularXp().`)
  }

  /** Método "virtual": as subclasses podem complementar com super.gerarFeedback(). */
  gerarFeedback() {
    return `${this.obterModalidade()} em ${this.#disciplina.getNome()} ` +
      `(${this.#duracaoMinutos} min) -> +${this.calcularXp()} XP`
  }

  /** IExportavelJson: dados no formato que o backend espera em POST /api/sessoes. */
  paraJson() {
    return JSON.stringify({
      disciplina: this.#disciplina.getNome(),
      tipoModalidade: this.obterModalidade(),
      duracaoMinutos: this.#duracaoMinutos,
      xpGanho: this.calcularXp(),
      resumoFeedback: this.gerarFeedback(),
    })
  }
}
