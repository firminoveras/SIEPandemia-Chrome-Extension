var targetDiv = document.getElementsByClassName("btnHelpAmbiente")[0];

var buttonApplyNew = document.createElement("button");
buttonApplyNew.innerHTML = "Aplicar SIEPandemia";
buttonApplyNew.className = "aplySiepandemia";
buttonApplyNew.type = "button";

targetDiv.appendChild(buttonApplyNew);

buttonApplyNew.addEventListener('click', function () {
    chrome.storage.local.get(['key'], function (result) {
        var allChecks = document.getElementsByClassName('campoFrequenciaDisciplinaFJ');
        for (var allChecksIndex = 0; allChecksIndex < allChecks.length; allChecksIndex++) {
            if (allChecks[allChecksIndex].checked) {
                allChecks[allChecksIndex].click();
            }
        };
    
        var tableRows = document.getElementById('divListarAlunosFrequenciaDisciplina')
            .getElementsByTagName('table')[0]
            .getElementsByTagName('tbody')[0]
            .getElementsByTagName('tr');
        for (var index = 0; index < tableRows.length; index++) {
            if (!tableRows[index].id.startsWith('trMotivo')) {
                var nome = tableRows[index].getElementsByTagName('td')[1].getElementsByTagName('a')[0].innerHTML.trim().toUpperCase();
                if (result.key.split('\n').includes(nome)) {
                    var allChecksInRow = tableRows[index].getElementsByClassName('campoFrequenciaDisciplinaFJ');
                    for (var checkBoxIndex = 0; checkBoxIndex < allChecksInRow.length; checkBoxIndex++) {
                        allChecksInRow[checkBoxIndex].checked = false;
                        allChecksInRow[checkBoxIndex].click();
                    };
                }
            }
        }
    
        var justification = document.getElementsByClassName('selectMotivoFaltaJustificada');
        for (var index = 0; index < justification.length; index++) justification[index].selectedIndex = 9;
    
        document.getElementById("chkConclusaoFrequenciaDiaria").checked = true;
    
        document.getElementById("btnGravarFrequenciaDisciplina").click();
    });
});

function getNames() {
    var tableRows = document.getElementById('divListarAlunosFrequenciaDisciplina')
        .getElementsByTagName('table')[0]
        .getElementsByTagName('tbody')[0]
        .getElementsByTagName('tr');

    var allNames = "";
    for (var index = 0; index < tableRows.length; index++) {
        if (!tableRows[index].id.startsWith('trMotivo') && tableRows[index].getElementsByTagName('input')[0].checked) {
            allNames += tableRows[index].getElementsByTagName('td')[1]
                .getElementsByTagName('a')[0].innerHTML.trim().toUpperCase() + '\n';
        }
    }
    return allNames;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "studentList") sendResponse(getNames());
});