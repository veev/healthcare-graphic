let callback = function(){
  // Handler when the DOM is fully loaded
  console.log('document loaded');
  addListeners();
};

if (
    document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener('DOMContentLoaded', callback);
}

let addListeners = function() {
	let elements = document.getElementsByClassName("button");
	//console.log(elements);

	let acaButton = document.getElementsByClassName("button")[0];
	//console.log(acaButton);

	let acaContent = document.getElementById('aca-who');

	let ahcaButton = document.getElementsByClassName('button')[1];
	//console.log(ahcaButton);

	let ahcaWhatButton = document.getElementsByClassName('button')[4];
	let acaWhatContent = document.getElementById('aca-what');

	let acaWhatButton = document.getElementsByClassName('button')[3];

	ahcaButton.addEventListener('click', function(e) {
		e.preventDefault();
		//console.log(e);
		console.log('pressed AHCA button');
		let elements = acaContent.getElementsByClassName('crossed');
		for (let i=0; i < elements.length; i++) {
			let element = elements[i];
			element.onclick = turnOnCross(element);
		}
		//console.log(acaContent);
		let ahcaCallout = document.getElementById('ahca-callout');
		ahcaCallout.onclick = toggleCallout(ahcaCallout, true);

		// ahcaCallout.classList.add('visible');
		// ahcaCallout.classList.remove('hidden');
		// ahcaContent.classList.add('visible');
		// ahcaContent.classList.remove('hidden');

		// acaContent.classList.add('hidden');
		// acaContent.classList.remove('visible');
	});

	acaButton.addEventListener('click', function(e) {
		e.preventDefault();
		//console.log('pressed ACA button');
		let elements = acaContent.getElementsByClassName('crossed');
		for (let i=0; i < elements.length; i++) {
			let element = elements[i];
			element.onclick = turnOffCross(element);
		}
		//console.log('acaContent', acaContent);
		let ahcaCallout = document.getElementById('ahca-callout');
		ahcaCallout.onclick = toggleCallout(ahcaCallout, false);
		// acaCallout.classList.add('visible');
		// acaCallout.classList.remove('hidden');
		// acaContent.classList.add('visible');
		// acaContent.classList.remove('hidden');

		// ahcaContent.classList.add('hidden');
		// ahcaContent.classList.remove('visible');

	});

	ahcaWhatButton.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('pressed AHCA What button');
		let elements = acaWhatContent.getElementsByClassName('crossed');
		//console.log(elements);
		for (let i=0; i < elements.length; i++) {
			//console.log(elements[i]);
			let element = elements[i];
    		element.onclick = turnOnCross(element);
		}
	});

	acaWhatButton.addEventListener('click', function(e) {
		e.preventDefault();
		let elements = acaWhatContent.getElementsByClassName('crossed');
		for (let i=0; i < elements.length; i++) {
			//console.log(elements[i]);
			let element = elements[i];
    		element.onclick = turnOffCross(element);
		}
	});

	let turnOnCross = function(element) {
		// console.log('turn on cross');
		// console.log(element);
		element.classList.add('visible');
		element.classList.remove('hidden');
	}

	let turnOffCross = function(element) {
		// console.log('turn off cross');
		// console.log(element);
		element.classList.add('hidden');
		element.classList.remove('visible');
	}

	let toggleCallout = function(element, aca) {
		// console.log('toggle callout', aca);
		// console.log(element);
		if (aca) {
			element.classList.add('visible');
			element.classList.remove('hidden');
		} else {
			element.classList.add('hidden');
			element.classList.remove('visible');
		}
		
	}

	let toggleCrossClass = function(element) {
		// console.log('toggle cross');
		// console.log(element);
		if (element.classList.contains('hidden')) {
			element.classList.add('visible');
    		element.classList.remove('hidden');
		} else if (element.classList.contains('visible')) {
			element.classList.add('hidden');
			element.classList.remove('visible');
		}
    	
	}

//TO DO: get the toggleVisibility working
	var changeVisibility = function(element) {
		if (element.style.display === 'none') {
			element.classList.add('visible');
			element.classList.remove('hidden');
		} else if (element.style.display === 'visible') {
			element.classList.add('hidden');
			element.classList.remove('visible');
		}

	}
}