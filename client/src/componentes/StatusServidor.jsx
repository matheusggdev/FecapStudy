function StatusServidor({ status }) {
  if (status === null) {
    return <span className="status">Verificando servidor…</span>
  }

  if (!status.online) {
    return <span className="status offline">Servidor offline</span>
  }

  return (
    <span className="status online" title={status.modoBanco}>
      Servidor online · {status.usandoMySql ? 'MySQL' : 'JSON local'}
    </span>
  )
}

export default StatusServidor
