let canvas;
let ctx;
let appWidth;
let appHeight;

// called by NOOPBOT on window.onload
function start_app() {

  // size canvas to window
  sizeCanvas();

  //set up a ticker to refresh page automatically.
  let speed = 5000; // how often screen refreshes, in milliseconds.
  let ticker = NOOPBOT_TICK_SETUP(draw, speed);

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
    count: 1000,
    width: appWidth,
    height: appHeight,
  }, drawSet);
}

function drawSet(responseJson) {
  ctx.clearRect(0, 0, appWidth, appHeight);
  let { colors } = responseJson;
  colors.forEach(function(point) {
    drawPoint(ctx, point);
  })
}

function drawPoint(ctx, point) {
  ctx.fillStyle = point.value;
  let pointSize = NOOPBOT_RANDOM(1,8);
  ctx.beginPath();
  ctx.arc(point.coordinates.x, point.coordinates.y, pointSize, 0, Math.PI * 2, true);
  ctx.fill();
}

// listen if browser changes size.
window.onresize = function(event){
  sizeCanvas();
  draw();
};
