import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Dados simulados baseados no seu back-end (Contact e Message)
  const [contatos, setContatos] = useState([
    { id: 1, nome: "João Silva", ultimaMensagem: "Olá, preciso de ajuda com o sistema", online: true },
    { id: 2, nome: "Maria Souza", ultimaMensagem: "Obrigada pelo atendimento!", online: false },
    { id: 3, nome: "Carlos Lima", ultimaMensagem: "Aguardando retorno...", online: true }
  ])

  const [contatoAtivo, setContatoAtivo] = useState(1)
  const [mensagens, setMensagens] = useState([
    { id: 1, contatoId: 1, texto: "Olá, preciso de ajuda com o sistema", enviadoPorMim: false, hora: "14:32" },
    { id: 2, contatoId: 1, texto: "Com certeza! Pode me dizer qual é o erro?", enviadoPorMim: true, hora: "14:33" },
    { id: 3, contatoId: 1, texto: "Diz que não consegue conectar ao banco.", enviadoPorMim: false, hora: "14:35" },
  ])

  const [novaMensagem, setNovaMensagem] = useState("")

  // Função para simular o envio de uma mensagem
  const handleEnviar = (e) => {
    e.preventDefault()
    if (!novaMensagem.trim()) return

    const novaMsgObj = {
      id: mensagens.length + 1,
      contatoId: contatoAtivo,
      texto: novaMensagem,
      enviadoPorMim: true,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMensagens([...mensagens, novaMsgObj])
    setNovaMensagem("")
  }

  return (
      <div className="chat-container">
        {/* Barra Lateral de Contatos */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>Atendimentos</h2>
          </div>
          <ul className="contact-list">
            {contatos.map(contato => (
                <li
                    key={contato.id}
                    className={`contact-item ${contatoAtivo === contato.id ? 'active' : ''}`}
                    onClick={() => setContatoAtivo(contato.id)}
                >
                  <div className="avatar">
                    {contato.nome.charAt(0)}
                    {contato.online && <span className="badge-online"></span>}
                  </div>
                  <div className="contact-info">
                    <h3>{contato.nome}</h3>
                    <p>{contato.ultimaMensagem}</p>
                  </div>
                </li>
            ))}
          </ul>
        </aside>

        {/* Janela Principal do Chat */}
        <main className="chat-window">
          <header className="chat-header">
            <h3>{contatos.find(c => c.id === contatoAtivo)?.nome}</h3>
          </header>

          <div className="messages-container">
            {mensagens
                .filter(msg => msg.contatoId === contatoAtivo)
                .map(msg => (
                    <div key={msg.id} className={`message-wrapper ${msg.enviadoPorMim ? 'me' : 'other'}`}>
                      <div className="message-box">
                        <p>{msg.texto}</p>
                        <span className="message-time">{msg.hora}</span>
                      </div>
                    </div>
                ))}
          </div>

          <form className="chat-input-area" onSubmit={handleEnviar}>
            <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </main>
      </div>
  )
}

export default App