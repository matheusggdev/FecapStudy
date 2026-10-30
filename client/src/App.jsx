import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { criarCenario } from './dados/cenario.js'
import { ServicoAlertaResponsavel } from './servicos/ServicoAlertaResponsavel.js'
import { NotificadorEmail } from './servicos/NotificadorEmail.js'
import { NotificadorWhatsApp } from './servicos/NotificadorWhatsApp.js'
import { ClienteBackendEstudo } from './servicos/ClienteBackendEstudo.js'
import PainelPerfil from './componentes/PainelPerfil.jsx'
import FormularioSessao from './componentes/FormularioSessao.jsx'
import BarraProgresso from './componentes/BarraProgresso.jsx'
import HistoricoSessoes from './componentes/HistoricoSessoes.jsx'
import PainelResponsavel from './componentes/PainelResponsavel.jsx'
import PainelTrilha from './componentes/PainelTrilha.jsx'
import PainelServidor from './componentes/PainelServidor.jsx'
import StatusServidor from './componentes/StatusServidor.jsx'
import Aviso from './componentes/Aviso.jsx'

// Qualquer classe que implemente INotificador pode entrar aqui
const NOTIFICADORES = {
  'E-mail': NotificadorEmail,
  WhatsApp: NotificadorWhatsApp,
}

function App() {
  // Os objetos de domínio são criados uma única vez
  const [cenario] = useState(criarCenario)
  const [servicoAlerta] = useState(() => new ServicoAlertaResponsavel())
  const [cliente] = useState(() => new ClienteBackendEstudo())
  const { disciplinas, responsavel, discente, meta, trilha, plano } = cenario

  // Os objetos mudam por dentro; este contador avisa o React para redesenhar
  const [, setVersao] = useState(0)
  const redesenhar = () => setVersao((v) => v + 1)

  const [aviso, setAviso] = useState(null)
  const mostrarAviso = (texto, tipo = 'info') => setAviso({ texto, tipo, id: Date.now() })
  const fecharAviso = useCallback(() => setAviso(null), [])

  // Dados vindos do backend C#
  const [status, setStatus] = useState(null)
  const [relatorio, setRelatorio] = useState(null)
  const [carregando, setCarregando] = useState(false)

  const verificarServidor = useCallback(() => {
    cliente
      .obterStatus()
      .then(setStatus)
      .catch(() => setStatus({ online: false }))
  }, [cliente])

  useEffect(() => {
    verificarServidor()
  }, [verificarServidor])

  function avisarFalhaServidor(erro) {
    setStatus({ online: false })
    mostrarAviso(`Não foi possível falar com o servidor (${cliente.getUrlBase()}): ${erro.message}`, 'erro')
  }

  function registrarEstudo(sessao) {
    discente.registrarEstudo(sessao)
    const aceitoNaMeta = meta.registrarAvanco(sessao.getDuracaoMinutos())
    redesenhar()

    if (aceitoNaMeta) {
      mostrarAviso(`+${sessao.calcularXp()} XP! ${sessao.obterModalidade()} registrado.`, 'sucesso')
    } else {
      mostrarAviso('Sessão registrada, mas a meta recusou a duração (máximo de 480 min por sessão).', 'alerta')
    }

    // Missão 10: grava a sessão no MySQL pelo backend C#
    cliente
      .salvarSessao(discente.getNome(), sessao)
      .then(() => verificarServidor())
      .catch(avisarFalhaServidor)
  }

  function redefinirMeta(novaMeta) {
    meta.redefinirMeta(novaMeta)
    redesenhar()
    mostrarAviso(`Meta semanal ajustada para ${meta.getMetaMinutosSemana()} min.`)

    cliente
      .salvarMeta(discente.getNome(), responsavel.getNome(), meta)
      .catch(avisarFalhaServidor)
  }

  function notificarResponsavel(canal) {
    const Notificador = NOTIFICADORES[canal]
    const notificador = new Notificador((mensagem) => mostrarAviso(mensagem))
    servicoAlerta.avaliarDiscente(discente, meta, responsavel, notificador)
  }

  async function carregarDoServidor() {
    setCarregando(true)
    try {
      setRelatorio(await cliente.obterRelatorio(discente.getNome()))
      verificarServidor()
    } catch (erro) {
      avisarFalhaServidor(erro)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="app">
      <header className="cabecalho">
        <div>
          <h1>FecapStudy</h1>
          <p className="subtitulo">Plataforma de apoio ao estudo</p>
        </div>
        <StatusServidor status={status} />
      </header>

      <PainelPerfil discente={discente} responsavel={responsavel} />

      <main className="grade">
        <div className="coluna">
          <FormularioSessao
            disciplinas={disciplinas}
            onRegistrar={registrarEstudo}
            onErro={(mensagem) => mostrarAviso(mensagem, 'erro')}
          />
          <PainelResponsavel
            meta={meta}
            canais={Object.keys(NOTIFICADORES)}
            onRedefinirMeta={redefinirMeta}
            onNotificar={notificarResponsavel}
          />
        </div>

        <div className="coluna">
          <BarraProgresso meta={meta} />
          <HistoricoSessoes sessoes={discente.getHistorico()} />
          <PainelTrilha trilha={trilha} plano={plano} />
        </div>
      </main>

      <PainelServidor relatorio={relatorio} carregando={carregando} onCarregar={carregarDoServidor} />

      <Aviso key={aviso?.id} aviso={aviso} onFechar={fecharAviso} />
    </div>
  )
}

export default App
