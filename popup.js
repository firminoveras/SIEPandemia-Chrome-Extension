document.addEventListener('DOMContentLoaded', function () {
    var div = document.querySelector('#divCheckArea');
    var savedValue;

    chrome.storage.local.get(['key'], function (result) {
        if (result != undefined) {
            document.querySelector('#textAreaStudentsName').value = result.key;
            savedValue = result.key;
        }
    });

    document.querySelector('#buttonApply').addEventListener('click', function () {
        chrome.storage.local.set({ key: document.querySelector('#textAreaStudentsName').value.trim() }, function () {
            document.querySelector('#buttonApply').style = 'background-color: #5E81AC';
            savedValue = document.querySelector('#textAreaStudentsName').value.trim()
        });
    });

    document.querySelector('#buttonAjuda').addEventListener('click', function () {
        window.open('https://github.com/firminoveras/SIEPandemia-Chrome-Extension');
    });

    document.querySelector('#textAreaStudentsName').addEventListener('input', function () {
        if (document.querySelector('#textAreaStudentsName').value != savedValue) {
            document.querySelector('#buttonApply').style = 'background-color: #BF616A';
        } else {
            document.querySelector('#buttonApply').style = 'background-color: #5E81AC';
        }
    });

    document.querySelector('#buttonCopiar').addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "studentList" }, function (response) {
                document.querySelector('#textAreaStudentsName').value = response.trim();
            });
        });
    });

});