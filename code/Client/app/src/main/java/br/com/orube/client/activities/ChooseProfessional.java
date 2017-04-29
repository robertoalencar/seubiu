package br.com.orube.client.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import br.com.orube.client.R;
import butterknife.Bind;
import butterknife.ButterKnife;

public class ChooseProfessional extends AppCompatActivity implements View.OnClickListener {


    @Bind(R.id.btnSolicitar)
    public Button btnSolicitar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_choose_professional);

        ButterKnife.bind(this);

        btnSolicitar.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {

        if( view == btnSolicitar ){
            Intent intent = new Intent(this,ProfessionalTypeActivity.class);
            startActivity(intent);
        }
    }
}
