var Comic = function () {
	// set up canvas
	this.canvas = document.getElementById('comic');
	this.ctx = this.canvas.getContext('2d');

	// set background color of canvas
	this.ctx.fillStyle = "#ffffff";
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	// paths to comic panels
	this.panels = ["images/box1.svg", "images/box2.svg", "images/box3.svg", "images/box4.svg"];
	this.images = [];
	
	this.container = document.getElementById('alone');
	
	this.create();
}

Comic.prototype = {
	create: function () {
		this.resize();
	},

	drawPanels: function (column) {
		// loop through comic panels and have them draw when they're loaded
		var counter = 0;
		this.loadedCounter = 0;
		
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		for(var i = 0, len = this.panels.length / 2; i < len; i++) {
			for(var j = 0, len = this.panels.length / 2; j < len; j++) {
				var img = new Image();
				img.src = this.panels[counter];
				
				if(!column) {
					// draw images
					this.imageLoader(this.canvas, this.ctx, img, j * this.canvas.width / 2, i * this.canvas.height / 2, this.canvas.width / 2, this.canvas.width / 2);
				}
				else {
					// draw images
					this.imageLoader(this.canvas, this.ctx, img, 0, counter * this.canvas.height / 4, this.canvas.width, this.canvas.width);
				}
				
				this.images.push(img);

				counter++;
			}
		}
	},

	resize: function () {
		if(this.container.clientWidth < 672) {
			this.canvas.width = this.container.clientWidth;
			this.canvas.height = this.container.clientWidth * 4;
			
			this.drawPanels(true);
		}
		else {
			this.canvas.width = 672;
			this.canvas.height = 672;
			
			this.drawPanels();
		}
	},

	// a closure for the img onload function
	imageLoader: function (canvas, ctx, img, x, y, width, height) {
		var cont = this.container;
		
		img.onload = function() {
			ctx.drawImage(img, x, y, width, height);
			
			// save to image
			var dataURL = canvas.toDataURL();
			document.getElementById('renderedComic').src = dataURL;
			document.getElementById('renderedComic').style.display = 'block';

			// get rid of padding used for dead space
			cont.style.paddingTop = 0;
		}
	}
};