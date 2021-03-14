class PathVisualizer {
  #cnavasId;
  #canvasWidth;
  #canvasHeight;
  #canvas;
  #ctx;
  #margin = 1.5;
  #cellSize = 5;
  #rows;
  #columns;

  constructor(cnavasId) {
    this.#canvas = document.getElementById(cnavasId);
    if (!this.#canvas) {
      throw `Canvas with id ${cnavasId} was not found`;
    }

    this.#cnavasId = cnavasId;
    this.#canvasWidth = this.#canvas.clientWidth;
    this.#columns = Math.floor(
      this.#canvas.clientWidth / (this.#margin + this.#cellSize)
    );
    this.#rows = Math.floor(
      this.#canvas.clientHeight / (this.#margin + this.#cellSize)
    );
    this.#canvas.height = this.#canvas.scrollHeight;
    this.#canvas.width = this.#canvas.scrollWidth;
    this.#canvasHeight = this.#canvas.clientHeight;
    this.#ctx = this.#canvas.getContext("2d");
    this.#ctx.fillStyle = "rgba(170, 214, 121, 0.2)";
  }

  init() {
    for (var i = 0; i < this.#rows; i++) {
      this.#initRow(i);
    }

    var graph = this.#convertGridToGraph();
  }

  #initRow(rowNum) {
    for (var i = 0; i < this.#columns; i++) {
      this.#paintCell(rowNum, i);
    }
  }

  #paintCell = (row, col) => {
    var offsetX = (this.#margin + this.#cellSize) * col;
    var offsetY = (this.#margin + this.#cellSize) * row;
    this.#ctx.fillRect(offsetX, offsetY, this.#cellSize, this.#cellSize);
  }

  #convertGridToGraph() {
    var graph = {};
    for (var x = 0; x < this.#columns - 1; x++) {
      for (var y = 0; y < this.#rows - 1; y++) {
        var node = this.#createNode(x, y);
        graph[node.id] = node;
      }
    }

    return graph;
  }

  #createNode(x, y) {
    var node = {
      id: this.#getNodeId(x, y),
      connectedNodes: []
    }
    if (!this.#isOutOfBounds(x - 1, y)) {
      node.connectedNodes.push(this.#getNodeId(x - 1, y));
    }
    if (!this.#isOutOfBounds(x, y - 1)) {
      node.connectedNodes.push(this.#getNodeId(x, y - 1));
    }
    if (!this.#isOutOfBounds(x + 1, y)) {
      node.connectedNodes.push(this.#getNodeId(x + 1, y));
    }
    if (!this.#isOutOfBounds(x, y + 1)) {
      node.connectedNodes.push(this.#getNodeId(x, y + 1));
    }

    return node;
  }

  #getNodeId(x, y) {
    return `[${x},${y}]`;
  }

  #isOutOfBounds(x, y) {
    return x < 0 || x > this.#columns - 1 || y < 0 || y > this.#rows - 1;
  };
}
