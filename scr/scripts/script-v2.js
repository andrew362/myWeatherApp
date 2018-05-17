const openWeatherMapKey = "63114ede4fe9d0ef94dc19e2f6f43270";
const mainContent = document.getElementById('mainContent');
const formInput = document.getElementById('formInput');
let localStorageTempBox = JSON.parse(localStorage.getItem('myWeatherApp')) || {dataArray:[]};
//let formDataID = '1526502453792';
const typeOfWeatherData = {
    temp: {
        param1: 'main',
        param2: 'temp'
    },
    pressure: {
        param1: 'main',
        param2: 'pressure'
    },
    rain: {
        param1: 'rain',
        param2: '3h'
    },
    date: {
        param1: 'dt'
    }
}

//console.log('odczyt z localStorage', localStorageTempBox);

document.addEventListener('keypress', function(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') getWeatherData();
});

document.getElementById('submitBtn').addEventListener('click', getWeatherData);

function getWeatherData() {
    let input = formInput.value.trim();
    if (input) {
        ajax('GET', requestURL(input), true);
    }
    formInput.value = "";
}

function requestURL(cityName) {
    return "http://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
        ",pl" +
        "&units=metric" 
        + "&type=accurate"
        + "&lang=pl"
        + "&APPID=" + openWeatherMapKey;
}

function ajax(method, url){
     new Promise(function(resolve, reject){
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function(){
            if (this.status === 200) {
                resolve(xhr.response);
                let data = JSON.parse(xhr.response);
                
                let timeStamp = new Date().getTime();
                //dodawanie danych do localStorage
                addTolocalStorageTempBox(data,timeStamp);
                //dodawanie danych do formularza
                addDataToForm(data,timeStamp);

                console.log(timeStamp, data);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
                alert(this.statusText);
            }
        }
        xhr.send();
    });
}

function addDataToForm(data, timeStamp){
    let row = document.createElement("article");
    row.dataset.id = timeStamp;
    row.innerHTML =     `<div class="card">
                            <div class="card-header">
                                    <div class="row">
                                            <dvi class="col col_1">
                                                <p><strong>${data.city.id}</strong></p>
                                            </dvi>
                                            <div class="col col_2">
                                                <p> ${data.city.name} </p>
                                            </div>
                                            <div class="col col_3">
                                                <p>${data.list[0].main.temp}stC</p>
                                            </div>
                                            <div class="col col_4">
                                                <button class="btn more-info"  type="button"  data-toggle="collapse" data-target="#collapse-${timeStamp}">
                                                    Więcej
                                                </button>
                                                <button class="removeBtn">Usuń</button>
                                            </div>
                                    </div>
                            </div>
                            <div class="collapse" id="collapse-${timeStamp}">
                                <div class="card-body">
                                    <canvas id="myChart-${timeStamp}"></canvas>
                                </div>
                            </div>
                        </div>`;
    mainContent.appendChild(row);
    row.querySelector(".removeBtn").addEventListener('click', removePosition);
    row.querySelector(".more-info").addEventListener('click', createChart(timeStamp));
}

function addTolocalStorageTempBox(data, timeStamp){
    let tempObj = {
        id: timeStamp,
        city: data.city,
        list: data.list
    };
    localStorageTempBox.dataArray.push(tempObj);
    //console.log(localStorageTempBox.dataArray);
}

function readDataFromLocalStorage(data) { 
    try {
        //console.log(data);
        data.forEach(function(elem){
            addDataToForm(elem, elem.id);    
        });
       
    } catch (exception) {
        if (window.console) {
            console.error(exception);
        }
        return;
    }
}

function removePosition() {
    let selectPosition = this.closest('article');
    let positionID = selectPosition.dataset.id;
    localStorageTempBox.dataArray.forEach(function(data, index){
        if(data.id == positionID){
            localStorageTempBox.dataArray.splice(index,1);
        }
    });
    selectPosition.remove();
}

readDataFromLocalStorage(localStorageTempBox.dataArray);

window.onbeforeunload = function(){
    localStorage.setItem("myWeatherApp", JSON.stringify(localStorageTempBox));
}


//--------------------------------- charts-------------------------

function createChart(timeStamp){
    //console.log('posycja',timeStamp);
     var ctx = document.getElementById("myChart-" + timeStamp).getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: insertDataLabel(localStorageTempBox.dataArray, typeOfWeatherData.date, timeStamp),
                    datasets: [{
                        label: '# of Votes',
                        data: insertWeatherData(localStorageTempBox.dataArray, typeOfWeatherData.temp, timeStamp),
                        backgroundColor: 'rgba(0, 99, 132, 0.2)',
                        borderColor: 'rgba(0,99,132,1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        
}

function insertWeatherData(data, obj, id){
    let array = [];
    let formDataID = id;
    let param1 = obj.param1;
    let param2 = obj.param2;
    data.forEach(function(el){
        if (el.id == formDataID) {
            el.list.forEach(function(id) {
                //console.log(id[param1][param2]);
                array.push(id[param1][param2]);
            });
        }
    });
    //console.log(array);
    return array;
}

function insertDataLabel(data, obj, id) {
    let array = [];
    let formDataID = id;
    let param1 = obj.param1;
    data.forEach(function(el){
        if (el.id == formDataID) {
            el.list.forEach(function(id) {
                let num = Number(id[param1]) * 1000;
                let date = new Date(num);
                //console.log(date);
                let splitDate = date.toString().split(' ');
                let shortDate = splitDate[0] +' '+ splitDate[2] +'-'+ splitDate[1] +'\n'+ splitDate[4] ;
                array.push(shortDate);
            });
        }
    });
    //console.log(array);
    return array;
}


//--------------------------------- reload data-------------------------




document.getElementById('refreshBtn').addEventListener('click', refreshData);

function refreshData() {
    localStorage.clear();
    let node = document.getElementById('mainContent');
    while (node.hasChildNodes()) node.removeChild(node.lastChild);
    let cityNameList = localStorageTempBox.dataArray.map(function(el){
        return el.city.name;
    });
    console.log(cityNameList);
    localStorageTempBox = {dataArray:[]};
    cityNameList.forEach(function(cityName){
    ajax('GET', requestURL(cityName), true);
});
}
