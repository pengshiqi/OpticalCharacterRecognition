var ocrDemo = {
  CANVAS_WIDTH: 200,
  TRANSLATE_WIDTH: 20,
  PIXEL_WIDTH: 10, // TRANSLATE_WIDTH = CANVAS_WIDTH / PIXEL_WIDTH
  BATCH_SIZE: 1,

  // Server params
  PORT: '9000',
  HOST: 'http://localhost',

  // Color var
  BLACK: '#000000',
  BLUE: '#0000FF',

  // Server training set
  trainArray: [],
  trainingRequestCount: 0,

  onLoadFunction: function() {
    this.resetCanvas();
  },

  resetCanvas: function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    this.data = [];
    ctx.fillStyle = this.BLACK;
    ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_WIDTH);
    var matrixSize = 400;
    while (matrixSize--)
      this.data.push(0);
    this.drawGrid(ctx);

    // bind event operation
    canvas.onmousemove = function(e) {this.onMouseMove(e, ctx, canvas)}.bind(this);
    canvas.onmousedown = function(e) {this.onMouseDown(e, ctx, canvas)}.bind(this);
    canvas.onmouseup = function(e) {this.onMouseUp(e, ctx)}.bind(this);
  },

  drawGrid: function(ctx) {
    for (var x = this.PIXEL_WIDTH, y = this.PIXEL_WIDTH; x < this.CANVAS_WIDTH; x += this.PIXEL_WIDTH, y += this.PIXEL_WIDTH) {
      ctx.strokeStyle = this.BLUE;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.CANVAS_WIDTH);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(y, 0);
      ctx.lineTo(this.CANVAS_WIDTH, y);
      ctx.stroke();
    }
  },

  onMouseMove: function(e, ctx, canvas) {
    if (!canvas.isDrawing) {
      return;
    }
    this.fillSquare(ctx, e.clientX - canvas.offSetLeft, e.clientY - canvas.offSetTop)
  },

  onMouseUp: function(e) {
    canvas.isDrawing = false;
  },


  onMouseDown: function(e, ctx, canvas) {
    canvas.isDrawing = true;
    this.fillSquare(ctx, e.clientX - canvas.offSetLeft, e.clientY - canvas.offSetTop)
  }

}
