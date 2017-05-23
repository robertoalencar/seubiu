package br.com.orube.client.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.NavigationView;
import android.support.design.widget.Snackbar;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import java.util.List;

import br.com.orube.client.R;
import br.com.orube.client.model.Address;
import br.com.orube.client.model.AuthToken;
import br.com.orube.client.model.User;
import br.com.orube.client.util.ServiceGenerator;
import br.com.orube.client.util.SeuBiuRequest;
import br.com.orube.client.util.SeuBiuRest;
import butterknife.Bind;
import butterknife.ButterKnife;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DashBoardActivity extends AppCompatActivity
        implements View.OnClickListener, NavigationView.OnNavigationItemSelectedListener {


    private static final String ANDROID_TYPE = "1";
    private ImageButton btnSolicitar;
    private ImageButton btnSolicitados;
    private ImageButton btnRealizados;

    @Bind(R.id.emailAccount)
    public TextView emailAccount;

    @Bind(R.id.nameAccount)
    public TextView nameAccount;

    private Context context = this;

    private SeuBiuRequest seuBiuRequest = SeuBiuRequest.getInstance();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dash_board);
        //ButterKnife.bind(this);

        /*
        User user = seuBiuRequest.getUser();
        nameAccount.setText( user.getName() );
        emailAccount.setText( user.getEmail() );
        */

        btnSolicitar = (ImageButton)findViewById(R.id.btnSolicitar);
        btnSolicitados = (ImageButton)findViewById(R.id.btnSolicitados);
        btnRealizados = (ImageButton)findViewById(R.id.btnRealizados);


        btnSolicitar.setOnClickListener(this);
        btnSolicitados.setOnClickListener( this );
        btnRealizados.setOnClickListener( this );

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);



        getAddress();


        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);


    }

    @Override
    public void onClick(View v) {
        Intent intent;
        if( v == btnSolicitar ){
            intent = new Intent(this, JobTypeActivity.class);
            startActivity(intent);
        }else if( v == btnSolicitados ) {
            intent = new Intent(this, SideMenuActivity.class);
            startActivity(intent);
        }
    }



    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.side_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            // Handle the camera action
        } else if (id == R.id.nav_gallery) {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }


    private void getAddress() {

        AuthToken authToken = SeuBiuRequest.getInstance().getAuthToken();

        SeuBiuRest rest = ServiceGenerator.createService(SeuBiuRest.class, authToken.getToken() );
        Call<List<Address>> service = rest.getAddresses( authToken.getUser().getId().toString() );

        service.enqueue(new Callback<List<Address>>() {
            @Override
            public void onResponse(Call<List<Address>> call, Response<List<Address>> response) {
                if(response.isSuccessful()){
                    SeuBiuRequest.getInstance().setAddressList( response.body() );
                }
                Log.d("REST", response.body() + " - " + response.message() );
            }

            @Override
            public void onFailure(Call<List<Address>> call, Throwable t) {
                Log.d("REST", t.getMessage() );
            }
        });


    }




    private void sendDevice() {
        AuthToken token = SeuBiuRequest.getInstance().getAuthToken();

        SeuBiuRest rest = ServiceGenerator.createService(SeuBiuRest.class, token.getToken());
        rest.sendDevices( token.getUser().getId().toString(), getImei(), ANDROID_TYPE).enqueue(new Callback<AuthToken>() {
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

    private String getImei() {
        TelephonyManager mngr = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
        return mngr.getDeviceId();
    }

}
