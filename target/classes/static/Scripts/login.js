function getValidateCode() {
	$("#iValCode").attr("src", "/Home/GetValidateCode?time=" + (new Date()).getTime());
}
function LoginResult(data) {
	if (data == -2) {
		getValidateCode();
		$.messager.alert("提示", "调用登录接口出现异常", "error");
	}
	else if (data == -1 || data == 0) {
		getValidateCode();
		$.messager.alert("提示", "该用户停用或删除", "error");
	}
	else if (data == 1) {
		var url = purl(encodeURI(window.location.href.toLowerCase()));
		var returnurl = url.param("returnurl");
		if (typeof (returnurl) === "undefined" || returnurl == "undefined") {
			returnurl = "/Home/CheckCarAdmin";
		}
		location.href = returnurl;
	} else if (data == 2) {
		getValidateCode();
		$.messager.alert("提示", "密码错误", "error");
	} else if (data == 3) {
		getValidateCode();
		$.messager.alert("提示", "验证码错误", "error");
	} else if (data == 4) {
		getValidateCode();
		$.messager.alert("提示", "请输入用户名或密码", "error");
	} else if (data == 5) {
	    getValidateCode();
	    $.messager.alert("提示", "出现未知错误", "error");
	}
}