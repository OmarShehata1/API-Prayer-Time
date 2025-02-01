function changeTheme(theme) {
  document.body.className = theme;
}

// Format date in Arabic
const formatDate = () => {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("ar-SA", options);
};

document.getElementById("currentDate").textContent = formatDate();

let cities = [
  {
    arabicName: "الرياض",
    name: "Ar Riyāḍ",
  },
  {
    arabicName: "القصيم",
    name: "Al Qaşīm",
  },
  {
    arabicName: "الشرقيه",
    name: "Ash Sharqīyah",
  },
  {
    arabicName: "المدينه",
    name: "	Al Madīnah al Munawwarah",
  },
  {
    arabicName: "مكه",
    name: "Makkah al Mukarramah",
  },
];

for (let city of cities) {
  let option = document.createElement("option");
  option.textContent = city.arabicName;
  option.value = city.arabicName;
  document.getElementById("citySelect").appendChild(option);
}

document.getElementById("citySelect").addEventListener("change", function () {
  let cityName = "";
  for (let city of cities) {
    if (city.arabicName === this.value) {
      cityName = city.name;
      break;
    }
  }
  getPrayersTimingOfCity(cityName);
});

function getPrayersTimingOfCity(cityName) {
  let params = {
    country: "saudi arabia",
    city: cityName,
  };

  axios
    .get("https://api.aladhan.com/v1/calendarByCity", {
      params: params,
    })
    .then(function (response) {
      const timings = response.data.data[0].timings;
      document.getElementById("fajr").textContent = timings.Fajr;
      fillTimeForPrayer("fajr", timings.Fajr);
      fillTimeForPrayer("sunrise", timings.Sunrise);
      fillTimeForPrayer("dhuhr", timings.Dhuhr);
      fillTimeForPrayer("asr", timings.Asr);
      fillTimeForPrayer("maghrib", timings.Maghrib);
      fillTimeForPrayer("isha", timings.Isha);

      // console.log(response.data.data[0].timings.Fajr);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getPrayersTimingOfCity("Makkah al Mukarramah");
function fillTimeForPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}
