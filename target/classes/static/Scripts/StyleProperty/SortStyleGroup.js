$(document).ready(function () {
    initTd();
});

function initTd()
{
    $("#px_tr tr").each(function() {
    if ($(this).index() == 0) {
        $(this).find("span p").each(function() {
            if ($(this).index() < 3) {
                $(this).css("display", "none");
            } else {
                $(this).css("display", "block");
            }
        });
            } else 
        if ($(this).index() == $("#px_tr tr").size() - 1) {
        $(this).find("span p").each(function() {
            if ($(this).index() < 3) {
                $(this).css("display", "block");
            } else {
                $(this).css("display", "none");
            }
        });
    } else {
        $(this).find("span p").each(function() {
            $(this).css("display", "block");
        });
    }
});
$(".span_bj").each(function() {
    $(this).hide();
});
$(".span_an").each(function() {
    $(this).show();
});
}
//sourceTag:源标签 moveAction:顶 底 上移一 下移一 上移五 下移五
function movetr(sourceTag, moveAction) {
    var $trTag = $(sourceTag).parent().parent().parent();
    if (moveAction == "u1") {
        if ($trTag.index() != 0) {
            $trTag.fadeOut();
            $trTag.prev().before($trTag);
        }
    }
    if (moveAction == "u5") {
        if ($trTag.index() != 0) {
            $trTag.fadeOut();
            $trTag.prev().prev().prev().prev().prev().before($trTag);
        }
    }
    if (moveAction == "top") {
        $trTag.fadeOut();
        $("#px_tr").prepend($trTag);
    }
    if (moveAction == "d1") {
        if ($trTag.index() != $("#px_tr tr").length - 1) {
            $trTag.fadeOut();
            $trTag.next().after($trTag);
        }
    }
    if (moveAction == "d5") {
        if ($trTag.index() != $("#px_tr tr").length - 1) {
            $trTag.fadeOut();
            $trTag.next().next().next().next().next().after($trTag);
        }
    }
    if (moveAction == "bot") {
        $trTag.fadeOut();
        $("#px_tr").append($trTag);
    }
    
    var dict = [];
    $("#px_tr tr").each(function (index) {
        var groupId = $(this).attr("id");
        var singleData = groupId + "_" + index;
        dict.push(singleData);
    });
    $.ajax({
        async: false,
        url: "/StyleProperty/SetGroupOrder",
        type: "POST",
        data: { "para": dict },
        traditional: true,
        success: function (data) {
            $trTag.fadeIn();
        }
    });
}


function paixu_span(v) {
    var i = -1;
    $(".span_an").each(function () {
        if ($(this).is($(v))) {
            $(this).hide();
            $(this).next("span").show();
        } else {
            $(this).show();
            $(this).next("span").hide();
        }
    });
}