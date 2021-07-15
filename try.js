const storeTime = localStorage.getItem("timer");
document.getElementById("timeButton").innerHTML = storeTime;

const specificDetailsCols = ["שם", "תחביב", "ספר"];
const allDetailsCols = ["מספר צעיר", "שם צעיר", "מיקום מגורים", "טלפון"];

let selectedYoungsIds = [];
let isSelecedYoungAddable = false;

const youngs = [
    {
        "מספר צעיר": "1",
        "שם הצעיר": "חבר פרבר",
        "מיקום מגורים": "פני פרבר",
        "טלפון": "058-5678444",
        "extraData": {
            "שם": "חבר פרבר",
            "תחביב": "כדורסל",
            "ספר": "המורדת 2"
        }
    },
    {
        "מספר צעיר": "46",
        "שם הצעיר": "עדי שטיינר",
        "מיקום מגורים": "להבים",
        "טלפון": "051-1234567",
        "extraData": {
            "שם": "עדי שטיינר",
            "תחביב": "בילויים",
            "ספר": "חדוא 2"
        }
    },
    {
        "מספר צעיר": "99",
        "שם הצעיר": "סוני סימן-טוב",
        "מיקום מגורים": "חולון",
        "טלפון": "012-1234567",
        "extraData": {
            "שם": "סוני סימן-טוב",
            "תחביב": "כדורגל",
            "ספר": "הטיול 2"
        }
    }
];



const allDetailsTabel = document.getElementById("allDetailsTable");

let myTime;

const changeState=()=> {
    const stateButon = document.getElementById("stateButton");
    if (stateButon.value == "כבוי") {
        stateButon.value = "דלוק";
        myTime = setInterval(myTimer, 1);
    }
    else {
        stateButon.value = "כבוי";
        clearInterval(myTime);
    }
}

const myTimer=()=> {
    const date = new Date();
    const time = date.toLocaleTimeString();
    document.getElementById("timeButton").innerHTML = time;
    localStorage.setItem("timer", time);
}



const initYoungTable = () => {
    allDetailsTabel.innerHTML = "";
    initAllDetailsTitles();
    youngs.forEach((young) => {
        const youngPhone = young["טלפון"];
        const youngId = young["מספר צעיר"];
        const youngName = young["שם הצעיר"];
        const youngAddress = young["מיקום מגורים"];
        addRowToYoungTable(youngId, youngName, youngAddress, youngPhone);
    })
    addSpecificDetails();
    HighlightRow();
}

const initAllDetailsTitles = () => {
    const titleRow = document.createElement("tr");
    titleRow.id = "titleRow";
    allDetailsCols.forEach((col) => {
        const colunmTitle = document.createElement("th");
        colunmTitle.innerHTML = col;
        titleRow.appendChild(colunmTitle);
    })
    allDetailsTabel.appendChild(titleRow);
}


const addRowToYoungTable = (youngId, youngName, youngAddress, youngPhone) => {
    const currentNewRow = document.createElement("tr");
    const idCol = document.createElement("td");
    idCol.innerHTML = youngId;
    currentNewRow.appendChild(idCol);
    const nameCol = document.createElement("td");
    nameCol.innerHTML = youngName;
    currentNewRow.appendChild(nameCol);
    const addresCol = document.createElement("td");
    addresCol.innerHTML = youngAddress;
    currentNewRow.appendChild(addresCol);
    const phoneCol = document.createElement("td");
    phoneCol.innerHTML = youngPhone;
    currentNewRow.appendChild(phoneCol);
    allDetailsTabel.appendChild(currentNewRow);
}



const addSpecificDetails = () => {
    const rowsInYoungs = allDetailsTabel.getElementsByTagName("tr");
    [...rowsInYoungs].forEach(clickedRow => {
        clickedRow.onclick = function () {
            const specificYoungId = clickedRow.getElementsByTagName("td")[0].innerHTML;
            if (isSelecedYoungAddable == false)
                selectedYoungsIds = [];
            if (selectedYoungsIds.indexOf(specificYoungId) == -1)
                selectedYoungsIds.push(specificYoungId);
                initSpecificDetailsTable();
        }
    });
   }



const initSpecificDetailsTable = () => {
    const specificDetailsTable = document.getElementById("specificDetailsTable");
    specificDetailsTable.innerHTML = "";

    youngs.forEach((young) => {
        const addRow = document.createElement("tr");
        const specificDetailsToAdd = young["extraData"];
        if (selectedYoungsIds.indexOf(young["מספר צעיר"]) != -1)
            for (let detailToAdd in specificDetailsToAdd) {
                const cellOfDetail = document.createElement("td");
                cellOfDetail.innerHTML = detailToAdd + ":" + specificDetailsToAdd[detailToAdd];
                addRow.appendChild(cellOfDetail);
            }
            specificDetailsTable.appendChild(addRow);
    })
}



const addToTable = () => {
    const addButton = document.getElementById("addButton");
    if (addButton.value == "כבוי") {
        addButton.value = "דלוק";
        isSelecedYoungAddable = true;
    }
    else {
        addButton.value = "כבוי";
        isSelecedYoungAddable = false;
    }

}

const HighlightRow = () => {
    const allCellOfYoungs = allDetailsTabel.getElementsByTagName('td');
    [...allCellOfYoungs].forEach(clickedCell => {
        clickedCell.onclick = function () {
                // Get the row id where the cell exists
                const rowClickedId = clickedCell.parentNode.rowIndex;
                const rowSelected = allDetailsTabel.getElementsByTagName('tr')[rowClickedId];
                rowSelected.id="highlightRow";
                }
              });
}






























// const HighlightRow = () => {
//     let cells = allDetailsTabel.getElementsByTagName('td');
//     for (let i = 0; i < cells.length; i++) {
//         let cell = cells[i];
//         cell.onclick = function () {
//             // Get the row id where the cell exists
//             let rowId = cell.parentNode.rowIndex;
//             let rowsNotSelected = allDetailsTabel.getElementsByTagName('tr');
//             for (let row = 1; row < rowsNotSelected.length; row++) {
//                 rowsNotSelected[row].style.backgroundColor = "";
//             }
//             let rowSelected = allDetailsTabel.getElementsByTagName('tr')[rowId];
//             rowSelected.style.backgroundColor = "rgb(147, 172, 184)";
//         }
//     }
// }