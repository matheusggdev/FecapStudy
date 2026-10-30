/**
 * JavaScript não tem "interface". Representamos cada interface como um
 * contrato (lista de métodos obrigatórios) e verificamos por duck typing.
 */
export function implementa(objeto, contrato) {
  return objeto != null && contrato.metodos.every((metodo) => typeof objeto[metodo] === 'function')
}

export function garantirImplementacao(objeto, contrato) {
  if (!implementa(objeto, contrato)) {
    const nomeClasse = objeto?.constructor?.name ?? String(objeto)
    throw new TypeError(`${nomeClasse} não implementa a interface ${contrato.nome}.`)
  }
}
