const paragraphs = [
`La France, pays de l'Europe occidentale, compte des villes médiévales, des villages alpins et des plages. Paris, sa capitale, est célèbre pour ses maisons de mode, ses musées d'art classique, dont celui du Louvre, et ses monuments comme la Tour Eiffel. Le pays est également réputé pour ses vins et sa cuisine raffinée. Les peintures rupestres des grottes de Lascaux, le théâtre romain de Lyon et l'immense château de Versailles témoignent de sa riche histoire.`,

`L'Allemagne est un pays d'Europe de l'Ouest dont le paysage se compose de forêts, de rivières, de chaînes montagneuses et de plages sur la mer du Nord. Son histoire remonte à plus de 2 000 ans en arrière. Dotée d'une vie artistique et nocturne animée, Berlin, sa capitale, inclut la porte de Brandebourg et de nombreux sites en lien avec la Seconde Guerre mondiale. Munich est connue pour son Oktoberfest et ses bars à bières qui date du XVIe siècle. Francfort, avec ses gratte-ciel, abrite la Banque centrale européenne.`,

`La Belgique est un pays de l'Europe de l'Ouest réputé pour ses villes médiévales, son architecture Renaissance et pour accueillir le siège de l'Union européenne et de l'OTAN. Le pays comprend des régions distinctes, notamment la Flandre néerlandophone au nord, la Wallonie francophone au sud et une communauté germanophone à l'est. Bruxelles, la capitale bilingue, offre des maisons des corporations richement ornées sur la Grand-Place et d'élégants bâtiments art nouveau.`
]
let p = document.querySelector(".texte p");
let input = document.querySelector("input")
let globalIndex = 0;
let time = 60;
let erreurTag = document.querySelector(".mistakes span")
let timeTag = document.querySelector(".temps span b")
let wpmTag = document.querySelector(".wpm span")
let cpmTag = document.querySelector(".cpm span")
let goodCharacters = 0, errorCharacters = 0;
let firstType = true;
let idTimer;
let boutonRecommencer = document.querySelector(".annexe button")

function randomParagraph(){
    let texte;
    let indice = Math.floor(Math.random()*paragraphs.length)
    
    p.innerText = "";
    texte = paragraphs[indice];
    texte = texte.split("");
    texte.forEach(function(caractere){
        caractere = `<span>${caractere}</span>`
        p.innerHTML += caractere;
    })
    p.childNodes[0].classList.add("active")
}

function updateTime(){

    if(time >= 1){
        time --;
        timeTag.innerText = time;
    let wpm = Math.round((goodCharacters/5) / ((60-time)/60))
    wpmTag.innerText = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    }else{
        timeTag.innerText = 0;
        clearInterval(idTimer);
    }
}
function compare(){
    let saisieUtilisateur = input.value.split("");
    let saisieOrdinateur = p.childNodes;

    saisieOrdinateur.forEach(function(element){
        element.classList.remove("active");
    })
    if(firstType){
        firstType = false;
        idTimer = setInterval(updateTime, 1000)
    }
    if(globalIndex <= saisieOrdinateur.length -1 || time >= 1)/*rester dans un intervale d'une chaine*/
    {
        if(saisieUtilisateur[globalIndex] == null){/*J'ai saisi ca; Oui; Mais saisi ca*/
            globalIndex --;
            if(saisieOrdinateur[globalIndex].classList.contains("errone")){errorCharacters  --}
            saisieOrdinateur[globalIndex].classList.remove("valide","errone")
            saisieOrdinateur[globalIndex].classList.add("active")
            goodCharacters --;
        }else{
            if(saisieUtilisateur[globalIndex] === saisieOrdinateur[globalIndex].innerText){
                saisieOrdinateur[globalIndex].classList.add("valide")
                goodCharacters ++;
            }else{
                saisieOrdinateur[globalIndex].classList.add("errone")
                errorCharacters ++;
            }
            globalIndex ++;
            saisieOrdinateur[globalIndex].classList.add("active")
        }
    }
    let wpm = Math.round((goodCharacters/5) / ((60-time)/60))
    wpmTag.innerText = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    erreurTag.innerText = errorCharacters;
    cpmTag.innerText = goodCharacters;
}

function reinitialisation(){
    randomParagraph();
    let globalIndex = 0;
    let time = 60;
    let goodCharacters = 0, errorCharacters = 0;
    let firstType = true;
    clearInterval(idTimer)
    wpmTag.innerText = 0
    erreurTag.innerText = 0
    cpmTag.innerText = 0
    timeTag.innerText = 60
}


randomParagraph();
input.addEventListener("input", compare)
document.addEventListener("DOMContentLoaded", function(){input.focus()})
p.addEventListener("click", function(){input.focus()})
boutonRecommencer.addEventListener("click", reinitialisation)