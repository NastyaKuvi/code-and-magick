'use strict';

var DataMap = {
  FIRST_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SECOND_NAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIRE_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var KeyMap = {
  ESC_CODE: 27,
  ENTER_CODE: 13
};

var HIDDEN = 'hidden';

var setupDialog = document.querySelector('.setup');
var setupClose = setupDialog.querySelector('.setup-close');
var setupSimilar = setupDialog.querySelector('.setup-similar');
var setupInput = setupDialog.querySelector('.setup-user-name');
var setupSubmit = setupDialog.querySelector('.setup-submit');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupPlayer = setupDialog.querySelector('.setup-player');
var setupWizardCoat = setupPlayer.querySelector('.wizard-coat');
var setupWizardEyes = setupPlayer.querySelector('.wizard-eyes');
var setupFireBall = setupDialog.querySelector('.setup-fireball-wrap');
var wizardTemplate = document.querySelector('#similar-wizard-template').content;

var wizardColors = {
  coat: DataMap.COAT_COLORS[0],
  eyes: DataMap.EYES_COLORS[0],
  fire: DataMap.FIRE_COLORS[0],
};

var getRandomNumder = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomItem = function (array) {
  var index = getRandomNumder(0, array.length);
  return array[index];
};

var createWizards = function (count) {
  var resultWizards = [];
  for (var i = 0; i < count; i++) {
    resultWizards.push({
      name: getRandomItem(DataMap.FIRST_NAMES) + ' ' + getRandomItem(DataMap.SECOND_NAMES),
      coatColor: getRandomItem(DataMap.COAT_COLORS),
      eyesColor: getRandomItem(DataMap.EYES_COLORS),
    });
  }
  return resultWizards;
};

var resetMainWizardColors = function () {
  setupWizardCoat.style.fill = wizardColors.coat;
  setupWizardEyes.style.fill = wizardColors.eyes;
  setupFireBall.style.background = wizardColors.fire;
};

var saveMainWizardColors = function () {
  wizardColors.coat = setupWizardCoat.style.fill;
  wizardColors.eyes = setupWizardEyes.style.fill;
  wizardColors.fire = setupFireBall.style.background;
};

var showSetupDialog = function () {
  setupDialog.classList.remove(HIDDEN);
  document.addEventListener('keydown', setupDialogEscKeyDownHandler);
};

var hideSetupDialog = function () {
  setupDialog.classList.add(HIDDEN);
  document.removeEventListener('keydown', setupDialogEscKeyDownHandler);
};

var submitSetupDialog = function () {
  var valid = setupInput.validity.valid;
  if (valid) {
    hideSetupDialog();
    saveMainWizardColors();
  }
  return valid;
};

var setupDialogEscKeyDownHandler = function (evt) {
  if (evt.keyCode === KeyMap.ESC_CODE) {
    hideSetupDialog();
    resetMainWizardColors();
  }
};

var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

setupOpen.addEventListener('click', function () {
  showSetupDialog();
});

setupClose.addEventListener('click', function () {
  hideSetupDialog();
  resetMainWizardColors();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyMap.ENTER_CODE) {
    hideSetupDialog();
    resetMainWizardColors();
  }
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyMap.ENTER_CODE) {
    showSetupDialog();
  }
});

setupInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyMap.ESC_CODE) {
    evt.stopPropagation();
  }
});

setupSubmit.addEventListener('click', function (evt) {
  if (!submitSetupDialog()) {
    evt.stopPropagation();
  } else {
    evt.preventDefault();
  }
});

setupSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyMap.ENTER_CODE) {
    if (!submitSetupDialog()) {
      evt.stopPropagation();
    } else {
      evt.preventDefault();
    }
  }
});

setupWizardCoat.addEventListener('click', function () {
  setupWizardCoat.style.fill = getRandomItem(DataMap.COAT_COLORS);
});

setupWizardEyes.addEventListener('click', function () {
  setupWizardEyes.style.fill = getRandomItem(DataMap.EYES_COLORS);
});

setupFireBall.addEventListener('click', function () {
  setupFireBall.style.background = getRandomItem(DataMap.FIRE_COLORS);
});

resetMainWizardColors();
var wizards = createWizards(4);

var fragment = document.createDocumentFragment();
wizards.forEach(function (wizard) {
  fragment.appendChild(renderWizard(wizard));
});

setupSimilar.querySelector('.setup-similar-list').appendChild(fragment);
