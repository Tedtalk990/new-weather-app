const request=require('request');
const forcast=(lat,lon,call)=>{
    const url='http://api.weatherstack.com/current?access_key=f9d0702c219a2267307723e9baf12736&query='+encodeURIComponent(lat)+','+encodeURIComponent(lon)+'&units=m';
    request({url,json:true},(error,{body}={})=>{
        if(error){
            call('Unable to connect to weather service!!');
        }else if(body.error){
            call(body.error.info);
        }else{
            call(undefined,{
                weatherDescription:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feelslike:body.current.feelslike,
                observationTime:body.current.observation_time,
                humidity:body.current.humidity  
            })
        }
    })
}
module.exports=forcast;