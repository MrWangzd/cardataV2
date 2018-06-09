function login() {
    var userName = $("#txtName").val();
    var password = $("#txtPwd").val();

    $.ajax(
        {
            url: "/loginpost",
            data: { "userName": userName ,"passWord":password},
            type: "POST",
            success: function (data) {
                if(data.status == "ok"){
                    location.href = "/";
                }else{

                }

            }
        }
    );
}