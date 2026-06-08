package infrastructure.adapters.inbound.persistence;

import com.sistema.atendimento.core.domain.model.Contact;
import com.sistema.atendimento.core.domain.repository.ContactRepository;
import org.springframework.stereotype.Component;
import java.util.Optional;
import java.util.UUID;

@Component
public class ContactPersistenceAdapter implements ContactRepository {

    private final SpringDataContactRepository springDataRepository;

    // O Spring injeta automaticamente o repositório do JPA aqui
    public ContactPersistenceAdapter(SpringDataContactRepository springDataRepository) {
        this.springDataRepository = springDataRepository;
    }

    @Override
    public Optional<Contact> findByWhatsappNumberAndTenantId(String whatsappNumber, UUID tenantId) {
        return springDataRepository.findByWhatsappNumberAndTenantId(whatsappNumber, tenantId);
    }

    @Override
    public Contact save(Contact contact) {
        return springDataRepository.save(contact);
    }
}