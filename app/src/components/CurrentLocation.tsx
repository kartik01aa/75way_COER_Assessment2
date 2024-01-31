import React, { useState, useEffect } from 'react';

interface output{
     latitude: null | number,
     longitude:null | number,
} 

function CurrentLocation() {
  const [position, setPosition] = useState<output>({ latitude: null, longitude: null });
  const [data,setData] = useState<any>()

  const runIt = ()=>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        setPosition({
          latitude: position.coords.latitude ,
          longitude: position.coords.longitude,
        });
        if(position.coords.latitude !== null){
          var requestOptions = {
            method: 'GET',
          };
          
          await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude }&lon=${position.coords.longitude}&apiKey=413e7b67d73e4534891174570d288177`, requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log('error', error));
            console.log(data)
        }
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }

  }

  useEffect(() => {
    runIt()
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-center p-4" >Your Location</h2>
      {data ? (<>
        <p className="text-xl text-center p-2 rounded-lg bg-slate-100">
          Country : {data.features[0].properties.country}
        </p>
        <p className="text-xl text-center p-2">
          State : {data.features[0].properties.state}
        </p>
        <p className="text-xl text-center p-2 rounded-lg bg-slate-100">
          City : {data.features[0].properties.city}
        </p>
      </>) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CurrentLocation;