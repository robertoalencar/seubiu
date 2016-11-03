package br.com.orube.client;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;

import br.com.orube.client.util.CustomAdapter;
import br.com.orube.client.util.Model;

public class ProfessionalTypeActivity extends AppCompatActivity implements View.OnClickListener {

    private ListView listView;
    Model[] modelItems;

    private Button btnMapa;
    private Button btnProximo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_professional_type);

        btnMapa = (Button)findViewById(R.id.btnMapa);
        btnProximo = (Button)findViewById(R.id.btnAvancar2);

        btnMapa.setOnClickListener( this );
        btnProximo.setOnClickListener( this );

        listView = (ListView) findViewById(R.id.listView1);
        modelItems = new Model[5];
        modelItems[0] = new Model("Serviço 1", 0);
        modelItems[1] = new Model("Serviço 2", 0);
        modelItems[2] = new Model("Serviço 3", 0);
        modelItems[3] = new Model("Serviço 4", 0);
        modelItems[4] = new Model("Serviço 5", 0);
        CustomAdapter adapter = new CustomAdapter(this, modelItems);
        listView.setAdapter(adapter);

    }

    @Override
    public void onClick(View v) {

        Intent intent = null;
        if( v == btnMapa ){
            intent = new Intent(this, JobLocationActivity.class);
        }else if( v == btnProximo){
            intent = new Intent(this, JobDescriptionActivity.class);
        }
        startActivity( intent );

    }
}
