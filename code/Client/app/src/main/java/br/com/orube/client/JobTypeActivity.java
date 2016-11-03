package br.com.orube.client;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

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
        combo.addAll("Encanador", "Pedreiro", "Eletricista", "Pintor");
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
