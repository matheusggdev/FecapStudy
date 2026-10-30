// Execute com: node src/demo/missao5.js
import { Disciplina } from '../dominio/Disciplina.js'
import { Discente } from '../dominio/usuarios/Discente.js'
import { SessaoExercicios } from '../dominio/sessoes/SessaoExercicios.js'

const poo = new Disciplina('ADS201', 'Programação Orientada a Objetos', 'Computação', 4)
const lucas = new Discente(1, 'Lucas Silva', 'lucas@fecap.br', 'senha123', 'RA-101')

console.log('=== Missão 5 — Sobrecarga de registrarEstudo ===')

// Forma 1: sessão pronta
lucas.registrarEstudo(new SessaoExercicios(poo, 30, 10, 7))
// Forma 2: disciplina + minutos (vira Pomodoro)
lucas.registrarEstudo(poo, 50)
// Forma 3: disciplina + hora início + hora fim + páginas (vira Leitura)
lucas.registrarEstudo(poo, 14, 15, 20)

for (const sessao of lucas.getHistorico()) {
  console.log(sessao.gerarFeedback())
}
console.log(lucas.gerarPainelResumo())
