var GRID = 10;

var target = null;
var currentX = 0;
var currentY = 0;
var min = null;
var max = null;
var step = null;

$(document).ready(function() {

	$(".underline-group li").on("click", function(event) {
		$(this).siblings(".active").removeClass("active");
		$(this).addClass("active");
		$(this).nextAll(".underline").stop().animate({
			width: $(this).width(),
			left: $(this).position().left + 10
		}, "fast");
		$(this).parent().trigger("change");
	});

	$(".active").trigger("click");

	$(document).on("mouseup", function(event) {
		if (target !== null) {
			MoveGuidesInward(target);
			target.stop().animate({
				color: "#000"
			}, "fast");
		}
		target = null;
	});

	$(document).on("mousemove", function(event) {
		if (target !== null && (Math.abs(currentX - event.pageX) > GRID || Math.abs(currentY - event.pageY) > GRID)) {
			if (target.attr("data") === undefined) {
				var speed = step;
				if (event.shiftKey) speed = step * 10;
				var value = Math.round((target.text() - (event.pageY - currentY) * speed / GRID + (event.pageX - currentX) * speed / GRID) / speed) * speed;
				if (value > max) value = max;
				if (value < min) value = min;
				target.text(value);
				updateGuides(target);
				currentX = event.pageX;
				currentY = event.pageY;
			} else {
				var data = JSON.parse(target.attr("data"));
				for (var i = 0; i < data.length; i++)
					if (target.text() === data[i]) break;
				var value = Math.round(i - (event.pageY - currentY) / GRID + (event.pageX - currentX) / GRID);
				if (value < 0) value = 0;
				if (value > data.length - 1) value = data.length - 1;
				target.text(data[value]);
				updateGuides(target);
				currentX = event.pageX;
				currentY = event.pageY;
			}
		}
	});

	$(".slider").on("mousedown", function(event) {
		currentX = event.pageX;
		currentY = event.pageY;
		min = $(this).attr("min");
		max = $(this).attr("max");
		step = $(this).attr("step");
		target = $(this);
		$(this).stop().animate({
			color: "#d9534f"
		}, "fast");
	});

	$(".slider").on("mouseover", function(event) {
		if (target === null) {
			$(this).stop().animate({
				color: "#428bca"
			}, "fast");
			updateGuides($(this));
			$(this).nextAll(".guide-up").css({
				left: $(this).position().left,
				top: $(this).position().top - 5,
				display: "block",
				opacity: 0
			});
			$(this).nextAll(".guide-down").css({
				left: $(this).position().left,
				top: $(this).position().top + $(this).height() - 5,
				display: "block",
				opacity: 0
			});
			$(this).nextAll(".guide-up").stop().animate({
				top: "-=10",
				opacity: 1
			}, "fast");
			$(this).nextAll(".guide-down").stop().animate({
				top: "+=10",
				opacity: 1
			}, "fast");
		}
	});

	$(".slider").on("mouseout", function(event) {
		if (target === null) {
			MoveGuidesInward($(this));
			if (target === null) {
				$(this).stop().animate({
					color: "#000"
				}, "fast");
			}
		}
	});

	$("#format").on("change", function() {
		switch ($(this).children(".active").attr("value")) {
			case "HLS":
				$(".hlsSettings").show("fast");
				break;
			default:
				$(".hlsSettings").hide("fast");
				break;
		}
	});
});

function updateGuides(target) {
	if (target.attr("data") === undefined) {
		target.nextAll(".guide-up").html("<span class=\"glyphicon glyphicon-chevron-up\" aria-hidden=\"true\"></span> " + (target.text() - (-target.attr("step"))));
		target.nextAll(".guide-down").html("<span class=\"glyphicon glyphicon-chevron-down\" aria-hidden=\"true\"></span> " + (target.text() - target.attr("step")));
		console.log
	} else {
		var data = JSON.parse(target.attr("data"));
		for (var i = 0; i < data.length; i++)
			if (target.text() === data[i]) break;
		target.nextAll(".guide-up").html((data[i + 1] !== undefined) ? ("<span class=\"glyphicon glyphicon-chevron-up\" aria-hidden=\"true\"></span> " + data[i + 1]) : "");
		target.nextAll(".guide-down").html((data[i - 1] !== undefined) ? ("<span class=\"glyphicon glyphicon-chevron-down\" aria-hidden=\"true\"></span> " + data[i - 1]) : "");
	}
}

function MoveGuidesInward(target) {
	target.nextAll(".guide-up").stop().animate({
		top: target.position().top - 5,
		opacity: 0
	}, "fast");
	target.nextAll(".guide-down").stop().animate({
		top: target.position().top + target.height() - 5,
		opacity: 0
	}, "fast");
}