const openWeatherMapKey = "63114ede4fe9d0ef94dc19e2f6f43270";
const mainContent = document.getElementById('mainContent');
const formInput = document.getElementById('formInput');
const submitBtn = document.getElementById('submitBtn');
let mapMarker = {};
let localStorageTempBox = JSON.parse(localStorage.getItem('myWeatherApp')) || { dataArray: [] };
console.log(localStorageTempBox);


const weatherIcons = {
    "200": {
        "label": "thunderstorm with light rain",
        "icon": "storm-showers"
    },

    "201": {
        "label": "thunderstorm with rain",
        "icon": "storm-showers"
    },

    "202": {
        "label": "thunderstorm with abundant rain",
        "icon": "storm-showers"
    },

    "210": {
        "label": "light thunderstorm",
        "icon": "storm-showers"
    },

    "211": {
        "label": "thunderstorm",
        "icon": "thunderstorm"
    },

    "212": {
        "label": "abundant thunderstorm",
        "icon": "thunderstorm"
    },

    "221": {
        "label": "ragged thunderstorm",
        "icon": "thunderstorm"
    },

    "230": {
        "label": "thunderstorm with light drizzle",
        "icon": "storm-showers"
    },

    "231": {
        "label": "thunderstorm with drizzle",
        "icon": "storm-showers"
    },

    "232": {
        "label": "thunderstorm with abundant drizzle",
        "icon": "storm-showers"
    },

    "300": {
        "label": "light intensity drizzle",
        "icon": "sprinkle"
    },

    "301": {
        "label": "drizzle",
        "icon": "sprinkle"
    },

    "302": {
        "label": "abundant intensity drizzle",
        "icon": "sprinkle"
    },

    "310": {
        "label": "light intensity drizzle rain",
        "icon": "sprinkle"
    },

    "311": {
        "label": "drizzle rain",
        "icon": "sprinkle"
    },

    "312": {
        "label": "abundant intensity drizzle rain",
        "icon": "sprinkle"
    },

    "313": {
        "label": "shower rain and drizzle",
        "icon": "sprinkle"
    },

    "314": {
        "label": "abundant shower rain and drizzle",
        "icon": "sprinkle"
    },

    "321": {
        "label": "shower drizzle",
        "icon": "sprinkle"
    },

    "500": {
        "label": "light rain",
        "icon": "rain"
    },

    "501": {
        "label": "moderate rain",
        "icon": "rain"
    },

    "502": {
        "label": "abundant intensity rain",
        "icon": "rain"
    },

    "503": {
        "label": "very abundant rain",
        "icon": "rain"
    },

    "504": {
        "label": "extreme rain",
        "icon": "rain"
    },

    "511": {
        "label": "freezing rain",
        "icon": "rain-mix"
    },

    "520": {
        "label": "light intensity shower rain",
        "icon": "showers"
    },

    "521": {
        "label": "shower rain",
        "icon": "showers"
    },

    "522": {
        "label": "abundant intensity shower rain",
        "icon": "showers"
    },

    "531": {
        "label": "ragged shower rain",
        "icon": "showers"
    },

    "600": {
        "label": "light snow",
        "icon": "snow"
    },

    "601": {
        "label": "snow",
        "icon": "snow"
    },

    "602": {
        "label": "abundant snow",
        "icon": "snow"
    },

    "611": {
        "label": "sleet",
        "icon": "sleet"
    },

    "612": {
        "label": "shower sleet",
        "icon": "sleet"
    },

    "615": {
        "label": "light rain and snow",
        "icon": "rain-mix"
    },

    "616": {
        "label": "rain and snow",
        "icon": "rain-mix"
    },

    "620": {
        "label": "light shower snow",
        "icon": "rain-mix"
    },

    "621": {
        "label": "shower snow",
        "icon": "rain-mix"
    },

    "622": {
        "label": "abundant shower snow",
        "icon": "rain-mix"
    },

    "701": {
        "label": "mist",
        "icon": "sprinkle"
    },

    "711": {
        "label": "smoke",
        "icon": "smoke"
    },

    "721": {
        "label": "haze",
        "icon": "day-haze"
    },

    "731": {
        "label": "sand, dust whirls",
        "icon": "cloudy-gusts"
    },

    "741": {
        "label": "fog",
        "icon": "fog"
    },

    "751": {
        "label": "sand",
        "icon": "cloudy-gusts"
    },

    "761": {
        "label": "dust",
        "icon": "dust"
    },

    "762": {
        "label": "volcanic ash",
        "icon": "smog"
    },

    "771": {
        "label": "squalls",
        "icon": "day-windy"
    },

    "781": {
        "label": "tornado",
        "icon": "tornado"
    },

    "800": {
        "label": "clear sky",
        "icon": "sunny"
    },

    "801": {
        "label": "few clouds",
        "icon": "cloudy"
    },

    "802": {
        "label": "scattered clouds",
        "icon": "cloudy"
    },

    "803": {
        "label": "broken clouds",
        "icon": "cloudy"
    },

    "804": {
        "label": "overcast clouds",
        "icon": "cloudy"
    },


    "900": {
        "label": "tornado",
        "icon": "tornado"
    },

    "901": {
        "label": "tropical storm",
        "icon": "hurricane"
    },

    "902": {
        "label": "hurricane",
        "icon": "hurricane"
    },

    "903": {
        "label": "cold",
        "icon": "snowflake-cold"
    },

    "904": {
        "label": "hot",
        "icon": "hot"
    },

    "905": {
        "label": "windy",
        "icon": "windy"
    },

    "906": {
        "label": "hail",
        "icon": "hail"
    },

    "951": {
        "label": "calm",
        "icon": "sunny"
    },

    "952": {
        "label": "light breeze",
        "icon": "cloudy-gusts"
    },

    "953": {
        "label": "gentle breeze",
        "icon": "cloudy-gusts"
    },

    "954": {
        "label": "moderate breeze",
        "icon": "cloudy-gusts"
    },

    "955": {
        "label": "fresh breeze",
        "icon": "cloudy-gusts"
    },

    "956": {
        "label": "strong breeze",
        "icon": "cloudy-gusts"
    },

    "957": {
        "label": "high wind, near gale",
        "icon": "cloudy-gusts"
    },

    "958": {
        "label": "gale",
        "icon": "cloudy-gusts"
    },

    "959": {
        "label": "severe gale",
        "icon": "cloudy-gusts"
    },

    "960": {
        "label": "storm",
        "icon": "thunderstorm"
    },

    "961": {
        "label": "violent storm",
        "icon": "thunderstorm"
    },

    "962": {
        "label": "hurricane",
        "icon": "cloudy-gusts"
    }
}

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
    precipitation: {
        param1: 'rain',
        param1a: 'snow',
        param2: '3h'
    },
    snow: {
        param1: 'snow',
        param2: '3h'
    },
    date: {
        param1: 'dt'
    }
}

function loadData(url, button = submitBtn ) {
    button.classList.add('elem-is-busy');
    button.disable = true;

    //ajax(url)
    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res)
            }
            })
        .then(data => {
            console.log(data);
            let timeStamp = new Date().getTime();
            let tempBox = {
                data: data,
                timeStamp: timeStamp
            }
            return tempBox
        })
        .then(function (tempBox) {
            addTolocalStorageTempBox(tempBox.data, tempBox.timeStamp);
            return tempBox
        })
        // .then(function(tempBox) {
        //     var prefix = 'wi wi-';
        //     var code = tempBox.data.weather[0].id;
        //     var icon = weatherIcons[code].icon;

        //     // If we are not in the ranges mentioned above, add a day/night prefix.
        //     if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        //       icon = 'day-' + icon;
        //     }

        //     // Finally tack on the prefix.
        //     tempBox.icon = prefix + icon;

        //     return tempBox
        //   })
        .then(function (tempBox) {
            //dodawanie danych do formularza
            addDataToForm(tempBox.data, tempBox.timeStamp);
        })
        .catch(function (err) {
            console.error('Coś poszło nie tak', err);
            alert(err.statusText);
        })
        .finally(function() {
            setTimeout(function () {
                button.classList.remove('elem-is-busy');
                button.disable = false;
            }, 400);
        })

}

document.addEventListener('keypress', function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') getWeatherData();
});

submitBtn.addEventListener('click', getWeatherData);

function getWeatherData() {
    let input = formInput.value.trim();
    let button = submitBtn;
    if (input) {
        loadData(requestURLbyCityName(input), button);
    }
    formInput.value = "";

    ///addNewMarkerOnMap.call(ajax, data);
    //addNewMarkerOnMap( localStorageTempBox.dataArray[localStorageTempBox.dataArray.length - 1].city.coord.lat, localStorageTempBox.dataArray[localStorageTempBox.dataArray.length - 1].city.coord.lon);
}

function requestURLbyCityName(cityName) {
    return "http://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
        // ",pl" +
        "&units=metric"
        + "&type=accurate"
        + "&lang=pl"
        + "&APPID=" + openWeatherMapKey;
}

function requestURLbyCoord(lat, lgn) {
    return "http://api.openweathermap.org/data/2.5/forecast?" 
        + "lat=" + lat
        + "&lon=" + lgn
        + "&units=metric"
        + "&type=accurate"
        + "&lang=pl"
        + "&APPID=" + openWeatherMapKey;
}

//http://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&units=metric&type=accurate&lang=pl&APPID=63114ede4fe9d0ef94dc19e2f6f43270




// function ajax(url) {
//     return new Promise(function (resolve, reject) {
//         const xhr = new XMLHttpRequest();
//         xhr.open("GET", url);
//         xhr.onload = function () {
//             if (this.status === 200 && this.statusText == "OK") {
//                 resolve(xhr.response);
//             } else {
//                 reject({
//                     status: this.status,
//                     statusText: xhr.statusText
//                 });
//                 alert(this.statusText);
//             }
//         }
//         xhr.send();
//     });
// }

function addDataToForm(data, timeStamp) {
    let row = document.createElement("article");
    console.log(data);
    row.dataset.id = timeStamp;
    row.innerHTML = `<div class="card">
                            <div class="card-header">
                                    <div class="row">
                                            <dvi class="col col_1">
                                                <p>
                                                    <button class="coordBtn btn btn-dark btn-sm" data-lat="${data.city.coord.lat}" data-lon="${data.city.coord.lon}">
                                                        \u03D5: ${data.city.coord.lat}<br>
                                                        \u03BB: ${data.city.coord.lon}
                                                    </button>
                                                </p>
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
    mainContent.insertBefore(row, mainContent.firstChild);
    row.querySelector(".removeBtn").addEventListener('click', removePosition);
    row.querySelector(".more-info").addEventListener('click', createChart(timeStamp));
    row.querySelector(".coordBtn").addEventListener('click', goToPlaceOnTheMap);
    
}

function addTolocalStorageTempBox(data, timeStamp) {
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
        data.forEach(function (elem) {
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
    localStorageTempBox.dataArray.forEach(function (data, index) {
        if (data.id == positionID) {
            localStorageTempBox.dataArray.splice(index, 1);
        }
    });
    selectPosition.remove();
}

readDataFromLocalStorage(localStorageTempBox.dataArray);

window.onbeforeunload = function () {
    localStorage.setItem("myWeatherApp", JSON.stringify(localStorageTempBox));
}

//--------------------------------- charts-------------------------



function createChart(timeStamp) {
    //console.log('posycja',timeStamp);
    var ctx = document.getElementById("myChart-" + timeStamp).getContext('2d');
    var gradientFill = ctx.createLinearGradient(0, 500, 0, 0);
    //gradientFill.addColorStop(0, "rgba(3,34,40, 0.85)");
    gradientFill.addColorStop(0.1, "rgba(16,70,120, 0.5)");
    gradientFill.addColorStop(0.5, "rgba(199,188,40, 0.5)");
    gradientFill.addColorStop(1, "rgba(199, 36, 33, 0.6)");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: insertDataLabel(localStorageTempBox.dataArray, typeOfWeatherData.date, timeStamp),
            datasets: [{
                label: 'Precipitation',
                data: insertWeatherData(localStorageTempBox.dataArray, typeOfWeatherData.precipitation, timeStamp),
                backgroundColor: 'rgba(21,91,130, 0.8)',
                borderColor: 'rgba(10,10,10,1)',
                fillColor: "rgba(3,20,50, 0.9)",
                borderWidth: 1.5,
                yAxisID: 'y-axis-2',
            }, {
                label: 'Temperature',
                data: insertWeatherData(localStorageTempBox.dataArray, typeOfWeatherData.temp, timeStamp),
                backgroundColor: gradientFill,
                fill: 'origin',
                borderColor: 'rgba(18,28,33,1)',
                borderWidth: 1.5,
                type: 'line',
                pointBorderColor: 'rgba(10,10,10,1)',
                pointBackgroundColor: "#ef6b45",
                pointHoverBackgroundColor: "#ef6b45",
                pointBorderWidth: 1,
                pointRadius: 3,
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
                    ticks: {
                        min: 0,
                        max: 20
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Precipitation [mm/m2]'
                    },
                    gridLines: {
                        display: false,
                    }
                }, {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature [\u00B0C]'
                    },
                    gridLines: {
                        zeroLineColor: "black",
                        zeroLineWidth: 1,
                    },
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 10,
                        fontFamily: 'Arial',
                        maxRotation: 90,
                        minRotation: 90,
                        padding: 5
                    },
                    display: true,
                    gridLines: {
                        display: true,
                        drawBorder: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                    },


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
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        var val = 0;
                        if (tooltipItem.yLabel) {
                            val = tooltipItem.yLabel;
                        } else {
                            val = 0;
                        }
                        label += Math.round(val * 100) / 100;

                        return label;
                    },

                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },

        }
    });  
}



function insertWeatherData(data, obj, id) {
    let array = [];
    let formDataID = id;
    let param1 = obj.param1;
    let param1a = obj.param1a;
    let param2 = obj.param2;
    data.forEach(function (el) {
        if (el.id == formDataID) {
            el.list.forEach(function (id) {
                if (id.hasOwnProperty(param1)) {
                    array.push(id[param1][param2]);
                } else if(id.hasOwnProperty(param1a)) {
                    array.push(id[param1a][param2]);
                } else {
                    array.push(undefined);
                }
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
    data.forEach(function (el) {
        if (el.id == formDataID) {
            el.list.forEach(function (id) {
                let num = Number(id[param1]) * 1000;
                let date = new Date(num);
                //console.log(date);
                let splitDate = date.toString().split(' ');

                let shortDate = splitDate[0] + ' ' + splitDate[2] + '-' + splitDate[1] + '\n' + splitDate[4].substr(0, 5);
                //console.log(shortDate );
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
    let cityNameList = localStorageTempBox.dataArray.map(function (el) {
        return el.city.name;
    });
    console.log(cityNameList);
    localStorageTempBox = { dataArray: [] };
    cityNameList.forEach(async function (cityName) {
        await loadData(requestURLbyCityName(cityName), button);
    });
}





//---------------------------------  MAP -------------------------

var map = L.map('mapid').setView([51, 21], 5);
let markerGroup = L.layerGroup().addTo(map);
const mapWIndow = document.getElementById('mapid');
const resizeMap = document.getElementById('resizeMap');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
resizeMap.addEventListener('click', resizeMapWindow);
map.on('click', onMapClick);

function resizeMapWindow(e) {
    e.stopPropagation();
    mapWIndow.style.height = mapWIndow.style.height == '400px' ? '250px' : '400px';
    resizeMap.childNodes[0].style.transform = resizeMap.childNodes[0].style.transform == 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
}

function onMapClick(e) {
    if (mapMarker) markerGroup.removeLayer(mapMarker);
    map.setView(e.latlng);
    mapMarker = L.marker(e.latlng).addTo(markerGroup);
    loadData(requestURLbyCoord(e.latlng.lat, e.latlng.lng));
    console.log(e.latlng);
}

function addNewMarkerOnMap(latitude,longitude){
    if (mapMarker) markerGroup.removeLayer(mapMarker);
    let lat = latitude;
    let lng = longitude;
    map.setView([lat, lng], 9);
    mapMarker = L.marker([lat, lng]).addTo(markerGroup);
}

function goToPlaceOnTheMap(e) {
   // mapWIndow.style.height = '250px';
    window.scrollTo(0,0);
    if (mapMarker) markerGroup.removeLayer(mapMarker);
    let lat = this.dataset.lat;
    let lon = this.dataset.lon;
    map.setView([lat, lon], 9);
    mapMarker = L.marker([lat, lon]).addTo(markerGroup);

}