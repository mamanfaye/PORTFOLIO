const texts = [
    "Développeuse Web",
    "Designer UI/UX",
    "Créatrice de Sites",
    "Front-End Developer"
];

let speed = 100;

const textElement = document.querySelector(".typing");

let textIndex = 0;
let charIndex = 0;

function typeWord(){

    if(charIndex < texts[textIndex].length){

        textElement.innerHTML += texts[textIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeWord, speed);

    }

    else{

        setTimeout(eraseWord, 1500);

    }

}

function eraseWord(){

    if(charIndex > 0){

        textElement.innerHTML = texts[textIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(eraseWord, 50);

    }

    else{

        textIndex++;

        if(textIndex >= texts.length){

            textIndex = 0;

        }

        setTimeout(typeWord, 500);

    }

}

window.onload = typeWord;