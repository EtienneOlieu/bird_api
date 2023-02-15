const express = require("express")
const app = express()
app.use(express.json())

const birdList = [
    {id : 1,
    name : 'crow',
    family : 'corvidae',
    species : 'corvus',
    wingspan : 150},
    
    {id : 2,
    name : 'sparrow',
    family : 'prunelidae',
    species : 'prunella modularis',
    wingspan : 21},
    
    {id : 3,
    name : 'golden eagle',
    family : 'accipitridae',
    species : 'aquila chrysaetos',
    wingspan : 228.6},    
    
    {id : 4,
    name : 'albatros',
    family : 'diomedeidae',
    species : 'diomedea epomophora',
    wingspan : 330},
    
    {id : 5,
    name : 'robin',
    family : 'muscicapidae',
    species : 'erithacus rubecula',
    wingspan : 22},
    
    {id : 6,
    name : 'blue jay',
    family : 'corvidae',
    species : 'cyanocitta cristata',
    wingspan : 43},

    {id : 7,
    name : 'great tit',
    family : 'paridae',
    species : 'parus major',
    wingspan : 25.5}
]
app.get('/', (rew, res) => {
    res.send({message: 'nothing here'})
})

app.get('/birds', (req, res) => {
    res.send({listOfBirds : birdList})
    console.log(birdList)
})

app.get('/birds/:name', (req, res) => {
    birdName = req.params.name
    let chosenBird = birdList.find((bird) => bird.name === birdName)
    res.send({listOfBirds : chosenBird})
})

app.get('/birds/family/:family', (req, res) => {
    birdFamily = req.params.family
    let familyBirds = birdList.filter(bird => bird.family === birdFamily)
    res.send({listOfBirds : familyBirds})
})


app.listen(8080)