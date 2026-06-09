import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // URL do endpoint com o ID do contato de teste que criamos no banco
    const url = 'http://localhost:8080/api/mensagens/11111111-1111-1111-1111-111111111111';

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 🔥 Aqui passamos o ID do Tenant para o Hibernate não dar o erro 500
        'X-Tenant-ID': '22222222-2222-2222-2222-222222222222'
      }
    })
        .then(response => response.json())
        .then(data => {
          console.log("Mensagens carregadas com sucesso do Back-end:", data);
        })
        .catch(error => {
          console.error("Erro ao conectar no back-end:", error);
        });
  }, []);

  return (
      <div>
        <h1>Testando Conexão</h1>
        <p>Abra o console do navegador (F12) para ver o resultado!</p>
      </div>
  );
}

export default App;