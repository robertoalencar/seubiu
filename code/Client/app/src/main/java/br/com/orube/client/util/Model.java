package br.com.orube.client.util;

/**
 * Created by arthur on 23/09/16.
 */
public class Model {

    String name;
    boolean value; /* 0 -&gt; checkbox disable, 1 -&gt; checkbox enable */

    public Model(String name, boolean value){
        this.name = name;
        this.value = value;
    }
    public String getName(){
        return this.name;
    }
    public boolean getValue(){
        return this.value;
    }

    public void setValue(boolean value) {
        this.value = value;
    }
}
