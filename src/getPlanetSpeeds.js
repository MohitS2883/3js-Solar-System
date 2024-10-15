function getPlanetSpeeds(rotationPeriodDays, orbitalPeriodDays, distanceAU) {
    const earthRevolutionSpeed = 0.001; // Earth's revolution speed as a baseline

    // Adjust revolution speed based on distance from the Sun (in AU)
    // Using Kepler's Third Law of Planetary Motion as a simple approximation
    const revolutionSpeed = earthRevolutionSpeed / Math.sqrt(distanceAU); 

    const rotationSpeed = (2 * Math.PI) / (rotationPeriodDays * 24 * 60 * 60);

    return {
        rotationSpeed,
        revolutionSpeed,
    };
}


export {getPlanetSpeeds}