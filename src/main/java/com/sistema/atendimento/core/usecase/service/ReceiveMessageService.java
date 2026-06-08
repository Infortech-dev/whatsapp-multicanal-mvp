package com.sistema.atendimento.core.usecase.service;

import com.sistema.atendimento.core.domain.enums.MessageDirection;
import com.sistema.atendimento.core.domain.enums.MessageStatus;
import com.sistema.atendimento.core.domain.model.Contact;
import com.sistema.atendimento.core.domain.model.Message;
import com.sistema.atendimento.core.domain.repository.ContactRepository;
import com.sistema.atendimento.core.domain.repository.MessageNotifier;
import com.sistema.atendimento.core.domain.repository.MessageRepository;

import java.util.UUID;

public class ReceiveMessageService {

    private final ContactRepository contactRepository;
    private final MessageRepository messageRepository;
    private final MessageNotifier messageNotifier;


    public ReceiveMessageService(ContactRepository contactRepository,
                                 MessageRepository messageRepository,
                                 MessageNotifier messageNotifier) {
        this.contactRepository = contactRepository;
        this.messageRepository = messageRepository;
        this.messageNotifier = messageNotifier;
    }

    public Message execute(UUID tenantId, String whatsappNumber, String contactName, String messageContent) {
        Contact contact = contactRepository.findByWhatsappNumberAndTenantId(whatsappNumber, tenantId)
                .orElseGet(() -> {
                    // Se não existir, cria um contato novo sob o escopo desse Tenant
                    Contact newContact = new Contact();
                    newContact.setName(contactName != null ? contactName : "Contato WhatsApp");
                    newContact.setWhatsappNumber(whatsappNumber);
                    newContact.setTenantId(tenantId);
                    return contactRepository.save(newContact);
                });

        // 2. Instancia a nova mensagem com o status inicial da fila de atendimento
        Message message = new Message();
        message.setContact(contact);
        message.setContent(messageContent);
        message.setDirection(MessageDirection.INBOUND);
        message.setStatus(MessageStatus.RECEIVED); // Entra na fila de "Mensagens Recebidas"
        message.setTenantId(tenantId);

        // 3. Salva a mensagem no histórico do banco de dados
        Message savedMessage = messageRepository.save(message);

        // 4. Dispara a notificação para atualizar a tela do atendente instantaneamente via WebSocket
        messageNotifier.notifyNewMessage(savedMessage);

        return savedMessage;
    }
}