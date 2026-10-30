// Execute com: node src/demo/missao4.js
import { Disciplina } from '../dominio/Disciplina.js'
import { SessaoPomodoro } from '../dominio/sessoes/SessaoPomodoro.js'
import { SessaoExercicios } from '../dominio/sessoes/SessaoExercicios.js'
import { SessaoLeitura } from '../dominio/sessoes/SessaoLeitura.js'

const poo = new Disciplina('ADS201', 'Programação Orientada a Objetos', 'Computação', 4)
const bd = new Disciplina('ADS202', 'Banco de Dados', 'Dados', 4)

// Coleção polimórfica: o array guarda "SessaoEstudo", cada item é de um tipo
const sessoes = [
  new SessaoPomodoro(poo, 25, 1),
  new SessaoExercicios(bd, 40, 10, 8),
  new SessaoLeitura(poo, 30, 12, true),
]

console.log('=== Missão 4 — Sessões de estudo ===')
let xpTotal = 0
for (const sessao of sessoes) {
  // Nenhum if por tipo: cada objeto sabe o próprio XP e feedback
  console.log(sessao.gerarFeedback())
  xpTotal += sessao.calcularXp()
}
console.log('XP total:', xpTotal)
