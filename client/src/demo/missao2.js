// Execute com: node src/demo/missao2.js
import { MetaEstudo } from '../dominio/MetaEstudo.js'

console.log('=== Missão 2 — Meta de estudo ===')

const metaSabotada = new MetaEstudo(-100)
console.log('Meta -100 ajustada para:', metaSabotada.getMetaMinutosSemana(), 'min')

const meta = new MetaEstudo(200)
console.log('Avanço de 60 min aceito?', meta.registrarAvanco(60))
console.log('Avanço de 0 min aceito?', meta.registrarAvanco(0))
console.log('Avanço de 999 min aceito?', meta.registrarAvanco(999))
console.log(`Cumprido: ${meta.getMinutosCumpridos()}/${meta.getMetaMinutosSemana()} min`)
console.log(`Percentual: ${meta.calcularPercentual().toFixed(1)}%`)

// Tentativa de trapaça: o campo é privado, então isto NÃO altera a meta
meta.minutosCumpridos = 99999
console.log('Depois da trapaça, cumprido continua:', meta.getMinutosCumpridos(), 'min')
