import { useEffect } from 'react'

/** Toast simples que some sozinho depois de alguns segundos. */
function Aviso({ aviso, onFechar }) {
  useEffect(() => {
    if (!aviso) return undefined
    const temporizador = setTimeout(onFechar, 4500)
    return () => clearTimeout(temporizador)
  }, [aviso, onFechar])

  if (!aviso) return null

  return (
    <div className={`aviso aviso-${aviso.tipo}`} role="status" onClick={onFechar}>
      {aviso.texto}
    </div>
  )
}

export default Aviso
