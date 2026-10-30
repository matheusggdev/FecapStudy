// Execute com: node src/demo/missao8.js
import { Disciplina } from '../dominio/Disciplina.js'
import { MetaEstudo } from '../dominio/MetaEstudo.js'
import { PlanoEstudo } from '../dominio/PlanoEstudo.js'
import { Discente } from '../dominio/usuarios/Discente.js'
import { Responsavel } from '../dominio/usuarios/Responsavel.js'
import { ServicoAlertaResponsavel } from '../servicos/ServicoAlertaResponsavel.js'
import { NotificadorEmail } from '../servicos/NotificadorEmail.js'
import { NotificadorWhatsApp } from '../servicos/NotificadorWhatsApp.js'

console.log('=== Missão 8 — Composição e Dependência ===')

const lucas = new Discente(1, 'Lucas Silva', 'lucas@fecap.br', 'senha123', 'RA-101')
const carlos = new Responsavel(2, 'Carlos Silva', 'carlos@email.com', 'pai123', 'Pai')
const poo = new Disciplina('ADS201', 'Programação Orientada a Objetos', 'Computação', 4)
const meta = new MetaEstudo(100)

// Composição: os itens nascem dentro do plano
const plano = new PlanoEstudo(lucas)
plano.adicionarItem('Segunda', 60)
plano.adicionarItem('Quarta', 45)
plano.adicionarItem('Sexta', 30)
console.log('Plano:', plano.listarItens().join(' | '))
console.log('Total planejado:', plano.calcularMinutosPlanejados(), 'min')

// Dependência: o serviço recebe tudo por parâmetro e não guarda nada
const servico = new ServicoAlertaResponsavel()

const sessao = lucas.registrarEstudo(poo, 50)
meta.registrarAvanco(sessao.getDuracaoMinutos())
servico.avaliarDiscente(lucas, meta, carlos, new NotificadorEmail())

const outra = lucas.registrarEstudo(poo, 50)
meta.registrarAvanco(outra.getDuracaoMinutos())
servico.avaliarDiscente(lucas, meta, carlos, new NotificadorWhatsApp())
