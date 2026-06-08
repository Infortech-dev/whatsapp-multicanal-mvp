package core.domain.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "tenants")
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private boolean active = true;

    private Tenant() {}

    public UUID getId() { return  id;}
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name){ this.name = name;}
    public boolean isActive() {return active;}
    public void setActive(boolean active) {this.active = active;}
}
