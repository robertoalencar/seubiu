package br.com.orube.client.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageButton;

import br.com.orube.client.R;

public class DashBoardActivity extends AppCompatActivity implements View.OnClickListener {


    private ImageButton btnSolicitar;
    private ImageButton btnSolicitados;
    private ImageButton btnRealizados;

    private Context context = this;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dash_board);

        btnSolicitar = (ImageButton)findViewById(R.id.btnSolicitar);
        btnSolicitados = (ImageButton)findViewById(R.id.btnSolicitados);
        btnRealizados = (ImageButton)findViewById(R.id.btnRealizados);


        btnSolicitar.setOnClickListener(this);
        btnSolicitados.setOnClickListener( this );
        btnRealizados.setOnClickListener( this );

    }

    @Override
    public void onClick(View v) {
        Intent intent;
        if( v == btnSolicitar ){
            intent = new Intent(this, JobTypeActivity.class);
            startActivity(intent);
        }

    }
}
