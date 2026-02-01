// puzzle_solver.js

// PuzzleState for A* and IDA*
class PuzzleState {
    constructor(state, blankIndex, depth = 0) {
        this.state = state;
        this.blankIndex = blankIndex;
        this.depth = depth;
    }

    isGoal() {
        for (let i = 0; i < 24; i++) {
            if (this.state[i] !== i) return false;
        }
        return this.state[24] === -1;
    }

    getPossibleMoves(gridSize) {
        const moves = [];
        const x = this.blankIndex % gridSize;
        const y = Math.floor(this.blankIndex / gridSize);

        if (x > 0) moves.push(this.blankIndex - 1);
        if (x < gridSize - 1) moves.push(this.blankIndex + 1);
        if (y > 0) moves.push(this.blankIndex - gridSize);
        if (y < gridSize - 1) moves.push(this.blankIndex + gridSize);

        return moves;
    }

    moveTile(targetIdx) {
        const newState = this.state.slice();
        [newState[this.blankIndex], newState[targetIdx]] = [newState[targetIdx], newState[this.blankIndex]];
        return new PuzzleState(newState, targetIdx, this.depth + 1);
    }

    manhattan(gridSize) {
        let dist = 0;
        for (let i = 0; i < this.state.length; i++) {
            if (this.state[i] === -1) continue;
            const targetX = this.state[i] % gridSize;
            const targetY = Math.floor(this.state[i] / gridSize);
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
            dist += Math.abs(targetX - x) + Math.abs(targetY - y);
        }
        return dist;
    }

    key() {
        return this.state.join(",");
    }
}

// IDAStar fallback solver
class IDAStar {
    constructor(gridSize = 5) {
        this.gridSize = gridSize;
        this.path = [];
        this.threshold = 0;
        this.found = false;
    }

    search(node, g, threshold) {
        const f = g + node.manhattan(this.gridSize);
        if (f > threshold) return f;
        if (node.isGoal()) {
            this.found = true;
            return -1;
        }

        let min = Infinity;
        for (const move of node.getPossibleMoves(this.gridSize)) {
            const next = node.moveTile(move);
            if (this.path.length > 0 && next.key() === this.path[this.path.length - 1].key()) continue;
            this.path.push(next);
            const temp = this.search(next, g + 1, threshold);
            if (this.found) return -1;
            if (temp < min) min = temp;
            this.path.pop();
        }
        return min;
    }

    solve(startState) {
        const root = new PuzzleState(startState, startState.indexOf(-1));
        this.threshold = root.manhattan(this.gridSize);
        this.path = [root];

        while (true) {
            const temp = this.search(root, 0, this.threshold);
            if (this.found) {
                const moves = [];
                for (let i = 1; i < this.path.length; i++) {
                    moves.push(this.blankPosToMove(this.path[i - 1], this.path[i]));
                }
                return moves;
            }
            if (temp === Infinity) break;
            this.threshold = temp;
        }
        return [];
    }

    blankPosToMove(prev, next) {
        const idx = next.blankIndex;
        return {
            x: idx % this.gridSize,
            y: Math.floor(idx / this.gridSize),
        };
    }
}

// MinHeap for A*
class MinHeap {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
        this.bubbleUp();
    }

    pop() {
        if (this.items.length === 1) return this.items.pop();
        const top = this.items[0];
        this.items[0] = this.items.pop();
        this.bubbleDown();
        return top;
    }

    bubbleUp() {
        let index = this.items.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.items[index].priority >= this.items[parent].priority) break;
            [this.items[index], this.items[parent]] = [this.items[parent], this.items[index]];
            index = parent;
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.items.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.items[left].priority < this.items[smallest].priority) smallest = left;
            if (right < length && this.items[right].priority < this.items[smallest].priority) smallest = right;
            if (smallest === index) break;
            [this.items[index], this.items[smallest]] = [this.items[smallest], this.items[index]];
            index = smallest;
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }
}
// PuzzleBox Class
class PuzzleBox {
    constructor(canvasId, solveButtonId, puzzleSet, movesCounterId = null, resetButtonId = null) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.solveButton = document.getElementById(solveButtonId);
        this.puzzleSet = puzzleSet;
        this.movesCounterId = movesCounterId;
        this.resetButton = resetButtonId ? document.getElementById(resetButtonId) : null;
        this.gridSize = 5;
        this.tileSize = this.canvas.width / this.gridSize;
        this.emptyTile = { x: 4, y: 4 };
        this.tiles = [];
        this.images = [];
        this.dragStart = null;
        this.dragOver = null;
        this.animationDelay = 500;
        this.currentPath = [];
        this.currentStepIndex = 0;
        this.isSolving = false;
        this.animatingTile = null;
        this.animationProgress = 0;
        this.loadImages();
        this.setupEvents();
    }

    loadImages() {
        let promises = this.puzzleSet.map(
            (src) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.error('Failed to load image:', src);
                        resolve(null); // Resolve with null so Promise.all doesn't fail
                    };
                    img.src = src;
                })
        );

        Promise.all(promises).then((loadedImages) => {
            this.images = loadedImages;
            this.initTiles();
            this.draw();
        });
    }

    initTiles() {
        let order = Array.from({ length: 24 }, (_, i) => i);
        order.push(-1);
        this.tiles = [];
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const idx = y * this.gridSize + x;
                const val = order[idx];
                if (val === -1) {
                    this.emptyTile = { x, y };
                    this.tiles.push(null);
                } else {
                    this.tiles.push(val);
                }
            }
        }
    }

    setupEvents() {
        // Track actual mouse position for smooth drag
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.canvas.addEventListener("mousedown", (e) => {
            if (this.animatingTile) return; // Don't allow interaction during animation
            const { x, y } = this.getMouseTile(e);
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            
            // If we're in solve mode and user clicks the highlighted tile
            if (this.isSolving && this.currentPath[this.currentStepIndex]) {
                const nextMove = this.currentPath[this.currentStepIndex];
                if (x === nextMove.x && y === nextMove.y) {
                    this.executeNextMove();
                    return;
                }
            }
            
            // Otherwise, start drag for rearranging
            if (!this.isSolving) {
                const idx = y * this.gridSize + x;
                if (this.tiles[idx] !== null) { // Only drag actual tiles, not empty space
                    this.dragStart = { x, y };
                    this.dragOver = { x, y };
                    this.draw();
                }
            }
        });

        this.canvas.addEventListener("mousemove", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            
            if (this.dragStart && !this.isSolving) {
                const { x, y } = this.getMouseTile(e);
                this.dragOver = { x, y };
                this.draw();
            }
        });

        this.canvas.addEventListener("mouseup", (e) => {
            if (!this.dragStart || this.isSolving) return;
            const { x, y } = this.getMouseTile(e);
            this.swapTiles(this.dragStart.x, this.dragStart.y, x, y);
            this.dragStart = null;
            this.dragOver = null;
            this.draw();
        });
        
        // Handle mouse leaving canvas
        this.canvas.addEventListener("mouseleave", (e) => {
            if (this.dragStart) {
                this.dragStart = null;
                this.dragOver = null;
                this.draw();
            }
        });

        this.solveButton.addEventListener("click", () => {
            if (this.isSolving) {
                // Cancel solving mode
                this.isSolving = false;
                this.currentPath = [];
                this.currentStepIndex = 0;
                this.solveButton.textContent = "Solve";
                if (this.movesCounterId) {
                    document.getElementById(this.movesCounterId).textContent = "";
                }
                this.draw();
                return;
            }
            
            this.solve().then((path) => {
                if (path.length > 0) {
                    this.currentPath = path;
                    this.currentStepIndex = 0;
                    this.isSolving = true;
                    this.solveButton.textContent = "Cancel";
                    if (this.movesCounterId) {
                        document.getElementById(this.movesCounterId).textContent = `Moves remaining: ${path.length}`;
                    }
                }
                this.draw();
            });
        });

        if (this.resetButton) {
            this.resetButton.addEventListener("click", () => {
                this.isSolving = false;
                this.currentPath = [];
                this.currentStepIndex = 0;
                this.solveButton.textContent = "Solve";
                if (this.movesCounterId) {
                    document.getElementById(this.movesCounterId).textContent = "";
                }
                this.initTiles();
                this.draw();
            });
        }
    }

    executeNextMove() {
        if (!this.currentPath[this.currentStepIndex]) return;
        
        const move = this.currentPath[this.currentStepIndex];
        this.animateMove(move.x, move.y, () => {
            this.currentStepIndex++;
            
            // Update moves counter
            if (this.movesCounterId) {
                const remaining = this.currentPath.length - this.currentStepIndex;
                if (remaining > 0) {
                    document.getElementById(this.movesCounterId).textContent = `Moves remaining: ${remaining}`;
                } else {
                    document.getElementById(this.movesCounterId).textContent = "Solved!";
                    this.isSolving = false;
                    this.solveButton.textContent = "Solve";
                }
            }
            
            this.draw();
        });
    }

    animateMove(x, y, callback) {
        const tileIdx = y * this.gridSize + x;
        const emptyIdx = this.emptyTile.y * this.gridSize + this.emptyTile.x;
        const tileValue = this.tiles[tileIdx];
        
        if (tileValue === null) {
            callback();
            return;
        }
        
        // Calculate direction
        const dx = this.emptyTile.x - x;
        const dy = this.emptyTile.y - y;
        
        this.animatingTile = {
            value: tileValue,
            fromX: x,
            fromY: y,
            toX: this.emptyTile.x,
            toY: this.emptyTile.y,
            dx: dx,
            dy: dy
        };
        
        this.animationProgress = 0;
        const animationDuration = 150; // milliseconds
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            this.animationProgress = Math.min(elapsed / animationDuration, 1);
            
            // Ease-out function for smoother animation
            const easeOut = 1 - Math.pow(1 - this.animationProgress, 3);
            this.animationProgress = easeOut;
            
            this.draw();
            
            if (elapsed < animationDuration) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete - update tile positions
                this.tiles[emptyIdx] = this.tiles[tileIdx];
                this.tiles[tileIdx] = null;
                this.emptyTile = { x, y };
                this.animatingTile = null;
                this.animationProgress = 0;
                callback();
            }
        };
        
        requestAnimationFrame(animate);
    }

    getMouseTile(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.tileSize);
        const y = Math.floor((e.clientY - rect.top) / this.tileSize);
        return { x, y };
    }

    swapTiles(x1, y1, x2, y2) {
        // Don't swap if same tile
        if (x1 === x2 && y1 === y2) return;
        
        const idx1 = y1 * this.gridSize + x1;
        const idx2 = y2 * this.gridSize + x2;
        [this.tiles[idx1], this.tiles[idx2]] = [this.tiles[idx2], this.tiles[idx1]];
        if (this.tiles[idx1] === null) this.emptyTile = { x: x1, y: y1 };
        if (this.tiles[idx2] === null) this.emptyTile = { x: x2, y: y2 };
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Fill background for empty space
        this.ctx.fillStyle = "#1a1a1a";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Get dragged tile info
        let draggedTileValue = null;
        if (this.dragStart) {
            const dragIdx = this.dragStart.y * this.gridSize + this.dragStart.x;
            draggedTileValue = this.tiles[dragIdx];
        }

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const idx = y * this.gridSize + x;
                const tile = this.tiles[idx];

                // Skip drawing the animating tile in its original position
                if (this.animatingTile && x === this.animatingTile.fromX && y === this.animatingTile.fromY) {
                    continue;
                }

                // Draw drop zone highlight
                if (this.dragStart && this.dragOver && x === this.dragOver.x && y === this.dragOver.y) {
                    // Highlight where tile will be dropped
                    this.ctx.fillStyle = "rgba(255, 204, 0, 0.3)";
                    this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                }

                if (tile !== null) {
                    // Make the original position of dragged tile semi-transparent
                    if (this.dragStart && x === this.dragStart.x && y === this.dragStart.y) {
                        this.ctx.globalAlpha = 0.3;
                    } else {
                        this.ctx.globalAlpha = 1.0;
                    }

                    this.ctx.drawImage(this.images[tile], x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                }

                // Draw grid lines
                this.ctx.globalAlpha = 1.0;
                
                // Highlight next move with pulsing gold border (solve mode)
                if (this.isSolving && this.currentPath[this.currentStepIndex] && !this.animatingTile) {
                    const nextMove = this.currentPath[this.currentStepIndex];
                    if (x === nextMove.x && y === nextMove.y) {
                        // Draw gold highlight with glow effect
                        this.ctx.shadowColor = "gold";
                        this.ctx.shadowBlur = 10;
                        this.ctx.strokeStyle = "#ffcc00";
                        this.ctx.lineWidth = 4;
                        this.ctx.strokeRect(x * this.tileSize + 2, y * this.tileSize + 2, this.tileSize - 4, this.tileSize - 4);
                        this.ctx.shadowBlur = 0;
                    } else {
                        this.ctx.strokeStyle = "#333";
                        this.ctx.lineWidth = 1;
                        this.ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                    }
                } else if (this.dragStart && this.dragOver && x === this.dragOver.x && y === this.dragOver.y) {
                    // Highlight drop zone border
                    this.ctx.strokeStyle = "#ffcc00";
                    this.ctx.lineWidth = 3;
                    this.ctx.strokeRect(x * this.tileSize + 1, y * this.tileSize + 1, this.tileSize - 2, this.tileSize - 2);
                } else {
                    this.ctx.strokeStyle = "#333";
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }

        // Draw animating tile (for solve mode)
        if (this.animatingTile) {
            const anim = this.animatingTile;
            const currentX = anim.fromX + (anim.dx * this.animationProgress);
            const currentY = anim.fromY + (anim.dy * this.animationProgress);
            
            this.ctx.globalAlpha = 1.0;
            this.ctx.drawImage(
                this.images[anim.value],
                currentX * this.tileSize,
                currentY * this.tileSize,
                this.tileSize,
                this.tileSize
            );
        }

        // Draw floating dragged tile following cursor
        if (this.dragStart && draggedTileValue !== null) {
            const floatX = this.mouseX - this.tileSize / 2;
            const floatY = this.mouseY - this.tileSize / 2;
            
            // Draw shadow under floating tile
            this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            this.ctx.shadowBlur = 15;
            this.ctx.shadowOffsetX = 5;
            this.ctx.shadowOffsetY = 5;
            
            // Draw the floating tile slightly larger for emphasis
            this.ctx.globalAlpha = 0.9;
            this.ctx.drawImage(
                this.images[draggedTileValue],
                floatX,
                floatY,
                this.tileSize,
                this.tileSize
            );
            
            // Draw gold border on floating tile
            this.ctx.strokeStyle = "#ffcc00";
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(floatX, floatY, this.tileSize, this.tileSize);
            
            // Reset shadow
            this.ctx.shadowColor = "transparent";
            this.ctx.shadowBlur = 0;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
        }

        this.ctx.globalAlpha = 1.0;
    }

    solve() {
        const start = this.tiles.map((t) => (t === null ? -1 : t));

        if (!this.isSolvable(start)) {
            alert("❌ This puzzle is not solvable. Please adjust tiles manually.");
            return Promise.resolve([]);
        }

        return new Promise(async (resolve) => {
            let path = [];
            let aStarTimeout = false;

            await Promise.race([
                new Promise((res) =>
                    setTimeout(() => {
                        aStarTimeout = true;
                        res();
                    }, 2000)
                ),
                new Promise((res) => {
                    path = this.solveAStar(start);
                    res();
                }),
            ]);

            if (!aStarTimeout && path.length > 0) {
                resolve(path);
                return;
            }

            const idaSolver = new IDAStar();
            path = idaSolver.solve(start);

            if (path.length > 0) {
                resolve(path);
            } else {
                alert("❌ Puzzle could not be solved.");
                resolve([]);
            }
        });
    }

    solveAStar(start) {
        const goal = [...Array(24).keys()];
        goal.push(-1);

        const neighbors = (state) => {
            const idx = state.indexOf(-1);
            const x = idx % this.gridSize;
            const y = Math.floor(idx / this.gridSize);
            const moves = [];
            if (x > 0) moves.push({ dx: -1, dy: 0 });
            if (x < 4) moves.push({ dx: 1, dy: 0 });
            if (y > 0) moves.push({ dx: 0, dy: -1 });
            if (y < 4) moves.push({ dx: 0, dy: 1 });
            const result = [];
            for (const move of moves) {
                const nx = x + move.dx;
                const ny = y + move.dy;
                const nidx = ny * this.gridSize + nx;
                const newState = state.slice();
                [newState[idx], newState[nidx]] = [newState[nidx], newState[idx]];
                result.push({ state: newState, move: { x: nx, y: ny } });
            }
            return result;
        };

        const heuristic = (state) => {
            let dist = 0;
            for (let i = 0; i < state.length; i++) {
                if (state[i] === -1) continue;
                const targetX = state[i] % this.gridSize;
                const targetY = Math.floor(state[i] / this.gridSize);
                const x = i % this.gridSize;
                const y = Math.floor(i / this.gridSize);
                dist += Math.abs(targetX - x) + Math.abs(targetY - y);
            }
            return dist;
        };

        const startKey = start.join(",");
        const goalKey = goal.join(",");

        const heap = new MinHeap();
        heap.push({ state: start, path: [], cost: 0, priority: heuristic(start) });
        const seen = new Set();

        while (!heap.isEmpty()) {
            const current = heap.pop();
            const key = current.state.join(",");
            if (seen.has(key)) continue;
            seen.add(key);

            if (key === goalKey) {
                return current.path;
            }

            for (const { state: nextState, move } of neighbors(current.state)) {
                const nextKey = nextState.join(",");
                if (!seen.has(nextKey)) {
                    heap.push({
                        state: nextState,
                        path: [...current.path, move],
                        cost: current.cost + 1,
                        priority: current.cost + 1 + heuristic(nextState),
                    });
                }
            }
        }

        return [];
    }

    isSolvable(state) {
        const flat = state.filter((x) => x !== -1);
        let inversions = 0;
        for (let i = 0; i < flat.length; i++) {
            for (let j = i + 1; j < flat.length; j++) {
                if (flat[i] > flat[j]) inversions++;
            }
        }
        return inversions % 2 === 0;
    }
}

const puzzleSetCastle = [
    "puzzle_solver/castle/tile_1.png",
    "puzzle_solver/castle/tile_2.png",
    "puzzle_solver/castle/tile_3.png",
    "puzzle_solver/castle/tile_4.png",
    "puzzle_solver/castle/tile_5.png",
    "puzzle_solver/castle/tile_6.png",
    "puzzle_solver/castle/tile_7.png",
    "puzzle_solver/castle/tile_8.png",
    "puzzle_solver/castle/tile_9.png",
    "puzzle_solver/castle/tile_10.png",
    "puzzle_solver/castle/tile_11.png",
    "puzzle_solver/castle/tile_12.png",
    "puzzle_solver/castle/tile_13.png",
    "puzzle_solver/castle/tile_14.png",
    "puzzle_solver/castle/tile_15.png",
    "puzzle_solver/castle/tile_16.png",
    "puzzle_solver/castle/tile_17.png",
    "puzzle_solver/castle/tile_18.png",
    "puzzle_solver/castle/tile_19.png",
    "puzzle_solver/castle/tile_20.png",
    "puzzle_solver/castle/tile_21.png",
    "puzzle_solver/castle/tile_22.png",
    "puzzle_solver/castle/tile_23.png",
    "puzzle_solver/castle/tile_24.png",
];
const puzzleSetTree = [
    "puzzle_solver/tree/tile_1.png",
    "puzzle_solver/tree/tile_2.png",
    "puzzle_solver/tree/tile_3.png",
    "puzzle_solver/tree/tile_4.png",
    "puzzle_solver/tree/tile_5.png",
    "puzzle_solver/tree/tile_6.png",
    "puzzle_solver/tree/tile_7.png",
    "puzzle_solver/tree/tile_8.png",
    "puzzle_solver/tree/tile_9.png",
    "puzzle_solver/tree/tile_10.png",
    "puzzle_solver/tree/tile_11.png",
    "puzzle_solver/tree/tile_12.png",
    "puzzle_solver/tree/tile_13.png",
    "puzzle_solver/tree/tile_14.png",
    "puzzle_solver/tree/tile_15.png",
    "puzzle_solver/tree/tile_16.png",
    "puzzle_solver/tree/tile_17.png",
    "puzzle_solver/tree/tile_18.png",
    "puzzle_solver/tree/tile_19.png",
    "puzzle_solver/tree/tile_20.png",
    "puzzle_solver/tree/tile_21.png",
    "puzzle_solver/tree/tile_22.png",
    "puzzle_solver/tree/tile_23.png",
    "puzzle_solver/tree/tile_24.png",
];
const puzzleSetTroll = [
    "puzzle_solver/troll/tile_1.png",
    "puzzle_solver/troll/tile_2.png",
    "puzzle_solver/troll/tile_3.png",
    "puzzle_solver/troll/tile_4.png",
    "puzzle_solver/troll/tile_5.png",
    "puzzle_solver/troll/tile_6.png",
    "puzzle_solver/troll/tile_7.png",
    "puzzle_solver/troll/tile_8.png",
    "puzzle_solver/troll/tile_9.png",
    "puzzle_solver/troll/tile_10.png",
    "puzzle_solver/troll/tile_11.png",
    "puzzle_solver/troll/tile_12.png",
    "puzzle_solver/troll/tile_13.png",
    "puzzle_solver/troll/tile_14.png",
    "puzzle_solver/troll/tile_15.png",
    "puzzle_solver/troll/tile_16.png",
    "puzzle_solver/troll/tile_17.png",
    "puzzle_solver/troll/tile_18.png",
    "puzzle_solver/troll/tile_19.png",
    "puzzle_solver/troll/tile_20.png",
    "puzzle_solver/troll/tile_21.png",
    "puzzle_solver/troll/tile_22.png",
    "puzzle_solver/troll/tile_23.png",
    "puzzle_solver/troll/tile_24.png",
];
