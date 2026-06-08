package infrastructure.adapters.inbound.persistence;
import com.sistema.atendimento.core.domain.model.Message;
import com.sistema.atendimento.core.domain.repository.MessageRepository;
import org.springframework.stereotype.Component;

@Component
public class MessagePersistenceAdapter implements MessageRepository {

    private final SpringDataMessageRepository springDataRepository;

    public MessagePersistenceAdapter(SpringDataMessageRepository springDataRepository) {
        this.springDataRepository = springDataRepository;
    }

    @Override
    public Message save(Message message) {
        return springDataRepository.save(message);
    }
}