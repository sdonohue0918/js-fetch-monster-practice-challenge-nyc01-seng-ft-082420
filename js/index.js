function getMonsters() {
    fetch('http://localhost:3000/monsters/?_limit=50').then(function(response) {
        return response.json()
    }).then(function(json) {
        renderMonsters(json)
        
    })

    
}
const monsterContainer = document.getElementById('monster-container')
getMonsters()
nextButton()
monsterForm()
    

function renderMonsters(obj) {
    for (const element of obj) {
        renderMonster(element)
        }
   
}

function renderMonster(obj, container=monsterContainer) {
    //const monsterContainer = document.getElementById('monster-container')
    const monsterDiv = document.createElement('div')
    monsterDiv.classList.add('monster')
    container.append(monsterDiv)
    monsterDiv.innerHTML = `<h2> ${obj.name} </h2>
    <h4> Age: ${obj.age} </h4>
    <p> Bio: ${obj.description} </p>`
}




function monsterForm() {
    //const header = document.querySelector('h1')
    //console.dir(header)
    const formContainer = document.getElementById('create-monster')
    const form = document.createElement('form')
    form.id = 'monster-form'
    formContainer.append(form)
    form.innerHTML = `<input id="name" placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">
    <button>Create</button></form></div>`

    return postMonster()
}

function postMonster() {

   const monsterForm = document.getElementById('monster-form') 

   monsterForm.addEventListener("submit", function(e) {
       e.preventDefault()
       const name = monsterForm.name.value
       const age = monsterForm.age.value
       const desc = monsterForm.description.text

       const postParams = {name: name,
                            age: age,
                            desc: desc
                                        }

        monsterForm.reset()

        const postOptions = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(postParams)

        }

        fetch('http://localhost:3000/monsters/?_limit=50', postOptions).then(function(response) {
            return response.json()
        }).then(function(json) {
            renderMonster(json)
        })


   })

}

function nextButton() {
    const button = document.getElementById('forward')
    button.addEventListener('click', function(e) {
        getMonsters()
    })
}

