package br.com.app.seubiu.seubiu;

import br.com.app.seubiu.seubiu.models.RequestBody;
import br.com.app.seubiu.seubiu.models.ResponseBody;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface RequestInterface {

    @POST("devices")
    Call<ResponseBody> registerDevice(@Body RequestBody body);
}
