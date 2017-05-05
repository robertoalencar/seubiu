package br.com.orube.client.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;

import br.com.orube.client.R;
import br.com.orube.client.util.ProfessionalAdapter;
import butterknife.Bind;
import butterknife.ButterKnife;

public class ChooseProfessional extends AppCompatActivity implements View.OnClickListener {


    @Bind(R.id.btnSolicitar)
    public Button btnSolicitar;

    @Bind(R.id.rcview)
    public RecyclerView mRecyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_choose_professional);

        ButterKnife.bind(this);

        mRecyclerView.setHasFixedSize(true);

        // use a linear layout manager
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);

        // specify an adapter (see also next example)
        String[] dataset = {"Tião Galinha", "PantaLeão", "Carlota Joaquina"};
        RecyclerView.Adapter mAdapter = new ProfessionalAdapter( dataset );
        mRecyclerView.setAdapter(mAdapter);

        btnSolicitar.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {

        if( view == btnSolicitar ){
            Intent intent = new Intent(this,ProfessionalDetailActivity.class);
            startActivity(intent);
        }
    }
}
