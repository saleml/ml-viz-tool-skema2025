/**
 * Visualization functions for ML interactive demo
 */

// Global variables
let chart;
let currentData = [];
let linearVisible = false;
let quadraticVisible = false;
let cubicVisible = false;

// Model parameters
const linearParams = { a: 1, b: 0 };
const quadraticParams = { a: 1, b: 0, c: 0 };
const cubicParams = { a: 0.2, b: -0.5, c: 1, d: 0 };

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Generate initial data
    currentData = getDefaultDataset();
    
    // Initialize the chart
    initChart();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update the visualization with initial data and parameters
    updateVisualization();
});

// Initialize the scatter chart
function initChart() {
    const ctx = document.getElementById('scatterChart').getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data Points',
                    data: [],
                    backgroundColor: 'rgba(52, 152, 219, 0.5)',
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Linear Model',
                    data: [],
                    backgroundColor: 'rgba(231, 76, 60, 0.8)',
                    borderColor: 'rgba(231, 76, 60, 0.8)',
                    pointRadius: 0,
                    showLine: true,
                    borderWidth: 2,
                    hidden: true
                },
                {
                    label: 'Quadratic Model',
                    data: [],
                    backgroundColor: 'rgba(46, 204, 113, 0.8)',
                    borderColor: 'rgba(46, 204, 113, 0.8)',
                    pointRadius: 0,
                    showLine: true,
                    borderWidth: 2,
                    hidden: true
                },
                {
                    label: 'Cubic Model',
                    data: [],
                    backgroundColor: 'rgba(155, 89, 182, 0.8)',
                    borderColor: 'rgba(155, 89, 182, 0.8)',
                    pointRadius: 0,
                    showLine: true,
                    borderWidth: 2,
                    hidden: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X'
                    },
                    min: -5,
                    max: 5
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y'
                    },
                    min: -10,
                    max: 10
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = context.raw;
                            return `(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`;
                        }
                    }
                },
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Set up event listeners for all interactive elements
function setupEventListeners() {
    // Data controls
    document.getElementById('numPoints').addEventListener('input', function() {
        document.getElementById('numPointsValue').textContent = this.value;
    });
    
    document.getElementById('noiseLevel').addEventListener('input', function() {
        document.getElementById('noiseLevelValue').textContent = this.value;
    });
    
    document.getElementById('regenerateData').addEventListener('click', function() {
        const numPoints = parseInt(document.getElementById('numPoints').value);
        const noiseLevel = parseFloat(document.getElementById('noiseLevel').value);
        
        // Generate new data with the current cubic parameters and specified noise
        currentData = generateCubicData(
            numPoints, 
            cubicParams.a, 
            cubicParams.b, 
            cubicParams.c, 
            cubicParams.d, 
            noiseLevel
        );
        
        updateVisualization();
    });
    
    // Model toggle buttons
    document.getElementById('toggleLinear').addEventListener('click', function() {
        linearVisible = !linearVisible;
        this.classList.toggle('active', linearVisible);
        chart.data.datasets[1].hidden = !linearVisible;
        chart.update();
    });
    
    document.getElementById('toggleQuadratic').addEventListener('click', function() {
        quadraticVisible = !quadraticVisible;
        this.classList.toggle('active', quadraticVisible);
        chart.data.datasets[2].hidden = !quadraticVisible;
        chart.update();
    });
    
    document.getElementById('toggleCubic').addEventListener('click', function() {
        cubicVisible = !cubicVisible;
        this.classList.toggle('active', cubicVisible);
        chart.data.datasets[3].hidden = !cubicVisible;
        chart.update();
    });
    
    // Linear model parameters
    document.getElementById('linearA').addEventListener('input', function() {
        linearParams.a = parseFloat(this.value);
        document.getElementById('linearAValue').textContent = this.value;
        updateVisualization();
    });
    
    document.getElementById('linearB').addEventListener('input', function() {
        linearParams.b = parseFloat(this.value);
        document.getElementById('linearBValue').textContent = this.value;
        updateVisualization();
    });
    
    // Quadratic model parameters
    document.getElementById('quadraticA').addEventListener('input', function() {
        quadraticParams.a = parseFloat(this.value);
        document.getElementById('quadraticAValue').textContent = this.value;
        updateVisualization();
    });
    
    document.getElementById('quadraticB').addEventListener('input', function() {
        quadraticParams.b = parseFloat(this.value);
        document.getElementById('quadraticBValue').textContent = this.value;
        updateVisualization();
    });
    
    document.getElementById('quadraticC').addEventListener('input', function() {
        quadraticParams.c = parseFloat(this.value);
        document.getElementById('quadraticCValue').textContent = this.value;
        updateVisualization();
    });
    
    // Cubic model parameters
    document.getElementById('cubicA').addEventListener('input', function() {
        cubicParams.a = parseFloat(this.value);
        document.getElementById('cubicAValue').textContent = this.value;
        updateVisualization();
    });
    
    document.getElementById('cubicB').addEventListener('input', function() {
        cubicParams.b = parseFloat(this.value);
        document.getElementById('cubicBValue').textContent = this.value;
        updateVisualization();
    });
    
    document.getElementById('cubicC').addEventListener('input', function() {
        cubicParams.c = parseFloat(this.value);
        document.getElementById('cubicCValue').textContent = this.value;
        updateVisualization();
    });
    
    document.getElementById('cubicD').addEventListener('input', function() {
        cubicParams.d = parseFloat(this.value);
        document.getElementById('cubicDValue').textContent = this.value;
        updateVisualization();
    });
}

// Update the visualization with current data and model parameters
function updateVisualization() {
    // Update data points
    chart.data.datasets[0].data = currentData.map(point => ({ x: point.x, y: point.y }));
    
    // Generate x values for the curve (more points for smoother curves)
    const xValues = [];
    for (let x = -5; x <= 5; x += 0.1) {
        xValues.push(x);
    }
    
    // Update linear model curve data
    chart.data.datasets[1].data = xValues.map(x => ({
        x: x,
        y: linearModel(x, linearParams)
    }));
    
    // Update quadratic model curve data
    chart.data.datasets[2].data = xValues.map(x => ({
        x: x,
        y: quadraticModel(x, quadraticParams)
    }));
    
    // Update cubic model curve data
    chart.data.datasets[3].data = xValues.map(x => ({
        x: x,
        y: cubicModel(x, cubicParams)
    }));
    
    // Update the chart with new data FIRST
    chart.update();
    
    // THEN, ensure the visibility state is correct AFTER the update
    // This overrides any potential visibility changes during the data update
    chart.data.datasets[1].hidden = !linearVisible;
    chart.data.datasets[2].hidden = !quadraticVisible;
    chart.data.datasets[3].hidden = !cubicVisible;
    
    // We might need another chart.update() here if the above doesn't reflect visually,
    // but let's test without it first.

    // Calculate and update error metrics
    updateErrorMetrics();
}

// Calculate and update all error metrics
function updateErrorMetrics() {
    // Linear model predictions and errors
    const linearPredictions = getPredictions(currentData, linearModel, linearParams);
    const linearMSE = calculateMSE(linearPredictions);
    const linearMAE = calculateMAE(linearPredictions);
    const linearRSquared = calculateRSquared(linearPredictions);
    
    // Quadratic model predictions and errors
    const quadraticPredictions = getPredictions(currentData, quadraticModel, quadraticParams);
    const quadraticMSE = calculateMSE(quadraticPredictions);
    const quadraticMAE = calculateMAE(quadraticPredictions);
    const quadraticRSquared = calculateRSquared(quadraticPredictions);
    
    // Cubic model predictions and errors
    const cubicPredictions = getPredictions(currentData, cubicModel, cubicParams);
    const cubicMSE = calculateMSE(cubicPredictions);
    const cubicMAE = calculateMAE(cubicPredictions);
    const cubicRSquared = calculateRSquared(cubicPredictions);
    
    // Update error displays
    document.getElementById('linearError').textContent = `MSE: ${linearMSE.toFixed(2)}`;
    document.getElementById('quadraticError').textContent = `MSE: ${quadraticMSE.toFixed(2)}`;
    document.getElementById('cubicError').textContent = `MSE: ${cubicMSE.toFixed(2)}`;
    
    // Update metric values
    document.getElementById('linearMSE').textContent = linearMSE.toFixed(4);
    document.getElementById('linearMAE').textContent = linearMAE.toFixed(4);
    document.getElementById('linearRSquared').textContent = linearRSquared.toFixed(4);
    
    document.getElementById('quadraticMSE').textContent = quadraticMSE.toFixed(4);
    document.getElementById('quadraticMAE').textContent = quadraticMAE.toFixed(4);
    document.getElementById('quadraticRSquared').textContent = quadraticRSquared.toFixed(4);
    
    document.getElementById('cubicMSE').textContent = cubicMSE.toFixed(4);
    document.getElementById('cubicMAE').textContent = cubicMAE.toFixed(4);
    document.getElementById('cubicRSquared').textContent = cubicRSquared.toFixed(4);
}
