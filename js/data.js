/**
 * Data generation functions for ML visualization
 */

// Function to generate random data points with some noise
function generateData(numPoints, func, noise = 0.5) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        // Generate x values between -5 and 5
        const x = Math.random() * 10 - 5;
        // Calculate y based on the provided function plus some random noise
        const y = func(x) + (Math.random() * 2 - 1) * noise;
        data.push({ x, y });
    }
    return data;
}

// Function to generate data based on a linear function: y = ax + b
function generateLinearData(numPoints, a = 1, b = 0, noise = 0.5) {
    return generateData(numPoints, x => a * x + b, noise);
}

// Function to generate data based on a quadratic function: y = ax^2 + bx + c
function generateQuadraticData(numPoints, a = 1, b = 0, c = 0, noise = 0.5) {
    return generateData(numPoints, x => a * x * x + b * x + c, noise);
}

// Function to generate data based on a cubic function: y = ax^3 + bx^2 + cx + d
function generateCubicData(numPoints, a = 1, b = 0, c = 0, d = 0, noise = 0.5) {
    return generateData(numPoints, x => a * x * x * x + b * x * x + c * x + d, noise);
}

// Default dataset for initial visualization
function getDefaultDataset() {
    // Generate data based on a cubic function with some noise
    return generateCubicData(50, 0.2, -0.5, 1, 0, 1.5);
}
