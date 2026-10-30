// Execute com: node src/demo/missao6.js
import { Disciplina } from '../dominio/Disciplina.js'
import { MetaEstudo } from '../dominio/MetaEstudo.js'
import { SessaoPomodoro } from '../dominio/sessoes/SessaoPomodoro.js'
import { INotificador } from '../contratos/INotificador.js'
import { IExportavelJson } from '../contratos/IExportavelJson.js'
import { implementa } from '../contratos/contrato.js'
import { NotificadorEmail } from '../servicos/NotificadorEmail.js'
import { NotificadorWhatsApp } from '../servicos/NotificadorWhatsApp.js'

console.log('=== Missão 6 — Interfaces ===')

// INotificador: o código não sabe COMO a mensagem viaja, só que o contrato é cumprido
const notificadores = [new NotificadorEmail(), new NotificadorWhatsApp()]
for (const notificador of notificadores) {
  console.log(`Canal ${notificador.obterCanal()} implementa INotificador?`, implementa(notificador, INotificador))
  notificador.enviarAlerta('carlos@email.com', 'Lucas estudou 25 minutos hoje!')
}

// IExportavelJson: classes de famílias diferentes viram JSON pelo mesmo contrato
const poo = new Disciplina('ADS201', 'Programação Orientada a Objetos', 'Computação', 4)
const exportaveis = [new SessaoPomodoro(poo, 25, 1), new MetaEstudo(200)]
for (const objeto of exportaveis) {
  console.log(`${objeto.constructor.name} implementa IExportavelJson?`, implementa(objeto, IExportavelJson))
  console.log(objeto.paraJson())
}
