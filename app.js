const express = require("express")
const app = express()
app.use(express.json)

const birdList = [
    {id : 1,
    name : 'crow',
    family : 'corvidae',
    species : 'corvus',
    wingSpan : 150},
    
    {id : 2,
    name : 'sparrow',
    family : 'prunelidae',
    species : 'prunella modularis',
    wingSpan : 21},
    
    {id : 3,
    name : 'golden eagle',
    family : 'accipitridae',
    species : 'aquila chrysaetos',
    wingSpan : 228.6},    
    
    {id : 4,
    name : 'albatros',
    family : 'diomedeidae',
    species : 'diomedea epomophora',
    wingSpan : 330},
    
    {id : 5,
    name : 'robin',
    family : 'muscicapidae',
    species : 'erithacus rubecula',
    wingSpan : 22},
    
    {id : 6,
    name : 'blue jay',
    family : 'corvidae',
    species : 'cyanocitta cristata',
    wingSpan : 43}
]
app.get('/', (rew, res) => {
    res.send({message: 'nothing here'})
})

app.get('/birds', (req, res) => {
    res.send({listOfBirds : birdList})
    console.log(birdList)
})

app.listen(8080)