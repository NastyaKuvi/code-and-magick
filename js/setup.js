'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setupDialog = document.querySelector('.setup');
setupDialog.classList.remove('hidden');

var setupSimilar = setupDialog.querySelector('.setup-similar');
var wizardTemplate = document.querySelector('#similar-wizard-template').content;

var getRandomNumder = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var createWizards = function (count) {
  var resultWizards = [];
  for (var i = 0; i < count; i++) {
    resultWizards.push({
      name: FIRST_NAMES[getRandomNumder(0, FIRST_NAMES.length)] + ' ' + SECOND_NAMES[getRandomNumder(0, SECOND_NAMES.length)],
      coatColor: COAT_COLORS[getRandomNumder(0, COAT_COLORS.length)],
      eyesColor: EYES_COLORS[getRandomNumder(0, EYES_COLORS.length)]
    });
  }
  return resultWizards;
};

var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var wizards = createWizards(4);

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
setupSimilar.querySelector('.setup-similar-list').appendChild(fragment);
setupSimilar.classList.remove('hidden');
