let inputText = document.querySelector(".article input");
let citytemp = document.querySelector(".footer");
let wrapper = document.querySelector(".wrapper");
let icon = document.querySelector(".wrapper .header i");
let button = document.querySelector(".article button");
let headertext = document.querySelector(".wrapper .header p");

inputText.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && inputText.value != "") {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${inputText.value}&appid=5c1ec25f065ef643092feaf602b2da7e&units=metric`;
    console.log(inputText.value);
    fetch(api)
      .then((response) => response.json())
      .then((result) => wheathereapi(result));
    icon.classList.add("fa-solid", "fa-chevron-left");
    headertext.innerHTML = "Konum algılandı";
    headertext.classList.add("success");
    headertext.classList.remove("defined");
  }
});

icon.addEventListener("click", () => {
  wrapper.classList.remove("active");

  citytemp.innerHTML = ``;
  icon.classList.remove("fa-solid", "fa-chevron-left");
});

button.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    console.log("Tarayıcınız desteklemiyor...");
  }
});

function onSuccess(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apigeo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f52ef099198c51b29bfbdd4eac90c511&units=metric`;
  fetch(apigeo)
    .then((response) => response.json())
    .then((result) => wheathereapi(result));
  icon.classList.add("fa-solid", "fa-chevron-left");
  headertext.innerHTML = "Konum algılandı";
  headertext.classList.add("success");
  headertext.classList.remove("defined");
}

function onError(error) {
  headertext.innerHTML = "Konum algılanamıyor";
  headertext.classList.add("defined");
  headertext.classList.remove("success");
}

function wheathereapi(result) {
  if (result.cod == "404") {
    headertext.innerHTML = "Konum algılanamıyor";
    headertext.classList.remove("success");
    headertext.classList.add("defined");
  } else {
    citytemp.innerHTML = `${Math.round(result.main.temp)}°C  ${result.name} `;
    wrapper.classList.add("active");
  }
}
