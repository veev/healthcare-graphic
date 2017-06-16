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
	console.log(elements);

	let acaButton = document.getElementsByClassName("button")[0];
	console.log(acaButton);

	acaButton.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('pressed ACA button');
	});

	let ahcaContent = document.getElementById('ahca');
	let acaContent = document.getElementById('aca');

	let ahcaButton = document.getElementsByClassName('button')[1];
	console.log(ahcaButton);

	ahcaButton.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('pressed AHCA button');
		ahcaContent.classList.add('visible');
		ahcaContent.classList.remove('hidden');

		acaContent.classList.add('hidden');
		acaContent.classList.remove('visible');
	});

	acaButton.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('pressed ACA button');
		acaContent.classList.add('visible');
		acaContent.classList.remove('hidden');

		ahcaContent.classList.add('hidden');
		ahcaContent.classList.remove('visible');

	});

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