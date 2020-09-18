// Functionality for make canvas and download image
var container1 = document.getElementById('image-wrap-1');
var container2 = document.getElementById('image-wrap-2');
var container3 = document.getElementById('image-wrap-3');
var canvasContainer = document.querySelector('.footer__download-images');

function getCanvas() {
  canvasContainer.childNodes.forEach(child => child.innerHTML = '');
  html2canvas(container1, {allowTaint: true}).then(function(canvas) { 
    var link = document.createElement("a");
    var downloadText = document.createElement("p");
    downloadText.innerHTML = 'Sækja mynd';
    link.appendChild(canvas);
    link.appendChild(downloadText);
    document.getElementById('download-image-1').appendChild(link);
    link.download = "Kindergarten.png";
    link.href = canvas.toDataURL("image/png");
    link.target = '_blank';
  });
  html2canvas(container2, {allowTaint: true}).then(function(canvas) {
    var link = document.createElement("a");
    var downloadText = document.createElement("p");
    downloadText.innerHTML = 'Sækja mynd';
    link.appendChild(canvas);
    link.appendChild(downloadText);
    document.getElementById('download-image-2').appendChild(link);
    link.download = "Police.png";
    link.href = canvas.toDataURL("image/png");
    link.target = '_blank';
  });
  html2canvas(container3, {allowTaint: true}).then(function(canvas) {
    var link = document.createElement("a");
    var downloadText = document.createElement("p");
    downloadText.innerHTML = 'Sækja mynd';
    link.appendChild(canvas);
    link.appendChild(downloadText);
    document.getElementById('download-image-3').appendChild(link);
    link.download = "Nurse.png";
    link.href = canvas.toDataURL("image/png");
    link.target = '_blank';
  });
};

// Functionality for steps
var step1Elements = document.getElementsByClassName('step-1');
var step2Elements = document.getElementsByClassName('step-2');
var step3Elements = document.getElementsByClassName('step-3');

var totalTaxes = null;

var changeStepButton = document.querySelector('.footer__buttons--change-step');
var stepIndicators = document.getElementsByClassName('footer__buttons--indicator');

var company = document.querySelector('#company');
company.onfocus = function(e) {
  e.target.classList.remove('invalid');
}

var step = 1;

function changeStep(stepIndicatorValue) {
  if (!company.validity.valid) {
    company.classList.add('invalid');
    return;
  }
  if (step === 1) {
    for (var elem of step2Elements) {
      elem.classList.remove('hide');
    }
    for (var elem of step1Elements) {
      elem.classList.add('hide');
    }

    stepIndicators[0].classList.remove('active');
    stepIndicators[1].classList.add('active');

    document.querySelector('.total__result-info').style.marginBottom = 0;
    document.querySelectorAll('#company-name').forEach(elem => elem.innerHTML = company.value);
    document.querySelectorAll('#total-taxes').forEach(elem => elem.innerHTML = totalTaxes.toLocaleString('de-DE'));

    step = 2;
    changeStepButton.textContent = 'Fyrra skref';

    document.querySelector('#totalKindergardenTitle').textContent = 'leikskólaplássum';
    document.querySelector('#totalPoliceTitle').textContent = 'lögregluþjónum';
    document.querySelector('#totalNurseTitle').textContent = 'hjúkrunarfræðingum';
    getCanvas();
  } else if (step === 2) {
    for (var elem of step1Elements) {
      elem.classList.remove('hide');
    }
    for (var elem of step2Elements) {
      elem.classList.add('hide');
    }

    stepIndicators[0].classList.add('active');
    stepIndicators[1].classList.remove('active');

    step = 1;
    changeStepButton.textContent = 'Næsta skref';

    document.querySelector('#totalKindergardenTitle').textContent = 'Leikskólapláss';
    document.querySelector('#totalPoliceTitle').textContent = 'Lögregluþjónar';
    document.querySelector('#totalNurseTitle').textContent = 'Hjúkrunarfræðingar';
  }
}

// Functionality for sliders
var lockedState = true;
var lockedSlider = false;

var costBabyInKindergardenYear = 2289258;
var costPoliceOfficierYear = 12427622;
var costNurseYear = 12923192;

var slider1 = document.getElementById('employees');
var slider2 = document.getElementById('salaries');
var slider3 = document.getElementById('tax');

var slider1Value = document.getElementById('employees-output');
var slider2Value = document.getElementById('salaries-output');
var slider3Value = document.getElementById('tax-output');
var slider2ValueNumber = null;
var slider3ValueNumber = null;

function crossUpdate(value, slider) {
  if (slider2 === slider) {
    slider2.noUiSlider.set((value * 11200).toFixed(2));
  }
  else if (slider3 === slider) {
    slider3.noUiSlider.set((value * 451).toFixed(2));
  }
}

function updateTotalValues() {
  totalTaxes = slider2ValueCount * 330 + slider3ValueCount * 1000;
  var totalKindergarden = totalTaxes / costBabyInKindergardenYear;
  var totalPolice = totalTaxes / costPoliceOfficierYear;
  var totalNurse = totalTaxes / costNurseYear;
  // Set total cost of having a baby at the kindegarden for a year
  document.querySelectorAll('#totalKindergarden').forEach(elem => elem.innerHTML = (Math.floor(totalKindergarden * 10) / 10).toLocaleString('de-DE'));
  // Set total cost of having a police officier for a year
  document.querySelectorAll('#totalPolice').forEach(elem => elem.innerHTML = (Math.floor(totalPolice * 10) / 10).toLocaleString('de-DE'));
  // Set total cost of having a nurse for a year
  document.querySelectorAll('#totalNurse').forEach(elem => elem.innerHTML = (Math.floor(totalNurse * 10) / 10).toLocaleString('de-DE'));
}

noUiSlider.create(slider1, {
  start: 50,
  step: 1,
  connect: [true, false],
  animate: false,
  range: {
    min: 0,
    max: 4500
  },
});
noUiSlider.create(slider2, {
  start: 560000,
  step: 1,
  animate: false,
  connect: [true, false],
  range: {
    min: 0,
    max: 50400000
  }
});
noUiSlider.create(slider3, {
  start: 22550,
  step: 1,
  animate: false,
  connect: [true, false],
  range: {
    min: 0,
    max: 2029500
  }
});

slider1.noUiSlider.on('update', function (values, handle) {
  slider1Value.innerHTML = Math.trunc(values[handle]);
});

slider2.noUiSlider.on('update', function (values, handle) {
  slider2ValueCount = Number(values[handle]);
  slider2Value.innerHTML = Number(values[handle]).toLocaleString('de-DE');
});

slider3.noUiSlider.on('update', function (values, handle) {
  slider3ValueCount = Number(values[handle]);
  slider3Value.innerHTML = Number(values[handle]).toLocaleString('de-DE');
});

slider1.noUiSlider.on('slide', function (values, handle) {
  crossUpdate(values[handle], slider2);
  crossUpdate(values[handle], slider3);
});

slider2.noUiSlider.on('update', updateTotalValues);
slider3.noUiSlider.on('update', updateTotalValues);