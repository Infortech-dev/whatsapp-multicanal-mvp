import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import api from './services/api'; // Axios Interceptor (injetando o Tenant automaticamente)

function App() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para controlar o texto digitado pelo usuário
    const [inputText, setInputText] = useState("");
    // Estado para controlar o feedback visual de envio (evita duplo clique)
    const [sending, setSending] = useState(false);

    // ID do contato de teste padronizado
    const contactId = "11111111-1111-1111-1111-111111111111";

    // Função para buscar o histórico de mensagens
    const loadMessages = () => {
        api.get(`/mensagens/${contactId}`)
            .then(response => {
                setMessages(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro na API:", err);
                setError("Falha ao conectar com o servidor da INFORCHAT.");
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMessages();
    }, []);

    // Função para lidar com o envio da mensagem para o Spring Boot
    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        if (!contactId) {
            alert("Erro: Nenhum contato selecionado ou ID do contato é inválido.");
            return;
        }

        const messagePayload = {
            text: inputText.trim(), // O DTO do seu backend espera 'text' aqui conforme mapeado no request
            contactId: contactId
        };

        try {
            setSending(true);
            const response = await fetch("http://localhost:8080/api/mensagens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Adiciona o cabeçalho de Tenant para o TenantFilter do Spring capturar
                    "X-Tenant-ID": "00000000-0000-0000-0000-000000000000",
                    "tenant": "00000000-0000-0000-0000-000000000000"
                },
                body: JSON.stringify(messagePayload)
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição HTTP: ${response.status}`);
            }

            const novaMensagem = await response.json();
            setMessages(prevMessages => [...prevMessages, novaMensagem]);
            setInputText("");

        } catch (error) {
            console.error("Erro detalhado ao enviar mensagem:", error);
            alert("Não foi possível enviar a mensagem.");
        } finally {
            setSending(false);
        }
    };

    // Função auxiliar para permitir o envio ao pressionar "Enter" no teclado
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex h-screen w-screen bg-slate-100 overflow-hidden text-slate-800 font-sans antialiased">

            {/* 1. BARRA LATERAL (MENU & LOGO SIMPLIFICADA) */}
            <Sidebar />

            {/* 2. LISTA DE CHATS (COLUNA CENTRAL - ESTILO DIGISAC) */}
            <section className="w-80 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                    <span className="text-xl font-black tracking-wider text-slate-900">
                        INFOR<span className="text-blue-600">CHAT</span>
                    </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        SaaS
                    </span>
                </div>

                <div className="px-4 py-2 border-b border-slate-50 flex gap-2 text-xs font-semibold text-slate-500 flex-shrink-0">
                    <button className="flex-1 py-1.5 text-center bg-blue-50 text-blue-600 rounded-lg">Ativos</button>
                    <button className="flex-1 py-1.5 text-center hover:bg-slate-50 rounded-lg transition-colors">Pendentes</button>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                    {loading && (
                        <div className="p-4 text-sm text-slate-400 animate-pulse text-center">
                            A sincronizar conversas...
                        </div>
                    )}
                    {error && (
                        <div className="p-4 text-xs text-red-500 bg-red-50 m-3 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    {!loading && !error && messages.length === 0 && (
                        <div className="p-6 text-center text-xs text-slate-400 italic">
                            Nenhum chat ativo encontrado.
                        </div>
                    )}

                    {!loading && !error && messages.length > 0 && (
                        <div className="p-4 bg-blue-50/40 border-l-4 border-blue-600 flex items-center gap-3 cursor-pointer transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 flex-shrink-0">
                                JC
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h4 className="text-sm font-semibold text-slate-900 truncate">João Costa</h4>
                                    <span className="text-[10px] text-slate-400">Agora</span>
                                </div>
                                <p className="text-xs text-blue-600 font-medium truncate mt-0.5">
                                    {/* 🔥 CORRIGIDO: Aponta para 'content' e não 'text' */}
                                    {messages[messages.length - 1]?.content || "Última mensagem..."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 3. JANELA DE CONVERSA ATIVA (COLUNA DA DIREITA) */}
            <main className="flex-1 flex flex-col bg-slate-50 min-w-0">
                <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs flex-shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-600/20">
                            JC
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900">João Costa</h3>
                            <span className="text-xs text-emerald-500 flex items-center gap-1 mt-0.5">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span> Atendimento em curso
                            </span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
                    {loading ? (
                        <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
                            A carregar histórico...
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-sm text-slate-400 italic">
                            Nenhuma mensagem registada para este contacto.
                        </div>
                    ) : (
                        messages.map((m) => {
                            // Mantém a simulação visual baseada no ID da mensagem
                            const isSentByMe = parseInt(m.id?.substring(0, 2), 16) % 2 === 0;

                            return (
                                <div
                                    key={m.id}
                                    className={`flex flex-col max-w-[70%] ${isSentByMe ? 'self-end items-end' : 'self-start items-start'}`}
                                >
                                    <div className={`p-3.5 rounded-2xl shadow-xs text-sm ${
                                        isSentByMe
                                            ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-600/10'
                                            : 'bg-white text-slate-800 border border-slate-200/60 rounded-tl-none'
                                    }`}>
                                        <p className="leading-relaxed break-words whitespace-pre-wrap">
                                            {/* 🔥 CORRIGIDO: Renderiza unicamente a propriedade content retornada pelo banco */}
                                            {m.content}
                                        </p>
                                        <span className={`block text-[9px] text-right mt-1.5 font-medium ${isSentByMe ? 'text-blue-200' : 'text-slate-400'}`}>
                                            18:42
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer / Entrada de Texto */}
                <footer className="p-4 bg-white border-t border-slate-200 flex items-center gap-3 flex-shrink-0">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Escreva uma mensagem para o cliente..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={sending}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder-slate-400 disabled:opacity-60"
                        />
                    </div>
                    <button
                        onClick={() => handleSendMessage()}
                        disabled={sending || !inputText.trim()}
                        className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                    >
                        {sending ? "A enviar..." : "Enviar"}
                    </button>
                </footer>
            </main>

        </div>
    );
}

export default App;