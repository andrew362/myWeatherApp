const openWeatherMapKey = "63114ede4fe9d0ef94dc19e2f6f43270";
const inputField = document.getElementById("cityName");
const submitBtn = document.getElementById('submitBtn');
const mainTable = document.getElementById('mainTable');
let cityNameTable = readFromLocalStorage() || [];
let listNumber = 0;
submitBtn.addEventListener('click', function () {
    let cityInPoland = inputField.value.trim();
    if (cityInPoland) {
        console.log(cityInPoland);
        fetchingData(requestFunction(cityInPoland));
    }
    inputField.value = '';
});
inputField.addEventListener('keyup', function (e) {
    //console.log(e);
    e.preventDefault();
    if (e.keyCode == '13') {
        let cityInPoland = inputField.value.trim();
        getInputValue(cityInPoland);
    }
});

function requestFunction(town) {

    return "http://api.openweathermap.org/data/2.5/forecast?q=" +
        town +
        ",pl" +
        "&units=metric" 
        + "&type=accurate"
        + "&lang=pl"
        + "&APPID=" + openWeatherMapKey;
}

Promise.all(cityNameTable.map((city) => getInputValue(city)));

function listNumering() {
    return listNumber++;
}

function getInputValue(city) {
    let cityInPoland = city;
    if (cityInPoland) {
        console.log(cityInPoland);
        fetchingData(requestFunction(cityInPoland));
    }
    inputField.value = '';
}

function startDownloadJson() {
    submitBtn.classList.add('element-is-busy');
    submitBtn.setAttribute('disabled', 'disabled');
}

function endDownloadJson() {
    submitBtn.classList.remove('element-is-busy');
    submitBtn.removeAttribute('disabled');
}

function readFromLocalStorage() {
    let cityTable = [];
    for (var i = 0; i < localStorage.length; i++) {
        var city = localStorage.getItem(localStorage.key(i));
        if ( localStorage.key(i).indexOf('weatherApp_') != -1) {
            cityTable.push(city);
            console.log('dodano');   
        }
    }
    return cityTable;
}

function addToLocalStorage(value) {
    let date = new Date();
    let key = "weatherApp_" + date.getTime();
    localStorage.setItem(key, value);
}

function removePosition() {
    var removingCity = this.closest('article').querySelector('.col_2 p').textContent.trim();
    for (var i = 0; i < localStorage.length; i++) {
        let item = localStorage.getItem(localStorage.key(i));
        if (item == removingCity) {
            localStorage.removeItem(localStorage.key(i));
        }
    }
    this.closest('article').remove();
    location.reload();
}

function averageTemp(data) {
    let sumTemp = 0;
    for (let i = 0; i < data.list.length; i++) {
        sumTemp += data.list[i].main.temp;
    }
    return Math.round(sumTemp / data.list.length);
}

function fetchingData(requestUrl) {
    fetch(requestUrl)
        
        .then(startDownloadJson())
        .then((resp) => {resp.json(); console.log(resp);})
        
        .then(function (data) {
            console.log(data);
            if (data.cod !== '200') {
                alert(data.message);
            } else {
                let avrTemp = Math.round(averageTemp(data));
                let id = listNumering() + 1;
                //dodawanie wierszy do tablicy
                let node = document.createElement("article");
                node.innerHTML = `<div class="row">
                                       <dvi class="col col_1">
                                           <p><strong>${id}</strong></p>
                                       </dvi>
                                       <div class="col col_2">
                                           <p> ${data.city.name} </p>
                                       </div>
                                       <div class="col col_3">
                                           <p>${avrTemp}stC</p>
                                       </div>
                                       <div class="col col_4">
                                           <p><button class="removeBtn">usuń</button></p>
                                       </div>
                                   </div>
                                   <hr>`;
                node.querySelector(".removeBtn").addEventListener('click', removePosition);
                mainTable.appendChild(node);
                if (cityNameTable.indexOf(data.city.name) == -1) addToLocalStorage(data.city.name);
                cityNameTable = readFromLocalStorage();
            }
        })
        .then(setTimeout(endDownloadJson, 500))
        .catch(function (error) {
            console.log(error);
        });
}