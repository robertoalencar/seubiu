<template>



<div class="container">
    <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
            <div class="account-wall">
                 <div class="img">
                    <img  src="../../../assets/images/login.png">
                </div>
                <form class="form-signin">
                <input type="text" class="form-control" placeholder="Usuário" required autofocus>
                </br>
                <input type="password" class="form-control" placeholder="Senha" required>
                <button class="btn btn-lg btn-danger btn-block" type="submit">
                    Login</button>
                </form>
            </div>
        </div>
    </div>
</div>


</template>


<script>


</script>


<style>


.container{



}

.form-signin
{
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
    border-radius: 20px;
    
}
.form-signin .form-signin-heading, .form-signin .checkbox
{
    margin-bottom: 10px;
}
.form-signin .checkbox
{
    font-weight: normal;
}
.form-signin .form-control
{
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.form-signin .form-control:focus
{
    z-index: 2;
}
.form-signin input[type="text"]
{
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.form-signin input[type="password"]
{
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.account-wall
{
    margin-top: 20px;
    padding: 40px 0px 20px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.login-title
{
    color: #555;
    font-size: 18px;
    font-weight: 400;
    display: block;
}
.profile-img
{
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;

}
.need-help
{
    margin-top: 10px;
}
.new-account
{
    display: block;
    margin-top: 10px;
}
img {
    width: 50%;
    margin-left:25%;
    margin-bottom: 5%;
} 

</style>

