/*
---
description: Confetti

license: MIT-style

authors:
- Amadeus Demarzi (http://enmassellc.com/)

provides: [Confetti]
...
*/

var Confetti = new Class({

	Implements: [Options, Events],

	options: {
		color: '#ee382c',
		transformEnd: 'translate3d({tx}px, {ty}px, {tz}px) rotateX({rx}deg) rotateY({ry}deg) rotateZ({rz}deg)',
		transformStart: 'translate3d(0, -20px, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
		transition: '-webkit-transform {duration}ms ease-in {delay}ms',
		delay: 0,
		width: 8,
		height: 8
	},

	initialize: function(container, options){
		this.container = document.id(container);
		this.setOptions(options);

		this.containerInfo = this.container.getSize();
		this.options.duration = 1000 * Number.random(2, 4);

		this.confetti = new Element('div', {
			styles: {
				position: 'absolute',
				top: -(this.options.height),
				left: Number.random(4, this.containerInfo.x - 4),
				width: this.options.width,
				height: this.options.height,
				margin: '-' + (this.options.height / 2) + 'px 0 0 -' + (this.options.width / 2) + 'px',
				backgroundColor: this.options.color,
				zIndex: 0,
				webkitTransform: this.options.transformStart
			},
			events: {
				transitionend: this.endFall.bind(this)
			}
		}).inject(this.container);

		if (this.options.autoStart) this.startFall();
	},

	startFall: function(){
		var sub = {
			tx: Number.random(0, 20) - 10,
			ty: this.containerInfo.y + 10,
			tz: Number.random(0, 10) + 10,

			rx: Number.random(360, 1080),
			ry: Number.random(360, 1080),
			rz: Number.random(360, 1080)
		};

		var transform = this.options.transformEnd.substitute(sub),
			transition = this.options.transition.substitute({ duration: Number.random(4000, 10000), delay: this.options.delay });

		(function(){
			this.confetti.setStyles({
				webkitTransition: transition,
				webkitTransform: transform
			});
		}).delay(1, this);
	},

	endFall: function(e){
		if (e && e.stop) e.stop();
		this.confetti.setStyles({
			webkitTransition: 'none',
			webkitTransform: this.options.transformStart
		});
		this.options.delay = 0;
		this.startFall.delay(0, this);
	}

});