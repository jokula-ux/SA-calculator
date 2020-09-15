// Functionality for make canvas and download image
var container1 = document.getElementById('image-wrap-1');
var container2 = document.getElementById('image-wrap-2');
var container3 = document.getElementById('image-wrap-3');

function getCanvas() {
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

var nextButton = document.querySelector('.footer__buttons--next-step');
var stepIndicators = document.getElementsByClassName('footer__buttons--indicator');
var footerButtons = document.querySelector('.footer__buttons');

var step = 1;

function nextStep(stepIndicatorValue) {
  if (step === 1) {
    for (var elem of step2Elements) {
      elem.classList.remove('hide');
    }
    for (var elem of step1Elements) {
      elem.classList.add('hide');
    }
    nextButton.classList.add('hide');

    stepIndicators[0].classList.remove('active');
    stepIndicators[1].classList.add('active');
    // footerButtons.classList.add('step-2');
    footerButtons.classList.add('hide');

    document.querySelector('.total__result-info').style.marginBottom = 0;
    document.querySelectorAll('#company-name').forEach(elem => elem.innerHTML = document.querySelector('#company').value);
    document.querySelectorAll('#total-taxes').forEach(elem => elem.innerHTML = totalTaxes.toLocaleString('en-EN'));   
    step = 2;
    getCanvas();
  } else if (step === 2) {
    for (var elem of step2Elements) {
      elem.classList.add('hide');
    }
    for (var elem of step3Elements) {
      elem.classList.remove('hide');
    }
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

function crossUpdate(value, slider) {
  if (slider3 === slider) {
    slider3.noUiSlider.set((value * 450958.8).toFixed(2));
  }
}

function updateTotalValues() {
  totalTaxes = Number(slider2Value.innerText) * 0.33 + Number(slider3Value.innerText);
  var totalKindergarden = totalTaxes / costBabyInKindergardenYear;
  var totalPolice = totalTaxes / costPoliceOfficierYear;
  var totalNurse = totalTaxes / costNurseYear;
  // Set total cost of having a baby at the kindegarden for a year
  document.querySelectorAll('#totalKindergarden').forEach(elem => elem.innerHTML = Math.floor(totalKindergarden * 10) / 10);
  // Set total cost of having a police officier for a year
  document.querySelectorAll('#totalPolice').forEach(elem => elem.innerHTML = Math.floor(totalPolice * 10) / 10);
  // Set total cost of having a nurse for a year
  document.querySelectorAll('#totalNurse').forEach(elem => elem.innerHTML = Math.floor(totalNurse * 10) / 10);
}

noUiSlider.create(slider1, {
  start: 12,
  step: 1,
  connect: [true, false],
  animate: false,
  range: {
    min: 1,
    max: 399
  },
});
noUiSlider.create(slider2, {
  start: 80000000,
  animate: false,
  connect: [true, false],
  range: {
    min: 100000,
    max: 150000000
  }
});
noUiSlider.create(slider3, {
  start: 5411506,
  animate: false,
  connect: [true, false],
  range: {
    min: 10000,
    max: 67162000
  }
});

slider1.noUiSlider.on('update', function (values, handle) {
  slider1Value.innerHTML = Math.trunc(values[handle]);
});

slider2.noUiSlider.on('update', function (values, handle) {
  slider2Value.innerHTML = values[handle];
});

slider3.noUiSlider.on('update', function (values, handle) {
  slider3Value.innerHTML = values[handle];
});

slider1.noUiSlider.on('slide', function (values, handle) {
  crossUpdate(values[handle], slider3);
});

slider2.noUiSlider.on('update', updateTotalValues);
slider3.noUiSlider.on('update', updateTotalValues);