'use strict';

var MAIN_WIDTH = 420;
var MAIN_HEIGHT = 270;
var MAIN_X = 100;
var MAIN_Y = 10;
var HISTOGRAM_HEIGHT = 150;

var renderRectangle = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderText = function (ctx, text, x, y, color) {
  if (typeof color === 'undefined') {
    color = 'rgba(0, 0, 0, 1)';
  }
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var renderGamerResult = function (ctx, i, name, time, step) {
  var COLUMN_WIDTH = 40;
  var COLUMN_DIST = 50;

  var currentColor = name === 'Вы' ?
                      'rgba(255, 0, 0, 1)' :
                      'rgba(0, 0, 255, ' + (Math.random() + 0.1) + ')';
  var currentX = MAIN_X + COLUMN_DIST * (i + 1) + COLUMN_WIDTH * i;
  var currentTime = time * step;
  var currentY = MAIN_Y + 80 + HISTOGRAM_HEIGHT - currentTime;
  renderText(ctx, time, currentX, currentY);
  renderRectangle(ctx, currentX, currentY, COLUMN_WIDTH, currentTime, currentColor);
  renderText(ctx, name, currentX, MAIN_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {

  var maxTime = Math.max.apply(null, times);
  var step = HISTOGRAM_HEIGHT / maxTime;

  renderRectangle(ctx, MAIN_X + 10, MAIN_Y + 10, MAIN_WIDTH, MAIN_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderRectangle(ctx, MAIN_X, MAIN_Y, MAIN_WIDTH, MAIN_HEIGHT, 'rgba(255, 255, 255, 1)');

  ctx.font = 'PT Mono 16px';
  ctx.textBaseline = 'bottom';
  renderText(ctx, 'Ура, вы победили!', MAIN_X + 20, MAIN_Y + 35);
  renderText(ctx, 'Список результатов:', MAIN_X + 20, MAIN_Y + 55);

  for (var i = 0; i < times.length; i++) {
    renderGamerResult(ctx, i, names[i], Math.round(times[i]), step);
  }
};
