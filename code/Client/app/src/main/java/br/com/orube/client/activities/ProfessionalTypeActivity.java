package br.com.orube.client.activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import br.com.orube.client.R;
import br.com.orube.client.model.Service;
import br.com.orube.client.util.CustomAdapter;
import br.com.orube.client.util.Model;
import br.com.orube.client.util.SeuBiuRequest;
import butterknife.Bind;
import butterknife.ButterKnife;

public class ProfessionalTypeActivity extends AppCompatActivity implements View.OnClickListener {

    private ListView listView;
    Model[] modelItems = null;

    private Button btnMapa;
    private Button btnProximo;

    @Bind(R.id.lblProfessional)
    public TextView lblProfessional;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_professional_type);
        ButterKnife.bind(this);

        btnMapa = (Button)findViewById(R.id.btnMapa);
        btnProximo = (Button)findViewById(R.id.btnAvancar2);

        btnMapa.setOnClickListener( this );
        btnProximo.setOnClickListener( this );

        lblProfessional.setText( SeuBiuRequest.getInstance().getProfession().getDescription());

        listView = (ListView) findViewById(R.id.listView1);

        List<Service> services = SeuBiuRequest.getInstance().getServiceList();
        List<Model> modelList = new ArrayList<>();

        for(Service s : services){
            modelList.add(new Model(s.getDescription(), 0));
        }

        modelItems = modelList.toArray(new Model[modelList.size()]);

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
