package br.com.orube.client.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import br.com.orube.client.R;
import br.com.orube.client.model.AuthToken;
import br.com.orube.client.model.Service;
import br.com.orube.client.util.CustomAdapter;
import br.com.orube.client.util.Model;
import br.com.orube.client.util.ServiceGenerator;
import br.com.orube.client.util.SeuBiuRequest;
import br.com.orube.client.util.SeuBiuRest;
import butterknife.Bind;
import butterknife.ButterKnife;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfessionalTypeActivity extends AppCompatActivity implements View.OnClickListener {

    @Bind(R.id.labelProfessional)
    public TextView lblProfessional;

    @Bind(R.id.listView1)
    public ListView lista;

    @Bind(R.id.btnMapa)
    public Button btnMapa;

    @Bind(R.id.btnAdress)
    public Button btnAddress;

    @Bind(R.id.btnProximo)
    public Button btnProximo;

    private Context context = this;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_professional_type);
        ButterKnife.bind(this);

        SeuBiuRequest request = SeuBiuRequest.getInstance();
        lblProfessional.setText(request.getProfession().getDescription());

        CustomAdapter adapter = new CustomAdapter(context, tratarSelected(request.getServiceListSelected()) );
        lista.setAdapter(adapter);


        lista.setEnabled( false );

        btnMapa.setOnClickListener( this );

        btnAddress.setOnClickListener( this );

        btnProximo.setOnClickListener( this );


    }

    private Model[] tratarSelected(Model[] models){

       List<Model> lista = new ArrayList<Model>();
        int i = 0;
        for(Model m : models){
            if( m.getValue() ){
                lista.add( m );
            }
        }
        Model[] retorno = new Model[lista.size()];
        lista.toArray( retorno );

        return retorno;
    }

    @Override
    public void onClick(View v) {

        Intent intent = null;
        if( v == btnMapa ){
            intent = new Intent(this, MapsActivity.class);
            startActivity( intent );
        }else if( v == btnProximo){
            //intent = new Intent(this, JobDescriptionActivity.class);
            intent = new Intent(this, ChooseProfessional.class);
            startActivity( intent );
        }else if( v == btnAddress ){
            intent = new Intent(this, AddressActivity.class);
            startActivity( intent );
        }


    }
}
