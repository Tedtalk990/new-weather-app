// fetch('http://localhost:3000/weather?address=nagpur').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data,location);
//     })    

// })
const form=document.querySelector('form')
const input=document.querySelector('input');
const msg1=document.getElementById('msg1')
const msg2=document.getElementById('msg2')
const msg3=document.getElementById('msg3')
const msg4=document.getElementById('msg4')
const abc=document.getElementsByClassName('abc')
form.addEventListener('submit',(e)=>{
e.preventDefault()
 const location=input.value
 msg1.textContent='Loading...'
 msg2.textContent=''
 abc[0].classList.add("efg")
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent=data.error
                abc[0].classList.add('efg')
            }else{
                msg1.textContent=data.location
                msg2.textContent=data.temperature
                msg3.textContent=data.weatherDescription
                msg4.textContent=data.feelslike
              }
              for(var i=0;i<abc.length;i++){
              abc[i].classList.add("efg")
              }

            })
    })
})