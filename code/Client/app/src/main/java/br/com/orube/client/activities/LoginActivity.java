package br.com.orube.client.activities;


import android.app.ProgressDialog;
import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.telephony.TelephonyManager;
import android.util.Log;

import android.content.Intent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

import br.com.orube.client.R;
import br.com.orube.client.model.AuthToken;
import br.com.orube.client.model.Profession;
import br.com.orube.client.util.ServiceGenerator;
import br.com.orube.client.util.SeuBiuRequest;
import br.com.orube.client.util.SeuBiuRest;
import butterknife.ButterKnife;
import butterknife.Bind;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {
    private static final String TAG = "LoginActivity";
    private static final int REQUEST_SIGNUP = 0;

    @Bind(R.id.input_email)
    EditText email;
    @Bind(R.id.input_password)
    EditText password;
    @Bind(R.id.btn_login)
    Button btnLogin;
    @Bind(R.id.link_signup)
    TextView lnkSignUp;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        ButterKnife.bind(this);

        btnLogin.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                login();
            }
        });

        lnkSignUp.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), SignUpActivity.class);
                startActivityForResult(intent, REQUEST_SIGNUP);
            }
        });
    }

    public void login() {

        Log.d(TAG, "Login");

        if (validate()) {
            //btnLogin.setEnabled(false);
            final ProgressDialog progressDialog = new ProgressDialog(LoginActivity.this, R.style.AppTheme_NoActionBar);
            showProgress(progressDialog);

            String email = this.email.getText().toString();
            String password = this.password.getText().toString();

            String iMei = getImei();

            getProfessions();
            doLogin(progressDialog, email, password);

            //postDelayed();
        }else {
            onLoginFailed();
        }
    }

    private void getProfessions() {

        SeuBiuRest rest = ServiceGenerator.createService(SeuBiuRest.class);

        rest.professions().enqueue(new Callback<List<Profession>>() {
            @Override
            public void onResponse(Call<List<Profession>> call, Response<List<Profession>> response) {
                if (response.isSuccessful()) {
                    SeuBiuRequest.getInstance().setProfessionList(response.body());
                }else{
                    Log.d("REST", response.body() + " - " + response.message());
                }
            }

            @Override
            public void onFailure(Call<List<Profession>> call, Throwable t) {
                Log.d("REST", t.getMessage());
            }
        });

    }


    private void doLogin(final ProgressDialog progressDialog, String email, String password) {

        SeuBiuRest rest = ServiceGenerator.createService(SeuBiuRest.class);

        Call<AuthToken> auth = rest.authenticate(email, password);

        auth.enqueue(new Callback<AuthToken>() {
            @Override
            public void onResponse(Call<AuthToken> call, Response<AuthToken> response) {
                if (response.isSuccessful()) {
                    SeuBiuRequest.getInstance().setToken(response.body());
                  //  sendDevice();
                    Intent intent = new Intent(getApplicationContext(), DashBoardActivity.class);
                    startActivityForResult(intent, REQUEST_SIGNUP);
                } else {
                    Log.d("REST", response.message());
                    progressDialog.dismiss();
                    Toast.makeText(getBaseContext(), R.string.login_fail, Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<AuthToken> call, Throwable t) {
                Log.d("REST", t.getMessage());
                progressDialog.dismiss();
                Toast.makeText(getBaseContext(), R.string.login_fail, Toast.LENGTH_LONG).show();
            }
        });
    }

    private void sendDevice() {
        AuthToken token = SeuBiuRequest.getInstance().getToken();

        SeuBiuRest rest = ServiceGenerator.createService(SeuBiuRest.class, token.getToken());
        rest.sendDevices( token.getUserId().toString(), getImei(), "1").enqueue(new Callback<AuthToken>() {
            @Override
            public void onResponse(Call<AuthToken> call, Response<AuthToken> response) {
                if(response.isSuccessful()){
                    Log.d("REST", response.body() + " - " + response.message() );
                }else{
                    Log.d("REST", response.body() + " - " + response.message() );
                }
            }

            @Override
            public void onFailure(Call<AuthToken> call, Throwable t) {
                Log.d("REST", t.getMessage() );
            }
        });

    }

    private void showProgress(ProgressDialog progressDialog) {
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage("Autenticando...");
        progressDialog.show();
    }

    private void postDelayed() {
        new android.os.Handler().postDelayed(
                new Runnable() {
                    public void run() {

                        // On complete call either onLoginSuccess or onLoginFailed
                        // onLoginSuccess();
                        // onLoginFailed();
                        //progressDialog.dismiss();
                    }
                }, 1000);
    }

    private String prepareToken(String s) {
        if (s != null) {
            return s.replace("{", "")
                    .replace("}", "")
                    .replace("token=", "")
                    .trim();
        }
        return null;
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_SIGNUP) {
            if (resultCode == RESULT_OK) {

                // TODO: Implement successful signup logic here
                // By default we just finish the Activity and log them in automatically
                this.finish();
            }
        }
    }

    @Override
    public void onBackPressed() {
        // disable going back to the MainActivity
        moveTaskToBack(true);
    }

    public void onLoginSuccess() {
        btnLogin.setEnabled(true);
        finish();
    }

    public void onLoginFailed() {
        Toast.makeText(getBaseContext(), R.string.login_fail, Toast.LENGTH_LONG).show();
        email.setText("");
        password.setText("");

        btnLogin.setEnabled(true);
    }

    public boolean validate() {
        boolean valid = true;

        String email = this.email.getText().toString();
        String password = this.password.getText().toString();

        if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            this.email.setError("entre com um email válido");
            valid = false;
        } else {
            this.email.setError(null);
        }

        if (password.isEmpty() || password.length() < 6 || password.length() > 10) {
            this.password.setError("entre com uma senha entre 6 e 10 caracteres");
            valid = false;
        } else {
            this.password.setError(null);
        }

        return valid;
    }

    private String getImei() {
        TelephonyManager mngr = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
        return mngr.getDeviceId();
    }
}