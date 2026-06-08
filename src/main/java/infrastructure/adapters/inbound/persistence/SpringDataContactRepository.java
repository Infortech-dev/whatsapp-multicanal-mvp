package infrastructure.adapters.inbound.persistence;

import com.sistema.atendimento.core.domain.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface SpringDataContactRepository extends JpaRepository<Contact, UUID> {
    Optional<Contact> findByWhatsappNumberAndTenantId(String whatsappNumber, UUID tenantId);
}
