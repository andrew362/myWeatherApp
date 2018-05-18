const openWeatherMapKey = "63114ede4fe9d0ef94dc19e2f6f43270";
const mainContent = document.getElementById('mainContent');
const formInput = document.getElementById('formInput');
const submitBtn = document.getElementById('submitBtn');
let localStorageTempBox = JSON.parse(localStorage.getItem('myWeatherApp')) || {dataArray:[]};
console.log(localStorageTempBox);
const typeOfWeatherData = {
    temp: {
        param1: 'main',
        param2: 'temp'
    },
    temp_max: {
        param1: 'main',
        param2: 'temp_max'
    },
    temp_min: {
        param1: 'main',
        param2: 'temp_min'
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

function loadData(url, button) {
    button.classList.add('elem-is-busy');
    button.disable = true;

    ajax(url)
    .then(function(res) {
           let data = JSON.parse(res);
           console.log(data);
           let timeStamp = new Date().getTime();
           let tempBox = {
               data: data,
               timeStamp: timeStamp
           }
           return tempBox
    })
    .then(function(tempBox){
        addTolocalStorageTempBox(tempBox.data,tempBox.timeStamp);
        return tempBox
    })
    .then(function(tempBox){
        //dodawanie danych do formularza
        addDataToForm(tempBox.data,tempBox.timeStamp);
        
    })
    .then(function(){
        setTimeout(function(){
            button.classList.remove('elem-is-busy');
            button.disable = false;
        },400); 
    })
    .catch(function(err) {
        console.error('Coś poszło nie tak');
    })
    
}

document.addEventListener('keypress', function(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') getWeatherData();
});

submitBtn.addEventListener('click', getWeatherData);

function getWeatherData() {
    let input = formInput.value.trim();
    let button = submitBtn;
    if (input) {
        loadData(requestURL(input), button);
    }
    formInput.value = "";
}

function requestURL(cityName) {
    return "http://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
       // ",pl" +
        "&units=metric" 
        + "&type=accurate"
        + "&lang=pl"
        + "&APPID=" + openWeatherMapKey;
}

function ajax(url){
    return new Promise(function(resolve, reject){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function(){
            if (this.status === 200 && this.statusText == "OK") {
                resolve(xhr.response);
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
                type: 'bar',
                data: {
                    labels: insertDataLabel(localStorageTempBox.dataArray, typeOfWeatherData.date, timeStamp),
                    datasets: [{
                        label: 'Rain',
                        data: insertWeatherData(localStorageTempBox.dataArray, typeOfWeatherData.rain, timeStamp),
                        backgroundColor: 'rgba(0, 99, 132, 0.2)',
                        borderColor: 'rgba(0,99,132,1)',
                        borderWidth: 1,
                        yAxisID: 'y-axis-2',
                        ticks: {min: 0}
                    },{
                        label: 'Temperature',
                        data: insertWeatherData(localStorageTempBox.dataArray, typeOfWeatherData.temp, timeStamp),
                        backgroundColor: 'rgba(0, 99, 132, 0.2)',
                        borderColor: 'rgba(0,99,132,1)',
                        borderWidth: 1,
                        type: 'line',
                        yAxisID: 'y-axis-1',
                        
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'right',
                            id: 'y-axis-2',
                            ticks:{
                                min: 0
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                            },{
                            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
                            
                        }],
                        xAxes: [{
       
                        }],
                    },
                    animation: {
                            duration: 400, // general animation time
                    },
                    responsiveAnimationDuration: 400, // animation duration after a resize
                    
                    responsive: true,
     
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
   
                        
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
    let button = this;
    let node = document.getElementById('mainContent');
    while (node.hasChildNodes()) node.removeChild(node.lastChild);
    let cityNameList = localStorageTempBox.dataArray.map(function(el){
        return el.city.name;
    });
    console.log(cityNameList);
    localStorageTempBox = {dataArray:[]};
    cityNameList.forEach(async function(cityName){
        await loadData(requestURL(cityName), button);
    });
}

