package com.sistema.atendimento.core.domain.repository;

import com.sistema.atendimento.core.domain.model.Message;
import java.util.UUID;


public interface MessageRepository {
    Message save(Message message);
}
