package br.com.orube.client.util;

import java.util.List;

import br.com.orube.client.model.Address;
import br.com.orube.client.model.AuthToken;
import br.com.orube.client.model.Profession;
import br.com.orube.client.model.Service;
import br.com.orube.client.model.User;

/**
 * Created by arthur on 08/11/16.
 */

public class SeuBiuRequest {

    private static SeuBiuRequest instance = new SeuBiuRequest();

    public static SeuBiuRequest getInstance(){
        return instance;
    }


    private User user;

    private String token;


    private Profession profession;

    private List<Profession> professionList;

    private List<Service> serviceList;

    private List<Address> addressList;

    private Address address;

    private Model[] serviceListSelected;

    private AuthToken authToken;

    public List<Profession> getProfessionList() {
        return professionList;
    }

    public void setProfessionList(List<Profession> professionList) {
        this.professionList = professionList;
    }

    public List<Service> getServiceList() {
        return serviceList;
    }

    public void setServiceList(List<Service> serviceList) {
        this.serviceList = serviceList;
    }

    public Profession getProfession() {
        return profession;
    }

    public void setProfession(Profession profession) {
        this.profession = profession;
    }

    public Model[] getServiceListSelected() {
        return serviceListSelected;
    }

    public void setServiceListSelected(Model[] serviceListSelected) {
        this.serviceListSelected = serviceListSelected;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public AuthToken getAuthToken() {
        return authToken;
    }

    public void setAuthToken(AuthToken authToken) {
        this.authToken = authToken;
        this.user = authToken.getUser();
        this.token = authToken.getToken();
    }

    public void setProfession(String selectedItem) {

        for(Profession p : professionList ){
            if(p.getDescription().equals(selectedItem)){
                instance.setProfession( p );
            }
        }
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<Address> getAddressList() {
        return addressList;
    }

    public void setAddressList(List<Address> addressList) {
        this.addressList = addressList;
    }
}
