import React from "react";
import cloudy from "../assets/cloudy.jpg";
import sunny from "../assets/sunny.jpg";
import rainy from "../assets/rainy.jpg";
import winter from "../assets/winter.jpg";
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import { useState } from "react";

const Navbar = () => {
  let key = "2afe7b75c3067557ba712fd43ec62090"
  const [city, setCity] = useState("");
  const [data, setdata] = useState({})
  
  const handlechange = (e)=>{
    setCity(e.target.value)
   
   
  }
  const search = async()=>{
   
   if(city.length<2){
    alert("Enter a Valid city name")
   }
   else {
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${key}`
    let response = await fetch(url)
    let Info = await response.json()
   let temp = Info.main.temp
   let humidity = Info.main.humidity
   let wind=Info.wind.speed
   setdata({...data,Name:city,t:temp,h:humidity,w:wind
   })

   }
   
    
     setCity('')
    
    
  }

  return (
    <div className="weather container m-auto mt-14 w-[900px] h-[500px]  ">
      <div
        style={{
          backgroundImage: `url(${sunny})`,
          width: "900px",
          height: "600px",
        }}
      >
        <div className="searchbar flex justify-center pt-24">
          <input
            type="text"
            className="border border-black rounded-lg mr-5 w-72 p-2"
            placeholder="City"
            onChange={handlechange}
            value={city}
            name="city"
          />
          <span onClick={()=>{search()}} className="" >
            <lord-icon
              src="https://cdn.lordicon.com/fkdzyfle.json"
              trigger="hover"
              style={{ width: "35px", height: "35px", cursor: "pointer" }}
            ></lord-icon>
          </span>

        </div>

        {data.t>-100 ||data.t<100 ? 
          (
            <>
             <div className="temp mt-5 flex justify-center">
          <h1 className="text-6xl">{data.t }C </h1>
        </div>
        <div className="name flex items-center justify-center font-bold mt-4 ">
          <h1 className="text-6xl">{data.Name}</h1>
        </div>
        <div className="info flex mt-24 ml-8 justify-around">
          <div className="humidity flex">
            <img className="w-10" src={humidity} alt="" />
            <div>
              <p className="font-semibold">{data.h}%</p>
              <h2 className="font-semibold">Humidity</h2>
            </div>
            
          </div>
          <div className="wind flex">
            <img className="w-10" src={wind} alt="" />
            <div>
              <p className="font-semibold ">
                {data.w}Km/h
              </p>
              <h2 className="font-semibold">
                Wind Speed
              </h2>
            </div>
          </div>
        </div>
            </>
          ):(
            <div className="flex justify-center mt-24 mr-10" >
              <h1 className="font-semibold text-2xl text-amber-600">Enter the city Name  </h1>
                    
              </div>
          )
        }
 
      </div>
    </div>
  );
};

export default Navbar;
