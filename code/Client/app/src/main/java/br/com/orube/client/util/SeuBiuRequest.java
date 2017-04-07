package br.com.orube.client.util;

import java.util.List;

import br.com.orube.client.model.AuthToken;
import br.com.orube.client.model.Profession;
import br.com.orube.client.model.Service;

/**
 * Created by arthur on 08/11/16.
 */

public class SeuBiuRequest {

    private static SeuBiuRequest instance = new SeuBiuRequest();

    public static SeuBiuRequest getInstance(){
        return instance;
    }

    private Profession profession;

    private List<Profession> professionList;

    private List<Service> serviceList;

    private List<Service> serviceListSelected;

    private AuthToken token;

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

    public List<Service> getServiceListSelected() {
        return serviceListSelected;
    }

    public void setServiceListSelected(List<Service> serviceListSelected) {
        this.serviceListSelected = serviceListSelected;
    }

    public static AuthToken getToken() {
        return instance.token;
    }

    public static void setToken(AuthToken token) {
        instance.token = token;
    }


    public void setProfession(String selectedItem) {

        for(Profession p : professionList ){
            if(p.getDescription().equals(selectedItem)){
                instance.setProfession( p );
            }
        }
    }





}
