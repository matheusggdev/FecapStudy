import { INotificador } from '../contratos/INotificador.js'
import { garantirImplementacao } from '../contratos/contrato.js'

/** Implementa INotificador. "exibir" decide onde a mensagem aparece (console, toast...). */
export class NotificadorWhatsApp {
  #exibir

  constructor(exibir = console.log) {
    this.#exibir = exibir
    garantirImplementacao(this, INotificador)
  }

  obterCanal() {
    return 'WhatsApp'
  }

  enviarAlerta(destinatario, mensagem) {
    if (!destinatario || !mensagem) return false
    this.#exibir(`[${this.obterCanal()} para ${destinatario}] ${mensagem}`)
    return true
  }
}
