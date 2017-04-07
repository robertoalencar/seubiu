package br.com.orube.client.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import br.com.orube.client.R;
import butterknife.Bind;
import butterknife.ButterKnife;

public class SugetionActivity extends AppCompatActivity implements View.OnClickListener{


    @Bind(R.id.btnProximo)
    Button btnProximo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sugetion);
        ButterKnife.bind(this);

        btnProximo.setOnClickListener( this );

    }

    @Override
    public void onClick(View v) {

        if ( v == btnProximo ){
            Intent intent = new Intent(this, JobTypeActivity.class);
            startActivity( intent );
        }

    }
}
