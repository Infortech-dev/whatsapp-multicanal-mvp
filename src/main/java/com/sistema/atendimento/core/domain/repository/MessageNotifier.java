package com.sistema.atendimento.core.domain.repository;

import com.sistema.atendimento.core.domain.model.Message;


public interface MessageNotifier {
    void notifyNewMessage(Message message);
}
