class Time{
	constructor(){
		this.timeTag = document.querySelector(".temps span b")
		this.time = 60
		this.idTimer;
		this.alreadyStarted = 0;
	}

	setTimeTag(){
		this.timeTag.innerText = this.time;
	}
	getActualTime(){
		return this.time;
	}
	decrementTime(self){
	    if(self.time >= 1){
	        self.time --;
	        self.timeTag.innerText = self.time;
	    }else{
	        self.timeTag.innerText = 0;
	        clearInterval(self.idTimer);
	    }
	}
	launchTimer(){
		let self = this
		this.idTimer = setInterval(function(){
			self.decrementTime(self)
			azim.annexe1.setWpmTagValue(azim.texte1.goodCharacters, self.time)
		}, 1000)
	}
	startTimerOnlyOnce(){
		if(!this.alreadyStarted)
		{
			this.launchTimer();
			this.alreadyStarted = true
		}
	}
	cancelTimer(){
		clearInterval(this.idTimer)
	}
	destroyTimer(){
		clearInterval(this.idTimer)
		this.time = 60;
		this.setTimeTag()
	}
}

class Annexe{
	constructor(){
		this.wpmTag = document.querySelector(".wpm span")
		this.cpmTag = document.querySelector(".cpm span")
		this.erreurTag = document.querySelector(".mistakes span")
		this.restartTag = document.querySelector(".restart")

		this.giveErreurTagCapacityToInitializeAzim()
	}
	giveErreurTagCapacityToInitializeAzim(){
		this.restartTag.addEventListener("click", function(){
			azim.reinitializeAll()
		})
	}
	setWpmTagValue(goodCharacters, time){
		let wpm = Math.round((goodCharacters/5) / ((60-time)/60))
		this.wpmTag.innerText = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
	}
	setCpmValue(goodCharacters){
		this.cpmTag.innerText = goodCharacters;
	}
	setErreurTagValue(errorCharacters){
    	this.erreurTag.innerText = errorCharacters;
	}
	reinitializeAllTagValue(){
		this.wpmTag.innerText = 0;
		this.cpmTag.innerText = 0;
		this.erreurTag.innerText = 0;
	}
}

class Input{
	
	constructor(){
		this.inputTag = document.querySelector("input")
		this.firstTypingDone = false;
		
		let self = this
		this.inputTag.addEventListener("input", function(){
			self.firstTypingDone = true
		})
	}
	addFunctionToInputObjectEvent(fonction){
		this.inputTag.addEventListener("input", fonction)
	}
	getFirstTypingDone(){
		return this.firstTypingDone;
	}
	static getValueListen(objet){
		return objet.inputTag.value;
	}
	static focusInput(){
		azim.input1.inputTag.focus();
	}
}


class Texte{
	constructor(){
		this.paragraphs = [
							`La France, pays de l'Europe occidentale, compte des villes médiévales, des villages alpins et des plages. Paris, sa capitale, est célèbre pour ses maisons de mode, ses musées d'art classique, dont celui du Louvre, et ses monuments comme la Tour Eiffel. Le pays est également réputé pour ses vins et sa cuisine raffinée. Les peintures rupestres des grottes de Lascaux, le théâtre romain de Lyon et l'immense château de Versailles témoignent de sa riche histoire.`,

							`L'Allemagne est un pays d'Europe de l'Ouest dont le paysage se compose de forêts, de rivières, de chaînes montagneuses et de plages sur la mer du Nord. Son histoire remonte à plus de 2 000 ans en arrière. Dotée d'une vie artistique et nocturne animée, Berlin, sa capitale, inclut la porte de Brandebourg et de nombreux sites en lien avec la Seconde Guerre mondiale. Munich est connue pour son Oktoberfest et ses bars à bières qui date du XVIe siècle. Francfort, avec ses gratte-ciel, abrite la Banque centrale européenne.`,

							`La Belgique est un pays de l'Europe de l'Ouest réputé pour ses villes médiévales, son architecture Renaissance et pour accueillir le siège de l'Union européenne et de l'OTAN. Le pays comprend des régions distinctes, notamment la Flandre néerlandophone au nord, la Wallonie francophone au sud et une communauté germanophone à l'est. Bruxelles, la capitale bilingue, offre des maisons des corporations richement ornées sur la Grand-Place et d'élégants bâtiments art nouveau.`
		]

		this.paragraph;
		this.paragraphTag = document.querySelector(".texte p");

		this.setNewParagraph()

		
		this.index = 0;

		this.errorCharacters = 0;
		this.goodCharacters = 0;

	}
	incrementIndex(){
		this.index ++;
	}
	decrementIndex(){
		this.index --;
	}
	getIndex(){
		return this.index;
	}
	addActiveClassToParagraph(classe, indice){
		this.paragraphTag.childNodes[indice].classList.add(classe)		
	}
	getParagraphSplited(){
		return this.paragraphTag.childNodes
	}

	reinitialisationDuTexte(){
	// 	boiteDialogue.destroyTimer();
	// 	annexe.cancelAnnexe();

		this.paragraph = this.setNewParagraph();

	// 	this.setSplit();
	// 	this.setParagraphTag();

	    this.index = 0;
	    
	    this.goodCharacters = 0;
	    this.errorCharacters = 0;
	    
	//     boiteDialogue.setFirstTypeFalse()
	}


	// randomParagraph(){
	//     let indice = Math.floor(Math.random()*this.paragraphs.length)
	    
	//     return this.paragraphs[indice];
	// }
	setNewParagraph(){
		let indice = Math.floor(Math.random()*this.paragraphs.length)
		let chaine = "";
		
		this.paragraph = this.paragraphs[indice]
		
		this.paragraph = this.paragraph.split("");
	    this.paragraph.forEach(function(caractere){
	        caractere = `<span>${caractere}</span>`
	        chaine += caractere;
	    })
	    this.paragraphTag.innerHTML = chaine;
		this.paragraphTag.childNodes[0].classList.add("active")
	}

	
	removeActiveOfAllSpans(){
		this.paragraphTag.childNodes.forEach(function(span){
        	span.classList.remove("active");
    	})
	}
	setIndexText(value){
		this.index = value;
	}
	removeClassesToAnIndex(index, classe1, classe2 = ""){
		this.paragraphTag.childNodes[index].classList.remove(classe1, classe2)
	}
	setClassesToAnIndex(index, classe){
		this.paragraphTag.childNodes[index].classList.add(classe)
	}

}


class Azim{
	constructor(){
		this.texte1 = new Texte();
		this.input1 = new Input();
		this.time1 = new Time();
		this.annexe1 = new Annexe();

		this.input1.addFunctionToInputObjectEvent(function(){
			azim.time1.startTimerOnlyOnce()
			azim.compareParagrapheInput()
		})	

		document.addEventListener("DOMContentLoaded", function(){Input.focusInput(); })
		this.texte1.paragraphTag.addEventListener("click", function(){Input.focusInput(); })
	}
	
	compareParagrapheInput(){
		let indexOfTextObject = this.texte1.getIndex() 
		azim.texte1.removeActiveOfAllSpans();

		// let inputValue = (function(){azim.input1.getValueSplited().then(function(v){return v})})();

		let inputValue = Input.getValueListen(azim.input1);

		if(indexOfTextObject <= this.texte1.getParagraphSplited().length -1 || this.time1.getActualTime() >= 1)
	    {
	        if(inputValue.split("")[indexOfTextObject] === undefined){
	            indexOfTextObject --; 

	            if(this.texte1.getParagraphSplited()[indexOfTextObject].classList.contains("errone")){
	            	this.texte1.errorCharacters  --
	            }
	            this.texte1.removeClassesToAnIndex(indexOfTextObject, "valide", "errone")
	            this.texte1.setClassesToAnIndex(indexOfTextObject, "active")
	            this.texte1.goodCharacters --;
	        }else{
	            if(inputValue.split("")[indexOfTextObject] === this.texte1.getParagraphSplited()[indexOfTextObject].innerText){
	                this.texte1.setClassesToAnIndex(indexOfTextObject, "valide")
	                this.texte1.goodCharacters ++;
	            }else{
	                this.texte1.setClassesToAnIndex(indexOfTextObject, "errone")
	                this.texte1.errorCharacters ++;
	            }
	            indexOfTextObject ++; 
	            this.texte1.getParagraphSplited()[indexOfTextObject].classList.add("active")
	        }
	        this.texte1.setIndexText(indexOfTextObject)
	    }
	    this.annexe1.setWpmTagValue(this.texte1.goodCharacters, this.time1.getActualTime())
	    this.annexe1.setCpmValue(this.texte1.goodCharacters)
	    this.annexe1.setErreurTagValue(this.texte1.errorCharacters)
	}
	reinitializeAll(){
		this.texte1.reinitialisationDuTexte()
		this.time1.destroyTimer()
		this.annexe1.reinitializeAllTagValue()
	}

}

let azim = new Azim()
