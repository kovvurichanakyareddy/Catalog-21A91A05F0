const testCases = [
    {
        "keys": { "n": 4, "k": 3 },
        "1": { "base": "10", "value": "4" },
        "2": { "base": "2", "value": "111" },
        "3": { "base": "10", "value": "12" },
        "6": { "base": "4", "value": "213" }
    },
    {
        "keys": { "n": 10, "k": 7 },
        "1": { "base": "6", "value": "13444211440455345511" },
        "2": { "base": "15", "value": "aed7015a346d63" },
        "3": { "base": "15", "value": "6aeeb69631c227c" },
        "4": { "base": "16", "value": "e1b5e05623d881f" },
        "5": { "base": "8", "value": "316034514573652620673" },
        "6": { "base": "3", "value": "2122212201122002221120200210011020220200" },
        "7": { "base": "3", "value": "20120221122211000100210021102001201112121" },
        "8": { "base": "6", "value": "20220554335330240002224253" },
        "9": { "base": "12", "value": "45153788322a1255483" },
        "10": { "base": "7", "value": "1101613130313526312514143" }
    }
];

// Function to decode values
function decodeValues(data) {
    let decodedPoints = [];
    for (const key in data) {
        if (key === "keys") continue; // Skip metadata
        let x = parseInt(key);
        let y = parseInt(data[key].value, parseInt(data[key].base));
        decodedPoints.push([x, y]);
    }
    return decodedPoints;
}

// Lagrange Interpolation Function
function lagrangeInterpolation(points) {
    function basisPolynomial(xi, xValues, x) {
        let num = 1, den = 1;
        for (let xj of xValues) {
            if (xi !== xj) {
                num *= (x - xj);
                den *= (xi - xj);
            }
        }
        return num / den;
    }

    let xValues = points.map(p => p[0]);
    let yValues = points.map(p => p[1]);
    let constantTerm = 0;

    for (let i = 0; i < points.length; i++) {
        constantTerm += yValues[i] * basisPolynomial(xValues[i], xValues, 0);
    }

    return Math.round(constantTerm); // Round to the nearest integer
}

// Solve for both test cases
testCases.forEach((caseData, index) => {
    let decodedPoints = decodeValues(caseData);
    let requiredPoints = decodedPoints.slice(0, caseData.keys.k); // Use first k points
    let secretC = lagrangeInterpolation(requiredPoints);
    console.log(`Secret C for Test Case ${index + 1}: ${secretC}`);
});
