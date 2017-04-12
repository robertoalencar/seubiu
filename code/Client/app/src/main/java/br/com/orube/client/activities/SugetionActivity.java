package br.com.orube.client.activities;

import android.content.Intent;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import br.com.orube.client.R;
import butterknife.Bind;
import butterknife.ButterKnife;

public class SugetionActivity extends AppCompatActivity implements View.OnClickListener{


    @Bind(R.id.btnProximo)
    Button btnProximo;

    @Bind(R.id.edtSugetion)
    EditText edtSugetion;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sugetion);
        ButterKnife.bind(this);

        btnProximo.setOnClickListener( this );

    }

    @Override
    public void onClick(View v) {

        if ( v == btnProximo && validate() ){


            Toast.makeText(this, "Sugestão recebida",Toast.LENGTH_LONG).show();


            Intent intent = new Intent(this, JobTypeActivity.class);
            startActivity( intent );
        }
    }

    private boolean validate(){

        boolean retorno = false;

        String sugestion = edtSugetion.getText().toString();
        if( !sugestion.isEmpty() && sugestion.length() > 3){
            return true;
        }else{
            edtSugetion.setText("");
            if( sugestion.isEmpty() ){
                edtSugetion.setError("A sugestão não pode ser vazia");
            }else{
                edtSugetion.setError("A sugestão deve ter mais de 3 caracteres");
            }
        }

        return retorno;
    }
}
