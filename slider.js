const GRID = 10;

let target = null;
let currentX = 0;
let currentY = 0;
let min = null;
let max = null;
let step = null;

const updateGuides = function(target) {
  if (target.attr('data') === undefined) {
    target.nextAll('.guide-up').html('<i class="fas fa-chevron-up"></i> ' + (target.text() - (-target.attr('step'))));
    target.nextAll('.guide-down').html('<i class="fas fa-chevron-down"></i> ' + (target.text() - target.attr('step')));
  } else {
    let i = 0;
    const data = JSON.parse(target.attr('data'));
    for (i = 0; i < data.length; i++) {
      if (target.text() === data[i]) break;
    }
    target.nextAll('.guide-up').html(data[i + 1] !== undefined ? ('<i class="fas fa-chevron-up"></i> ' + data[i + 1]) : '');
    target.nextAll('.guide-down').html(data[i - 1] !== undefined ? ('<i class="fas fa-chevron-down"></i> ' + data[i - 1]) : '');
  }
};

const MoveGuidesInward = function(target) {
  target.nextAll('.guide-up').stop().animate({
    top: target.position().top - 5,
    opacity: 0,
  }, 'fast');
  target.nextAll('.guide-down').stop().animate({
    top: target.position().top + target.height() - 5,
    opacity: 0,
  }, 'fast');
};

(function() {

  $(document).on('mouseup', function(event) {
    if (target !== null) {
      MoveGuidesInward(target);
      target.stop().animate({
        color: '#000',
      }, 'fast');
    }
    target = null;
  });

  $(document).on('mousemove', function(event) {
    if (target !== null && (Math.abs(currentX - event.pageX) > GRID || Math.abs(currentY - event.pageY) > GRID)) {
      if (target.attr('data') === undefined) {
        let speed = step;
        if (event.shiftKey) speed = step * 10;
        let value = Math.round((target.text() - (event.pageY - currentY) * speed / GRID + (event.pageX - currentX) * speed / GRID) / speed) * speed;
        if (value > max) value = max;
        if (value < min) value = min;
        target.text(value);
        updateGuides(target);
        currentX = event.pageX;
        currentY = event.pageY;
      } else {
        let i = 0;
        const data = JSON.parse(target.attr('data'));
        for (i = 0; i < data.length; i++) {
          if (target.text() === data[i]) break;
        }
        let value = Math.round(i - (event.pageY - currentY) / GRID + (event.pageX - currentX) / GRID);
        if (value < 0) value = 0;
        if (value > data.length - 1) value = data.length - 1;
        target.text(data[value]);
        updateGuides(target);
        currentX = event.pageX;
        currentY = event.pageY;
      }
    }
  });

  $('.current').on('mousedown', function(event) {
    currentX = event.pageX;
    currentY = event.pageY;
    min = $(this).attr('min');
    max = $(this).attr('max');
    step = $(this).attr('step');
    target = $(this);
    $(this).stop().animate({
      color: '#d9534f',
    }, 'fast');
  });

  $('.current').on('mouseover', function(event) {
    if (target === null) {
      $(this).stop().animate({
        color: '#428bca',
      }, 'fast');
      updateGuides($(this));
      $(this).nextAll('.guide-up').css({
        left: $(this).position().left,
        top: $(this).position().top - 5,
        display: 'block',
        opacity: 0,
      });
      $(this).nextAll('.guide-down').css({
        left: $(this).position().left,
        top: $(this).position().top + $(this).height() - 5,
        display: 'block',
        opacity: 0,
      });
      $(this).nextAll('.guide-up').stop().animate({
        top: '-=10',
        opacity: 1,
      }, 'fast');
      $(this).nextAll('.guide-down').stop().animate({
        top: '+=10',
        opacity: 1,
      }, 'fast');
    }
  });

  $('.current').on('mouseout', function(event) {
    if (target === null) {
      MoveGuidesInward($(this));
      if (target === null) {
        $(this).stop().animate({
          color: '#000',
        }, 'fast');
      }
    }
  });
})();
