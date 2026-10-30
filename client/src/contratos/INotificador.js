/**
 * Interface INotificador
 *   obterCanal(): string
 *   enviarAlerta(destinatario: string, mensagem: string): boolean
 */
export const INotificador = Object.freeze({
  nome: 'INotificador',
  metodos: ['obterCanal', 'enviarAlerta'],
})
