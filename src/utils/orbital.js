export function getOrbitalDistance(location, origin) {
    origin = origin ?? { x: 0, y: 0 };

    return Math.sqrt(Math.pow(location.x - origin.x, 2) + Math.pow(location.y - origin.y, 2));
}

export function sortOrbits(locations, origin) {
    origin = origin ?? { x: 0, y: 0 };

    const sorted = [ ...locations ];

    const distances = { };

    sorted.forEach(location => (distances[location.symbol] = getOrbitalDistance(location, origin)))

    sorted.sort((a, b) => distances[a.symbol] - distances[b.symbol]);

    return sorted;
}