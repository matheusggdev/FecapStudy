import { Discente } from '../dominio/usuarios/Discente.js'
import { Responsavel } from '../dominio/usuarios/Responsavel.js'
import { MetaEstudo } from '../dominio/MetaEstudo.js'
import { INotificador } from '../contratos/INotificador.js'
import { garantirImplementacao } from '../contratos/contrato.js'

/**
 * Missão 8 — Dependência (- - ->).
 * Sem campos de instância: só USA os objetos recebidos durante o método.
 */
export class ServicoAlertaResponsavel {
  avaliarDiscente(discente, meta, responsavel, notificador) {
    if (!(discente instanceof Discente)) throw new TypeError('Informe um Discente.')
    if (!(meta instanceof MetaEstudo)) throw new TypeError('Informe uma MetaEstudo.')
    if (!(responsavel instanceof Responsavel)) throw new TypeError('Informe um Responsavel.')
    garantirImplementacao(notificador, INotificador)

    const percentual = meta.calcularPercentual().toFixed(0)
    const progresso = `${meta.getMinutosCumpridos()}/${meta.getMetaMinutosSemana()} min`

    const mensagem = meta.estaCumprida()
      ? `Parabéns! ${discente.getNome()} concluiu 100% da meta semanal (${progresso}).`
      : `${discente.getNome()} está com ${percentual}% da meta semanal (${progresso}). ` +
        `XP atual: ${discente.getXpTotal()}.`

    return notificador.enviarAlerta(responsavel.getEmail(), mensagem)
  }
}
