console.log("js is connected");

// selecting all required elememt by thier id using querySelector
let input = document.querySelector("#city");
let btn= document.querySelector("#search");
let cityName=document.querySelector("#cityName");
let country=document.querySelector("#country");
let temp=document.querySelector("#temp");
let temp2=document.querySelector("#temp2");
let humid=document.querySelector("#humidity");
let preci=document.querySelector("#preci");
let wind=document.querySelector("#wind");
let date = document.querySelector("#date");
let day= document.querySelector("#day");


let day1 = document.querySelector("#day1");
let day2 = document.querySelector("#day2");
let day3 = document.querySelector("#day3");

let temp3 = document.querySelector("#temp3");
let temp4 = document.querySelector("#temp4");
let temp5 = document.querySelector("#temp5");

let hour1 = document.querySelector("#hour1");
let hour2 = document.querySelector("#hour2");
let hour3 = document.querySelector("#hour3");
let hour4 = document.querySelector("#hour4");
let hour5 = document.querySelector("#hour5");
let hour6 = document.querySelector("#hour6");
let hour7 = document.querySelector("#hour7");
let hour8= document.querySelector("#hour8");

let temp10 = document.querySelector("#temp10");
let temp11 = document.querySelector("#temp11");
let temp12= document.querySelector("#temp12");
let temp13 = document.querySelector("#temp13");
let temp14 = document.querySelector("#temp14");
let temp15= document.querySelector("#temp15");
let temp16= document.querySelector("#temp16");
let temp17= document.querySelector("#temp17");

// extract day name from date 
  function dayName(apiDate){
    let dateObject = new Date(apiDate);
    let dayName = dateObject.toLocaleDateString('en-US', { weekday: 'short' });
    return dayName;
}

// change format of date
 function dateFormat(apiDate){
  let dateObject =new Date(apiDate);
  let date = dateObject.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
      return date;
 }

 //print dayName
 function printDay(dateStr,dayStr){
  let newDay = dayName(dateStr);
  dayStr.innerText=newDay;
 }

//asynchronous function fetch current weather by location from api 
async function getData(city){
  try{
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c5afa270409441d6b9c91551261905&q=${city}`);
    if(response.ok){
      const data = await response.json();
      console.log(data); 

      cityName.innerText=data.location.name;
      country.innerText=data.location.country;
      temp.innerText=data.current.temp_c;
      temp2.innerText=data.current.feelslike_c;
      humid.innerText=data.current.humidity;
      preci.innerText=data.current.precip_mm;
      wind.innerText=data.current.wind_kph;
     

      const date1=data.current.last_updated;

      const newDate=date1.substring(0,10);
      let newDay = dayName(newDate);
      day.innerText=newDay;

      let formatDate = dateFormat(newDate);
      date.innerText = formatDate;
    }
    else{
      throw new Error("failed to fetch data");
    }
  }
  catch(error){
    console.error("Error",error);
  }
}

//function to fetch 7days forecast
async function dailyData(city){
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c5afa270409441d6b9c91551261905&q=${city}&days=3`);
      if(response.ok){
        const data = await response.json();
        console.log(data);

      const date1=data.forecast.forecastday[0].date;
      const date2=data.forecast.forecastday[1].date;
      const date3=data.forecast.forecastday[2].date;

      printDay(date1,day1);
      printDay(date2,day2);
      printDay(date3,day3);

       temp3.innerText=data.forecast.forecastday[0].day.maxtemp_c;
       temp4.innerText=data.forecast.forecastday[1].day.maxtemp_c;
       temp5.innerText=data.forecast.forecastday[2].day.maxtemp_c;


       console.log(data.forecast.forecastday[0].hour[12].temp_c);
       const time=data.current.last_updated;

       const newTime=Number(time.substring(11,13));
        console.log(newTime);

      hour1.innerText=(newTime+0)%24 + ":00";
      hour2.innerText=(newTime+1)%24 +":00";
      hour3.innerText=(newTime+2)%24 +":00";
      hour4.innerText=(newTime+3)%24 +":00";
      hour5.innerText=(newTime+4)%24 +":00";
      hour6.innerText=(newTime+5)%24 +":00";
      hour7.innerText=(newTime+6)%24 +":00";
      hour8.innerText=(newTime+7)%24 +":00";

      temp10.innerText=data.forecast.forecastday[0].hour[(newTime+0)%24].temp_c;
      temp11.innerText=data.forecast.forecastday[0].hour[(newTime+1)%24].temp_c;
      temp12.innerText=data.forecast.forecastday[0].hour[(newTime+2)%24].temp_c;
      temp13.innerText=data.forecast.forecastday[0].hour[(newTime+3)%24].temp_c;
      temp14.innerText=data.forecast.forecastday[0].hour[(newTime+4)%24].temp_c;
      temp15.innerText=data.forecast.forecastday[0].hour[(newTime+5)%24].temp_c;
      temp16.innerText=data.forecast.forecastday[0].hour[(newTime+6)%24].temp_c;
      temp17.innerText=data.forecast.forecastday[0].hour[(newTime+7)%24].temp_c; 
      }
      else{
        throw new Error("Failed");
      }
    } catch (error) {
      console.error("error",error);
    }
}

btn.addEventListener("click",function(){
     let city = input.value;
       console.log(city);
       if(city){
        getData(city);
        dailyData(city);
       }
});
getData("New Delhi");
dailyData("New Delhi");