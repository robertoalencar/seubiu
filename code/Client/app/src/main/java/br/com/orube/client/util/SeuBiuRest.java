package br.com.orube.client.util;

import java.util.List;

import br.com.orube.client.model.Address;
import br.com.orube.client.model.AuthToken;
import br.com.orube.client.model.Profession;
import br.com.orube.client.model.Service;
import br.com.orube.client.model.User;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface SeuBiuRest {

    final String TAG = "REST_API";

    @GET("/api/me")
    Call<User> me();

    @FormUrlEncoded
    @POST("/api/authenticate")
    Call<AuthToken> authenticate(@Field("email") String email, @Field("password") String password);

    @POST("/api/users")
    Call<User> users(@Body User user);

    @GET("/api/professions")
    Call<List<Profession>> professions();

    @GET("/api/professions/{id}/services")
    Call<List<Service>> services(@Path("id")String id);

    @POST("/users/{userId}/devices")
    Call<AuthToken> sendDevices(@Path("userId") String id,
                                @Path("deviceToken") String deviceToken,
                                @Path("deviceTypeId") String deviceTypeId);


    @GET("/api/users/{userId}/addresses")
    Call<List<Address>> getAddresses(@Path("userId") String id);



    /*
            router.route('/cities')
            router.route('/countries')
            router.route('/countries/:idCountry/states')
            router.route('/professions')
            router.route('/professions/:id')
            router.route('/professions/:id/services')
            router.route('/requests')
            router.route('/states')
            router.route('/states/:idState/cities')
            router.route('/users/:userId/addresses/:addressId')
            router.route('/users/:userId/devices')
            router.route('/users/:userId/devices/:deviceToken')
            router.route('/users/:userId/personalinfo')
            router.route('/users/:userId/profile')
            router.route('/users/:userId/profile/cities')
            router.route('/users/:userId/profile/professions')
            router.route('/users/:userId/profile/services')
            router.route('/users/:userId/profile/displayimage')
            router.route('/users')
            router.route('/users/:userId')
            router.route('/users/:userId/profile')
            router.route('/users/:userId/personal')
            router.route('/search')
            */
}