package br.com.orube.client.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

import java.util.List;

import br.com.orube.client.R;
import br.com.orube.client.model.Profession;
import br.com.orube.client.util.ServiceGenerator;
import br.com.orube.client.util.SeuBiuRest;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class JobTypeActivity extends AppCompatActivity implements View.OnClickListener {

    private Context context = this;

    private Spinner spinner;
    private Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_job_type);


        spinner = (Spinner)findViewById(R.id.SpnJobType);
        button = (Button)findViewById(R.id.btnProximo);

        ArrayAdapter<String> combo = new ArrayAdapter<String>(context, android.R.layout.simple_list_item_1 );
        //combo.addAll("Encanador", "Pedreiro", "Eletricista", "Pintor");
        List<Profession> lista;
        SeuBiuRest rest = ServiceGenerator.createService(SeuBiuRest.class);

        rest.professions().enqueue(new Callback<List<Profession>>() {
            @Override
            public void onResponse(Call<List<Profession>> call, Response<List<Profession>> response) {
                if(response.isSuccessful()){
                    lista = response.body();
                    for(Profession p : lista){
                        combo.add(p.getDescription());
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Profession>> call, Throwable t) {

            }
        });


        combo.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(combo);


        button.setOnClickListener( this );

    }

    @Override
    public void onClick(View v) {

        Intent intent;
        if( v == button ){
            intent = new Intent(this, ProfessionalTypeActivity.class);
            startActivity(intent);
        }

    }
}
