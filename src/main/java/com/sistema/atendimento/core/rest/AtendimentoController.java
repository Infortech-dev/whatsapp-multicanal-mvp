package com.sistema.atendimento.core.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/atendimentos")
@CrossOrigin(origins = "*")
public class AtendimentoController {

    @GetMapping
    public List<Map<String, String>> testarConexao() {
        return List.of(
                Map.of("status", "Sucesso", "mensagem", "O back-end está funcionando corretamente")
        );
    }
}
