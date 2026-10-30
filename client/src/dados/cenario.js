import { Disciplina } from '../dominio/Disciplina.js'
import { MetaEstudo } from '../dominio/MetaEstudo.js'
import { TrilhaEstudo } from '../dominio/TrilhaEstudo.js'
import { PlanoEstudo } from '../dominio/PlanoEstudo.js'
import { Administrador } from '../dominio/usuarios/Administrador.js'
import { Responsavel } from '../dominio/usuarios/Responsavel.js'
import { Discente } from '../dominio/usuarios/Discente.js'

/** Monta os objetos iniciais usados pela tela (dados de exemplo). */
export function criarCenario() {
  const disciplinas = [
    new Disciplina('ADS201', 'Programação Orientada a Objetos', 'Computação', 4),
    new Disciplina('ADS202', 'Banco de Dados', 'Dados', 4),
    new Disciplina('ADS203', 'Estatística Aplicada', 'Dados', 2),
    new Disciplina('ADS204', 'Projeto Interdisciplinar', 'Negócios', 3),
  ]

  const administrador = new Administrador(1, 'Ana Souza', 'ana@fecap.br', 'admin123', 'Coordenação PI')
  const responsavel = new Responsavel(2, 'Carlos Silva', 'carlos@email.com', 'pai123', 'Pai')
  const discente = new Discente(3, 'Lucas Silva', 'lucas@fecap.br', 'senha123', 'RA-101')

  const meta = new MetaEstudo(200)
  responsavel.vincularDiscente(discente)
  responsavel.definirMeta(discente, meta)

  const trilha = new TrilhaEstudo('Trilha 2º Semestre ADS', administrador)
  disciplinas.forEach((disciplina) => trilha.adicionarDisciplina(disciplina))

  const plano = new PlanoEstudo(discente)
  plano.adicionarItem('Segunda', 60)
  plano.adicionarItem('Quarta', 45)
  plano.adicionarItem('Sexta', 50)

  return { disciplinas, administrador, responsavel, discente, meta, trilha, plano }
}
