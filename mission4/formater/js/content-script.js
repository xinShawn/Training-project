chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if(request == 'format') {
        // 使用dom插入的方法，直接修改innerHTML的话，图片显示有问题。
        var dom = document.createElement("div");
        dom.innerText = "▲▲▲▲▲▲▲▲▲▲▲▲";

        // 格式化文章
        // 文字居中
        var aP = document.querySelectorAll("#js_content p");
        aP.forEach(function (item) {
            item.style.textAlign = "center"
        });

        // 修改文字颜色
        var aSpan = document.querySelectorAll("#js_content p span");
        aSpan.forEach(function (item) {
            item.style.color = "black"
        });

        // 图片下面加入符号
        var aImg = document.querySelectorAll("#js_content p img");
        aImg.forEach(function (item) {
            var oParent = item.parentNode;
            var newDom = dom.cloneNode(true);
            oParent.appendChild(newDom);
        });

    } else if (request == 'copy') {

        // 复制文章
        window.getSelection().removeAllRanges();        //清空当前选取内容
        var oRange  = document.createRange();
        var target = document.getElementById("js_content");
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
        
});