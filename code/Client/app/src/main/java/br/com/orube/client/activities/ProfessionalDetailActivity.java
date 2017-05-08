package br.com.orube.client.activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import br.com.orube.client.R;
import br.com.orube.client.util.ProfessionalAdapter;
import br.com.orube.client.util.ProfessionalEvaluationAdapter;
import butterknife.Bind;
import butterknife.ButterKnife;

public class ProfessionalDetailActivity extends AppCompatActivity {

    @Bind(R.id.rcview)
    public RecyclerView rcView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_professional_detail);
        ButterKnife.bind(this);

        rcView.setHasFixedSize(true);

        // use a linear layout manager
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(this);
        rcView.setLayoutManager(mLayoutManager);

        // specify an adapter (see also next example)
        String[] dataset = {"Tião Galinha", "PantaLeão", "Carlota Joaquina"};
        RecyclerView.Adapter mAdapter = new ProfessionalEvaluationAdapter( dataset );
        rcView.setAdapter(mAdapter);


    }
}
