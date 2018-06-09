$(function () {

    $("#hidIds").val(getQueryString("ids"));
    XuanPeiPriceReadOnly();

    
    
    $("#ddl_group1,#ddl_group2").live("change", function () {
        var groupid = $(this).val();
        if (groupid == "35") {
            $("#group35").css("padding", "110px 0px 0px 30px");
        }
        if (groupid == 0 || groupid == "") {
            window.location.hash = "group(" + 0 + ")";
        } else {
            window.location.hash = "group(" + groupid + ")";
            //浮动层值要跟着变            
            $("#ddl_group1,#ddl_group2").find("option[value=" + groupid + "]").attr("selected", true);
        }
    });
    
    $("form").submit(handleForm);
    $("form").submit(DataValidate);

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $("#table_top").show();
            //$("#smallFixed").show();
        } else {
            $("#table_top").hide();
            //$("#smallFixed").hide();
            $("#group35").css("padding", "0px 0px 0px 30px");
        }
        if ($("#main").width() > screen.width) {
            var sLeft = $(this).scrollLeft();
            $("#table_top").css("left", -sLeft);

            var sTop = $(this).scrollTop();
            //$("#floatTable").css("top", -sTop + 95);
        }
    });

});

var saveOrSubmit;
function btnSave() {
    $("#hidBtnStatus").val("1");
    saveOrSubmit = "save";
}

function btnSubmit() {
    $("#hidBtnStatus").val("0");
    saveOrSubmit = "submit";
}

//点击checkbox无
function XunHangMoShiWuNew(source) {
    var otherChbs = $(source).closest("td").find("input[type=checkbox]");
    if ($(source).prop("checked")) {
        //减一 去掉最后一个无
        for (var i = 0; i < otherChbs.length - 1; i++) {
            $(otherChbs[i]).prop("disabled", true).prop("checked", false);//chk禁用 chk选中取消            
        }
    } else {
        //减一 去掉最后一个无
        for (var m = 0; m < otherChbs.length - 1; m++) {
            $(otherChbs[m]).prop("disabled", false);//chk禁用取消
        }
    }
}
//点击radio 后面的选配价格变为只读 值清空 下一个radio变为不选中
function DingSuBiaoPeiRadClick(source) {
    //当前的选配价格变为只读
    $(source).closest("p").find("input[type=text]").prop("readonly", true).val("");
    //选配变为不选中
    $(source).next().prop("checked", false);
}
function DingSuXuanPeiRadClick(source) {
    //当前的选配价格变为可写
    $(source).closest("p").find("input[type=text]").prop("readonly", false);
    //标配变为不选中
    $(source).prev().prop("checked", false);
}

//点击选配 选配价格变为可写（控件摆放是有、无、选配）
function PriceEnable(source) {
    $(source).parent().find("input[type=text]").prop("readonly", false);
}
//点击选配 选配价格变为可写（控件摆放是有、无、选配）
function PriceEnableWithP(source) {
    $(source).closest("td").find("input[type=text]").prop("readonly", false);
}
//点击有或者无 选配价格变为只读（控件摆放是有、无、选配） 价格值清空
function PriceNotEnable(source) {
    $(source).parent().find("input[type=text]").prop("readonly", true);
    $(source).parent().find("input[type=text]").eq(0).val("");
}
//点击有或者无 选配价格变为只读（控件摆放是有、无、选配） 价格值清空
function PriceNotEnableWithP(source) {
    $(source).closest("td").find("input[type=text]").prop("readonly", true);
    $(source).closest("td").find("input[type=text]").eq(0).val("");
}
//点击radio 后面的选配价格变为只读 值清空 其他的选配价格变为可写
function PriceNotEnableOnly(source) {
    //其他的选配价格变为可写
    $(source).closest("td").find("input[type=text]").prop("readonly", false);
    //当前的选配价格变为只读
    $(source).next().prop("readonly", true);
    $(source).next().val("");
}
//点击checkbox 后面的选配价格变为只读 值清空 其他的选配价格如果前边的checkbox未选中 则变为可写
function PriceNotEnableOnlyChk(source) {
    $(source).closest("td").find("input[type=text]").each(function () {
        if ($(this).prev().prop("checked")) {
            $(this).prop("readonly", true);
            $(this).val("");
        } else {
            $(this).prop("readonly", false);
        }
    });
}
//点击radio无的时候 价格框变为可写
//demo: 1块屏 价格 2块屏 价格 无
function MultiPriceEnabled(source) {
    $(source).closest("td").find("input[type=text]").prop("readonly", false);
}

//统一对选配价格控件展示状态的处理
//1.包含在这几种特殊情况中的选配价格处理逻辑是：价格前的控件被选中 则价格只读   未选中 则价格可写 如果写了价格 控件只读
//2.有、无、选配这种形式 选配价格前的选配被选中价格才可填写 未选中选配 价格不可填写
function XuanPeiPriceReadOnly() {
    $("[name^=PidOption_]").each(function () {
        if ($(this).prev().prop("checked")) {
            $(this).prop("readonly", false);//可写
        } else {
            $(this).prop("readonly", true);//只读
        }
    });
}

//给array 添加contains 方法
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

//提交表单前需处理的一些事情
function handleForm() {
    //给车身颜色和内饰颜色赋值
    var cheShenYanSeTds = $("#trCheShen").children("td:gt(0)");
    $(cheShenYanSeTds).each(function () {
        var cheShenArray = [];
        $(this).find("input[type=checkbox]").each(function () {
            if ($(this).prop("checked")) {
                cheShenArray.push($(this).val());
            }
        });
        //给隐藏表单域赋值
        $(this).children(":hidden").eq(0).val(cheShenArray.join(","));
    });
    var neiShiYanSeTds = $("#trNeiShi").children("td:gt(0)");
    $(neiShiYanSeTds).each(function () {
        var neiShiArray = [];
        $(this).find("input[type=checkbox]").each(function () {
            if ($(this).prop("checked")) {
                neiShiArray.push($(this).val());
            }
        });
        //给隐藏表单域赋值
        $(this).children(":hidden").eq(0).val(neiShiArray.join(","));
    });

    var json655 = { "4x2": 5, "6x2": 6, "8x2": 7, "10x2": 8, "12x2": 9, "14x2": 10, "16x2": 11, "4x4": 12, "6x4": 13, "8x4": 14, "10x4": 15, "12x4": 16, "14x4": 17, "16x4": 18 };
    //驱动方式处理
    if ($("#displayType").val() == "卡车") {
        var quDongFangShiTds = $("#tr655").children("td:gt(0)");
        $(quDongFangShiTds).each(function () {
            var selectTags = $(this).find("select");
            var sel1 = selectTags.eq(0).val();
            var sel2 = selectTags.eq(1).val();
            if (!sel1 && !sel2) {
                $(this).children(":hidden").eq(0).val("");
                return true;
            }
            var key = sel1 + "x" + sel2;
            console.log(json655[key]);
            $(this).children(":hidden").eq(0).val(json655[key]);
        });
    }

    //最大扭矩
    var zuiDaNiuJuTds = $("#tr432").children("td:gt(0)");
    $(zuiDaNiuJuTds).each(function () {
        var zuiDaNiuJuValue = [];
        var inputTexts = $(this).find("input[type=text]");
        var sel1 = inputTexts.eq(1).val();
        var sel2 = inputTexts.eq(2).val();
        if (sel1) {
            zuiDaNiuJuValue.push(sel1);
        }
        if (sel2) {
            zuiDaNiuJuValue.push(sel2);
        }
        $(this).children(":hidden").eq(0).val(zuiDaNiuJuValue.join("-"));
    });
    //最大功率
    var zuiDaGongLvTds = $("#tr433").children("td:gt(0)");
    $(zuiDaGongLvTds).each(function () {
        var zuiDaGongLvValue = [];
        var inputTexts = $(this).find("input[type=text]");
        var sel1 = inputTexts.eq(2).val();
        var sel2 = inputTexts.eq(3).val();
        if (sel1) {
            zuiDaGongLvValue.push(sel1);
        }
        if (sel2) {
            zuiDaGongLvValue.push(sel2);
        }
        $(this).children(":hidden").eq(0).val(zuiDaGongLvValue.join("-"));
    });


    //保修政策
    var baoXiuZhengCeTds = $("#tr398").children("td:gt(0)");
    $(baoXiuZhengCeTds).each(function () {
        var baoXiuZhengCeValue = [];
        var childrenTd = $(this).children();
        var sel1 = childrenTd.eq(0).val();
        var sel2 = childrenTd.eq(1).val();
        if (!sel1 && !sel2) {
            $(this).children(":hidden").eq(0).val("");
            return true;
        }
        baoXiuZhengCeValue.push(sel1);
        baoXiuZhengCeValue.push(sel2);

        $(this).children(":hidden").eq(0).val(baoXiuZhengCeValue.join("或"));
    });
    
    //电池组质保
    var dianChiZuTds = $("#tr1006").children("td:gt(0)");
    $(dianChiZuTds).each(function () {
        var dianChiZuValue = [];
        var childrenTd = $(this).children();
        var sel1 = childrenTd.eq(0).val();
        var sel2 = childrenTd.eq(1).val();
        if (!sel1 && !sel2) {
            $(this).children(":hidden").eq(0).val("");
            return true;
        }
        dianChiZuValue.push(sel1);
        dianChiZuValue.push(sel2);

        $(this).children(":hidden").eq(0).val(dianChiZuValue.join(" "));
    });
    //前轮胎规格
    var qianLunTaiGuiGeTds = $("#tr729").children("td:gt(0)");
    $(qianLunTaiGuiGeTds).each(function () {
        var childrenTd = $(this).children();
        var sel1 = childrenTd.eq(0).val();
        var sel2 = childrenTd.eq(1).val();
        var sel3 = childrenTd.eq(2).val();
        var sel4 = childrenTd.eq(3).val();
        if (!sel1 && !sel2 && !sel3 && !sel4) {
            $(this).children(":hidden").eq(0).val("");
            return true;
        }
        var strResult = sel1 + "/" + sel2 + " " + sel3 + sel4;
        $(this).children(":hidden").eq(0).val(strResult);
    });
    //后轮胎规格
    var houLunTaiGuiGeTds = $("#tr721").children("td:gt(0)");
    $(houLunTaiGuiGeTds).each(function () {
        var childrenTd = $(this).children();
        var sel1 = childrenTd.eq(0).val();
        var sel2 = childrenTd.eq(1).val();
        var sel3 = childrenTd.eq(2).val();
        var sel4 = childrenTd.eq(3).val();
        if (!sel1 && !sel2 && !sel3 && !sel4) {
            $(this).children(":hidden").eq(0).val("");
            return true;
        }
        var strResult = sel1 + "/" + sel2 + " " + sel3 + sel4;
        $(this).children(":hidden").eq(0).val(strResult);
    });
    //快充 慢充
    var chongDianShiJianTds = $("#tr878").children("td:gt(0)");
    $(chongDianShiJianTds).each(function () {
        var kuaiChongValue = [];
        var inputTexts = $(this).find("input[type=text]");
        var input1 = inputTexts.eq(0).val();
        var input2 = inputTexts.eq(1).val();
        if (input1) {
            kuaiChongValue.push(input1);
        }
        if (input2) {
            kuaiChongValue.push(input2);
        }
        $(this).children(":hidden").eq(0).val(kuaiChongValue.join("-"));

        var manChongValue = [];
        var input3 = inputTexts.eq(2).val();
        var input4 = inputTexts.eq(3).val();
        if (input3) {
            manChongValue.push(input3);
        }
        if (input4) {
            manChongValue.push(input4);
        }
        $(this).children(":hidden").eq(1).val(manChongValue.join("-"));
    });


}


function HandleCheckBoxValues(propertyId) {
    var tds = $("#tr" + propertyId).children("td:gt(0)");
    $(tds).each(function () {
        var values = [];
        var checkBoxes = $(this).find(":checkbox");
        $(checkBoxes).each(function () {
            if ($(this).prop("checked")) {
                values.push($(this).val());
            }
        });
        $(this).children(":hidden").eq(0).val(values.join(","));
    });
}

function paiLiangJiSuan(source) {
    var value423 = $(source).val() / 1000;
    var result = value423.toFixed(1);
    $(source).next().val(result);
}


function maLiJiSuan(source) {
    var value791 = $(source).val();
    if (!value791) {
        return;
    }
    value791 = value791 * 1.36;
    var result = Math.round(value791);
    $(source).parent().next().val(result);
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//点击有2个checkbox的无
function XunHangMoShiWu(source) {
    if ($(source).prop("checked")) {
        $(source).parent().children().eq(0).prop("disabled", true);//chk禁用
        $(source).parent().children().eq(0).prop("checked", false);//chk选中取消
        $(source).parent().children().eq(2).prop("disabled", true);//chk禁用
        $(source).parent().children().eq(2).prop("checked", false);//chk选中取消
    } else {
        $(source).parent().children().eq(0).prop("disabled", false);//chk禁用取消
        $(source).parent().children().eq(2).prop("disabled", false);//chk禁用取消
    }
    $(source).parent().children().eq(1).prop("readonly", false);//text可写
    $(source).parent().children().eq(3).prop("readonly", false);//text可写
}


//点击有2个checkbox的无
function XunHangMoShiWuWithP(source) {
    if ($(source).prop("checked")) {
        $(source).closest("td").find("input[type=checkbox]").eq(0).prop("disabled", true);//chk禁用
        $(source).closest("td").find("input[type=checkbox]").eq(0).prop("checked", false);//chk选中取消
        $(source).closest("td").find("input[type=checkbox]").eq(1).prop("disabled", true);//chk禁用
        $(source).closest("td").find("input[type=checkbox]").eq(1).prop("checked", false);//chk选中取消
    } else {
        $(source).closest("td").find("input[type=checkbox]").eq(0).prop("disabled", false);//chk禁用取消
        $(source).closest("td").find("input[type=checkbox]").eq(1).prop("disabled", false);//chk禁用取消
    }
    $(source).closest("td").find("input[type=text]").eq(0).prop("readonly", false);//text可写
    $(source).closest("td").find("input[type=text]").eq(1).prop("readonly", false);//text可写
}






//点击checkbox无
function chaSuSuoWu(source) {
    if ($(source).prop("checked")) {
        $(source).closest("td").find("input[type=checkbox]").eq(0).prop("disabled", true);//chk禁用
        $(source).closest("td").find("input[type=checkbox]").eq(0).prop("checked", false);//chk选中取消
        $(source).closest("td").find("input[type=checkbox]").eq(1).prop("disabled", true);//chk禁用
        $(source).closest("td").find("input[type=checkbox]").eq(1).prop("checked", false);//chk选中取消
        $(source).closest("td").find("input[type=checkbox]").eq(2).prop("disabled", true);//chk禁用
        $(source).closest("td").find("input[type=checkbox]").eq(2).prop("checked", false);//chk选中取消
    } else {
        $(source).closest("td").find("input[type=checkbox]").eq(0).prop("disabled", false);//chk禁用取消
        $(source).closest("td").find("input[type=checkbox]").eq(1).prop("disabled", false);//chk禁用取消
        $(source).closest("td").find("input[type=checkbox]").eq(2).prop("disabled", false);//chk禁用取消
    }
}

//点击4个checkbox无
function ZiDongDaDengWu(source) {
    var inputs = $(source).closest("td").find("input");
    if ($(source).prop("checked")) {
        inputs.eq(0).prop("disabled", true);//chk禁用
        inputs.eq(0).prop("checked", false);//chk选中取消
        inputs.eq(2).prop("disabled", true);//chk禁用
        inputs.eq(2).prop("checked", false);//chk选中取消
        inputs.eq(4).prop("disabled", true);//chk禁用
        inputs.eq(4).prop("checked", false);//chk选中取消
        inputs.eq(6).prop("disabled", true);//chk禁用
        inputs.eq(6).prop("checked", false);//chk选中取消
    } else {
        inputs.eq(0).prop("disabled", false);//chk禁用取消
        inputs.eq(2).prop("disabled", false);//chk禁用取消
        inputs.eq(4).prop("disabled", false);//chk禁用取消
        inputs.eq(6).prop("disabled", false);//chk禁用取消
    }
    inputs.eq(1).prop("readonly", false);//text可写
    inputs.eq(3).prop("readonly", false);//text可写
    inputs.eq(5).prop("readonly", false);//text可写
    inputs.eq(7).prop("readonly", false);//text可写
}
//点击3个checkbox无
function YuanChengYaoKongWu(source) {
    var inputs = $(source).closest("td").find("input");
    if ($(source).prop("checked")) {
        inputs.eq(0).prop("disabled", true);//chk禁用
        inputs.eq(0).prop("checked", false);//chk选中取消
        inputs.eq(2).prop("disabled", true);//chk禁用
        inputs.eq(2).prop("checked", false);//chk选中取消
        inputs.eq(4).prop("disabled", true);//chk禁用
        inputs.eq(4).prop("checked", false);//chk选中取消
    } else {
        inputs.eq(0).prop("disabled", false);//chk禁用取消
        inputs.eq(2).prop("disabled", false);//chk禁用取消
        inputs.eq(4).prop("disabled", false);//chk禁用取消
    }
    inputs.eq(1).prop("readonly", false);//text可写
    inputs.eq(3).prop("readonly", false);//text可写
    inputs.eq(5).prop("readonly", false);//text可写
}
//点击5个checkbox无
function NeiShiCaiZhiWu(source) {
    var inputs = $(source).closest("td").find("input");
    if ($(source).prop("checked")) {
        inputs.eq(0).prop("disabled", true);//chk禁用
        inputs.eq(0).prop("checked", false);//chk选中取消
        inputs.eq(2).prop("disabled", true);//chk禁用
        inputs.eq(2).prop("checked", false);//chk选中取消
        inputs.eq(4).prop("disabled", true);//chk禁用
        inputs.eq(4).prop("checked", false);//chk选中取消
        inputs.eq(6).prop("disabled", true);//chk禁用
        inputs.eq(6).prop("checked", false);//chk选中取消
        inputs.eq(8).prop("disabled", true);//chk禁用
        inputs.eq(8).prop("checked", false);//chk选中取消
        inputs.eq(10).prop("disabled", true);//chk禁用
        inputs.eq(10).prop("checked", false);//chk选中取消
        inputs.eq(12).prop("disabled", true);//chk禁用
        inputs.eq(12).prop("checked", false);//chk选中取消
    } else {
        inputs.eq(0).prop("disabled", false);//chk禁用取消
        inputs.eq(2).prop("disabled", false);//chk禁用取消
        inputs.eq(4).prop("disabled", false);//chk禁用取消
        inputs.eq(6).prop("disabled", false);//chk禁用取消
        inputs.eq(8).prop("disabled", false);//chk禁用取消
        inputs.eq(10).prop("disabled", false);//chk禁用取消
        inputs.eq(12).prop("disabled", false);//chk禁用取消
    }
    inputs.eq(1).prop("readonly", false);//text可写
    inputs.eq(3).prop("readonly", false);//text可写
    inputs.eq(5).prop("readonly", false);//text可写
    inputs.eq(7).prop("readonly", false);//text可写
    inputs.eq(9).prop("readonly", false);//text可写
    inputs.eq(11).prop("readonly", false);//text可写
    inputs.eq(13).prop("readonly", false);//text可写
}


function DataValidate() {
    var result = true;
    //如果点击的是保存 预发布的车走预发布验证 正式的车走正式验证
    if (saveOrSubmit == "save") {
        var faBuIds = [];
        $('#win_data').html("");
        for (var i = 0; i < styleStatuses.length; i++) {
            if (styleStatuses[i].preStatus == "False") {
                //False:发布  True:预发布
                TiJiaoYanZheng(styleStatuses[i].id);
                faBuIds.push(styleStatuses[i].id);
            } else {
                SaveYanZheng(styleStatuses[i].id);
            }
        }
        if (faBuIds.length > 0) {
            var infoMessage = "车款" + faBuIds.join(",") + "参配信息曾经发布到前台,所以不可再被保存到预发布,点击继续该车款参配信息会直接更新到前台,其他车款信息会被保存在预发布模式。确定要执行此操作吗？";
            var que = confirm(infoMessage);
            if (que) {
                if ($('#win_data').children().length > 0) {
                    $("#frontPropertyDialog").panel("move", { top: $(document).scrollTop() + ($(window).height() - 300) * 0.5 });
                    $("#frontPropertyDialog").panel("move", { left: ($(window).width() - 500) * 0.5 });
                    $('#frontPropertyDialog .dialog-content').show();
                    $('#frontPropertyDialog').window('open');
                    return false;
                }
                return true;
            } else {
                return false;
            }
        } else {
            //都是预发布的车款
            if ($('#win_data').children().length > 0) {
                $("#frontPropertyDialog").panel("move", { top: $(document).scrollTop() + ($(window).height() - 300) * 0.5 });
                $("#frontPropertyDialog").panel("move", { left: ($(window).width() - 500) * 0.5 });
                $('#frontPropertyDialog .dialog-content').show();
                $('#frontPropertyDialog').window('open');
                return  false;
            }
            return true;
        }
        
    } else {
        //点击的是提交
        result = biTianData();
    }
    return result;
}


//验证是否有未填项
function biTianData() {    
    $('#win_data').html("");
    var styleIdsArray = $("#hidIds").val().split('-');    
    switch ($("#displayType").val()) {
        case "卡车":            
            var kaCheArray = $("#kaCheStr").val().split(',');
            for (var kaCheIndex = 0; kaCheIndex < kaCheArray.length; kaCheIndex++) {

                for (var i1 = 0; i1 < styleIdsArray.length; i1++) {
                    var tagName1 = $("[name^=Pid_" + kaCheArray[kaCheIndex] + "_" + styleIdsArray[i1] + "]");
                    var spKaCheValue = '';
                    //这些参配是非必填项 默认赋值即可
                    if (kaCheArray[kaCheIndex] == 414 || kaCheArray[kaCheIndex] == 465 || kaCheArray[kaCheIndex] == 466
                        || kaCheArray[kaCheIndex] == 1000 || kaCheArray[kaCheIndex] == 663 || kaCheArray[kaCheIndex] == 650 || kaCheArray[kaCheIndex] == 581 || kaCheArray[kaCheIndex] == 591
                        || kaCheArray[kaCheIndex] == 890 || kaCheArray[kaCheIndex] == 662 || kaCheArray[kaCheIndex] == 589 || kaCheArray[kaCheIndex] == 1039 || kaCheArray[kaCheIndex] == 1042) {
                        spKaCheValue = "默认值";
                    }
                    //如果是保修政策和驱动形式 需要取隐藏表单域中的值
                    else if (kaCheArray[kaCheIndex] == 398 || kaCheArray[kaCheIndex] == 655) {
                        spKaCheValue = $("#hid_" + kaCheArray[kaCheIndex] + "_" + styleIdsArray[i1] + "").val();
                    }
                    else
                    {
                        var tagName = $(tagName1)[0].tagName;
                        if (tagName == "INPUT") {
                            //如果是input的radio
                            if ($(tagName1)[0].type == "radio" || $(tagName1)[0].type == "checkbox") {

                                for (var i = 0; i < $(tagName1).length; i++) {
                                    if ($(tagName1).eq(i).prop("checked")) {
                                        spKaCheValue = $(tagName1).eq(i).val();
                                        break;
                                    }
                                }

                            }
                            else if ($(tagName1)[0].type == "text") {
                                spKaCheValue = $(tagName1).val();

                            }
                        }
                        else if (tagName == "SELECT") {
                            spKaCheValue = $(tagName1).val();
                        }
                    }
                    //最终
                    if (!spKaCheValue) {
                        $(tagName1).closest("td").css("background", "#FFCC66");
                        var spKaCheName = $(tagName1).closest("tr").children().eq(0).text();
                        $('#win_data').append("车型"+styleIdsArray[i1]+"属性" + spKaCheName + "<br>");
                    } else {
                        $(tagName1).closest("td").css("background", "");
                    }
                }
            }
            for (var i2 = 0; i2 < styleIdsArray.length; i2++) {
                //最大功率和最大扭矩的第一个文本框是否填值
                var zuiDaGongLvFirst = $("input[name=Pid_791_" + styleIdsArray[i2] + "]").parent().next().find("input[type=text]").eq(0).val();
                if (!zuiDaGongLvFirst) {
                    $('#win_data').append("车型" + styleIdsArray[i2] + "最大功率第一个文本框不许为空<br>");
                }
                var zuiDaNiuJuFirst = $("input[name=Pid_429_" + styleIdsArray[i2] + "]").parent().next().find("input[type=text]").eq(0).val();
                if (!zuiDaNiuJuFirst) {
                    $('#win_data').append("车型" + styleIdsArray[i2] + "最大扭矩第一个文本框不许为空<br>");
                }
				TextValidate(styleIdsArray[i2]);
            }
            break;
        case "客车":            
            var keCheArray = $("#keCheStr").val().split(',');
            for (var keCheIndex = 0; keCheIndex < keCheArray.length; keCheIndex++) {

                for (var i2 = 0; i2 < styleIdsArray.length; i2++) {
                    var tagName2 = $("[name^=Pid_" + keCheArray[keCheIndex] + "_" + styleIdsArray[i2] + "]");
                    var spKeCheValue = '';
                    //这些参配是非必填项 默认赋值即可
                    if (keCheArray[keCheIndex] == 414 || keCheArray[keCheIndex] == 465 || keCheArray[keCheIndex] == 466 || keCheArray[keCheIndex] == 1000
                        || keCheArray[keCheIndex] == 663 || keCheArray[keCheIndex] == 650 || keCheArray[keCheIndex] == 581 || keCheArray[keCheIndex] == 591
                        || keCheArray[keCheIndex] == 890 || keCheArray[keCheIndex] == 662 || keCheArray[keCheIndex] == 589 || keCheArray[keCheIndex] == 1039 || keCheArray[keCheIndex] == 1042) {
                        spKeCheValue = "默认值";
                    }
                    else if (keCheArray[keCheIndex] == 398) {
                        spKeCheValue = $("#hid_" + keCheArray[keCheIndex] + "_" + styleIdsArray[i2] + "").val();
                    } 
                    else {
                        var tagName = $(tagName2)[0].tagName;
                        if (tagName == "INPUT") {
                            //如果是input的radio
                            if ($(tagName2)[0].type == "radio" || $(tagName2)[0].type == "checkbox") {

                                for (var i = 0; i < $(tagName2).length; i++) {
                                    if ($(tagName2).eq(i).prop("checked")) {
                                        spKeCheValue = $(tagName2).eq(i).val();
                                        break;
                                    }
                                }

                            } else if ($(tagName2)[0].type == "text") {
                                spKeCheValue = $(tagName2).val();

                            }
                        } else if (tagName == "SELECT") {
                            spKeCheValue = $(tagName2).val();
                        }
                    }
                    //最终
                    if (!spKeCheValue) {
                        $(tagName2).closest("td").css("background", "#FFCC66");
                        var spKeCheName = $(tagName2).closest("tr").children().eq(0).text();
                        $('#win_data').append("车型" + styleIdsArray[i2] + "属性" + spKeCheName + "<br>");
                    } else {
                        $(tagName2).closest("td").css("background", "");
                    }
                }
            }
            for (var i2 = 0; i2 < styleIdsArray.length; i2++) {
                //最大功率和最大扭矩的第一个文本框是否填值
                var zuiDaGongLvFirst = $("input[name=Pid_791_" + styleIdsArray[i2] + "]").parent().next().find("input[type=text]").eq(0).val();
                if (!zuiDaGongLvFirst) {
                    $('#win_data').append("车型" + styleIdsArray[i2] + "最大功率第一个文本框不许为空<br>");
                }
                var zuiDaNiuJuFirst = $("input[name=Pid_429_" + styleIdsArray[i2] + "]").parent().next().find("input[type=text]").eq(0).val();
                if (!zuiDaNiuJuFirst) {
                    $('#win_data').append("车型" + styleIdsArray[i2] + "最大扭矩第一个文本框不许为空<br>");
                }
				TextValidate(styleIdsArray[i2]);
            }
            break;
        case "插电混动":            
            var chaDianArray = $("#chaDianHunDongStr").val().split(',');
            for (var chaDianIndex = 0; chaDianIndex < chaDianArray.length; chaDianIndex++) {

                for (var i2 = 0; i2 < styleIdsArray.length; i2++) {
                    var tagName2 = $("[name^=Pid_" + chaDianArray[chaDianIndex] + "_" + styleIdsArray[i2] + "]");
                    var spChaDianValue = '';
                    //这些参配是非必填项 默认赋值即可
                    if (chaDianArray[chaDianIndex] == 414 || chaDianArray[chaDianIndex] == 465 || chaDianArray[chaDianIndex] == 466 || chaDianArray[chaDianIndex] == 1000
                        || chaDianArray[chaDianIndex] == 1002 || chaDianArray[chaDianIndex] == 1003 || chaDianArray[chaDianIndex] == 1004 || chaDianArray[chaDianIndex] == 1005
                        || chaDianArray[chaDianIndex] == 1008 || chaDianArray[chaDianIndex] == 1009 || chaDianArray[chaDianIndex] == 870 || chaDianArray[chaDianIndex] == 872
                        || chaDianArray[chaDianIndex] == 663 || chaDianArray[chaDianIndex] == 650 || chaDianArray[chaDianIndex] == 581 || chaDianArray[chaDianIndex] == 591
                        || chaDianArray[chaDianIndex] == 890 || chaDianArray[chaDianIndex] == 662 || chaDianArray[chaDianIndex] == 589 || chaDianArray[chaDianIndex] == 876 || chaDianArray[chaDianIndex] == 1006
                        || chaDianArray[chaDianIndex] == 1039 || chaDianArray[chaDianIndex] == 1042) {
                        spChaDianValue = "默认值";
                    }
                    //如果是保修政策、前轮胎规格、后轮胎规格、电池组质保需要取隐藏表单域中的值
                    else if (chaDianArray[chaDianIndex] == 398 || chaDianArray[chaDianIndex] == 729 || chaDianArray[chaDianIndex] == 721
                         || chaDianArray[chaDianIndex] == 878 || chaDianArray[chaDianIndex] == 879)
                    {
                        spChaDianValue = $("#hid_" + chaDianArray[chaDianIndex] + "_" + styleIdsArray[i2] + "").val();
                    }
                    else {
                        var tagName = $(tagName2)[0].tagName;
                        if (tagName == "INPUT") {
                            //如果是input的radio
                            if ($(tagName2)[0].type == "radio" || $(tagName2)[0].type == "checkbox") {

                                for (var i = 0; i < $(tagName2).length; i++) {
                                    if ($(tagName2).eq(i).prop("checked")) {
                                        spChaDianValue = $(tagName2).eq(i).val();
                                        break;
                                    }
                                }

                            }
                            else if ($(tagName2)[0].type == "text") {
                                spChaDianValue = $(tagName2).val();

                            }
                        }
                        else if (tagName == "SELECT") {
                            spChaDianValue = $(tagName2).val();
                        }
                    }
                    
                    //最终
                    if (!spChaDianValue) {
                        $(tagName2).closest("td").css("background", "#FFCC66");
                        var spChaDianName = $(tagName2).closest("tr").children().eq(0).text();
                        $('#win_data').append("车型" + styleIdsArray[i2] + "属性" + spChaDianName + "<br>");
                    } else {
                        $(tagName2).closest("td").css("background", "");
                    }
                }
            }
			for (var i2 = 0; i2 < styleIdsArray.length; i2++) {
					//最大功率和最大扭矩的第一个文本框是否填值
                    var zuiDaGongLvFirst = $("input[name=Pid_791_" + styleIdsArray[i2] + "]").parent().next().find("input[type=text]").eq(0).val();
                    if (!zuiDaGongLvFirst) {
                        $('#win_data').append("车型" + styleIdsArray[i2] + "最大功率第一个文本框不许为空<br>");
                    }
                    var zuiDaNiuJuFirst = $("input[name=Pid_429_" + styleIdsArray[i2] + "]").parent().next().find("input[type=text]").eq(0).val();
                    if (!zuiDaNiuJuFirst) {
                        $('#win_data').append("车型" + styleIdsArray[i2] + "最大扭矩第一个文本框不许为空<br>");
                    }
					TextValidate(styleIdsArray[i2]);
			}            
            break;
        case "纯电":
            var cunDianArray = $("#chunDianStr").val().split(',');
            for (var cunDianIndex = 0; cunDianIndex < cunDianArray.length; cunDianIndex++) {

                for (var i2 = 0; i2 < styleIdsArray.length; i2++) {
                    var tagName2 = $("[name^=Pid_" + cunDianArray[cunDianIndex] + "_" + styleIdsArray[i2] + "]");
                    var spCunDianValue = '';
                    //这些参配是非必填项 默认赋值即可
                    if (cunDianArray[cunDianIndex] == 414
                        || cunDianArray[cunDianIndex] == 1002 || cunDianArray[cunDianIndex] == 1003 || cunDianArray[cunDianIndex] == 1004 || cunDianArray[cunDianIndex] == 1005
                        || cunDianArray[cunDianIndex] == 465 || cunDianArray[cunDianIndex] == 466 || cunDianArray[cunDianIndex] == 1000 || cunDianArray[cunDianIndex] == 663 || cunDianArray[cunDianIndex] == 650
                        || cunDianArray[cunDianIndex] == 581 || cunDianArray[cunDianIndex] == 591 || cunDianArray[cunDianIndex] == 1006 || cunDianArray[cunDianIndex] == 876 || cunDianArray[cunDianIndex] == 870
                        || cunDianArray[cunDianIndex] == 890 || cunDianArray[cunDianIndex] == 662 || cunDianArray[cunDianIndex] == 589 || cunDianArray[cunDianIndex] == 872
                        || cunDianArray[cunDianIndex] == 1039 || cunDianArray[cunDianIndex] == 1042) {
                        spCunDianValue = "默认值";
                    }
                    //如果是保修政策、前轮胎规格、后轮胎规格、电池组质保、快充、慢充需要取隐藏表单域中的值
                    else if (cunDianArray[cunDianIndex] == 398 || cunDianArray[cunDianIndex] == 729 || cunDianArray[cunDianIndex] == 721
                         || cunDianArray[cunDianIndex] == 878 || cunDianArray[cunDianIndex] == 879)
                    {
                        spCunDianValue = $("#hid_" + cunDianArray[cunDianIndex] + "_" + styleIdsArray[i2] + "").val();
                    }
                    else {
                        var tagName = $(tagName2)[0].tagName;
                        if (tagName == "INPUT") {
                            //如果是input的radio
                            if ($(tagName2)[0].type == "radio" || $(tagName2)[0].type == "checkbox") {

                                for (var i = 0; i < $(tagName2).length; i++) {
                                    if ($(tagName2).eq(i).prop("checked")) {
                                        spCunDianValue = $(tagName2).eq(i).val();
                                        break;
                                    }
                                }

                            } else if ($(tagName2)[0].type == "text") {
                                spCunDianValue = $(tagName2).val();

                            }
                        } else if (tagName == "SELECT") {
                            spCunDianValue = $(tagName2).val();
                        }
                    }
                    //最终
                    if (!spCunDianValue) {
                        $(tagName2).closest("td").css("background", "#FFCC66");
                        var spCunDianName = $(tagName2).closest("tr").children().eq(0).text();
                        $('#win_data').append("车型" + styleIdsArray[i2] + "属性" + spCunDianName + "<br>");
                    } else {
                        $(tagName2).closest("td").css("background", "");
                    }
                }
            }

			for (var i2 = 0; i2 < styleIdsArray.length; i2++) {
					TextValidate(styleIdsArray[i2]);
			}
			
            break;
        case "汽油柴油天然气":            
            var qiChaiTianRanqiArray = $("#qiChaiYouStr").val().split(',');
            for (var qiChaiTianRanqiIndex = 0; qiChaiTianRanqiIndex < qiChaiTianRanqiArray.length; qiChaiTianRanqiIndex++) {

                for (var i2 = 0; i2 < styleIdsArray.length; i2++) {
                    var tagName2 = $("[name^=Pid_" + qiChaiTianRanqiArray[qiChaiTianRanqiIndex] + "_" + styleIdsArray[i2] + "]");
                    var spQiChaiTianRanQiValue = '';
                    //这些参配是非必填项 默认赋值即可
                    if (qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 414 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 465
                        || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 466 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 1000 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 663
                        || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 650 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 581 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 591
                        || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 890 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 662 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 589
                        || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 1039 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 1042) {
                        spQiChaiTianRanQiValue = "默认值";
                    }
                    //如果是保修政策、前轮胎规格、后轮胎规格需要取隐藏表单域中的值
                    else if (qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 398 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 729 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 721)
                    {
                        spQiChaiTianRanQiValue = $("#hid_" + qiChaiTianRanqiArray[qiChaiTianRanqiIndex] + "_" + styleIdsArray[i2] + "").val();
                    }
                    else {
                        var tagName = $(tagName2)[0].tagName;
                        if (tagName == "INPUT") {
                            //如果是input的radio
                            if ($(tagName2)[0].type == "radio" || $(tagName2)[0].type == "checkbox") {

                                for (var i = 0; i < $(tagName2).length; i++) {
                                    if ($(tagName2).eq(i).prop("checked")) {
                                        spQiChaiTianRanQiValue = $(tagName2).eq(i).val();
                                        break;
                                    }
                                }

                            }
                            else if ($(tagName2)[0].type == "text") {
                                spQiChaiTianRanQiValue = $(tagName2).val();

                            }
                        }
                        else if (tagName == "SELECT") {
                            spQiChaiTianRanQiValue = $(tagName2).val();
                        }
                    }
                    //最终
                    if (!spQiChaiTianRanQiValue) {
                        $(tagName2).closest("td").css("background", "#FFCC66");
                        var spQiChaiTianRanQiName = $(tagName2).closest("tr").children().eq(0).text();
                        $('#win_data').append("车型" + styleIdsArray[i2] + "属性" + spQiChaiTianRanQiName + "<br>");
                    } else {
                        $(tagName2).closest("td").css("background", "");
                    }
                }
            }
            for (var i2 = 0; i2 < styleIdsArray.length; i2++) {
                //最大功率和最大扭矩的第一个文本框是否填值
                var zuiDaGongLvFirst = $("input[name=Pid_791_" + styleIdsArray[i2] + "]").parent().next().find("input[type=text]").eq(0).val();
                if (!zuiDaGongLvFirst) {
                    $('#win_data').append("车型" + styleIdsArray[i2] + "最大功率第一个文本框不许为空<br>");
                }
                var zuiDaNiuJuFirst = $("input[name=Pid_429_" + styleIdsArray[i2] + "]").parent().next().find("input[type=text]").eq(0).val();
                if (!zuiDaNiuJuFirst) {
                    $('#win_data').append("车型" + styleIdsArray[i2] + "最大扭矩第一个文本框不许为空<br>");
                }
				TextValidate(styleIdsArray[i2]);
            }

            break;
        case "油电混动":            
            var youDianArray = $("#youDianHunDongStr").val().split(',');
            for (var youDianIndex = 0; youDianIndex < youDianArray.length; youDianIndex++) {

                for (var i2 = 0; i2 < styleIdsArray.length; i2++) {
                    var tagName2 = $("[name^=Pid_" + youDianArray[youDianIndex] + "_" + styleIdsArray[i2] + "]");
                    var spYouDianValue = '';
                    //这些参配是非必填项 默认赋值即可(注：快充、慢充在油电混动类型中为非必填项)
                    if (youDianArray[youDianIndex] == 870 || youDianArray[youDianIndex] == 872 || youDianArray[youDianIndex] == 876
                        || youDianArray[youDianIndex] == 1008 || youDianArray[youDianIndex] == 1009
                        || youDianArray[youDianIndex] == 414 || youDianArray[youDianIndex] == 465 || youDianArray[youDianIndex] == 466 || youDianArray[youDianIndex] == 1000
                        || youDianArray[youDianIndex] == 663 || youDianArray[youDianIndex] == 650 || youDianArray[youDianIndex] == 581 || youDianArray[youDianIndex] == 591
                        || youDianArray[youDianIndex] == 890 || youDianArray[youDianIndex] == 662 || youDianArray[youDianIndex] == 589 || youDianArray[youDianIndex] == 1039
                        || youDianArray[youDianIndex] == 1042 || youDianArray[youDianIndex] == 878 || youDianArray[youDianIndex] == 879) {
                        spYouDianValue = "默认值";
                    }
                    //如果是保修政策、前轮胎规格、后轮胎规格需要取隐藏表单域中的值
                    else if (youDianArray[youDianIndex] == 398 || youDianArray[youDianIndex] == 729 || youDianArray[youDianIndex] == 721) {
                        spYouDianValue = $("#hid_" + youDianArray[youDianIndex] + "_" + styleIdsArray[i2] + "").val();
                    }
                    else {
                        var tagName = $(tagName2)[0].tagName;
                        if (tagName == "INPUT") {
                            //如果是input的radio
                            if ($(tagName2)[0].type == "radio" || $(tagName2)[0].type == "checkbox") {

                                for (var i = 0; i < $(tagName2).length; i++) {
                                    if ($(tagName2).eq(i).prop("checked")) {
                                        spYouDianValue = $(tagName2).eq(i).val();
                                        break;
                                    }
                                }

                            }
                            else if ($(tagName2)[0].type == "text") {
                                spYouDianValue = $(tagName2).val();

                            }
                        }
                        else if (tagName == "SELECT") {
                            spYouDianValue = $(tagName2).val();
                        }
                    }                    
                    //最终
                    if (!spYouDianValue) {
                        $(tagName2).closest("td").css("background", "#FFCC66");
                        var spYouDianName = $(tagName2).closest("tr").children().eq(0).text();
                        $('#win_data').append("车型" + styleIdsArray[i2] + "属性" + spYouDianName + "<br>");
                    } else {
                        $(tagName2).closest("td").css("background", "");
                    }
                    
                }
            }

			for (var i2 = 0; i2 < styleIdsArray.length; i2++) {
					TextValidate(styleIdsArray[i2]);
			}
    }    
    if ($('#win_data').children().length > 0) {
        $("#frontPropertyDialog").panel("move", { top: $(document).scrollTop() + ($(window).height() - 300) * 0.5 });
        $("#frontPropertyDialog").panel("move", { left: ($(window).width() - 500) * 0.5 });
        $('#frontPropertyDialog .dialog-content').show();
        $('#frontPropertyDialog').window('open');
        return false;
    }
    return true;
}




function TiJiaoYanZheng(styleId) {
    switch ($("#displayType").val()) {
        case "卡车":
            var kaCheArray = $("#kaCheStr").val().split(',');
            for (var kaCheIndex = 0; kaCheIndex < kaCheArray.length; kaCheIndex++) {
                var tagName1 = $("[name^=Pid_" + kaCheArray[kaCheIndex] + "_" + styleId + "]");
                var spKaCheValue = '';
                //这些参配是非必填项 默认赋值即可
                if (kaCheArray[kaCheIndex] == 414 || kaCheArray[kaCheIndex] == 465 || kaCheArray[kaCheIndex] == 466
                    || kaCheArray[kaCheIndex] == 1000 || kaCheArray[kaCheIndex] == 663 || kaCheArray[kaCheIndex] == 650 || kaCheArray[kaCheIndex] == 581 || kaCheArray[kaCheIndex] == 591
                    || kaCheArray[kaCheIndex] == 890 || kaCheArray[kaCheIndex] == 662 || kaCheArray[kaCheIndex] == 589 || kaCheArray[kaCheIndex] == 1039 || kaCheArray[kaCheIndex] == 1042) {
                    spKaCheValue = "默认值";
                }
                    //如果是保修政策和驱动形式 需要取隐藏表单域中的值
                else if (kaCheArray[kaCheIndex] == 398 || kaCheArray[kaCheIndex] == 655) {
                    spKaCheValue = $("#hid_" + kaCheArray[kaCheIndex] + "_" + styleId + "").val();
                }
                else {
                    var tagName = $(tagName1)[0].tagName;
                    if (tagName == "INPUT") {
                        //如果是input的radio
                        if ($(tagName1)[0].type == "radio" || $(tagName1)[0].type == "checkbox") {

                            for (var i = 0; i < $(tagName1).length; i++) {
                                if ($(tagName1).eq(i).prop("checked")) {
                                    spKaCheValue = $(tagName1).eq(i).val();
                                    break;
                                }
                            }

                        }
                        else if ($(tagName1)[0].type == "text") {
                            spKaCheValue = $(tagName1).val();

                        }
                    }
                    else if (tagName == "SELECT") {
                        spKaCheValue = $(tagName1).val();
                    }
                }
                //最终
                if (!spKaCheValue) {
                    $(tagName1).closest("td").css("background", "#FFCC66");
                    var spKaCheName = $(tagName1).closest("tr").children().eq(0).text();
                    $('#win_data').append("车型" + styleId + "属性" + spKaCheName + "<br>");
                } else {
                    $(tagName1).closest("td").css("background", "");
                }
            }
            //最大功率和最大扭矩的第一个文本框是否填值
            var zuiDaGongLvFirst = $("input[name=Pid_791_" + styleId + "]").parent().next().find("input[type=text]").eq(0).val();
            if (!zuiDaGongLvFirst) {
                $('#win_data').append("车型" + styleId + "最大功率第一个文本框不许为空<br>");
            }
            var zuiDaNiuJuFirst = $("input[name=Pid_429_" + styleId + "]").parent().next().find("input[type=text]").eq(0).val();
            if (!zuiDaNiuJuFirst) {
                $('#win_data').append("车型" + styleId + "最大扭矩第一个文本框不许为空<br>");
            }
            TextValidate(styleId);
            break;
        case "客车":
            var keCheArray = $("#keCheStr").val().split(',');
            for (var keCheIndex = 0; keCheIndex < keCheArray.length; keCheIndex++) {
                var tagName2 = $("[name^=Pid_" + keCheArray[keCheIndex] + "_" + styleId + "]");
                var spKeCheValue = '';
                //这些参配是非必填项 默认赋值即可
                if (keCheArray[keCheIndex] == 414 || keCheArray[keCheIndex] == 465 || keCheArray[keCheIndex] == 466 || keCheArray[keCheIndex] == 1000
                    || keCheArray[keCheIndex] == 663 || keCheArray[keCheIndex] == 650 || keCheArray[keCheIndex] == 581 || keCheArray[keCheIndex] == 591
                    || keCheArray[keCheIndex] == 890 || keCheArray[keCheIndex] == 662 || keCheArray[keCheIndex] == 589 || keCheArray[keCheIndex] == 1039 || keCheArray[keCheIndex] == 1042) {
                    spKeCheValue = "默认值";
                }
                else if (keCheArray[keCheIndex] == 398) {
                    spKeCheValue = $("#hid_" + keCheArray[keCheIndex] + "_" + styleId + "").val();
                }
                else {
                    var tagName = $(tagName2)[0].tagName;
                    if (tagName == "INPUT") {
                        //如果是input的radio
                        if ($(tagName2)[0].type == "radio" || $(tagName2)[0].type == "checkbox") {

                            for (var i = 0; i < $(tagName2).length; i++) {
                                if ($(tagName2).eq(i).prop("checked")) {
                                    spKeCheValue = $(tagName2).eq(i).val();
                                    break;
                                }
                            }

                        } else if ($(tagName2)[0].type == "text") {
                            spKeCheValue = $(tagName2).val();

                        }
                    } else if (tagName == "SELECT") {
                        spKeCheValue = $(tagName2).val();
                    }
                }
                //最终
                if (!spKeCheValue) {
                    $(tagName2).closest("td").css("background", "#FFCC66");
                    var spKeCheName = $(tagName2).closest("tr").children().eq(0).text();
                    $('#win_data').append("车型" + styleId + "属性" + spKeCheName + "<br>");
                } else {
                    $(tagName2).closest("td").css("background", "");
                }
            }
            //最大功率和最大扭矩的第一个文本框是否填值
            var zuiDaGongLvFirst = $("input[name=Pid_791_" + styleId + "]").parent().next().find("input[type=text]").eq(0).val();
            if (!zuiDaGongLvFirst) {
                $('#win_data').append("车型" + styleId + "最大功率第一个文本框不许为空<br>");
            }
            var zuiDaNiuJuFirst = $("input[name=Pid_429_" + styleId + "]").parent().next().find("input[type=text]").eq(0).val();
            if (!zuiDaNiuJuFirst) {
                $('#win_data').append("车型" + styleId + "最大扭矩第一个文本框不许为空<br>");
            }
            TextValidate(styleId);
            break;
        case "插电混动":
            var chaDianArray = $("#chaDianHunDongStr").val().split(',');
            for (var chaDianIndex = 0; chaDianIndex < chaDianArray.length; chaDianIndex++) {
                var tagName2 = $("[name^=Pid_" + chaDianArray[chaDianIndex] + "_" + styleId + "]");
                var spChaDianValue = '';
                //这些参配是非必填项 默认赋值即可
                if (chaDianArray[chaDianIndex] == 414 || chaDianArray[chaDianIndex] == 465 || chaDianArray[chaDianIndex] == 466 || chaDianArray[chaDianIndex] == 1000
                    || chaDianArray[chaDianIndex] == 1002 || chaDianArray[chaDianIndex] == 1003 || chaDianArray[chaDianIndex] == 1004 || chaDianArray[chaDianIndex] == 1005
                    || chaDianArray[chaDianIndex] == 1008 || chaDianArray[chaDianIndex] == 1009 || chaDianArray[chaDianIndex] == 870 || chaDianArray[chaDianIndex] == 872
                    || chaDianArray[chaDianIndex] == 663 || chaDianArray[chaDianIndex] == 650 || chaDianArray[chaDianIndex] == 581 || chaDianArray[chaDianIndex] == 591
                    || chaDianArray[chaDianIndex] == 890 || chaDianArray[chaDianIndex] == 662 || chaDianArray[chaDianIndex] == 589 || chaDianArray[chaDianIndex] == 876 || chaDianArray[chaDianIndex] == 1006
                    || chaDianArray[chaDianIndex] == 1039 || chaDianArray[chaDianIndex] == 1042) {
                    spChaDianValue = "默认值";
                }
                    //如果是保修政策、前轮胎规格、后轮胎规格、电池组质保需要取隐藏表单域中的值
                else if (chaDianArray[chaDianIndex] == 398 || chaDianArray[chaDianIndex] == 729 || chaDianArray[chaDianIndex] == 721
                     || chaDianArray[chaDianIndex] == 878 || chaDianArray[chaDianIndex] == 879) {
                    spChaDianValue = $("#hid_" + chaDianArray[chaDianIndex] + "_" + styleId + "").val();
                }
                else {
                    var tagName = $(tagName2)[0].tagName;
                    if (tagName == "INPUT") {
                        //如果是input的radio
                        if ($(tagName2)[0].type == "radio" || $(tagName2)[0].type == "checkbox") {

                            for (var i = 0; i < $(tagName2).length; i++) {
                                if ($(tagName2).eq(i).prop("checked")) {
                                    spChaDianValue = $(tagName2).eq(i).val();
                                    break;
                                }
                            }

                        }
                        else if ($(tagName2)[0].type == "text") {
                            spChaDianValue = $(tagName2).val();

                        }
                    }
                    else if (tagName == "SELECT") {
                        spChaDianValue = $(tagName2).val();
                    }
                }

                //最终
                if (!spChaDianValue) {
                    $(tagName2).closest("td").css("background", "#FFCC66");
                    var spChaDianName = $(tagName2).closest("tr").children().eq(0).text();
                    $('#win_data').append("车型" + styleId + "属性" + spChaDianName + "<br>");
                } else {
                    $(tagName2).closest("td").css("background", "");
                }
            }
            //最大功率和最大扭矩的第一个文本框是否填值
            var zuiDaGongLvFirst = $("input[name=Pid_791_" + styleId + "]").parent().next().find("input[type=text]").eq(0).val();
            if (!zuiDaGongLvFirst) {
                $('#win_data').append("车型" + styleId + "最大功率第一个文本框不许为空<br>");
            }
            var zuiDaNiuJuFirst = $("input[name=Pid_429_" + styleId + "]").parent().next().find("input[type=text]").eq(0).val();
            if (!zuiDaNiuJuFirst) {
                $('#win_data').append("车型" + styleId + "最大扭矩第一个文本框不许为空<br>");
            }
            TextValidate(styleId);
            break;
        case "纯电":
            var cunDianArray = $("#chunDianStr").val().split(',');
            for (var cunDianIndex = 0; cunDianIndex < cunDianArray.length; cunDianIndex++) {                
                var tagName2 = $("[name^=Pid_" + cunDianArray[cunDianIndex] + "_" + styleId + "]");
                var spCunDianValue = '';
                //这些参配是非必填项 默认赋值即可
                if (cunDianArray[cunDianIndex] == 414
                    || cunDianArray[cunDianIndex] == 1002 || cunDianArray[cunDianIndex] == 1003 || cunDianArray[cunDianIndex] == 1004 || cunDianArray[cunDianIndex] == 1005
                    || cunDianArray[cunDianIndex] == 465 || cunDianArray[cunDianIndex] == 466 || cunDianArray[cunDianIndex] == 1000 || cunDianArray[cunDianIndex] == 663 || cunDianArray[cunDianIndex] == 650
                    || cunDianArray[cunDianIndex] == 581 || cunDianArray[cunDianIndex] == 591 || cunDianArray[cunDianIndex] == 1006 || cunDianArray[cunDianIndex] == 876 || cunDianArray[cunDianIndex] == 870
                    || cunDianArray[cunDianIndex] == 890 || cunDianArray[cunDianIndex] == 662 || cunDianArray[cunDianIndex] == 589 || cunDianArray[cunDianIndex] == 872
                    || cunDianArray[cunDianIndex] == 1039 || cunDianArray[cunDianIndex] == 1042) {
                    spCunDianValue = "默认值";
                }
                    //如果是保修政策、前轮胎规格、后轮胎规格、电池组质保、快充、慢充需要取隐藏表单域中的值
                else if (cunDianArray[cunDianIndex] == 398 || cunDianArray[cunDianIndex] == 729 || cunDianArray[cunDianIndex] == 721
                     || cunDianArray[cunDianIndex] == 878 || cunDianArray[cunDianIndex] == 879) {
                    spCunDianValue = $("#hid_" + cunDianArray[cunDianIndex] + "_" + styleId + "").val();
                }
                else {
                    var tagName = $(tagName2)[0].tagName;
                    if (tagName == "INPUT") {
                        //如果是input的radio
                        if ($(tagName2)[0].type == "radio" || $(tagName2)[0].type == "checkbox") {

                            for (var i = 0; i < $(tagName2).length; i++) {
                                if ($(tagName2).eq(i).prop("checked")) {
                                    spCunDianValue = $(tagName2).eq(i).val();
                                    break;
                                }
                            }

                        } else if ($(tagName2)[0].type == "text") {
                            spCunDianValue = $(tagName2).val();

                        }
                    } else if (tagName == "SELECT") {
                        spCunDianValue = $(tagName2).val();
                    }
                }
                //最终
                if (!spCunDianValue) {
                    $(tagName2).closest("td").css("background", "#FFCC66");
                    var spCunDianName = $(tagName2).closest("tr").children().eq(0).text();
                    $('#win_data').append("车型" + styleId + "属性" + spCunDianName + "<br>");
                } else {
                    $(tagName2).closest("td").css("background", "");
                }
            }
            TextValidate(styleId);
            break;
        case "汽油柴油天然气":
            var qiChaiTianRanqiArray = $("#qiChaiYouStr").val().split(',');
            for (var qiChaiTianRanqiIndex = 0; qiChaiTianRanqiIndex < qiChaiTianRanqiArray.length; qiChaiTianRanqiIndex++) {
                var tagName2 = $("[name^=Pid_" + qiChaiTianRanqiArray[qiChaiTianRanqiIndex] + "_" + styleId + "]");
                var spQiChaiTianRanQiValue = '';
                //这些参配是非必填项 默认赋值即可
                if (qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 414 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 465
                    || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 466 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 1000 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 663
                    || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 650 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 581 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 591
                    || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 890 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 662 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 589
                    || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 1039 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 1042) {
                    spQiChaiTianRanQiValue = "默认值";
                }
                    //如果是保修政策、前轮胎规格、后轮胎规格需要取隐藏表单域中的值
                else if (qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 398 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 729 || qiChaiTianRanqiArray[qiChaiTianRanqiIndex] == 721) {
                    spQiChaiTianRanQiValue = $("#hid_" + qiChaiTianRanqiArray[qiChaiTianRanqiIndex] + "_" + styleId + "").val();
                }
                else {
                    var tagName = $(tagName2)[0].tagName;
                    if (tagName == "INPUT") {
                        //如果是input的radio
                        if ($(tagName2)[0].type == "radio" || $(tagName2)[0].type == "checkbox") {

                            for (var i = 0; i < $(tagName2).length; i++) {
                                if ($(tagName2).eq(i).prop("checked")) {
                                    spQiChaiTianRanQiValue = $(tagName2).eq(i).val();
                                    break;
                                }
                            }

                        }
                        else if ($(tagName2)[0].type == "text") {
                            spQiChaiTianRanQiValue = $(tagName2).val();

                        }
                    }
                    else if (tagName == "SELECT") {
                        spQiChaiTianRanQiValue = $(tagName2).val();
                    }
                }
                //最终
                if (!spQiChaiTianRanQiValue) {
                    $(tagName2).closest("td").css("background", "#FFCC66");
                    var spQiChaiTianRanQiName = $(tagName2).closest("tr").children().eq(0).text();
                    $('#win_data').append("车型" + styleId + "属性" + spQiChaiTianRanQiName + "<br>");
                } else {
                    $(tagName2).closest("td").css("background", "");
                }
            }
            //最大功率和最大扭矩的第一个文本框是否填值
            var zuiDaGongLvFirst = $("input[name=Pid_791_" + styleId + "]").parent().next().find("input[type=text]").eq(0).val();
            if (!zuiDaGongLvFirst) {
                $('#win_data').append("车型" + styleId + "最大功率第一个文本框不许为空<br>");
            }
            var zuiDaNiuJuFirst = $("input[name=Pid_429_" + styleId + "]").parent().next().find("input[type=text]").eq(0).val();
            if (!zuiDaNiuJuFirst) {
                $('#win_data').append("车型" + styleId + "最大扭矩第一个文本框不许为空<br>");
            }
            TextValidate(styleId);

            break;
        case "油电混动":
            var youDianArray = $("#youDianHunDongStr").val().split(',');
            for (var youDianIndex = 0; youDianIndex < youDianArray.length; youDianIndex++) {
                var tagName2 = $("[name^=Pid_" + youDianArray[youDianIndex] + "_" + styleId + "]");
                var spYouDianValue = '';
                //这些参配是非必填项 默认赋值即可(注：快充、慢充在油电混动类型中为非必填项)
                if (youDianArray[youDianIndex] == 870 || youDianArray[youDianIndex] == 872 || youDianArray[youDianIndex] == 876
                    || youDianArray[youDianIndex] == 1008 || youDianArray[youDianIndex] == 1009
                    || youDianArray[youDianIndex] == 414 || youDianArray[youDianIndex] == 465 || youDianArray[youDianIndex] == 466 || youDianArray[youDianIndex] == 1000
                    || youDianArray[youDianIndex] == 663 || youDianArray[youDianIndex] == 650 || youDianArray[youDianIndex] == 581 || youDianArray[youDianIndex] == 591
                    || youDianArray[youDianIndex] == 890 || youDianArray[youDianIndex] == 662 || youDianArray[youDianIndex] == 589 || youDianArray[youDianIndex] == 1039
                    || youDianArray[youDianIndex] == 1042 || youDianArray[youDianIndex] == 878 || youDianArray[youDianIndex] == 879) {
                    spYouDianValue = "默认值";
                }
                    //如果是保修政策、前轮胎规格、后轮胎规格需要取隐藏表单域中的值
                else if (youDianArray[youDianIndex] == 398 || youDianArray[youDianIndex] == 729 || youDianArray[youDianIndex] == 721) {
                    spYouDianValue = $("#hid_" + youDianArray[youDianIndex] + "_" + styleId + "").val();
                }
                else {
                    var tagName = $(tagName2)[0].tagName;
                    if (tagName == "INPUT") {
                        //如果是input的radio
                        if ($(tagName2)[0].type == "radio" || $(tagName2)[0].type == "checkbox") {

                            for (var i = 0; i < $(tagName2).length; i++) {
                                if ($(tagName2).eq(i).prop("checked")) {
                                    spYouDianValue = $(tagName2).eq(i).val();
                                    break;
                                }
                            }

                        }
                        else if ($(tagName2)[0].type == "text") {
                            spYouDianValue = $(tagName2).val();

                        }
                    }
                    else if (tagName == "SELECT") {
                        spYouDianValue = $(tagName2).val();
                    }
                }
                //最终
                if (!spYouDianValue) {
                    $(tagName2).closest("td").css("background", "#FFCC66");
                    var spYouDianName = $(tagName2).closest("tr").children().eq(0).text();
                    $('#win_data').append("车型" + styleId + "属性" + spYouDianName + "<br>");
                } else {
                    $(tagName2).closest("td").css("background", "");
                }
            }
            TextValidate(styleId);
    }    
}


function SaveYanZheng(styleId) {
    switch ($("#displayType").val()) {
        case "卡车":            
            TextValidate(styleId);
            break;
        case "客车":
            TextValidate(styleId);
            break;
        case "插电混动":
            TextValidate(styleId);
            break;
        case "纯电":
            TextValidate(styleId);
            break;
        case "汽油柴油天然气":
            TextValidate(styleId);
            break;
        case "油电混动":
            TextValidate(styleId);
    }
}


var s_l = '<span class="yidong s_l s_no"><b><a href="javascript:void(null)"><<</a></b></span>';
var s_r = '<span class="yidong s_r s_no"><b><a href="javascript:void(null)">>></a></b></span>';

$("span.s_l").live("click", function () {
    var me = $(this);
    var td = $(this).closest("td");
    var table = $(".table_dbpx");
    var styleCount = $("#hidStyleCount").val();
    if (styleCount < 0) {
        styleCount = 5;
    }
    var index = td.index();
    table.each(function () {
        var prevTd;
        if (index == 2) {
            prevTd = $(this).find("td:eq(1)"); //td.prev();
            prevTd.find(".p_an").prepend(me.clone(true));
            $(this).find("td:eq(2) .p_an span:first").remove();
        }
        if (index == styleCount) {
            $(this).find("td").eq(index).find(".p_an").append(s_r);
            prevTd = $(this).find("td").eq(index - 1);
            prevTd.find(".s_r").remove();
        }
        switchCol(index, index - 1, $(this));
    });
});

$("span.s_r").live("click", function () {
    var td = $(this).closest("td");
    var table = $(".table_dbpx");//2个table
    var index = td.index();
    var styleCount = $("#hidStyleCount").val();
    if (styleCount < 0) {
        styleCount = 5;
    }
    table.each(function () {
        if (index == 1) {
            $(this).find("td:eq(1) .p_an").prepend(s_l);
            $(this).find("td:eq(2) .p_an span:first").remove();
        }
        if (index == styleCount - 1) {
            $(this).find("td:eq(" + (index + 1) + ") .p_an").append(s_r);
            $(this).find("td:eq(" + index + ") .p_an span:last").remove();
        }
        switchCol(index, index + 1, $(this));
    });

});

function switchCol(source, target, objTable) {
    objTable.find("tr").each(function () {
        if (source > target) {
            $('td:eq(' + target + ')', this).before($('td:eq(' + source + ')', this));
        }
        else {
            $('td:eq(' + target + ')', this).after($('td:eq(' + source + ')', this));
        }
    });
}


//文本框的整数和正则验证
function TextValidate(styleId) {
    //验证输入框数据
    //1.长
    if ($("[name=Pid_588_"+ styleId +"]").length > 0) {
        var value588 = $("[name=Pid_588_"+ styleId +"]").val();
        if (value588) {
            if (!isNumber(value588)) {
                $('#win_data').append("车款"+ styleId +"长的值必须为整数<br>");
            }
        }

    }
    //2.宽
    if ($("[name=Pid_593_"+ styleId +"]").length > 0) {
        var value593 = $("[name=Pid_593_"+ styleId +"]").val();
        if (value593) {
            if (!isNumber(value593)) {
                $('#win_data').append("车款"+ styleId +"宽的值必须为整数<br>");
            }
        }

    }
    //3.高
    if ($("[name=Pid_586_"+ styleId +"]").length > 0) {
        var value586 = $("[name=Pid_586_"+ styleId +"]").val();
        if (value586) {
            if (!isNumber(value586)) {
                $('#win_data').append("车款"+ styleId +"高的值必须为整数<br>");
            }
        }

    }
    //4.轴距
    if ($("[name=Pid_592_"+ styleId +"]").length > 0) {
        var value592 = $("[name=Pid_592_" + styleId + "]").val();
        if (value592) {
            if (!isNumber(value592)) {
                $('#win_data').append("车款" + styleId + "轴距的值必须为整数<br>");
            }
        }

    }
    //5.整备质量
    if ($("[name=Pid_669_" + styleId + "]").length > 0) {
        var value669 = $("[name=Pid_669_"+styleId +"]").val();
        if (value669) {
            if (!isNumber(value669)) {
                $('#win_data').append("车款" + styleId + "整备质量的值必须为整数<br>");
            }
        }

    }
    //6.行李厢容积
    if ($("[name=Pid_465_"+styleId +"]").length > 0) {
        var value465 = $("[name=Pid_465_"+styleId +"]").val();
        if (value465) {
            if (!isNumber(value465)) {
                $('#win_data').append("车款"+styleId +"行李厢容积的值必须为整数<br>");
            }
        }

    }
    //7.行李厢拓展容积[L]
    if ($("[name=Pid_466_" + styleId + "]").length > 0) {
        var value466 = $("[name=Pid_466_"+styleId +"]").val();
        if (value466) {
            if (!isNumber(value466)) {
                $('#win_data').append("车款" + styleId + "行李厢拓展容积的值必须为整数<br>");
            }
        }

    }
    //8.行李厢最大拓展容积[L]
    if ($("[name=Pid_1000_" + styleId + "]").length > 0) {
        var value1000 = $("[name=Pid_1000_"+styleId +"]").val();
        if (value1000) {
            if (!isNumber(value1000)) {
                $('#win_data').append("车款" + styleId + "行李厢最大拓展容积的值必须为整数<br>");
            }
        }

    }
    //9.油箱容积
    if ($("[name=Pid_576_" + styleId + "]").length > 0) {
        var value576 = $("[name=Pid_576_" + styleId + "]").val();
        if (value576) {
            if (!isNumber(value576)) {
                $('#win_data').append("车款" + styleId + "油箱容积的值必须为整数<br>");
            }
        }

    }
    //10.载重质量
    if ($("[name=Pid_974_"+styleId +"]").length > 0) {
        var value974 = $("[name=Pid_974_" + styleId + "]").val();
        if (value974) {
            if (!isNumber(value974)) {
                $('#win_data').append("车款" + styleId + "载重质量的值必须为整数<br>");
            }
        }

    }
    //11.满载质量
    if ($("[name=Pid_668_" + styleId + "]").length > 0) {
        var value668 = $("[name=Pid_668_"+styleId +"]").val();
        if (value668) {
            if (!isNumber(value668)) {
                $('#win_data').append("车款" + styleId + "满载质量的值必须为整数<br>");
            }
        }

    }
    //12.货箱长
    if ($("[name=Pid_966_" + styleId + "]").length > 0) {
        var value966 = $("[name=Pid_966_" + styleId + "]").val();
        if (value966) {
            if (!isNumber(value966)) {
                $('#win_data').append("车款" + styleId + "货箱长的值必须为整数<br>");
            }
        }

    }
    //13.货箱宽
    if ($("[name=Pid_969_" + styleId + "]").length > 0) {
        var value969 = $("[name=Pid_969_" + styleId + "]").val();
        if (value969) {
            if (!isNumber(value969)) {
                $('#win_data').append("车款" + styleId + "货箱宽的值必须为整数<br>");
            }
        }

    }
    //14.货箱高
    if ($("[name=Pid_970_"+styleId +"]").length > 0) {
        var value970 = $("[name=Pid_970_"+styleId +"]").val();
        if (value970) {
            if (!isNumber(value970)) {
                $('#win_data').append("车款" + styleId + "货箱高的值必须为整数<br>");
            }
        }

    }
    //15.最小转弯直径
    if ($("[name=Pid_1039_"+styleId +"]").length > 0) {
        var value1039 = $("[name=Pid_1039_"+styleId +"]").val();
        if (value1039) {
            var patt = /^[0-9]+\.[0-9]$/;
            var result = patt.test(value1039);
            if (!result) {
                $('#win_data').append("车款" + styleId + "最小转弯直径只能填小数点一位<br>");
            }
        }
    }
    //16.最小离地间隙
    if ($("[name=Pid_589_"+styleId +"]").length > 0) {
        var value589 = $("[name=Pid_589_" + styleId + "]").val();
        if (value589) {
            if (!isNumber(value589)) {
                $('#win_data').append("车款" + styleId + "最小离地间隙的值必须为整数<br>");
            }
        }

    }
    //17.排气量ml
    if ($("[name=Pid_423_" + styleId + "]").length > 0) {
        var value423 = $("[name=Pid_423_"+styleId +"]").val();
        if (value423) {
            if (!isNumber(value423)) {
                $('#win_data').append("车款" + styleId + "排气量必须为整数<br>");
            }
        }

    }

    //18.最大功率
    if ($("[name=Pid_430_" + styleId + "]").length > 0) {
        var value430 = $("[name=Pid_430_" + styleId + "]").val();
        if (value430) {
            if (!isNumber(value430)) {
                $('#win_data').append("车款" + styleId + "最大功率必须为整数<br>");
            }
        }

    }

    //19.最大功率转速1
    if ($("#rpm1_"+ styleId +"").length > 0) {
        var rpm1Value = $("#rpm1").val();
        if (rpm1Value) {
            if (!isNumber(rpm1Value)) {
                $('#win_data').append("车款" + styleId + "最大功率转速必须为整数<br>");
            }
        }

    }

    //20.最大功率转速2
    if ($("#rpm2_"+ styleId +"").length > 0) {
        var rpm2Value = $("#rpm2").val();
        if (rpm2Value) {
            if (!isNumber(rpm2Value)) {
                $('#win_data').append("车款" + styleId + "最大功率转速必须为整数<br>");
            }
        }

    }



    //21.最大扭矩
    if ($("[name=Pid_429_" + styleId + "]").length > 0) {
        var value429 = $("[name=Pid_429_"+styleId +"]").val();
        if (value429) {
            if (!isNumber(value429)) {
                $('#win_data').append("车款" + styleId + "最大扭矩必须为整数<br>");
            }
        }

    }


    //22.最大扭矩转速1
    if ($("#niuJu1_"+ styleId +"").length > 0) {
        var niuJu1Value = $("#niuJu1").val();
        if (niuJu1Value) {
            if (!isNumber(niuJu1Value)) {
                $('#win_data').append("车款" + styleId + "最大扭矩转速必须为整数<br>");
            }
        }

    }

    //23.最大扭矩转速2
    if ($("#niuJu2_"+ styleId +"").length > 0) {
        var niuJu2Value = $("#niuJu2").val();
        if (niuJu2Value) {
            if (!isNumber(niuJu2Value)) {
                $('#win_data').append("车款" + styleId + "最大扭矩转速必须为整数<br>");
            }
        }

    }


    //24.压缩比
    if ($("[name=Pid_414_" + styleId + "]").length > 0) {
        var value414 = $("[name=Pid_414_" + styleId + "]").val();
        if (value414) {
            var patt = /^[0-9]+\.[\0-9]$/;
            var result = patt.test(value414);
            if (!result) {
                $('#win_data').append("车款" + styleId + "压缩比精确到小数点后一位<br>");
            }
        }

    }
    //25.最高车速
    if ($("[name=Pid_663_" + styleId + "]").length > 0) {
        var value663 = $("[name=Pid_663_" + styleId + "]").val();
        if (value663) {
            if (!isNumber(value663)) {
                $('#win_data').append("车款" + styleId + "最高车速必须为整数<br>");
            }
        }

    }
    //26.0-100公里加速时间
    if ($("[name=Pid_650_" + styleId + "]").length > 0) {
        var value650 = $("[name=Pid_650_" + styleId + "]").val();
        if (value650) {
            var patt = /^[0-9]+\.[0-9]$/;
            var result = patt.test(value650);
            if (!result) {
                $('#win_data').append("车款" + styleId + "0-100公里加速时间精确到小数点后一位<br>");
            }
        }

    }


    //27.混合工况油耗
    if ($("[name=Pid_782_"+styleId +"]").length > 0) {
        var value782 = $("[name=Pid_782_" + styleId + "]").val();
        if (value782) {
            var patt = /^[0-9]+\.[0-9]$/;
            var result = patt.test(value782);
            if (!result) {
                $('#win_data').append("车款" + styleId + "混合工况油耗精确到小数点后一位<br>");
            }
        }

    }


    //28.电动机总功率
    if ($("[name=Pid_870_" + styleId + "]").length > 0) {
        var value870 = $("[name=Pid_870_" + styleId + "]").val();
        if (value870) {
            if (!isNumber(value870)) {
                $('#win_data').append("车款" + styleId + "电动机总功率值必须为整数<br>");
            }
        }
    }
    //29.电动机总扭矩
    if ($("[name=Pid_872_" + styleId + "]").length > 0) {
        var value872 = $("[name=Pid_872_" + styleId + "]").val();
        if (value872) {
            if (!isNumber(value872)) {
                $('#win_data').append("车款" + styleId + "电动机总扭矩值必须为整数<br>");
            }
        }
    }
    //30.前电动机最大功率
    if ($("[name=Pid_1002_" + styleId + "]").length > 0) {
        var value1002 = $("[name=Pid_1002_" + styleId + "]").val();
        if (value1002) {
            if (!isNumber(value1002)) {
                $('#win_data').append("车款" + styleId + "前电动机最大功率必须为整数<br>");
            }
        }
    }
    //31.前电动机最大扭矩
    if ($("[name=Pid_1004_" + styleId + "]").length > 0) {
        var value1004 = $("[name=Pid_1004_" + styleId + "]").val();
        if (value1004) {
            if (!isNumber(value1004)) {
                $('#win_data').append("车款" + styleId + "前电动机最大扭矩必须为整数<br>");
            }
        }
    }
    //32.后电动机最大功率
    if ($("[name=Pid_1003_"+styleId +"]").length > 0) {
        var value1003 = $("[name=Pid_1003_" + styleId + "]").val();
        if (value1003) {
            if (!isNumber(value1003)) {
                $('#win_data').append("车款" + styleId + "后电动机最大功率必须为整数<br>");
            }
        }
    }
    //33.后电动机最大扭矩
    if ($("[name=Pid_1005_" + styleId + "]").length > 0) {
        var value1005 = $("[name=Pid_1005_" + styleId + "]").val();
        if (value1005) {
            if (!isNumber(value1005)) {
                $('#win_data').append("车款" + styleId + "后电动机最大扭矩必须为整数<br>");
            }
        }
    }
    //34.电池容量
    if ($("[name=Pid_876_" + styleId + "]").length > 0) {
        var value876 = $("[name=Pid_876_" + styleId + "]").val();
        if (value876) {            
            if (!isNumber(value876)) {
                $('#win_data').append("车款" + styleId + "电池容量精确到整数<br>");
            }
        }
    }
    //35.电池充电时间快充
    if ($("[name=Pid_878_" + styleId + "]").length > 0) {
        var value878 = $("[name=Pid_878_"+styleId +"]").val();
        if (value878) {
            var value878Array = value878.split('-');
            var patt = /^[0-9]+\.[0-9]$/;
            var result = patt.test(value878Array[0]);
            if (!result) {
                $('#win_data').append("车款" + styleId + "电池充电时间快充精确到小数点后一位<br>");
            } else {
                if (value878Array[1]) {
                    var resultSecond = patt.test(value878Array[1]);
                    if (!resultSecond) {
                        $('#win_data').append("车款" + styleId + "电池充电时间快充精确到小数点后一位<br>");
                    }
                }
            }
        }
    }
    //36.电池充电时间慢充
    if ($("[name=Pid_879_" + styleId + "]").length > 0) {
        var value879 = $("[name=Pid_879_" + styleId + "]").val();
        if (value879) {
            var value879Array = value879.split('-');
            var patt = /^[0-9]+\.[0-9]$/;
            var result = patt.test(value879Array[0]);
            if (!result) {
                $('#win_data').append("车款" + styleId + "电池充电时间慢充精确到小数点后一位<br>");
            } else {
                if (value879Array[1]) {
                    var resultSecond = patt.test(value879Array[1]);
                    if (!resultSecond) {
                        $('#win_data').append("车款" + styleId + "电池充电时间慢充精确到小数点后一位<br>");
                    }
                }
            }
        }
    }
    //37.耗电量
    if ($("[name=Pid_868_" + styleId + "]").length > 0) {
        var value868 = $("[name=Pid_868_" + styleId + "]").val();
        if (value868) {
            var patt = /^[0-9]+(\.[1-9])?$/;
            var result = patt.test(value868);
            if (!result) {
                $('#win_data').append("车款"+styleId +"耗电量精确到整数或小数点后一位<br>");
            }
        }
    }
    //38.最大续航里程
    if ($("[name=Pid_883_" + styleId + "]").length > 0) {
        var value883 = $("[name=Pid_883_" + styleId + "]").val();
        if (value883) {
            if (!isNumber(value883)) {
                $('#win_data').append("车款" + styleId + "最大续航里程必须为整数<br>");
            }
        }

    }

    //39.系统综合功率
    if ($("[name=Pid_1008_" + styleId + "]").length > 0) {
        var value1008 = $("[name=Pid_1008_" + styleId + "]").val();
        if (value1008) {
            if (!isNumber(value1008)) {
                $('#win_data').append("车款" + styleId + "系统综合功率必须为整数<br>");
            }
        }

    }
    //40.系统综合扭矩
    if ($("[name=Pid_1009_"+ styleId +"]").length > 0) {
        var value1009 = $("[name=Pid_1009_" + styleId + "]").val();
        if (value1009) {
            if (!isNumber(value1009)) {
                $('#win_data').append("车款" + styleId + "系统综合扭矩必须为整数<br>");
            }
        }

    }
    //41.前桥允许载荷
    if ($("[name=Pid_1015_" + styleId + "]").length > 0) {
        var value1015 = $("[name=Pid_1015_" + styleId + "]").val();
        if (value1015) {
            if (!isNumber(value1015)) {
                $('#win_data').append("车款" + styleId + "前桥允许载荷必须为整数<br>");
            }
        }

    }
    //42.后桥允许载荷
    if ($("[name=Pid_1016_" + styleId + "]").length > 0) {
        var value1016 = $("[name=Pid_1016_" + styleId + "]").val();
        if (value1016) {
            if (!isNumber(value1016)) {
                $('#win_data').append("车款" + styleId + "后桥允许载荷必须为整数<br>");
            }
        }

    }
    //43.接近角
    if ($("[name=Pid_591_" + styleId + "]").length > 0) {
        var value591 = $("[name=Pid_591_" + styleId + "]").val();
        if (value591) {            
            if (!isNumber(value591)) {
                $('#win_data').append("车款" + styleId + "接近角精确到整数<br>");
            }
        }
    }
    //44.离去角
    if ($("[name=Pid_581_" + styleId + "]").length > 0) {
        var value581 = $("[name=Pid_581_" + styleId + "]").val();
        if (value581) {            
            if (!isNumber(value581)) {
                $('#win_data').append("车款" + styleId + "离去角精确到整数<br>");
            }
        }
    }
    //45.通过角
    if ($("[name=Pid_890_" + styleId + "]").length > 0) {
        var value890 = $("[name=Pid_890_" + styleId + "]").val();
        if (value890) {            
            if (!isNumber(value890)) {
                $('#win_data').append("车款" + styleId + "通过角精确到整数<br>");
            }
        }
    }
    //46.最大涉水深度
    if ($("[name=Pid_662_" + styleId + "]").length > 0) {
        var value662 = $("[name=Pid_662_" + styleId + "]").val();
        if (value662) {
            if (!isNumber(value662)) {
                $('#win_data').append("车款" + styleId + "最大涉水深度必须为整数<br>");
            }
        }

    }
    //47.新能源国家补贴
    if ($("[name=Pid_997_" + styleId + "]").length > 0) {
        var value997 = $("[name=Pid_997_" + styleId + "]").val();
        if (value997) {
            if (value997!=0) {
                var patt = /^[0-9]+\.[0-9][0-9]?$/;
                var result = patt.test(value997);
                if (!result) {
                    $('#win_data').append("车款" + styleId + "新能源汽车国家补贴精确到小数点后一位或两位，也可填0<br>");
                }
            }            
        }
    }
}

function isNumber(s) {
    //var regu = "^[0-9]*$";
    //var re = new RegExp(regu);
    var re = /^[0-9]*$/;
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
}