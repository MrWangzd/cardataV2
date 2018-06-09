/// <reference path="../jquery-1.8.3.js" />
/// <reference path="../jquery.validate.js" />
jQuery.extend(jQuery.validator.messages, {
    required: "必填字段",
    number: "请输入合法的数字",
    maxlength: jQuery.validator.format("最多输入{0}个字符")
});
$(document).ready(function () {
});
