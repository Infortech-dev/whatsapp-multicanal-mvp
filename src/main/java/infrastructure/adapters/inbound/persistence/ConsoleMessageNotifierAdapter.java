package infrastructure.adapters.inbound.persistence;

import com.sistema.atendimento.core.domain.model.Message;
import com.sistema.atendimento.core.domain.repository.MessageNotifier;
import org.springframework.stereotype.Component;

@Component
public class ConsoleMessageNotifierAdapter implements MessageNotifier {

    @Override
    public void notifyNewMessage(Message message) {
        // Temporário: Apenas para logar no terminal enquanto não configuramos o WebSocket
        System.out.println("[WEBSOCKET STUB] Nova mensagem recebida do contato "
                + message.getContact().getName()
                + " (" + message.getContact().getWhatsappNumber() + "): "
                + message.getContent());
    }
}
