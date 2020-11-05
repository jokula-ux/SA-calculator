// Functionality for make canvas and download image
var container1 = document.getElementById('image-wrap-1');
var container2 = document.getElementById('image-wrap-2');
var container3 = document.getElementById('image-wrap-3');
// var container4 = document.getElementById('image-wrap-4');
// var container5 = document.getElementById('image-wrap-5');
// var container6 = document.getElementById('image-wrap-6');
var canvasContainer = document.querySelector('.footer__download-images');
var downloadImagesButton = document.querySelector('.footer__cta-message');

var zip = new JSZip();

function getCanvas() {
  downloadImagesButton.removeEventListener('click', downloadPackage);
  zip = new JSZip();
  async function fillArchive() {
    await html2canvas(container1, {allowTaint: true}).then(function(canvas) {
      zip.file("Faedingar.png", canvas.toDataURL().split('base64,')[1], {base64: true});
    });
    await html2canvas(container2, {allowTaint: true}).then(function(canvas) {
      downloadImagesButton.querySelectorAll('canvas').forEach(item => item.parentNode.removeChild(item));
      document.querySelector('.footer__cta-message').appendChild(canvas);
      zip.file("Leikskolaplass.png", canvas.toDataURL().split('base64,')[1], {base64: true});
    });
    await html2canvas(container3, {allowTaint: true}).then(function(canvas) {
      zip.file("Hjukrunarrymi.png", canvas.toDataURL().split('base64,')[1], {base64: true});
    });
    // await html2canvas(container4, {allowTaint: true}).then(function(canvas) {
    //   zip.file("Hjukrunarfraedingar.png", canvas.toDataURL().split('base64,')[1], {base64: true});
    // });
    // await html2canvas(container5, {allowTaint: true}).then(function(canvas) {
    //   zip.file("Grunnskolakennarar.png", canvas.toDataURL().split('base64,')[1], {base64: true});
    // });
    // await html2canvas(container6, {allowTaint: true}).then(function(canvas) {
    //   zip.file("Logregluthjonar.png", canvas.toDataURL().split('base64,')[1], {base64: true});
    // });
  }
  fillArchive()
    .then(() => downloadImagesButton.addEventListener('click', downloadPackage));
};

function downloadPackage() {
  zip.generateAsync({type:"blob"})
  .then(function(content) {
    saveAs(content, "Hlaðið_niður_skrám.zip");
  });
};

// Functionality for steps
var step1Elements = document.getElementsByClassName('step-1');
var step2Elements = document.getElementsByClassName('step-2');
var step3Elements = document.getElementsByClassName('step-3');

var totalTaxes = null;

var changeStepButton = document.querySelector('.footer__buttons--change-step');

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

    document.querySelector('.total__result-info').style.marginBottom = 0;
    document.querySelectorAll('#company-name').forEach(elem => elem.innerHTML = company.value);
    document.querySelectorAll('#total-taxes').forEach(elem => elem.innerHTML = Math.floor(totalTaxes).toLocaleString('de-DE'));

    step = 2;
    changeStepButton.textContent = 'Reikna aftur';

    getCanvas();
  } else if (step === 2) {
    for (var elem of step1Elements) {
      elem.classList.remove('hide');
    }
    for (var elem of step2Elements) {
      elem.classList.add('hide');
    }

    step = 1;
    changeStepButton.textContent = 'Áfram';
  }
}

// Functionality for sliders
var lockedState = true;
var lockedSlider = false;

var costNumberOfBirths = 307416;
var costBabyInKindergardenYear = 2289258;
var costNursHomeSpaces = 13168558;
//var costNurses = 12923192;
//var costTeachers = 9339406;
//var costPoliceOfficers = 12427622;

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
    slider2.noUiSlider.set((value * 10800).toFixed(2));
  }
  else if (slider3 === slider) {
    slider3.noUiSlider.set((value * 447).toFixed(2));
  }
}

function updateTotalValues() {
  totalTaxes = slider2ValueCount * 328.801 + slider3ValueCount * 1000;
  
  var totalNumberOfBirths = totalTaxes / costNumberOfBirths;
  var totalKindergarden = totalTaxes / costBabyInKindergardenYear;
  var totalNursHomeSpaces = totalTaxes / costNursHomeSpaces;
  //var totalNurses = totalTaxes / costNurses;
  //var totalTeachers = totalTaxes / costTeachers;
  //var totalPoliceOfficers = totalTaxes / costPoliceOfficers;

  document.querySelectorAll('#totalNumberOfBirths').forEach(elem => elem.innerHTML = (Math.floor(Math.floor(totalNumberOfBirths * 10) / 10)).toLocaleString('de-DE'));
  document.querySelectorAll('#totalKindergarden').forEach(elem => elem.innerHTML = (Math.floor(Math.floor(totalKindergarden * 10) / 10)).toLocaleString('de-DE'));
  document.querySelectorAll('#totalNursHomeSpaces').forEach(elem => elem.innerHTML = (Math.floor(Math.floor(totalNursHomeSpaces * 10) / 10)).toLocaleString('de-DE'));
  //document.querySelectorAll('#totalNurses').forEach(elem => elem.innerHTML = (Math.floor(totalNurses * 10) / 10).toLocaleString('de-DE'));
  //document.querySelectorAll('#totalTeachers').forEach(elem => elem.innerHTML = (Math.floor(totalTeachers * 10) / 10).toLocaleString('de-DE'));
  //document.querySelectorAll('#totalPoliceOfficers').forEach(elem => elem.innerHTML = (Math.floor(totalPoliceOfficers * 10) / 10).toLocaleString('de-DE'));
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
var slider1ValueMask = IMask(slider1Value, {
  mask: Number,
  scale: 0,
  signed: true,
  min: 0,
  max: 4500
});
noUiSlider.create(slider2, {
  start: 540000,
  step: 1,
  animate: false,
  connect: [true, false],
  range: {
    min: 0,
    max: 70000000
  }
});
var slider2ValueMask = IMask(slider2Value, {
  mask: Number,
  scale: 0,
  signed: true,
  thousandsSeparator: '.',
  min: 0,
  max: 70000000
});
noUiSlider.create(slider3, {
  start: 22350,
  step: 1,
  animate: false,
  connect: [true, false],
  range: {
    min: 0,
    max: 10000000
  }
});
var slider3ValueMask = IMask(slider3Value, {
  mask: Number,
  scale: 0,
  signed: true,
  thousandsSeparator: '.',
  min: 0,
  max: 10000000
});

slider1.noUiSlider.on('update', function (values, handle) {
  slider1Value.value = Math.trunc(values[handle]);
  changeInputSize(slider1Value);
  slider1ValueMask.updateValue();
});

slider2.noUiSlider.on('update', function (values, handle) {
  slider2ValueCount = Number(values[handle]);
  slider2Value.value = Number(values[handle]).toLocaleString('de-DE');
  changeInputSize(slider2Value);
  slider2ValueMask.updateValue();
});

slider3.noUiSlider.on('update', function (values, handle) {
  slider3ValueCount = Number(values[handle]);
  slider3Value.value = Number(values[handle]).toLocaleString('de-DE');
  changeInputSize(slider3Value);
  slider3ValueMask.updateValue();
});

slider1.noUiSlider.on('update', function (values, handle) {
  crossUpdate(values[handle], slider2);
  crossUpdate(values[handle], slider3);
});

slider2.noUiSlider.on('update', updateTotalValues);
slider3.noUiSlider.on('update', updateTotalValues);

slider1Value.oninput = function (e) {
  slider1.noUiSlider.set(Number(e.target.value));
  changeInputSize(e.target);
};

slider2Value.oninput = function (e) {
  slider2.noUiSlider.set(Number(e.target.value.split('.').join('')));
  changeInputSize(e.target);
};

slider3Value.oninput = function (e) {
  slider3.noUiSlider.set(Number(e.target.value.split('.').join('')));
  changeInputSize(e.target);
};

function changeInputSize (input) {
  input.size = input.value.length;
}