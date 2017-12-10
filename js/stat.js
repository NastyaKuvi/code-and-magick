'use strict';

window.renderStatistics = function (ctx, names, times) {
  var mainX = 100;
  var mainY = 10;
  var mainWidth = 420;
  var mainHeight = 270;
  paintRectangle(ctx, mainX + 10, mainY + 10, mainWidth, mainHeight, 'rgba(0, 0, 0, 0.7)');
  paintRectangle(ctx, mainX, mainY, mainWidth, mainHeight, 'rgba(255, 255, 255, 1)');

  ctx.font = 'PT Mono 16px';
  ctx.textBaseline = 'bottom';
  paintText(ctx, 'Ура, вы победили!', mainX + 20, mainY + 35);
  paintText(ctx, 'Список результатов:', mainX + 20, mainY + 55);

  for (var i = 0; i < times.length; i++) {
    times[i] = Math.round(times[i]);
  }

  var histogramHeight = 150;
  var columnWidth = 40;
  var columnDist = 50;
  var maxTime = Math.max.apply(null, times);
  var step = histogramHeight / maxTime;

  for (i = 0; i < times.length; i++) {
    var currentColor = names[i] === 'Вы' ?
                         'rgba(255, 0, 0, 1)' :
                         'rgba(0, 0, 255, ' + (Math.random() + 0.1) + ')';
    var currentX = mainX + columnDist * (i + 1) + columnWidth * i;
    var currentTime = times[i] * step;
    var currentY = mainY + 80 + histogramHeight - currentTime;
    paintText(ctx, times[i], currentX, currentY);
    paintRectangle(ctx, currentX, currentY, columnWidth, currentTime, currentColor);
    paintText(ctx, names[i], currentX, mainHeight);
  }
};

function paintRectangle(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function paintText(ctx, text, x, y, color) {
  if (typeof color === 'undefined') {
    color = 'rgba(0, 0, 0, 1)';
  }
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}
