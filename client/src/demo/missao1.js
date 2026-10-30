// Execute com: node src/demo/missao1.js
import { Disciplina } from '../dominio/Disciplina.js'

const disciplinas = [
  new Disciplina('ADS201', 'Programação Orientada a Objetos', 'Computação', 4),
  new Disciplina('ADS202', 'Banco de Dados', 'Dados', 4),
  new Disciplina('ADS203', 'Estatística Aplicada', 'Dados', 0), // vira 2h (padrão)
]

console.log('=== Missão 1 — Disciplinas ===')
for (const disciplina of disciplinas) {
  console.log(disciplina.exibirResumo())
}
