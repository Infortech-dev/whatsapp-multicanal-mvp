package infrastructure.adapters.inbound.persistence;

import com.sistema.atendimento.core.domain.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface SpringDataMessageRepository extends JpaRepository<Message, UUID>{
}
