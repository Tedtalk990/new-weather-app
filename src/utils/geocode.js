const request=require('request');
const geocode=(add,call)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(add)+'.json?access_token=pk.eyJ1Ijoic2hpdmFtY2hhdWhhbiIsImEiOiJja2JpMWdsdTYwOXFoMzFteTRwNHBpd2NvIn0.OCjbXnP-Sv5EdO0LWHGOxg&limit=1';
    request({url,json:true},(error,{body})=>{
        if(error){
            call('Unable to connect to weather service!!')    //by defalut second argument will be undefined
        }else if(body.features.length===0){
            call('Please Provide a valid loaction!!');
        }else{
            call(undefined,{
                location:body.features[0].place_name,
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0]
            })
        }
    })
}
module.exports=geocode;
