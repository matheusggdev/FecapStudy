// Execute com: node src/demo/missao3.js
import { Usuario } from '../dominio/usuarios/Usuario.js'
import { Administrador } from '../dominio/usuarios/Administrador.js'
import { Responsavel } from '../dominio/usuarios/Responsavel.js'
import { Discente } from '../dominio/usuarios/Discente.js'

console.log('=== Missão 3 — Perfis ===')

try {
  new Usuario(0, 'Genérico', 'x@fecap.br', '123')
} catch (erro) {
  console.log('Erro esperado:', erro.message)
}

const discente = new Discente(1, 'Lucas Silva', 'lucas@fecap.br', 'senha123', 'RA-101')
discente.adicionarXp(50)

const usuarios = [
  new Administrador(2, 'Ana Souza', 'ana@fecap.br', 'admin', 'Coordenação PI'),
  new Responsavel(3, 'Carlos Silva', 'carlos@email.com', 'pai123', 'Pai'),
  discente,
]

// Polimorfismo: o mesmo método, um resultado diferente para cada perfil
for (const usuario of usuarios) {
  console.log(usuario.gerarPainelResumo())
}

console.log('Login com senha certa:', discente.autenticar('senha123'))
console.log('Login com senha errada:', discente.autenticar('errada'))
