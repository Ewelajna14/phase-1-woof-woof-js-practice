
// 1. fetch all dog data
// 2. display all dog name in bar in span
// 3. cliking dog span displays dog details
// 4. button good/bad doog


// endpoints: http://localhost:3000/pups
//            http://localhost:3000/pups/id


//variables
const baseUrl = "http://localhost:3000/pups"
const dogBar = document.getElementById("dog-bar")
const dogInfo = document.getElementById("dog-info")
const filterBtn = document.querySelector("good-dog-filter")

//fetches

function getAllDogs(){
fetch (baseUrl)
.then(resp => resp.json())
.then(renderAllinBar)  //same as .then(data => renderAllinBar(data))
}

//initialize
getAllDogs()

function getOneDog(id){
return fetch(baseUrl + `/${id}`)
.then(res => res.json())
}
  

//render functions
function renderAllinBar(dogsArr){
dogBar.innerHTML= ''
dogsArr.forEach(addOneDogToBar)
}

function addOneDogToBar(dogObj){
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dogObj.name
    dogSpan.dataset.id=dogObj.id
    dogSpan.addEventListener('click', handleShowOneDog)
    dogBar.append(dogSpan)
}

function showOneDog(dogObj){
    dogInfo.innerHTML =''
    const dogDiv = document.createElement('div')
    dogDiv.innerHTML=`
    <img src =${dogObj.image}>
    <h2>${dogObj.name}</h2>
    `
    const dogBtn = document.createElement('button')
    dogBtn.innerText = ((dogObj.isGoodDog)? "Good Dog": "Bad Dog")
    
    dogInfo.appendChild(dogDiv, dogBtn)
   
}

//Events

function handleShowOneDog(e){
const id = e.target.dataset.id
getOneDog(id).then(showOneDog)
}