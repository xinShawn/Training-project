// 向content-script通信
function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}

// 格式化文章
document.getElementById("format").onclick = function () {
    sendMessageToContentScript("format", function(response)
    {
        // console.log(response)
    });
}

// 复制文章
document.getElementById("copy").onclick = function () {
    sendMessageToContentScript("copy", function(response)
    {
        // console.log(response)
    });
}