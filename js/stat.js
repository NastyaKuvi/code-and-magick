'use strict';

window.renderStatistics = function (ctx, names, times) {
  var mainX = 110;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(mainX, 20, 420, 270);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(mainX - 10, 10, 420, 270);

  ctx.fillStyle = '#000000';
  ctx.font = 'PT Mono 16px';
  ctx.textBaseline = 'top';
  ctx.fillText('Ура, вы победили!', mainX, 30);
  ctx.fillText('Список результатов:', mainX, 50);

  var histogramHeight = 150;
  var columnWidth = 40;
  var columnDist = 50;
  var myColumnColor = 'rgba(255, 0, 0, 1)';
  var maxTime = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > maxTime) {
      maxTime = time;
    }
  }
  var step = histogramHeight / maxTime;

  ctx.textBaseline = 'bottom';
  for (i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = myColumnColor;
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random(0, 1) + ')';
    }
    var currentX = mainX + columnDist * (i + 1) + columnWidth * i;
    ctx.fillRect(currentX, 80 + histogramHeight - times[i] * step, columnWidth, times[i] * step);
    ctx.fillText(names[i], currentX, 270);
  }
};
