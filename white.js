﻿// Big Bang - click to create the universe!
// by Paul Neave
// @neave

var TOTAL = 300;
var galaxies = [];

var Galaxy = function() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.vx = 0;
	this.vy = 0;
	this.vz = 0;
	this.speed = 1;
	this.angle = 0;
	this.div = document.createElement('div');
	this.div.classList.add('galaxy');
};

Galaxy.prototype.move = function() {
	this.x += this.vx * this.speed;
	this.y += this.vy * this.speed;
	this.z += this.vz * this.speed;
  this.div.style.transform = this.div.style.webkitTransform = this.getTransform();
};

Galaxy.prototype.setSize = function(width, height) {
	this.div.style.width = width + 'px';
	this.div.style.height = height + 'px';
};

Galaxy.prototype.getTransform = function() {
	return 'translate3d(' + this.x + 'px' + ',' + this.y + 'px,' + this.z + 'px) rotateZ(' + this.angle + 'deg)';
};

function addGalaxy(g) {
	document.body.appendChild(g.div);
	galaxies.push(g);
}

function removeGalaxies() {
	for (var i = galaxies.length; i--; ) {
		document.body.removeChild(galaxies[i].div);
	}
	galaxies = [];
}

function createGalaxies(total, x, y) {
	for (var i = total; i--; ) {
		var b = new Galaxy();
		b.x = x || window.innerWidth / 2;
		b.y = y || window.innerHeight / 2;
		var v = Math.random() * Math.PI * 2;
		b.vx = Math.cos(v);
		b.vy = Math.sin(v);
		b.vz = Math.random() * 4 - 2;
		var speed = Math.random() * 2 + 0.1;
		b.speed = speed * speed;
		b.angle = Math.random() * 360;
		b.setSize(Math.random() * 23 + 2, Math.random() * 13 + 2);
		addGalaxy(b);
	}
}

function update() {
	updateID = requestAnimationFrame(update);

	for (var i = galaxies.length; i--; ) {
		galaxies[i].move();
	}
}

function init(x, y) {
	removeGalaxies();
	createGalaxies(TOTAL, x, y);
}

document.addEventListener('mousedown', function(event) {
  init(event.x, event.y);
});

document.addEventListener('touchstart', function(event) {
  init(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
});

// requestAnimationFrame shim
var i = 0,
    lastTime = 0,
    vendors = ['ms', 'moz', 'webkit', 'o'];

while (i < vendors.length && !window.requestAnimationFrame) {
  window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
  i++;
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 1000 / 60 - currTime + lastTime),
        id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}

setTimeout(function() {
  init();
  update();
}, 200);