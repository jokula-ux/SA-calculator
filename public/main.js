// Functionality for make canvas and download image
var container1 = document.getElementById('image-wrap-1');
var container2 = document.getElementById('image-wrap-2');
var container3 = document.getElementById('image-wrap-3');
var canvasContainer = document.querySelector('.footer__download-images');

function getCanvas() {
  canvasContainer.childNodes.forEach(child => child.innerHTML = '');
  html2canvas(container1, {allowTaint: true}).then(function(canvas) { 
    var link = document.createElement("a");
    link.setAttribute("id", "calculator-download-image")
    var downloadTextContainer = document.createElement("div");
    var title = document.createElement("p");
    title.classList.add("download-image__title");
    title.innerText = "Fæðingar";
    downloadTextContainer.classList.add("download-image__text-container");
    var downloadText = document.createElement("p");
    var downloadIcon = new Image();
    downloadIcon.src = "./images/download-icon.svg";
    downloadText.innerHTML = "Sækja mynd";
    downloadTextContainer.appendChild(downloadText);
    downloadTextContainer.appendChild(downloadIcon);
    link.appendChild(title);
    link.appendChild(canvas);
    link.appendChild(downloadTextContainer);
    document.getElementById("download-image-1").appendChild(link);
    link.download = "Faedingar.png";
    link.href = canvas.toDataURL("image/png");
    link.target = "_blank";
  });
  html2canvas(container2, {allowTaint: true}).then(function(canvas) {
    var link = document.createElement("a");
    link.setAttribute("id", "calculator-download-image")
    var downloadTextContainer = document.createElement("div");
    var title = document.createElement("p");
    title.classList.add("download-image__title");
    title.innerText = "Leikskólapláss";
    downloadTextContainer.classList.add("download-image__text-container");
    var downloadText = document.createElement("p");
    var downloadIcon = new Image();
    downloadIcon.src = "./images/download-icon.svg";
    downloadText.innerHTML = "Sækja mynd";
    downloadTextContainer.appendChild(downloadText);
    downloadTextContainer.appendChild(downloadIcon);
    link.appendChild(title);
    link.appendChild(canvas);
    link.appendChild(downloadTextContainer);
    document.getElementById("download-image-2").appendChild(link);
    link.download = "Leikskolaplass.png";
    link.href = canvas.toDataURL("image/png");
    link.target = "_blank";
  });
  html2canvas(container3, {allowTaint: true}).then(function(canvas) {
    var link = document.createElement("a");
    link.setAttribute("id", "calculator-download-image")
    var downloadTextContainer = document.createElement("div");
    var title = document.createElement("p");
    title.classList.add("download-image__title");
    title.innerText = "Dvalar- og hjúkrunarrými";
    downloadTextContainer.classList.add("download-image__text-container");
    var downloadText = document.createElement("p");
    var downloadIcon = new Image();
    downloadIcon.src = "./images/download-icon.svg";
    downloadText.innerHTML = "Sækja mynd";
    downloadTextContainer.appendChild(downloadText);
    downloadTextContainer.appendChild(downloadIcon);
    link.appendChild(title);
    link.appendChild(canvas);
    link.appendChild(downloadTextContainer);
    document.getElementById("download-image-3").appendChild(link);
    link.download = "hjukrunarrymi.png";
    link.href = canvas.toDataURL("image/png");
    link.target = "_blank";
  })
};

document.querySelectorAll("#editOutput").forEach(item => {
  item.addEventListener("click", (e) => {
    e.currentTarget.parentNode.querySelector("input").select();
  })
})

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

var costNumberOfBirths = 324205;
var costBabyInKindergardenYear = 2600000;
var costNursHomeSpaces = 13200000;

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

  document.querySelectorAll('#totalNumberOfBirths').forEach(elem => elem.innerHTML = (Math.floor(Math.floor(totalNumberOfBirths * 10) / 10)).toLocaleString('de-DE'));
  document.querySelectorAll('#totalKindergarden').forEach(elem => elem.innerHTML = (Math.floor(Math.floor(totalKindergarden * 10) / 10)).toLocaleString('de-DE'));
  document.querySelectorAll('#totalNursHomeSpaces').forEach(elem => elem.innerHTML = (Math.floor(Math.floor(totalNursHomeSpaces * 10) / 10)).toLocaleString('de-DE'));
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
    max: 80000000
  }
});
var slider2ValueMask = IMask(slider2Value, {
  mask: Number,
  scale: 0,
  signed: true,
  thousandsSeparator: '.',
  min: 0,
  max: 80000000
});
noUiSlider.create(slider3, {
  start: 22350,
  step: 1,
  animate: false,
  connect: [true, false],
  range: {
    min: 0,
    max: 50000000
  }
});
var slider3ValueMask = IMask(slider3Value, {
  mask: Number,
  scale: 0,
  signed: true,
  thousandsSeparator: '.',
  min: 0,
  max: 50000000
});

slider1.noUiSlider.on('update', function (values, handle) {
  slider1Value.value = Math.trunc(values[handle]);
  slider1ValueMask.updateValue();
});

slider2.noUiSlider.on('update', function (values, handle) {
  slider2ValueCount = Number(values[handle]);
  slider2Value.value = Number(values[handle]).toLocaleString('de-DE');
  slider2ValueMask.updateValue();
});

slider3.noUiSlider.on('update', function (values, handle) {
  slider3ValueCount = Number(values[handle]);
  slider3Value.value = Number(values[handle]).toLocaleString('de-DE');
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
};

slider2Value.oninput = function (e) {
  slider2.noUiSlider.set(Number(e.target.value.split('.').join('')));
};

slider3Value.oninput = function (e) {
  slider3.noUiSlider.set(Number(e.target.value.split('.').join('')));
};