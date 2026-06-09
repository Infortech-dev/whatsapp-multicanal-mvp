package infrastructure.configuration;

import com.sistema.atendimento.core.domain.repository.ContactRepository;
import com.sistema.atendimento.core.domain.repository.MessageNotifier;
import com.sistema.atendimento.core.domain.repository.MessageRepository;
import com.sistema.atendimento.core.usecase.service.ReceiveMessageService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {

    // Esta anotação @Bean diz ao Spring: "Instancie esta classe do Core e guarde-a no seu contexto"
    @Bean
    public ReceiveMessageService receiveMessageService(ContactRepository contactRepository,
                                                       MessageRepository messageRepository,
                                                       MessageNotifier messageNotifier) {

        // Injeção de dependência manual e controlada, mantendo o Core limpo de frameworks
        return new ReceiveMessageService(contactRepository, messageRepository, messageNotifier);
    }
}