let canvas;
let ctx;
let appWidth;
let appHeight;

// called by NOOPBOT on window.onload
function start_app() {

  // size canvas to window
  sizeCanvas();

  //fire a draw event.
  draw();

  //redraw when canvas is clicked.
  canvas.addEventListener('click', draw);
}

function sizeCanvas() {
  appWidth = window.innerWidth;
  appHeight = window.innerHeight;
  canvas = document.getElementById('canvas');
  ctx = NOOPBOT_SETUP_CANVAS( { canvas: canvas, bgColor:'#ffffff' });
}

function draw() {
  //get the data!
  NOOPBOT_FETCH({
    API: 'hexbot',
  }, drawSet);
}

function drawSet(responseJson) {
  let { colors } = responseJson;
  colors.forEach(function(point) {
    drawRect(ctx, point, {x: 100, y: 100, width: 200, height: 200});
  });
}

function drawRect(ctx, color, bounds) {
  ctx.fillStyle = color.value;
  ctx.beginPath();
  ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
  ctx.fill();
}

// listen if browser changes size.
window.onresize = function(event){
  sizeCanvas();
  draw();
};
