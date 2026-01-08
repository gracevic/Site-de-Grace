document.addEventListener("DOMContentLoaded", function () { 
const images = document.querySelectorAll(".zoomable");

images.forEach(img => {
img.addEventListener("click", function () {

// Si l'image est déjà zoomée, on la remet à la normale
if (img.classList.contains("zoomed")) {
img.classList.remove("zoomed");
} else {

// On retire le zoom de toutes les autres images
images.forEach(i => i.classList.remove("zoomed"));

// On ajoute la classe zoomed pour l'agrandir légèrement
img.classList.add("zoomed");

}
});
});

// Optionnel : cliquer n'importe où sur la page pour dé-zoomer
document.addEventListener("click", function(e) {

// Si le clic n'est pas sur une image zoomable, enlever tous les zooms
if (!e.target.classList.contains("zoomable")) {
images.forEach(i => i.classList.remove("zoomed"));

}
});
});



// Récupère le bouton "précédent" depuis le HTML grâce à son id
var bouttonPrecedent = document.getElementById("boutton-precedent");

// Récupère le bouton "suivant" depuis le HTML grâce à son id
var bouttonSuivant = document.getElementById("boutton-suivant");

 // Récupère tous les éléments ayant la classe "steetwar-item"
// Cela représente les slides (images ou contenus)
var items = document.getElementsByClassName("streetwar-item");

// Stocke le nombre total de slides
var numberOfItems = items.length;

// Variable qui permet de savoir sur quel slide on se trouve
// On commence au premier slide (index 0)
var index = 0;

// Écoute le clic sur le bouton "précédent"
bouttonPrecedent.addEventListener("click", function() {

// On diminue l’index pour aller au slide précédent  
index = index - 1

// Si l’index devient négatif, on reste sur le premier slide  
if(index < 0 ){
    index = 0
}

// Appelle la fonction slide pour appliquer le déplacement
slide()
})

// Écoute le clic sur le bouton "suivant"
bouttonSuivant.addEventListener("click", function() {
 
 // On augmente l’index pour aller au slide suivant   
index = index + 1

// Si on dépasse le dernier slide,
// on revient au premier slide
if(index > numberOfItems - 1) {
    index =  0
}

// Appelle la fonction slide pour appliquer le déplacement
slide()
})

// Fonction qui déplace les slides horizontalement
function slide(){

 // Boucle qui parcourt tous les slides   
for(var i = 0; i < numberOfItems; i++) {
 
// Déplace chaque slide vers la gauche
// de 100% multiplié par l’index actuel
    items[i].style.transform = "translateX(calc(-100% * " + index + "))"
}
}


const form = document.getElementById("contributionForm");
const preview = document.getElementById("previewContent");
const lexicalMessage = document.getElementById("lexicalMessage");

const motsAutorises = [
  "streetwear", "oversize", "sneakers", "baggy",
  "y2k", "années 2000", "crop top", "low rise",
  "vintage", "urbain"
];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const understanding = document
    .getElementById("understanding")
    .value
    .toLowerCase();

  const imageUrl = document.getElementById("imageUrl").value;
  const description = document.getElementById("description").value;

  // Vérification champ lexical
  const motTrouve = motsAutorises.some(mot =>
    understanding.includes(mot)
  );

  if (!motTrouve) {
    lexicalMessage.textContent =
      "Utilise le vocabulaire du streetwear ou du Y2K";
    lexicalMessage.style.color = "yellow";
    return;
  } else {
    lexicalMessage.textContent = "✔ Champ lexical valide";
    lexicalMessage.style.color = "lightgreen";
  }

  // Styles cochés
  const styles = [...document.querySelectorAll('input[name="style"]:checked')]
    .map(cb => cb.value)
    .join(", ");

  // Prévisualisation
  preview.innerHTML = `
    <p><strong>Styles :</strong> ${styles}</p>
    <img src="${imageUrl}" alt="Prévisualisation">
    <p>${description}</p>
  `;
});


// data.js

import { passions, galerie } from './data.js';

// Vérification des données
console.log("Passions :", passions);
console.log("Galerie :", galerie);

// Génération des passions
const passionGrid = document.getElementById("passionGrid");
passions.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("passions-item");
    li.innerHTML = `<p class="passions-text">${item.titre}</p>`;
    if (item.description) li.innerHTML += `<p class="passions-text">${item.description}</p>`;
    passionGrid.appendChild(li);
    console.log("Passion ajoutée :", li);
});

// Génération de la galerie
const galerieGrid = document.getElementById("galerieGrid");
const loader = document.getElementById("loader");

galerie.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("galerie-item");
    li.innerHTML = `
        <img src="${item.image}" alt="${item.titre}">
        <div class="content">
            <h1>${item.titre}</h1>
            <p>${item.description}</p>
        </div>
    `;
    galerieGrid.appendChild(li);
    console.log("Image ajoutée :", li);
});

// Une fois tout ajouté, on enlève le loader
loader.remove();
