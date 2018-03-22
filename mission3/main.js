// 点击复制按钮即复制聊天消息
document.getElementById("copy").onclick = function () {
    window.getSelection().removeAllRanges();        //清空当前选取内容
    var oRange  = document.createRange();
    var target = document.getElementById("target");
    window.getSelection().addRange(oRange);
    oRange.selectNode(target);
    
    var bool = document.execCommand("copy", "false", null);
    if (bool) {
      alert('复制成功！');
    } else {
      alert('您的浏览器不支持此复制方式，请使用ctrl+c复制');
    }
    document.execCommand("unselect", "false", null);
}

// 监听文本域的字数变化
var currentUser;        //记录最新发言的用户
var usera = "红小兵";   //设置用户A的用户名
var userb = "兵小红";   //设置用户B的用户名
var avatarA = "http://mmbiz.qpic.cn/mmbiz_png/jFfUbqak7PTiaZ6SEWQib1KIsDNUnqp8r6vElwibqVWxfJnwYu3icJqbJfiajHxeTHc8l8H4tfvBCaI7OM4NDG8ws8A/0?wx_fmt=png";        //usera的头像地址
var avatarB = "http://mmbiz.qpic.cn/mmbiz_png/6ias4WNGRIJl3NKqzCVG5l1FNyicFfibNS8wcIMIxR5r9uMJukmm8zEW0ySoQl9PT6kZLiasdic9b864WVkwxiaNYI1g/0?wx_fmt=png";       //userb的头像地址
var oDel = document.getElementById("btn-del");      //获取删除菜单元素
var show = false;           //记录删除键的显示和隐藏状态
var tempDom;            //记录当前右键点击的元素

editNews("area-a", "count-a", usera);       //对usera绑定监听事件
editNews("area-b", "count-b", userb);       //对userb绑定监听事件

changeInfo();       // 点击修改用户名
clickFn();          //定义删除键的显示和点击功能
addEmoji();

// 字符串转dom
function strToDom (str) {
    var oDom = document.createElement("selection");
    oDom.innerHTML = str;
    return oDom;
}

// 判断字符是图片地址还是文本，返回对应字符串形式的dom元素
function typeFn (str) {
    // 消息不能为空
    if (!str) {
        return false;
    }

    var reg = /^http:\/\//i;
    var reg2 = /jpg|png|jpeg|gif/ig;
    var boola = reg.test(str);
    var boolb = reg2.test(str);
    if (boola && boolb) {
        return '<img src="' + str + '" />';
    } else {
        return '<p>' + str + '</p>';
    }
}

// 在文本框中编辑及发送消息函数
function editNews (textName, numName, user) {
    var oText = document.getElementById(textName);      //获取对应文本域
    var oNum = document.getElementById(numName);        //获取统计字数元素
    var winNews = document.getElementById("target");        //消息窗口元素
    var userClass = (user == usera)? "usera": "userb";      //绑定时修改对应的classname

    if (user == usera) {
        // 当用户是usera时，键盘监听函数为这个。
        oText.onkeyup = function (e) {
            var str = this.value;       //文本域的字符
            var len = str.length;
            oNum.innerText = len;       //修改当前字数总量
            if (e.keyCode == 13 && e.ctrlKey) {
                var main = typeFn(str);     //获取内容主体的dom元素字符串
                if (!main) {
                    alert("消息不能为空！");
                    return null;
                }
                // 同时按下ctrl + enter时出发以下语句
                if (currentUser == usera) {
                    // 判断最新发言者是否为该用户
                    var el = '<section class="usera-wrapper-single"><section class="triangle"><section class="p-wrapper">' + main + '</section></section></section>';
                } else {
                    var el = '<section class="usera-wrapper" style="background-image: url(' + avatarA + ')"><section class="name">' + usera + '</section><section class="triangle"><section class="p-wrapper">' + main + '</section></section></section>';
                }
                var dom = document.createElement("selection");
                dom.innerHTML = el;
                dom.oncontextmenu = deleteBuble;      //右键 点击删除 可删除当前气泡
                winNews.appendChild(dom);       //将新消息加入到消息窗口
                currentUser = usera;            //设置最新发言者为该用户
                oText.value = "";               //清空文本
            }
        }
    } else {
        oText.onkeyup = function (e) {
            var str = this.value;       //文本域的字符
            var len = str.length;
            oNum.innerText = len;       //修改当前字数总量
            if (e.keyCode == 13 && e.ctrlKey) {
                var main = typeFn(str);     //获取内容主体的dom元素字符串
                // 同时按下ctrl + enter时出发以下语句
                if (currentUser == userb) {
                    // 判断最新发言者是否为该用户
                    var el = '<section class="userb-wrapper-single"><section class="triangle"><section class="p-wrapper">' + main + '</section></section></section>';
                } else {
                    var el = '<section class="userb-wrapper" style="background-image: url(' + avatarB + ')"><section class="name">' + userb + '</section><section class="triangle"><section class="p-wrapper">' + main + '</section></section></section>';
                }
                var dom = document.createElement("selection");
                dom.innerHTML = el;
                dom.oncontextmenu = deleteBuble;      //右键 点击删除 可删除当前气泡
                winNews.appendChild(dom);       //将新消息加入到消息窗口
                currentUser = userb;            //设置最新发言者为该用户
                oText.value = "";               //清空文本
            }
        }
    }

}

// 点击修改名字，和点击修改头像
function changeInfo() {
    // 修改名字
    var aUsername = document.querySelectorAll(".username");
    for (let i = 0; i < aUsername.length; i++) {
        aUsername[i].onclick = function () {
            var currentName = this.innerText;
            var newName = prompt("请输入用户名");
            if (currentName != newName && newName) {
                this.innerText = newName;
                (i == 0)? (usera = newName): (userb = newName);
            }
        }
    }

    // 修改头像
    var aUserAvatar = document.querySelectorAll(".user-avatar");
    for (let i = 0; i < aUserAvatar.length; i++) {
        aUserAvatar[i].onclick = function () {
            var currentSrc = this.src;
            var newSrc = prompt("请输入图片地址");
            if (currentSrc != newSrc && newSrc) {
                this.src = newSrc;
                (i == 0)? (avatarA = newSrc): (avatarB = newSrc);
            }
        }
    }
}

// 右键显示删除键
function deleteBuble (e) {
    oDel.style.display = "block";
    oDel.style.left = e.clientX + "px";
    oDel.style.top = e.clientY + "px";
    show = true;
    tempDom = this;     //记录当前操作的气泡
    return false;
}

// 定义左键点击文档隐藏删除键，删除键删除对应气泡
function clickFn () {
    document.onclick = function () {
        if (show) {
            oDel.style.display = "none";
            show = false;
        }
    }

    oDel.onclick = function () {
        var oParent = tempDom.parentNode;
        oParent.removeChild(tempDom);
        tempDom = null;     //释放变量
    }
}

// 往文本框中添加表情
function addEmoji() {
    // 第一个框
    var aEmojiA = document.querySelectorAll(".emoji-a i");
    for (let i = 0; i < aEmojiA.length; i++) {
        aEmojiA[i].onclick = function () {
            var oText = document.getElementById("area-a");
            var emoji = this.innerText;
            oText.value += emoji;
            var len = oText.value.length;
            document.getElementById("count-a").innerText = len;       //修改当前字数总量
        };
    }

    // 第二个框
    var aEmojiB = document.querySelectorAll(".emoji-b i");
    for (let i = 0; i < aEmojiB.length; i++) {
        aEmojiB[i].onclick = function () {
            var oText = document.getElementById("area-b");
            var emoji = this.innerText;
            oText.value += emoji;
            var len = oText.value.length;
            document.getElementById("count-b").innerText = len;       //修改当前字数总量
        };
    }

}