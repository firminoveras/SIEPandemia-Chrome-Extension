var enabled = false;

var targetDiv = document.getElementByClassName("btnHelpAmbiente");

var buttonToggleEnable = document.createElement("button");
buttonToggleEnable.innerHTML = "SIEPandemia Desligado";
buttonToggleEnable.className = "siepandemiaButton";
buttonToggleEnable.type = "button";

var textAreaStudentList = document.createElement("textarea");
textAreaStudentList.type = "text";
textAreaStudentList.style = 'margin: 0px; width: 900px; height: 200px;';

var buttonCopy = document.createElement("button");
buttonCopy.innerHTML = "Copiar da Lista de Alunos";
buttonCopy.type = "button";

var buttonApply = document.createElement("button");
buttonApply.innerHTML = "Aplicar Faltas";
buttonApply.type = "button";

buttonToggleEnable.addEventListener('click', function () {
    enabled = !enabled;
    if (enabled) {
        targetDiv.appendChild(textAreaStudentList);
        targetDiv.appendChild(buttonCopy);
        targetDiv.appendChild(buttonApply);
    } else {
        targetDiv.removeChild(textAreaStudentList);
        targetDiv.removeChild(buttonCopy);
        targetDiv.removeChild(buttonApply);
    }
    buttonToggleEnable.innerHTML = " SIEPandemia " + (enabled ? "Habilitado " : "Desabilitado ");
});

buttonApply.addEventListener('click', function () {
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
            if (textAreaStudentList.value.split('\n').includes(nome)) {
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

buttonCopy.addEventListener('click', function () {
    var tableRows = document.getElementById('divListarAlunosFrequenciaDisciplina')
        .getElementsByTagName('table')[0]
        .getElementsByTagName('tbody')[0]
        .getElementsByTagName('tr');

    var allNames = "";
    for (var index = 0; index < tableRows.length; index++) {
        if (!tableRows[index].id.startsWith('trMotivo')) {
            allNames += tableRows[index].getElementsByTagName('td')[1]
                .getElementsByTagName('a')[0].innerHTML.trim().toUpperCase() + '\n';
        }
    }
    textAreaStudentList.value = allNames;
});

targetDiv.appendChild(buttonToggleEnable);