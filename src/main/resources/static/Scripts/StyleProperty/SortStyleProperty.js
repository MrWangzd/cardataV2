/// <reference path="../jquery-1.8.3-vsdoc.js" />

$(document).ready(function () {
    var up1 = '<p href="javascript:void(0)"  class="arrow_up up1"></p>';
    var up5 = '<p href="javascript:void(0)"  class="up5" >5</p>';
    var top = '<p href="javascript:void(0)"  class="top">顶</p>';
    var down1 = '<p href="javascript:void(0)"  class="arrow_down down1"></p>';
    var down5 = ' <p href="javascript:void(0)"  class="down5" >5</p>';
    var bottom = '<p href="javascript:void(0)"  class="bottom">底</p>';
    //initTd();
    $(".span_an").bind("click", function () {
        var index = $(this).closest("tr").index();
        var totalCount = $(this).closest("table").find("tr").length;
        var last = totalCount - index - 1;
        var ctrl = new Array();
        if (index == 0) {
            if (last > 0) {
                ctrl.push(down1);

                ctrl.push(bottom);
                if (last >= 5) {
                    ctrl.push(down5);
                }
            }
        } else if (index <= 4) {
            ctrl.push(up1);
            ctrl.push(top);
            if (last > 0) {
                ctrl.push('<br class="clear" />');
                ctrl.push(down1);
                ctrl.push(bottom);
                if (last >= 5) {
                    ctrl.push(down5);
                }
            }
        } else {
            ctrl.push(up1);
            ctrl.push(top);
            ctrl.push(up5);
            if (last > 0) {
                ctrl.push(down1);

                ctrl.push(bottom);
                if (last >= 5) {
                    ctrl.push(down5);
                }
            }
        }
        ctrl.push('<br class="clear" />');
        $(this).hide().next().append(ctrl.join("")).show();
    });

    $(".up1").live("click", function() {
        var $trTag = $(this).closest("tr");
        $trTag.fadeOut();
        $trTag.prev().before($trTag);
        SetOrder($trTag);
    });
    $(".down1").live("click", function () {
        var $trTag = $(this).closest("tr");
        $trTag.fadeOut();
        $trTag.next().after($trTag);
        SetOrder($trTag);
    });
    $(".up5").live("click", function () {
        var $trTag = $(this).closest("tr");
        $trTag.fadeOut();
        $trTag.prev().prev().prev().prev().prev().before($trTag);
        SetOrder($trTag);
    });
    $(".down5").live("click", function () {
        var $trTag = $(this).closest("tr");
        $trTag.fadeOut();
        $trTag.next().next().next().next().next().after($trTag);
        SetOrder($trTag);
    });
    $(".top").live("click", function() {
        var $trTag = $(this).closest("tr");
        $trTag.fadeOut();
        $(this).closest("table").prepend($trTag);
        SetOrder($trTag);
    });
    $(".bottom").live("click", function () {
        var $trTag = $(this).closest("tr");
        $trTag.fadeOut();
        $(this).closest("table").append($trTag);
        SetOrder($trTag);
    });
});

function SetOrder(trTag) {
    var  currentTable = $(trTag).closest("table");
    var dict = [];
    $(currentTable).find("tr").each(function (index) {
        var proId = $(this).find("[name=proId]").eq(0).val();
        var singleData = proId + "_" + index;
        dict.push(singleData);
    });
    $.ajax({
        async: false,
        url: "/StyleProperty/SetOrder",
        type: "POST",
        data: { "para": dict },
        traditional: true,
        success: function (data) {
            $(trTag).fadeIn();
        }
    });
}
