/**
 * Model functions for polynomial regression
 */

// Linear model: f(x) = ax + b
function linearModel(x, params) {
    const { a, b } = params;
    return a * x + b;
}

// Quadratic model: f(x) = ax^2 + bx + c
function quadraticModel(x, params) {
    const { a, b, c } = params;
    return a * x * x + b * x + c;
}

// Cubic model: f(x) = ax^3 + bx^2 + cx + d
function cubicModel(x, params) {
    const { a, b, c, d } = params;
    return a * x * x * x + b * x * x + c * x + d;
}

// Calculate predictions for a dataset using the specified model and parameters
function getPredictions(data, modelFunc, params) {
    return data.map(point => ({
        x: point.x,
        y: point.y,
        yPred: modelFunc(point.x, params)
    }));
}

// Calculate Mean Squared Error (MSE) for predictions
function calculateMSE(predictions) {
    const sumSquaredErrors = predictions.reduce((sum, point) => {
        const error = point.y - point.yPred;
        return sum + error * error;
    }, 0);
    return sumSquaredErrors / predictions.length;
}

// Calculate Mean Absolute Error (MAE) for predictions
function calculateMAE(predictions) {
    const sumAbsErrors = predictions.reduce((sum, point) => {
        const error = Math.abs(point.y - point.yPred);
        return sum + error;
    }, 0);
    return sumAbsErrors / predictions.length;
}

// Calculate R-squared (coefficient of determination) for predictions
function calculateRSquared(predictions) {
    const mean = predictions.reduce((sum, point) => sum + point.y, 0) / predictions.length;
    
    const totalSumSquares = predictions.reduce((sum, point) => {
        const deviation = point.y - mean;
        return sum + deviation * deviation;
    }, 0);
    
    const residualSumSquares = predictions.reduce((sum, point) => {
        const error = point.y - point.yPred;
        return sum + error * error;
    }, 0);
    
    return 1 - (residualSumSquares / totalSumSquares);
}
