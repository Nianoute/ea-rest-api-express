const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("serveur");
})

app.use (express.json());
const artists = require('./artists.json');


//verbes HTTP

//Tout les artistes
app.get('/artists', (req, res) => {
    res.status(200).json(artists)   //envoie une réponse au client
})


//Trouver un seul artiste par id
app.get('/artists/:id', (req, res) => {
    const id = Number(req.params.id)
    const artist = artists.find(artist => artist.id === id) //vérifie si l'id de l'url exsite dans la bdd

    if (!artist) {
        return res.status(404).send('Artist introuvable') //si aucun id existe, envoie une erreur
    }
    res.json(artist) //envoie un seul artiste
    console.log("L'artiste numéro :", artist, " est affiché");
})


//Ajouter un nouvel artiste
app.post('/artists/', (req, res) => {
    const newArtist = {
        id: artists.length + 1, //par rapport au dernier id,+1
        name: req.body.name, //pour pourvoir écrire via Postman
        type: req.body.type,
        description: req.body.description
    }
    if (!newArtist) {
        return res.status(404).send('Id déjà utilisé')
    }
    res.json(newArtist)
    artists.push(newArtist) //publie un nouvelle artiste
    res.status(201).json(newArtist) //affiche seulement le nouvelle artiste
    console.log("L'artiste :", newArtist," a été ajouté");
})


//Modifier un artiste par ID
app.put('/artists/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = artists.findIndex(artist => artist.id === id)

    if (index === -1) {
        return res.status(404).send('Artist introuvable')
    }
    else {
        
    const updatedArtist = {
        id: artists[index].id,
        name: req.body.name,
        type: req.body.type,
        description: req.body.description
    }

    artists[index] = updatedArtist
    res.status(200).json('Artiste updated')
    console.log("L'artiste :", artists[index], " a été modifié");
    }


})


//Supprimer un artiste par ID
app.delete('/artists/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = artists.findIndex(artist => artist.id === id)

    if (!index) {
        return res.status(404).send('Artiste introuvable')
    }
    artists.splice(index,1)
    res.status(200).json('Artiste suprimé')
    console.log("L'artiste a été suprimé");
})
