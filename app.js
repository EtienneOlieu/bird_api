const express = require('express');

const app = express();
app.use(express.json());

// birdList includes examples of birds with non-sequential id's,
// in order to simulate an SQL table where items might have been deleted.
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
  {
    id: 8,
    name: 'shrike',
    family: 'lanidae',
    species: 'lanius',
    wingspan: 35,
  },
  {
    id: 9,
    name: 'black scrub robin',
    family: 'muscicapidae',
    species: 'cercotrichas podobe',
    wingspan: 20,
  },
  {
    id: 10,
    name: 'andean condor',
    family: 'cathartidae',
    species: 'vultur gryphus',
    wingspan: 330,
  },
  {
    id: 12,
    name: 'greater bird of paradise',
    family: 'paradisaeidae',
    species: 'paradisaea apoda',
    wingspan: 120,
  },
  {
    id: 15,
    name: 'scarlet tanager',
    family: 'cardinalidae',
    species: 'piranga olivacea',
    wingspan: 17,
  },
];

let currentId = Math.max(...birdList.map((bird) => bird.id));

app.get('/', (req, res) => {
  res.send({ message: 'nothing here' });
});

app.get('/birds', (req, res) => {
  res.send({ data: birdList });
});

//  Anders gennemgang af lektien
app.get('/birds/:id', (req, res) => {
  const foundBird = birdList.find((bird) => bird.id === Number(req.params.id));
  if (foundBird === undefined) {
    res.send({ data: 'No such bird' });
  }
  res.send({ data: foundBird });
});

app.get('/birds/name/:name', (req, res) => {
  const chosenBird = birdList.find((bird) => bird.name === req.params.name);
  if (chosenBird === undefined) {
    res.send({ data: 'No such bird' });
  }
  res.send({ data: chosenBird });
});

app.get('/birds/family/:family', (req, res) => {
  const familyBirds = birdList.filter((bird) => bird.family === req.params.family);
  res.send({ data: familyBirds });
});

app.post('/birds/', (req, res) => {
  if (birdList.find((bird) => bird.name === req.body.name) === undefined) {
    const newId = currentId += 1;
    birdList.push(
      {
        id: newId + 1,
        name: req.body.name,
        family: req.body.family,
        species: req.body.species,
        wingspan: req.body.wingspan,
      },
    );
    const createdBird = birdList.find((bird) => bird.name === req.body.name);
    res.send({ data: createdBird });
  } else {
    res.send({ data: 'that bird already exists' });
  }
});

app.patch('/birds/:id', (req, res) => {
  const foundIndex = birdList.findIndex((bird) => bird.id === Number(req.params.id));

  if (foundIndex === -1) {
    res.status(404).send({ message: `No bird with id ${req.params.id}` });
  } else {
    const foundBird = birdList[foundIndex];
    const birdToPatch = ({ ...foundBird, ...req.body, id: foundBird.id });
    birdList[birdList.findIndex((bird) => bird.id === Number(req.params.id))] = birdToPatch;
    res.send({ data: birdToPatch });
  }
});

app.delete('/birds/:id', (req, res) => {
  const foundIndex = birdList.findIndex((bird) => bird.id === Number(req.params.id));
  if (foundIndex === -1) {
    res.status(404).send({ data: foundIndex, message: `No bird found with id ${req.params.id}` });
  } else {
    const deletedBird = birdList.splice(foundIndex, 1)[0];
    res.send({ data: deletedBird });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port', PORT);
});
