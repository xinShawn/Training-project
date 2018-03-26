document.getElementById("sub").onclick = function () {
    var size = document.getElementById("size").value;
    chrome.storage.sync.set({size: size}, function () {
        window.close();
    })
}