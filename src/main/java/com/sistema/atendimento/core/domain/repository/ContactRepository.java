package com.sistema.atendimento.core.domain.repository;

import com.sistema.atendimento.core.domain.model.Contact;
import java.util.UUID;
import java.util.Optional;


public interface ContactRepository {

    Optional<Contact> findByWhatsappNumberAndTenantId(String whatsappNumber, UUID tenantId);

    Contact save(Contact contact);
}
