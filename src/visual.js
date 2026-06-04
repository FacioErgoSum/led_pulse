// visual.js — live serial visualizer (Processing-style)
// Whatever the sketch prints to the Serial Monitor is captured here:
//   serialRead()      -> latest line as a string
//   serialValue()     -> latest line parsed to a number (HIGH/ON = 1, LOW/OFF = 0)
//   serialEvent(line) -> called once per new incoming line
//   serialValues()    -> rolling history of parsed numbers

function setup() {
  createCanvas(440, 320);
  noFill();
}

function draw() {
  background(10, 15, 45);

  // rails
  stroke(38, 48, 92);
  strokeWeight(1);
  line(0, 30, width, 30);
  line(0, height - 30, width, height - 30);

  let data = serialValues();
  let n = data.length;

  // scrolling digital waveform (stepped) of incoming serial values
  if (n > 0) {
    stroke(0, 240, 255);
    strokeWeight(2.5);
    noFill();
    beginShape();
    for (let i = 0; i < n; i++) {
      let x = map(i, 0, max(n - 1, 1), 8, width - 24);
      let y = map(data[i], 0, 1, height - 30, 30);
      if (i > 0) vertex(x, map(data[i - 1], 0, 1, height - 30, 30));
      vertex(x, y);
    }
    endShape();
    noStroke();
    fill(0, 240, 255);
    for (let i = 0; i < n; i++) {
      let x = map(i, 0, max(n - 1, 1), 8, width - 24);
      circle(x, map(data[i], 0, 1, height - 30, 30), 5);
    }
  }

  // live value dot
  let v = serialValue();
  noStroke();
  fill(255, 63, 140);
  circle(width - 16, map(v, 0, 1, height - 30, 30), 16);

  // readout
  fill(150, 162, 196);
  textFont('monospace');
  textSize(12);
  text('serial: ' + serialRead(), 14, 22);
  text('value:  ' + v + '   samples: ' + n, 14, height - 12);
}

// fires every time a new line arrives on the serial port
function serialEvent(line) {
  // history is captured automatically via serialValues()
}
