var visualizer;

function reset() {
  visualizer.reset();
}

function find() {}

window.onload = () => {
  visualizer = new PathVisualizer("drawBoard");
  visualizer.init();
};
