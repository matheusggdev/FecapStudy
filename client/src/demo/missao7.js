// Execute com: node src/demo/missao7.js
import { Disciplina } from '../dominio/Disciplina.js'
import { MetaEstudo } from '../dominio/MetaEstudo.js'
import { TrilhaEstudo } from '../dominio/TrilhaEstudo.js'
import { Administrador } from '../dominio/usuarios/Administrador.js'
import { Responsavel } from '../dominio/usuarios/Responsavel.js'
import { Discente } from '../dominio/usuarios/Discente.js'

console.log('=== Missão 7 — Associação e Agregação ===')

// Associação: o discente existe antes e independente do responsável
const lucas = new Discente(1, 'Lucas Silva', 'lucas@fecap.br', 'senha123', 'RA-101')
const carlos = new Responsavel(2, 'Carlos Silva', 'carlos@email.com', 'pai123', 'Pai')
console.log('Vinculou?', carlos.vincularDiscente(lucas))
console.log('Vinculou de novo (duplicado)?', carlos.vincularDiscente(lucas))
carlos.definirMeta(lucas, new MetaEstudo(200))
console.log(carlos.gerarPainelResumo())
console.log('Meta do Lucas:', carlos.obterMeta(lucas).getMetaMinutosSemana(), 'min')

// Agregação: as disciplinas são criadas fora da trilha
const poo = new Disciplina('ADS201', 'Programação Orientada a Objetos', 'Computação', 4)
const bd = new Disciplina('ADS202', 'Banco de Dados', 'Dados', 4)
const ana = new Administrador(3, 'Ana Souza', 'ana@fecap.br', 'admin', 'Coordenação PI')
let trilha = new TrilhaEstudo('Trilha 2º Semestre ADS', ana)
trilha.adicionarDisciplina(poo)
trilha.adicionarDisciplina(bd)
console.log(trilha.exibirResumo())

trilha = null // a trilha "morre"...
console.log('...mas a disciplina continua existindo:', poo.exibirResumo())
