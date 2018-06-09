//if (xmlData != null && xmlData != "") {
var xmlObj = eval(xmlData);
var zTreeObjNodes = xmlObj2ZTreeObj(xmlObj);

var zTreeObj,
    setting = {
        view: {
            selectedMulti: false,
            dblClickExpand: dblClickExpand
        },
        edit: {
            enable: true,
            showRemoveBtn: true,
            showRenameBtn: true,
            drag: {
                autoExpandTrigger: true,
                isCopy: true,
                isMove: true,
                prev: true,
                inner: true,
                next: true
            }
        },

        data: {
            keep: {
                parent: true,
                leaf: true
            },
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeDrag: beforeDrag,
            beforeRemove: beforeRemove,
            beforeRename: beforeRename,
            onRemove: onRemove,
            onRename: onRename
        }
    },
zTreeNodes = zTreeObjNodes;
//}
$(document).ready(function () {
    zTreeObj = $.fn.zTree.init($("#tree"), setting, zTreeNodes);

    $("#addParent").bind("click", { isParent: true }, add);
    $("#addLeaf").bind("click", { isParent: false }, add);
});
//将数据转换成zTree 对象
function xmlObj2ZTreeObj(xmlObj) {

    var xmlGroups = xmlObj[0].Groups;
    var groupArr = [];
    for (var i = 0; i < xmlGroups.length; i++) {
        var groupName = xmlGroups[i].GroupName;
        var groupItems = xmlGroups[i].Items;
        var propertyArr = [];
        for (var j = 0; j < groupItems.length; j++) {
            var propertyName = groupItems[j].ItemName;
            var conditions = groupItems[j].Conditions;
            var conditionArr = [];
            for (var k = 0; k < conditions.length; k++) {
                var conditionName = conditions[k].ConditionName;
                conditionName = $.trim(conditionName);
                var conditionObj = { name: conditionName, open: false };
                conditionArr.push(conditionObj);
            }
            var propertyObj = { "name": propertyName, open: false, children: conditionArr };
            propertyArr.push(propertyObj);
        }
        var groupObj = {
            "name": groupName, edit: {
                enable: true, showRemoveBtn: true, showRenameBtn: true
            }, open: false, children: propertyArr
        };
        groupArr.push(groupObj);
    }
    var zTreeObjNodes = [
        {
            "name": "Root", open: true, children: groupArr, edit: {
                enable: false,
                showRemoveBtn: false,
                showRenameBtn: false
            },
        }
    ];
    return zTreeObjNodes;
}

//添加节点
var newCount = 1;
function add(e) {
    var zTree = $.fn.zTree.getZTreeObj("tree"),
    isParent = e.data.isParent,
    nodes = zTree.getSelectedNodes(),
    treeNode = nodes[0];
    if (treeNode) {
        treeNode = zTree.addNodes(treeNode, { id: (100 + newCount), pId: treeNode.id, isParent: isParent, name: "new node" + (newCount++) });
    } else {
        treeNode = zTree.addNodes(null, { id: (100 + newCount), pId: 0, isParent: isParent, name: "new node" + (newCount++) });
    }
    if (treeNode) {
        zTree.editName(treeNode[0]);
    } else {
        alert("叶子节点被锁定，无法增加子节点");
    }
};

//拖拽操作
function beforeDrag(treeId, treeNodes) {
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].drag === false) {
            return false;
        }
    }
    return true;
}

//双击折叠或打开。根节点无效
function dblClickExpand(treeId, treeNode) {
    return treeNode.level > 0;
}

var log, className = "dark";

//删除节点
function beforeRemove(treeId, treeNode) {
    className = (className === "dark" ? "" : "dark");
    showLog("[ " + getTime() + " beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
}
function onRemove(e, treeId, treeNode) {
    showLog("[ " + getTime() + " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
}

//重命名节点
function beforeRename(treeId, treeNode, newName) {
    if (newName.length == 0) {
        alert("节点名称不能为空.");
        var zTree = $.fn.zTree.getZTreeObj("tree");
        setTimeout(function () { zTree.editName(treeNode) }, 10);
        return false;
    }
    var flag = CheckNameStr(treeNode, newName);
    if (flag) {
        return true;
    } else {
        alert(newName + "  名称不符合规范，请重新输入！");
        return false;
    }
}

//用正则判断所输入名称是否符合规范
function CheckNameStr(treeNode, nameStr) {
    var flag = false;
    var isParent = treeNode.isParent;
    var level = treeNode.level;

    if (level == 1) {
        flag = checkGroupNode(nameStr);
    }
    if (level == 2) {
        flag = checkPropertyNode(nameStr);
    }
    if (level == 3) {
        flag = checkConditionNode(nameStr);
    }
    return flag;

}

function onRename(event, treeId, treeNode) {
    //alert(treeNode.tId + ", " + treeNode.name);
    return true;
}

function showLog(str) {
    if (!log) log = $("#log");
    log.append("<li class='" + className + "'>" + str + "</li>");
    if (log.children("li").length > 8) {
        log.get(0).removeChild(log.children("li")[0]);
    }
}
function getTime() {
    var now = new Date(),
    h = now.getHours(),
    m = now.getMinutes(),
    s = now.getSeconds(),
    ms = now.getMilliseconds();
    return (h + ":" + m + ":" + s + " " + ms);
}

function PublishXml() {
    $.ajax(
            {
                url: "/StyleProperty/PublishStylePropertyConfig",
                type: "POST",
                success: function (data) {
                    if (data == "success") {
                        alert("发布成功！");
                    } else {
                        alert("发布失败");
                    }
                }
            }
        );
}

function SaveData() {
    var zTreeObj = $.fn.zTree.getZTreeObj("tree");
    var nodes = zTreeObj.getNodes();
    var arr = zTreeObj.transformToArray(nodes);
    var xmlObj = zTreeObj2XmlObj(arr);
    if (xmlObj != null) {
        var jsonStr = JSON.stringify(xmlObj);
        $.ajax(
            {
                url: "/StyleProperty/SaveStylePropertyConfig",
                data: { configStr: jsonStr },
                type: "POST",
                success: function (data) {
                    if (data == "success") {
                        alert("保存成功！");
                    } else {
                        alert("保存失败");
                    }
                }
            }
        );
    }

}

function zTreeObj2XmlObj(zTreeArr) {
    var groupArr = new Array();
    var groupLists = zTreeArr[0].children;
    for (var i = 0; i < groupLists.length; i++) {
        var groupObj = new Object();
        var group = groupLists[i];
        var groupName = group.name;
        var flag1 = checkGroupNode(groupName);
        if (!flag1) {
            alert(groupName + "填写不符合规范");
            return null;
        }
        groupObj.name = groupName;
        var propertyLists = group.children;
        if (propertyLists == null) {
            alert(groupName + "下的参配不能为空");
            return null;
        }
        var propertyArr = new Array();
        for (var j = 0; j < propertyLists.length; j++) {
            var property = propertyLists[j];
            var propertyObj = new Object();
            var propertyName = property.name;
            var flag2 = checkPropertyNode(propertyName);
            if (!flag2) {
                alert(groupName + "/" + propertyName + " 填写不符合规范");
                return null;
            }
            propertyObj.name = propertyName;
            var conditions = property.children;
            var conditionArr = new Array();
            if (conditions != null && conditions.length > 0) {
                for (var k = 0; k < conditions.length; k++) {
                    var conditionName = conditions[k].name;
                    conditionName = $.trim(conditionName);
                    var flag3 = checkConditionNode(conditionName);
                    if (!flag3) {
                        alert(groupName + "/" + propertyName + "/" + conditionName + "填写不符合规范");
                        return null;
                    }
                    conditionArr.push(conditionName);
                }
            }
            propertyObj.Conditions = conditionArr;
            propertyArr.push(propertyObj);
        }
        groupObj.Properties = propertyArr;
        groupArr.push(groupObj);
    }
    return groupArr;
}

function checkGroupNode(groupNodeStr) {
    //groupNodeStr = "Group Name='aaaaa'";
    var regexStr = new RegExp("(^Group Name=')(.+)('$)");
    regexStr.ignoreCase = true;
    if (regexStr.test(groupNodeStr)) {
        return true;
    }
    return false;
}

function checkPropertyNode(propertyStr) {
    var regexStr = new RegExp("^Item Name='.+' Unit='.*'$");
    if (regexStr.test(propertyStr)) {
        return true;
    }
    return false;
}

function checkConditionNode(conditionStr) {
    //conditionStr = "Conditions EQ='[P_627]:有' Value=''";
    var regexStr1 = new RegExp("^Conditions Value='(\[P_[0-9]+\])(.*)'$");
    if (regexStr1.test(conditionStr)) {
        return true;
    }
    var regexStr2 = new RegExp("^Conditions (EQ|NE|GT|GTE|LT|LTE|In|NotIn)='(\[P_[0-9]+\]):(|\s|.+)' Value='.+'$");
    if (regexStr2.test(conditionStr)) {
        return true;
    }

    return false;
}