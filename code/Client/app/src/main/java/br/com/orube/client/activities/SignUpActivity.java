package br.com.orube.client.activities;

import android.app.ProgressDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.appindexing.Action;
import com.google.android.gms.appindexing.AppIndex;
import com.google.android.gms.appindexing.Thing;
import com.google.android.gms.common.api.GoogleApiClient;

import br.com.orube.client.R;
import br.com.orube.client.model.User;
import br.com.orube.client.util.ServiceGenerator;
import br.com.orube.client.util.SeuBiuRest;
import butterknife.ButterKnife;
import butterknife.Bind;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignUpActivity extends AppCompatActivity {
    private static final String TAG = "SignupActivity";

    private static final int REQUEST_SIGNUP = 0;

    @Bind(R.id.input_name)
    EditText name;

    @Bind(R.id.input_email)
    EditText email;

    @Bind(R.id.input_password)
    EditText password;


    @Bind(R.id.input_surname)
    EditText surname;

    @Bind(R.id.input_fone)
    EditText fone;

    @Bind(R.id.btn_signup)
    Button _signupButton;


    private GoogleApiClient client;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);
        ButterKnife.bind(this);

        _signupButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                signup();
            }
        });

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        client = new GoogleApiClient.Builder(this).addApi(AppIndex.API).build();
    }

    public void signup() {
        Log.d(TAG, "Signup");

        if (!validate()) {
            onSignupFailed();
            return;
        }

        _signupButton.setEnabled(false);

        final ProgressDialog progressDialog = new ProgressDialog(SignUpActivity.this,
                R.style.AppTheme);
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage("Criando conta...");
        progressDialog.show();

        User u = new User();
        u.setName( name.getText().toString() );
        u.setSurname( surname.getText().toString());
        u.setEmail( email.getText().toString());
        u.setPassword( password.getText().toString());
        u.setPhone( fone.getText().toString());

        SeuBiuRest rest = ServiceGenerator.createService(SeuBiuRest.class);

        Call<User> auth = rest.users( u );

        auth.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    Log.d("REST", response.body().toString());

                    Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                    startActivityForResult(intent, REQUEST_SIGNUP);
                } else {
                    Log.d("REST", response.message());
                    Toast.makeText(getBaseContext(), response.message() + " - " + response.body(), Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.d("REST", t.getMessage());
            }
        });


        new Handler().postDelayed(
                new Runnable() {
                    public void run() {
                        // On complete call either onSignupSuccess or onSignupFailed
                        // depending on success
                        onSignupSuccess();
                        // onSignupFailed();
                        progressDialog.dismiss();
                    }
                }, 1000);
    }


    private String prepareToken(String s) {
        return s.replace("{","")
                .replace("}","")
                .replace("token:","")
                .trim();

    }


    public void onSignupSuccess() {
        _signupButton.setEnabled(true);
        setResult(RESULT_OK, null);
        finish();
    }

    public void onSignupFailed() {
        Toast.makeText(getBaseContext(), "Login failed", Toast.LENGTH_LONG).show();

        _signupButton.setEnabled(true);
    }

    public boolean validate() {
        boolean valid = true;

        String name = this.name.getText().toString();
        String email = this.email.getText().toString();
        String password = this.password.getText().toString();

        String surname = this.surname.getText().toString();
        String fone = this.fone.getText().toString();

        if (name.isEmpty() || name.length() < 3) {
            this.name.setError("Use pelo menos 3 caracteres");
            valid = false;
        } else {
            this.name.setError(null);
        }

        if (email.isEmpty() || !Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            this.email.setError("entre com um email válido");
            valid = false;
        } else {
            this.email.setError(null);
        }

        if (password.isEmpty() || password.length() < 4 || password.length() > 10) {
            this.password.setError("a senha deve ter entre 4 e 10 caracteres");
            valid = false;
        } else {
            this.password.setError(null);
        }

        if (surname.isEmpty() ) {
            this.surname.setError("Campo obrigatório");
            valid = false;
        } else {
            this.surname.setError(null);
        }

        if (fone.isEmpty() ) {
            this.fone.setError("Campo obrigatório");
            valid = false;
        } else {
            this.fone.setError(null);
        }



        return valid;
    }

    /**
     * ATTENTION: This was auto-generated to implement the App Indexing API.
     * See https://g.co/AppIndexing/AndroidStudio for more information.
     */
    public Action getIndexApiAction() {
        Thing object = new Thing.Builder()
                .setName("SignUp Page") // TODO: Define a title for the content shown.
                // TODO: Make sure this auto-generated URL is correct.
                .setUrl(Uri.parse("http://[ENTER-YOUR-URL-HERE]"))
                .build();
        return new Action.Builder(Action.TYPE_VIEW)
                .setObject(object)
                .setActionStatus(Action.STATUS_TYPE_COMPLETED)
                .build();
    }

    @Override
    public void onStart() {
        super.onStart();

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        client.connect();
        AppIndex.AppIndexApi.start(client, getIndexApiAction());
    }

    @Override
    public void onStop() {
        super.onStop();

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        AppIndex.AppIndexApi.end(client, getIndexApiAction());
        client.disconnect();
    }
}