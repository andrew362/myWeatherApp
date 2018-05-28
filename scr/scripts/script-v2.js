const openWeatherMapKey = "63114ede4fe9d0ef94dc19e2f6f43270";
const mainContent = document.getElementById('mainContent');
const formInput = document.getElementById('formInput');
const submitBtn = document.getElementById('submitBtn');
let mapMarker = {};
let mapMarkerFlag = false;
let localStorageTempBox = JSON.parse(localStorage.getItem('myWeatherApp')) || { dataArray: [] };
console.log(localStorageTempBox);

const weatherDataIcon = {
    "wi-day-sunny" : "\uf00d",
    "wi-day-cloudy" : "\uf002",
    "wi-day-cloudy-gusts" : "\uf000",
    "wi-day-cloudy-windy" : "\uf001",
    "wi-day-fog" : "\uf003",
    "wi-day-hail" : "\uf004",
    "wi-day-haze" : "\uf0b6",
    "wi-day-lightning" : "\uf005",
    "wi-day-rain" : "\uf008",
    "wi-day-rain-mix" : "\uf006",
    "wi-day-rain-wind" : "\uf007",
    "wi-day-showers" : "\uf009",
    "wi-day-sleet" : "\uf0b2",
    "wi-day-sleet-storm" : "\uf068",
    "wi-day-snow" : "\uf00a",
    "wi-day-snow-thunderstorm" : "\uf06b",
    "wi-day-snow-wind" : "\uf065",
    "wi-day-sprinkle" : "\uf00b",
    "wi-day-storm-showers" : "\uf00e",
    "wi-day-sunny-overcast" : "\uf00c",
    "wi-day-thunderstorm" : "\uf010",
    "wi-day-windy" : "\uf085",
    "wi-solar-eclipse" : "\uf06e",
    "wi-hot" : "\uf072",
    "wi-day-cloudy-high" : "\uf07d",
    "wi-day-light-wind" : "\uf0c4",
    "wi-night-clear" : "\uf02e",
    "wi-night-alt-cloudy" : "\uf086",
    "wi-night-alt-cloudy-gusts" : "\uf022",
    "wi-night-alt-cloudy-windy" : "\uf023",
    "wi-night-alt-hail" : "\uf024",
    "wi-night-alt-lightning" : "\uf025",
    "wi-night-alt-rain" : "\uf028",
    "wi-night-alt-rain-mix" : "\uf026",
    "wi-night-alt-rain-wind" : "\uf027",
    "wi-night-alt-showers" : "\uf029",
    "wi-night-alt-sleet" : "\uf0b4",
    "wi-night-alt-sleet-storm" : "\uf06a",
    "wi-night-alt-snow" : "\uf02a",
    "wi-night-alt-snow-thunderstorm" : "\uf06d",
    "wi-night-alt-snow-wind" : "\uf067",
    "wi-night-alt-sprinkle" : "\uf02b",
    "wi-night-alt-storm-showers" : "\uf02c",
    "wi-night-alt-thunderstorm" : "\uf02d",
    "wi-night-cloudy" : "\uf031",
    "wi-night-cloudy-gusts" : "\uf02f",
    "wi-night-cloudy-windy" : "\uf030",
    "wi-night-fog" : "\uf04a",
    "wi-night-hail" : "\uf032",
    "wi-night-lightning" : "\uf033",
    "wi-night-partly-cloudy" : "\uf083",
    "wi-night-rain" : "\uf036",
    "wi-night-rain-mix" : "\uf034",
    "wi-night-rain-wind" : "\uf035",
    "wi-night-showers" : "\uf037",
    "wi-night-sleet" : "\uf0b3",
    "wi-night-sleet-storm" : "\uf069",
    "wi-night-snow" : "\uf038",
    "wi-night-snow-thunderstorm" : "\uf06c",
    "wi-night-snow-wind" : "\uf066",
    "wi-night-sprinkle" : "\uf039",
    "wi-night-storm-showers" : "\uf03a",
    "wi-night-thunderstorm" : "\uf03b",
    "wi-lunar-eclipse" : "\uf070",
    "wi-stars" : "\uf077",
    "wi-storm-showers" : "\uf01d",
    "wi-thunderstorm" : "\uf01e",
    "wi-night-alt-cloudy-high" : "\uf07e",
    "wi-night-cloudy-high" : "\uf080",
    "wi-night-alt-partly-cloudy" : "\uf081",
    "wi-cloud" : "\uf041",
    "wi-cloudy" : "\uf013",
    "wi-cloudy-gusts" : "\uf011",
    "wi-cloudy-windy" : "\uf012",
    "wi-fog" : "\uf014",
    "wi-hail" : "\uf015",
    "wi-rain" : "\uf019",
    "wi-rain-mix" : "\uf017",
    "wi-rain-wind" : "\uf018",
    "wi-showers" : "\uf01a",
    "wi-sleet" : "\uf0b5",
    "wi-snow" : "\uf01b",
    "wi-sprinkle" : "\uf01c",
    "wi-snow-wind" : "\uf064",
    "wi-smog" : "\uf074",
    "wi-smoke" : "\uf062",
    "wi-lightning" : "\uf016",
    "wi-raindrops" : "\uf04e",
    "wi-raindrop" : "\uf078",
    "wi-dust" : "\uf063",
    "wi-snowflake-cold" : "\uf076",
    "wi-windy" : "\uf021",
    "wi-strong-wind" : "\uf050",
    "wi-sandstorm" : "\uf082",
    "wi-earthquake" : "\uf0c6",
    "wi-fire" : "\uf0c7",
    "wi-flood" : "\uf07c",
    "wi-meteor" : "\uf071",
    "wi-tsunami" : "\uf0c5",
    "wi-volcano" : "\uf0c8",
    "wi-hurricane" : "\uf073",
    "wi-tornado" : "\uf056",
    "wi-small-craft-advisory" : "\uf0cc",
    "wi-gale-warning" : "\uf0cd",
    "wi-storm-warning" : "\uf0ce",
    "wi-hurricane-warning" : "\uf0cf",
    "wi-wind-direction" : "\uf0b1",
    "wi-alien" : "\uf075",
    "wi-celsius" : "\uf03c",
    "wi-fahrenheit" : "\uf045",
    "wi-degrees" : "\uf042",
    "wi-thermometer" : "\uf055",
    "wi-thermometer-exterior" : "\uf053",
    "wi-thermometer-internal" : "\uf054",
    "wi-cloud-down" : "\uf03d",
    "wi-cloud-up" : "\uf040",
    "wi-cloud-refresh" : "\uf03e",
    "wi-horizon" : "\uf047",
    "wi-horizon-alt" : "\uf046",
    "wi-sunrise" : "\uf051",
    "wi-sunset" : "\uf052",
    "wi-moonrise" : "\uf0c9",
    "wi-moonset" : "\uf0ca",
    "wi-refresh" : "\uf04c",
    "wi-refresh-alt" : "\uf04b",
    "wi-umbrella" : "\uf084",
    "wi-barometer" : "\uf079",
    "wi-humidity" : "\uf07a",
    "wi-na" : "\uf07b",
    "wi-train" : "\uf0cb",
    "wi-moon-new" : "\uf095",
    "wi-moon-waxing-crescent-1" : "\uf096",
    "wi-moon-waxing-crescent-2" : "\uf097",
    "wi-moon-waxing-crescent-3" : "\uf098",
    "wi-moon-waxing-crescent-4" : "\uf099",
    "wi-moon-waxing-crescent-5" : "\uf09a",
    "wi-moon-waxing-crescent-6" : "\uf09b",
    "wi-moon-first-quarter" : "\uf09c",
    "wi-moon-waxing-gibbous-1" : "\uf09d",
    "wi-moon-waxing-gibbous-2" : "\uf09e",
    "wi-moon-waxing-gibbous-3" : "\uf09f",
    "wi-moon-waxing-gibbous-4" : "\uf0a0",
    "wi-moon-waxing-gibbous-5" : "\uf0a1",
    "wi-moon-waxing-gibbous-6" : "\uf0a2",
    "wi-moon-full" : "\uf0a3",
    "wi-moon-waning-gibbous-1" : "\uf0a4",
    "wi-moon-waning-gibbous-2" : "\uf0a5",
    "wi-moon-waning-gibbous-3" : "\uf0a6",
    "wi-moon-waning-gibbous-4" : "\uf0a7",
    "wi-moon-waning-gibbous-5" : "\uf0a8",
    "wi-moon-waning-gibbous-6" : "\uf0a9",
    "wi-moon-third-quarter" : "\uf0aa",
    "wi-moon-waning-crescent-1" : "\uf0ab",
    "wi-moon-waning-crescent-2" : "\uf0ac",
    "wi-moon-waning-crescent-3" : "\uf0ad",
    "wi-moon-waning-crescent-4" : "\uf0ae",
    "wi-moon-waning-crescent-5" : "\uf0af",
    "wi-moon-waning-crescent-6" : "\uf0b0",
    "wi-moon-alt-new" : "\uf0eb",
    "wi-moon-alt-waxing-crescent-1" : "\uf0d0",
    "wi-moon-alt-waxing-crescent-2" : "\uf0d1",
    "wi-moon-alt-waxing-crescent-3" : "\uf0d2",
    "wi-moon-alt-waxing-crescent-4" : "\uf0d3",
    "wi-moon-alt-waxing-crescent-5" : "\uf0d4",
    "wi-moon-alt-waxing-crescent-6" : "\uf0d5",
    "wi-moon-alt-first-quarter" : "\uf0d6",
    "wi-moon-alt-waxing-gibbous-1" : "\uf0d7",
    "wi-moon-alt-waxing-gibbous-2" : "\uf0d8",
    "wi-moon-alt-waxing-gibbous-3" : "\uf0d9",
    "wi-moon-alt-waxing-gibbous-4" : "\uf0da",
    "wi-moon-alt-waxing-gibbous-5" : "\uf0db",
    "wi-moon-alt-waxing-gibbous-6" : "\uf0dc",
    "wi-moon-alt-full" : "\uf0dd",
    "wi-moon-alt-waning-gibbous-1" : "\uf0de",
    "wi-moon-alt-waning-gibbous-2" : "\uf0df",
    "wi-moon-alt-waning-gibbous-3" : "\uf0e0",
    "wi-moon-alt-waning-gibbous-4" : "\uf0e1",
    "wi-moon-alt-waning-gibbous-5" : "\uf0e2",
    "wi-moon-alt-waning-gibbous-6" : "\uf0e3",
    "wi-moon-alt-third-quarter" : "\uf0e4",
    "wi-moon-alt-waning-crescent-1" : "\uf0e5",
    "wi-moon-alt-waning-crescent-2" : "\uf0e6",
    "wi-moon-alt-waning-crescent-3" : "\uf0e7",
    "wi-moon-alt-waning-crescent-4" : "\uf0e8",
    "wi-moon-alt-waning-crescent-5" : "\uf0e9",
    "wi-moon-alt-waning-crescent-6" : "\uf0ea",
    "wi-moon-0" : "\uf095",
    "wi-moon-1" : "\uf096",
    "wi-moon-2" : "\uf097",
    "wi-moon-3" : "\uf098",
    "wi-moon-4" : "\uf099",
    "wi-moon-5" : "\uf09a",
    "wi-moon-6" : "\uf09b",
    "wi-moon-7" : "\uf09c",
    "wi-moon-8" : "\uf09d",
    "wi-moon-9" : "\uf09e",
    "wi-moon-10" : "\uf09f",
    "wi-moon-11" : "\uf0a0",
    "wi-moon-12" : "\uf0a1",
    "wi-moon-13" : "\uf0a2",
    "wi-moon-14" : "\uf0a3",
    "wi-moon-15" : "\uf0a4",
    "wi-moon-16" : "\uf0a5",
    "wi-moon-17" : "\uf0a6",
    "wi-moon-18" : "\uf0a7",
    "wi-moon-19" : "\uf0a8",
    "wi-moon-20" : "\uf0a9",
    "wi-moon-21" : "\uf0aa",
    "wi-moon-22" : "\uf0ab",
    "wi-moon-23" : "\uf0ac",
    "wi-moon-24" : "\uf0ad",
    "wi-moon-25" : "\uf0ae",
    "wi-moon-26" : "\uf0af",
    "wi-moon-27" : "\uf0b0",
    "wi-time-1" : "\uf08a",
    "wi-time-2" : "\uf08b",
    "wi-time-3" : "\uf08c",
    "wi-time-4" : "\uf08d",
    "wi-time-5" : "\uf08e",
    "wi-time-6" : "\uf08f",
    "wi-time-7" : "\uf090",
    "wi-time-8" : "\uf091",
    "wi-time-9" : "\uf092",
    "wi-time-10" : "\uf093",
    "wi-time-11" : "\uf094",
    "wi-time-12" : "\uf089",
    "wi-direction-up" : "\uf058",
    "wi-direction-up-right" : "\uf057",
    "wi-direction-right" : "\uf04d",
    "wi-direction-down-right" : "\uf088",
    "wi-direction-down" : "\uf044",
    "wi-direction-down-left" : "\uf043",
    "wi-direction-left" : "\uf048",
    "wi-direction-up-left" : "\uf087",
    "wi-wind-beaufort-0" : "\uf0b7",
    "wi-wind-beaufort-1" : "\uf0b8",
    "wi-wind-beaufort-2" : "\uf0b9",
    "wi-wind-beaufort-3" : "\uf0ba",
    "wi-wind-beaufort-4" : "\uf0bb",
    "wi-wind-beaufort-5" : "\uf0bc",
    "wi-wind-beaufort-6" : "\uf0bd",
    "wi-wind-beaufort-7" : "\uf0be",
    "wi-wind-beaufort-8" : "\uf0bf",
    "wi-wind-beaufort-9" : "\uf0c0",
    "wi-wind-beaufort-10" : "\uf0c1",
    "wi-wind-beaufort-11" : "\uf0c2",
    "wi-wind-beaufort-12" : "\uf0c3",
    "wi-yahoo-0" : "\uf056",
    "wi-yahoo-1" : "\uf00e",
    "wi-yahoo-2" : "\uf073",
    "wi-yahoo-3" : "\uf01e",
    "wi-yahoo-4" : "\uf01e",
    "wi-yahoo-5" : "\uf017",
    "wi-yahoo-6" : "\uf017",
    "wi-yahoo-7" : "\uf017",
    "wi-yahoo-8" : "\uf015",
    "wi-yahoo-9" : "\uf01a",
    "wi-yahoo-10" : "\uf015",
    "wi-yahoo-11" : "\uf01a",
    "wi-yahoo-12" : "\uf01a",
    "wi-yahoo-13" : "\uf01b",
    "wi-yahoo-14" : "\uf00a",
    "wi-yahoo-15" : "\uf064",
    "wi-yahoo-16" : "\uf01b",
    "wi-yahoo-17" : "\uf015",
    "wi-yahoo-18" : "\uf017",
    "wi-yahoo-19" : "\uf063",
    "wi-yahoo-20" : "\uf014",
    "wi-yahoo-21" : "\uf021",
    "wi-yahoo-22" : "\uf062",
    "wi-yahoo-23" : "\uf050",
    "wi-yahoo-24" : "\uf050",
    "wi-yahoo-25" : "\uf076",
    "wi-yahoo-26" : "\uf013",
    "wi-yahoo-27" : "\uf031",
    "wi-yahoo-28" : "\uf002",
    "wi-yahoo-29" : "\uf031",
    "wi-yahoo-30" : "\uf002",
    "wi-yahoo-31" : "\uf02e",
    "wi-yahoo-32" : "\uf00d",
    "wi-yahoo-33" : "\uf083",
    "wi-yahoo-34" : "\uf00c",
    "wi-yahoo-35" : "\uf017",
    "wi-yahoo-36" : "\uf072",
    "wi-yahoo-37" : "\uf00e",
    "wi-yahoo-38" : "\uf00e",
    "wi-yahoo-39" : "\uf00e",
    "wi-yahoo-40" : "\uf01a",
    "wi-yahoo-41" : "\uf064",
    "wi-yahoo-42" : "\uf01b",
    "wi-yahoo-43" : "\uf064",
    "wi-yahoo-44" : "\uf00c",
    "wi-yahoo-45" : "\uf00e",
    "wi-yahoo-46" : "\uf01b",
    "wi-yahoo-47" : "\uf00e",
    "wi-yahoo-3200" : "\uf077",
    "wi-forecast-io-clear-day" : "\uf00d",
    "wi-forecast-io-clear-night" : "\uf02e",
    "wi-forecast-io-rain" : "\uf019",
    "wi-forecast-io-snow" : "\uf01b",
    "wi-forecast-io-sleet" : "\uf0b5",
    "wi-forecast-io-wind" : "\uf050",
    "wi-forecast-io-fog" : "\uf014",
    "wi-forecast-io-cloudy" : "\uf013",
    "wi-forecast-io-partly-cloudy-day" : "\uf002",
    "wi-forecast-io-partly-cloudy-night" : "\uf031",
    "wi-forecast-io-hail" : "\uf015",
    "wi-forecast-io-thunderstorm" : "\uf01e",
    "wi-forecast-io-tornado" : "\uf056",
    "wi-wmo4680-0" : "\uf055",
    "wi-wmo4680-00" : "\uf055",
    "wi-wmo4680-1" : "\uf013",
    "wi-wmo4680-01" : "\uf013",
    "wi-wmo4680-2" : "\uf055",
    "wi-wmo4680-02" : "\uf055",
    "wi-wmo4680-3" : "\uf013",
    "wi-wmo4680-03" : "\uf013",
    "wi-wmo4680-4" : "\uf014",
    "wi-wmo4680-04" : "\uf014",
    "wi-wmo4680-5" : "\uf014",
    "wi-wmo4680-05" : "\uf014",
    "wi-wmo4680-10" : "\uf014",
    "wi-wmo4680-11" : "\uf014",
    "wi-wmo4680-12" : "\uf016",
    "wi-wmo4680-18" : "\uf050",
    "wi-wmo4680-20" : "\uf014",
    "wi-wmo4680-21" : "\uf017",
    "wi-wmo4680-22" : "\uf017",
    "wi-wmo4680-23" : "\uf019",
    "wi-wmo4680-24" : "\uf01b",
    "wi-wmo4680-25" : "\uf015",
    "wi-wmo4680-26" : "\uf01e",
    "wi-wmo4680-27" : "\uf063",
    "wi-wmo4680-28" : "\uf063",
    "wi-wmo4680-29" : "\uf063",
    "wi-wmo4680-30" : "\uf014",
    "wi-wmo4680-31" : "\uf014",
    "wi-wmo4680-32" : "\uf014",
    "wi-wmo4680-33" : "\uf014",
    "wi-wmo4680-34" : "\uf014",
    "wi-wmo4680-35" : "\uf014",
    "wi-wmo4680-40" : "\uf017",
    "wi-wmo4680-41" : "\uf01c",
    "wi-wmo4680-42" : "\uf019",
    "wi-wmo4680-43" : "\uf01c",
    "wi-wmo4680-44" : "\uf019",
    "wi-wmo4680-45" : "\uf015",
    "wi-wmo4680-46" : "\uf015",
    "wi-wmo4680-47" : "\uf01b",
    "wi-wmo4680-48" : "\uf01b",
    "wi-wmo4680-50" : "\uf01c",
    "wi-wmo4680-51" : "\uf01c",
    "wi-wmo4680-52" : "\uf019",
    "wi-wmo4680-53" : "\uf019",
    "wi-wmo4680-54" : "\uf076",
    "wi-wmo4680-55" : "\uf076",
    "wi-wmo4680-56" : "\uf076",
    "wi-wmo4680-57" : "\uf01c",
    "wi-wmo4680-58" : "\uf019",
    "wi-wmo4680-60" : "\uf01c",
    "wi-wmo4680-61" : "\uf01c",
    "wi-wmo4680-62" : "\uf019",
    "wi-wmo4680-63" : "\uf019",
    "wi-wmo4680-64" : "\uf015",
    "wi-wmo4680-65" : "\uf015",
    "wi-wmo4680-66" : "\uf015",
    "wi-wmo4680-67" : "\uf017",
    "wi-wmo4680-68" : "\uf017",
    "wi-wmo4680-70" : "\uf01b",
    "wi-wmo4680-71" : "\uf01b",
    "wi-wmo4680-72" : "\uf01b",
    "wi-wmo4680-73" : "\uf01b",
    "wi-wmo4680-74" : "\uf076",
    "wi-wmo4680-75" : "\uf076",
    "wi-wmo4680-76" : "\uf076",
    "wi-wmo4680-77" : "\uf01b",
    "wi-wmo4680-78" : "\uf076",
    "wi-wmo4680-80" : "\uf019",
    "wi-wmo4680-81" : "\uf01c",
    "wi-wmo4680-82" : "\uf019",
    "wi-wmo4680-83" : "\uf019",
    "wi-wmo4680-84" : "\uf01d",
    "wi-wmo4680-85" : "\uf017",
    "wi-wmo4680-86" : "\uf017",
    "wi-wmo4680-87" : "\uf017",
    "wi-wmo4680-89" : "\uf015",
    "wi-wmo4680-90" : "\uf016",
    "wi-wmo4680-91" : "\uf01d",
    "wi-wmo4680-92" : "\uf01e",
    "wi-wmo4680-93" : "\uf01e",
    "wi-wmo4680-94" : "\uf016",
    "wi-wmo4680-95" : "\uf01e",
    "wi-wmo4680-96" : "\uf01e",
    "wi-wmo4680-99" : "\uf056",
    "wi-owm-200" : "\uf01e",
    "wi-owm-201" : "\uf01e",
    "wi-owm-202" : "\uf01e",
    "wi-owm-210" : "\uf016",
    "wi-owm-211" : "\uf016",
    "wi-owm-212" : "\uf016",
    "wi-owm-221" : "\uf016",
    "wi-owm-230" : "\uf01e",
    "wi-owm-231" : "\uf01e",
    "wi-owm-232" : "\uf01e",
    "wi-owm-300" : "\uf01c",
    "wi-owm-301" : "\uf01c",
    "wi-owm-302" : "\uf019",
    "wi-owm-310" : "\uf017",
    "wi-owm-311" : "\uf019",
    "wi-owm-312" : "\uf019",
    "wi-owm-313" : "\uf01a",
    "wi-owm-314" : "\uf019",
    "wi-owm-321" : "\uf01c",
    "wi-owm-500" : "\uf01c",
    "wi-owm-501" : "\uf019",
    "wi-owm-502" : "\uf019",
    "wi-owm-503" : "\uf019",
    "wi-owm-504" : "\uf019",
    "wi-owm-511" : "\uf017",
    "wi-owm-520" : "\uf01a",
    "wi-owm-521" : "\uf01a",
    "wi-owm-522" : "\uf01a",
    "wi-owm-531" : "\uf01d",
    "wi-owm-600" : "\uf01b",
    "wi-owm-601" : "\uf01b",
    "wi-owm-602" : "\uf0b5",
    "wi-owm-611" : "\uf017",
    "wi-owm-612" : "\uf017",
    "wi-owm-615" : "\uf017",
    "wi-owm-616" : "\uf017",
    "wi-owm-620" : "\uf017",
    "wi-owm-621" : "\uf01b",
    "wi-owm-622" : "\uf01b",
    "wi-owm-701" : "\uf01a",
    "wi-owm-711" : "\uf062",
    "wi-owm-721" : "\uf0b6",
    "wi-owm-731" : "\uf063",
    "wi-owm-741" : "\uf014",
    "wi-owm-761" : "\uf063",
    "wi-owm-762" : "\uf063",
    "wi-owm-771" : "\uf011",
    "wi-owm-781" : "\uf056",
    "wi-owm-800" : "\uf00d",
    "wi-owm-801" : "\uf011",
    "wi-owm-802" : "\uf011",
    "wi-owm-803" : "\uf012",
    "wi-owm-804" : "\uf013",
    "wi-owm-900" : "\uf056",
    "wi-owm-901" : "\uf01d",
    "wi-owm-902" : "\uf073",
    "wi-owm-903" : "\uf076",
    "wi-owm-904" : "\uf072",
    "wi-owm-905" : "\uf021",
    "wi-owm-906" : "\uf015",
    "wi-owm-957" : "\uf050",
    "wi-owm-day-200" : "\uf010",
    "wi-owm-day-201" : "\uf010",
    "wi-owm-day-202" : "\uf010",
    "wi-owm-day-210" : "\uf005",
    "wi-owm-day-211" : "\uf005",
    "wi-owm-day-212" : "\uf005",
    "wi-owm-day-221" : "\uf005",
    "wi-owm-day-230" : "\uf010",
    "wi-owm-day-231" : "\uf010",
    "wi-owm-day-232" : "\uf010",
    "wi-owm-day-300" : "\uf00b",
    "wi-owm-day-301" : "\uf00b",
    "wi-owm-day-302" : "\uf008",
    "wi-owm-day-310" : "\uf008",
    "wi-owm-day-311" : "\uf008",
    "wi-owm-day-312" : "\uf008",
    "wi-owm-day-313" : "\uf008",
    "wi-owm-day-314" : "\uf008",
    "wi-owm-day-321" : "\uf00b",
    "wi-owm-day-500" : "\uf00b",
    "wi-owm-day-501" : "\uf008",
    "wi-owm-day-502" : "\uf008",
    "wi-owm-day-503" : "\uf008",
    "wi-owm-day-504" : "\uf008",
    "wi-owm-day-511" : "\uf006",
    "wi-owm-day-520" : "\uf009",
    "wi-owm-day-521" : "\uf009",
    "wi-owm-day-522" : "\uf009",
    "wi-owm-day-531" : "\uf00e",
    "wi-owm-day-600" : "\uf00a",
    "wi-owm-day-601" : "\uf0b2",
    "wi-owm-day-602" : "\uf00a",
    "wi-owm-day-611" : "\uf006",
    "wi-owm-day-612" : "\uf006",
    "wi-owm-day-615" : "\uf006",
    "wi-owm-day-616" : "\uf006",
    "wi-owm-day-620" : "\uf006",
    "wi-owm-day-621" : "\uf00a",
    "wi-owm-day-622" : "\uf00a",
    "wi-owm-day-701" : "\uf009",
    "wi-owm-day-711" : "\uf062",
    "wi-owm-day-721" : "\uf0b6",
    "wi-owm-day-731" : "\uf063",
    "wi-owm-day-741" : "\uf003",
    "wi-owm-day-761" : "\uf063",
    "wi-owm-day-762" : "\uf063",
    "wi-owm-day-771" : "\uf000",
    "wi-owm-day-781" : "\uf056",
    "wi-owm-day-800" : "\uf00d",
    "wi-owm-day-801" : "\uf000",
    "wi-owm-day-802" : "\uf000",
    "wi-owm-day-803" : "\uf000",
    "wi-owm-day-804" : "\uf00c",
    "wi-owm-day-900" : "\uf056",
    "wi-owm-day-901" : "\uf00e",
    "wi-owm-day-902" : "\uf073",
    "wi-owm-day-903" : "\uf076",
    "wi-owm-day-904" : "\uf072",
    "wi-owm-day-905" : "\uf0c4",
    "wi-owm-day-906" : "\uf004",
    "wi-owm-day-957" : "\uf050",
    "wi-owm-night-200" : "\uf02d",
    "wi-owm-night-201" : "\uf02d",
    "wi-owm-night-202" : "\uf02d",
    "wi-owm-night-210" : "\uf025",
    "wi-owm-night-211" : "\uf025",
    "wi-owm-night-212" : "\uf025",
    "wi-owm-night-221" : "\uf025",
    "wi-owm-night-230" : "\uf02d",
    "wi-owm-night-231" : "\uf02d",
    "wi-owm-night-232" : "\uf02d",
    "wi-owm-night-300" : "\uf02b",
    "wi-owm-night-301" : "\uf02b",
    "wi-owm-night-302" : "\uf028",
    "wi-owm-night-310" : "\uf028",
    "wi-owm-night-311" : "\uf028",
    "wi-owm-night-312" : "\uf028",
    "wi-owm-night-313" : "\uf028",
    "wi-owm-night-314" : "\uf028",
    "wi-owm-night-321" : "\uf02b",
    "wi-owm-night-500" : "\uf02b",
    "wi-owm-night-501" : "\uf028",
    "wi-owm-night-502" : "\uf028",
    "wi-owm-night-503" : "\uf028",
    "wi-owm-night-504" : "\uf028",
    "wi-owm-night-511" : "\uf026",
    "wi-owm-night-520" : "\uf029",
    "wi-owm-night-521" : "\uf029",
    "wi-owm-night-522" : "\uf029",
    "wi-owm-night-531" : "\uf02c",
    "wi-owm-night-600" : "\uf02a",
    "wi-owm-night-601" : "\uf0b4",
    "wi-owm-night-602" : "\uf02a",
    "wi-owm-night-611" : "\uf026",
    "wi-owm-night-612" : "\uf026",
    "wi-owm-night-615" : "\uf026",
    "wi-owm-night-616" : "\uf026",
    "wi-owm-night-620" : "\uf026",
    "wi-owm-night-621" : "\uf02a",
    "wi-owm-night-622" : "\uf02a",
    "wi-owm-night-701" : "\uf029",
    "wi-owm-night-711" : "\uf062",
    "wi-owm-night-721" : "\uf0b6",
    "wi-owm-night-731" : "\uf063",
    "wi-owm-night-741" : "\uf04a",
    "wi-owm-night-761" : "\uf063",
    "wi-owm-night-762" : "\uf063",
    "wi-owm-night-771" : "\uf022",
    "wi-owm-night-781" : "\uf056",
    "wi-owm-night-800" : "\uf02e",
    "wi-owm-night-801" : "\uf022",
    "wi-owm-night-802" : "\uf022",
    "wi-owm-night-803" : "\uf022",
    "wi-owm-night-804" : "\uf086",
    "wi-owm-night-900" : "\uf056",
    "wi-owm-night-901" : "\uf03a",
    "wi-owm-night-902" : "\uf073",
    "wi-owm-night-903" : "\uf076",
    "wi-owm-night-904" : "\uf072",
    "wi-owm-night-905" : "\uf021",
    "wi-owm-night-906" : "\uf024",
    "wi-owm-night-957" : "\uf050",
    "wi-wu-chanceflurries" : "\uf064",
    "wi-wu-chancerain" : "\uf019",
    "wi-wu-chancesleat" : "\uf0b5",
    "wi-wu-chancesnow" : "\uf01b",
    "wi-wu-chancetstorms" : "\uf01e",
    "wi-wu-clear" : "\uf00d",
    "wi-wu-cloudy" : "\uf002",
    "wi-wu-flurries" : "\uf064",
    "wi-wu-hazy" : "\uf0b6",
    "wi-wu-mostlycloudy" : "\uf002",
    "wi-wu-mostlysunny" : "\uf00d",
    "wi-wu-partlycloudy" : "\uf002",
    "wi-wu-partlysunny" : "\uf00d",
    "wi-wu-rain" : "\uf01a",
    "wi-wu-sleat" : "\uf0b5",
    "wi-wu-snow" : "\uf01b",
    "wi-wu-sunny" : "\uf00d",
    "wi-wu-tstorms" : "\uf01e",
    "wi-wu-unknown" : "\uf00d"
}

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
        .then(function (tempBox) {
            //dodawanie danych do formularza
            console.log(tempBox.data);
            addDataToForm(tempBox.data, tempBox.timeStamp);
            if (mapMarkerFlag) {
                addNewMarkerOnMap(tempBox.data.city.coord.lat,tempBox.data.city.coord.lon)
            }
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
            mapMarkerFlag = false;
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
    mapMarkerFlag = true;
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
    //console.log(data);
    row.dataset.id = timeStamp;
    row.innerHTML = `<div class="card">
                            <div class="card-header" style="background-image: url('./img/backgrounds/${data.list[0].weather[0].icon}.jpg'); background-size: cover; background-position:center center;">
                                    <div class="row">
                                            <dvi class="col col_1">
                                                <p>
                                                    <button class="coordBtn btn-info btn" data-lat="${data.city.coord.lat}" data-lon="${data.city.coord.lon}">
                                                    <div>
                                                        <img src="./img/map.svg" />
                                                    </div>
                                                    <div>  
                                                        \u03D5: ${Number(data.city.coord.lat).toFixed(2)}<br>
                                                        \u03BB: ${Number(data.city.coord.lon).toFixed(2)}
                                                    </div>
                                                    </button>
                                                </p>
                                            </dvi>
                                            <div class="col col_2">
                                                <div class="col_2_top">
                                                    <p>${data.city.name}</p>
                                                </div>
                                                <div class="col col_2_bottom">
                                                    <p>Zachmurzenie: <span>${data.list[0].clouds.all} %</span></p>
                                                    <p>CIśnienie: <span>${data.list[0].main.pressure} hPa</span></p>
                                                    <p>Wiatr: <span>${data.list[0].wind.speed} m/s</span></p>
                                                </div>
                                            </div>
                                            <div class="col col_3-left">
                                                <div class="temp">   
                                                    <p>${Number(data.list[0].main.temp).toFixed(1)}\u00B0C</p>
                                                </div>
                                                <div class="desc">
                                                    <p>${insertDataIcon(localStorageTempBox.dataArray, timeStamp).descBox[0]}</p>
                                                </div>
                                            </div>
                                            <div class="col col_3-right">
                                                <div>
                                                    <p>${insertDataIcon(localStorageTempBox.dataArray, timeStamp).iconBox[0]}</p>
                                                </div>
                                            </div>
                                            <div class="col col_4">
                                                <button class="btn btn-info more-info"  type="button"  data-toggle="collapse" data-target="#collapse-${timeStamp}">
                                                    Więcej
                                                </button>
                                                <button class="btn btn-danger removeBtn">Usuń</button>
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
            //labels: insertDataIcon(localStorageTempBox.dataArray, timeStamp),
            datasets: [               
                {
                    label: 'Opis',
                    data: insertDataIcon(localStorageTempBox.dataArray, timeStamp).descBox,
                    yAxisID: 'y-axis-1',
                    xAxisID: 'x-axis-1'
                },
                {
                label: 'Opady',
                data: insertWeatherData(localStorageTempBox.dataArray, typeOfWeatherData.precipitation, timeStamp),
                backgroundColor: 'rgba(21,91,130, 0.8)',
                borderColor: 'rgba(10,10,10,1)',
                fillColor: "rgba(3,20,50, 0.9)",
                borderWidth: 1.5,
                yAxisID: 'y-axis-2',
                xAxisID: 'x-axis-1'
            }, {
                label: 'Temperatura',
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
                xAxisID: 'x-axis-2'
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
                        labelString: 'Opady [mm/m2]'
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
                        labelString: 'Temperatura [\u00B0C]'
                    },
                    gridLines: {
                        zeroLineColor: "black",
                        zeroLineWidth: 1,
                    },
                }],
                xAxes: [{
                    barPercentage: 2,
                    position: 'bottom',
                    id: 'x-axis-1',
                    ticks: {
                        fontSize: 10,
                        fontFamily: 'Arial',
                        maxRotation: 90,
                        minRotation: 90,
                        padding: 5,
                        showLabelBackdrop: true,
                        backdropColor: 'black',
                    },
                    display: true,
                    gridLines: {
                        display: true,
                        drawBorder: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                    },
                    
                },
                {   type: 'category',
                    labels: insertDataIcon(localStorageTempBox.dataArray, timeStamp).iconBox,
                    position: 'top',
                    id: 'x-axis-2',
                    ticks: {
                        fontFamily: 'weathericons',
                        fontSize: 20,
                        fontColor: '#17a2b8',
                        padding: -10,
                        maxRotation: 0,
                        minRotation: 0,
                        major: {
                            callback: function(value, index, values) {
                                //console.log(value, index);
                                //console.log(timeStamp);
                                return value;
                            }
                        }
                       
                    },
                    display: true,
                    gridLines: {
                        display: false,
                    },
                }],
            },
            animation: {
                duration: 400, // general animation time
            },
            responsiveAnimationDuration: 400, // animation duration after a resize

            responsive: true,

            tooltips: {
                mode: 'label',
                intersect: false,
                titleFontSize: 15,
                bodyFontSize: 13,
                callbacks: {
                    label: function (tooltipItem, data) {

                        let label = data.datasets[tooltipItem.datasetIndex].label;
                        let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        if (!isNaN(value)) value = Math.round(value * 100) / 100;
                        if (value == undefined) value = 0;
                        return [label + ' : ' + value];       
                    },
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            legend: {
                position: 'top',
                labels: {
                    filter: function(item, chart) {
                        return !item.text.includes('Opis')
                    }
                }
            }

        



            // legendCallback: function(chart) {
            //     var text = []; 
            //     text.push('<ul class="' + chart.id + '-legend">'); 
                
            //     for (var i = 0; i < chart.data.labels.length; i++) { 
            //         text.push('<li><span style="background-color:' + chart.data.labels[i].backgroundColor + '"></span>'); 
            //         console.log('legenda',chart.data);
            //         if (chart.data.datasets[i].label) { 
            //             text.push(chart.data.datasets[i].label); 
            //         } 
            //         text.push('</li>'); 
            //     } 
            //     text.push('</ul>'); 
            //     return text.join(''); 
            // }
            

        } 
    });  
    // document.getElementById('chart-legends').innerHTML = myChart.generateLegend();
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


function insertDataIcon(data, id) {
    //console.log(data);    
    let iconBox = [];  
    var descBox = [];
    let box = {iconBox, descBox};             
    var prefix = 'wi-';
    let formDataID = id;
    data.forEach(function(el){
        if (el.id == formDataID) {
            el.list.forEach(function (id) {

                //console.log(id.weather[0].id,id.sys.pod);
                var code = id.weather[0].id;
                var dayTime = id.sys.pod;
                var icon = '';
                var desc = id.weather[0].description;    
                    // If we are not in the ranges mentioned above, add a day/night prefix.
                // if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                //     icon = 'day-' + icon;
                //     }
                    // Finally tack on the prefix.
                    if(dayTime === 'd') {
                        icon = 'wi-owm-day-' + code;
                    } else if (dayTime === 'n') {
                        icon = 'wi-owm-night-' + code;
                    }

                   // icon = prefix + icon;
                    icon = weatherDataIcon[icon];

                    descBox.push(desc);
                    
                    iconBox.push(icon);
            });
        
        }
    });
    
    return box;
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



// geolokalizacja

function getLocation(position) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position);
    } else {
       alert("Geolocation is not supported by this browser.");
    }
}

function getCurrentPosition() {
    getLocation(function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        //console.log('ssss',lat,lng);
        addNewMarkerOnMap(lat,lng)
    });
}

getCurrentPosition();
