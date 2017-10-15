'use strict';

window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var lit = false;
  const boilDelay = 2000;
  var boilTimer = 0;

  var potHolder = document.getElementById('stove');

  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    if (!lit) {
      document.getElementById('fire').classList.add('lit');
      lit = true;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function(rect) {
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    });

    if (event.data.length) {
      if (boilTimer) {
        potHolder.classList.remove('boiling');
        clearTimeout(boilTimer);
        boilTimer = 0;
      }
    }
    else if (!boilTimer) {
      boilTimer = setTimeout(function () {
        potHolder.classList.add('boiling');
      }, boilDelay);
    }
  });
};
