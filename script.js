/**
 * Set the color of a pixel based on the number of iterations to escape
 * @param {Number} row int for row of canvas
 * @param {Number} col int for column of canvas
 * @param {Number} i int for number of iterations to escape
 * @param {Uint8ClampedArray} data an array of pixel data from ImageData
 * @param {Object} config the fractal configuration
 */
function color(row, col, i, data, config) {
  // TODO: Pick a color method with more contrast
  data[(row * config.pixels + col) * 4] = Math.floor(i / config.iterations * 255);
  data[(row * config.pixels + col) * 4 + 1] = Math.floor(i / config.iterations * 255);
  data[(row * config.pixels + col) * 4 + 2] = Math.floor(i / config.iterations * 255);
  data[(row * config.pixels + col) * 4 + 3] = 255;
}

/**
 * Calculate the number of iterations to escape
 * @param {math.Complex} c a complex number
 * @param {Number} n int for the max number of iterations
 * @returns int for the number of iterations to escape
 */
function count(c, n) {
  let z = math.complex(0, 0);
  let i = 0;
  while (i < n && ((math.Complex.compare(z, math.complex(2, 0)) < 0) && (math.Complex.compare(z, math.complex(-2, 0)) > 0))) {
    z = math.add(math.multiply(z, z), c);
    i++;
  }
  return i;
}

/**
 * Put the fractal on the canvas
 * @param {CanvasRenderingContext2D} ctx the canvas context
 * @param {Object} config the fractal configuration
 */
function paint(ctx, config) {
  const myImageData = ctx.createImageData(config.pixels, config.pixels);
  const data = myImageData.data;
  for (let row = 0; row < config.pixels; row++) {
    let y = config.centery - config.axis_length / 2 + (config.pixels - row) * (config.axis_length / config.pixels);
    for (let col = 0; col < config.pixels; col++) {
      let x = config.centerx - config.axis_length / 2 + col * (config.axis_length / config.pixels);
      let i = count(math.complex(x, y), config.iterations);
      color(row, col, i, data, config);
    }
  }
  ctx.putImageData(myImageData, 0, 0);
}

/**
 * Draw the fractal on the canvas
 */
function draw() {
  const canvas = document.getElementById('fractal');
  canvas.height = canvas.width = 512;
  const ctx = canvas.getContext('2d');
  const fractal_config = {
    type: 'mandelbrot',
    centerx: 0.0,
    centery: 0.0,
    axis_length: 4.0,
    pixels: canvas.width,
    iterations: 128,
  };
  paint(ctx, fractal_config);
}
