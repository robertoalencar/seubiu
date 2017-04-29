package br.com.orube.client.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;

import java.util.List;

import br.com.orube.client.R;
import br.com.orube.client.model.Address;
import br.com.orube.client.util.SeuBiuRequest;
import butterknife.Bind;
import butterknife.ButterKnife;

public class AddressActivity extends AppCompatActivity implements View.OnClickListener {

    @Bind(R.id.radioAddress)
    public RadioGroup radioGroup;

    @Bind(R.id.btnSalvar)
    public Button button;

    private SeuBiuRequest seuBiuRequest = SeuBiuRequest.getInstance();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_address);
        ButterKnife.bind(this);

        button.setOnClickListener( this );

        carregarEnderecos();
    }

    private void carregarEnderecos() {

        List<Address> listaAddress = seuBiuRequest.getAddressList();

        RadioButton button;
        for(Address address : listaAddress ){
            button = new RadioButton(this);
            button.setText( address.getAddress() + ", " + address.getNumber() + ", " + address.getComplement() );
            button.setPadding(15,15,15,15);
            if( address.isMain() ){
                button.setChecked( true );
            }

            radioGroup.addView(button);
        }


    }

    @Override
    public void onClick(View view) {

        Intent intent = null;
        if( view == button ){
            intent = new Intent(this, ProfessionalTypeActivity.class);
        }
        startActivity( intent );
    }
}
