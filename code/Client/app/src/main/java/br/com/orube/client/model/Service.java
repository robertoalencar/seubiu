package br.com.orube.client.model;

/**
 * Created by arthur on 07/11/16.
 */
public class Service {

    private Long id;
    private String description;
    private boolean active;
    private Long profession_id;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Long getProfession_id() {
        return profession_id;
    }

    public void setProfession_id(Long profession_id) {
        this.profession_id = profession_id;
    }
}
