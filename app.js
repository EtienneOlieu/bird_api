const express = require('express');

const app = express();
app.use(express.json());

const birdList = [
  {
    id: 1,
    name: 'crow',
    family: 'corvidae',
    species: 'corvus',
    wingspan: 150,
  },
  {
    id: 2,
    name: 'sparrow',
    family: 'prunelidae',
    species: 'prunella modularis',
    wingspan: 21,
  },
  {
    id: 3,
    name: 'golden eagle',
    family: 'accipitridae',
    species: 'aquila chrysaetos',
    wingspan: 228.6,
  },
  {
    id: 4,
    name: 'albatros',
    family: 'diomedeidae',
    species: 'diomedea epomophora',
    wingspan: 330,
  },
  {
    id: 5,
    name: 'robin',
    family: 'muscicapidae',
    species: 'erithacus rubecula',
    wingspan: 22,
  },
  {
    id: 6,
    name: 'blue jay',
    family: 'corvidae',
    species: 'cyanocitta cristata',
    wingspan: 43,
  },
  {
    id: 7,
    name: 'great tit',
    family: 'paridae',
    species: 'parus major',
    wingspan: 25.5,
  },
];

app.get('/', (req, res) => {
  res.send({ message: 'nothing here' });
});

app.get('/birds', (req, res) => {
  res.send({ data: birdList });
});

//  Anders gennemgang af lektien
app.get('/birds/:id', (req, res) => {
  const foundBird = birdList.find((bird) => bird.id === Number(req.params.id));
  res.send({ data: foundBird });
});

app.get('/birds/name/:name', (req, res) => {
  const chosenBird = birdList.find((bird) => bird.name === req.params.name);
  res.send({ data: chosenBird });
});

app.get('/birds/family/:family', (req, res) => {
  const familyBirds = birdList.filter((bird) => bird.family === req.params.family);
  res.send({ data: familyBirds });
});

app.post('/birds/create', (req, res) => {

});
app.patch('/birds/edit/:id', (req, res) => {

});

app.delete('/birds/delete/:id', (req, res) => {

});

const PORT = 8080;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
