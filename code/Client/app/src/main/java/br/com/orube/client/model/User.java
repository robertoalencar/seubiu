package br.com.orube.client.model;

/**
 * Created by arthur on 03/11/16.
 */

public class User {

    private Long id; //              : { type: 'serial', key: true, mapsTo: 'id' },
    private String name;      //      : { type: "text", size: 125, required: true, mapsTo: 'name' },
    private String surname; //         : { type: "text", size: 125, required: true, mapsTo: 'surname' },
    private String phone;   //           : { type: 'text', size: 30, required: true, unique: true,  mapsTo: 'phone' },
    private String email;    //       : { type: 'text', size: 255, required: true, unique: true,  mapsTo: 'email' },
    private Boolean emailVerified;   //: { type: 'boolean', defaultValue: false, mapsTo: 'emailVerified' },
    private String password;       // : { type: 'text', size: 50, required: true, mapsTo: 'password' },
    private Boolean admin   ;        //: { type: 'boolean', defaultValue: false, mapsTo: 'admin' }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", emailVerified=" + emailVerified +
                ", password='" + password + '\'' +
                ", admin=" + admin +
                '}';
    }
}
