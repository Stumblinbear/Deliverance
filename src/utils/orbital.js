export const sortOrbits = {
    methods: {
        getOrbitalDistance(location, origin) {
            origin = origin ?? { x: 0, y: 0 };
        
            return Math.sqrt(Math.pow(location.x - origin.x, 2) + Math.pow(location.y - origin.y, 2));
        },

        sortOrbits(locations, origin) {
            origin = origin ?? { x: 0, y: 0 };
        
            const sorted = [ ...locations ];
        
            const distances = { };
        
            sorted.forEach(location => (distances[location.symbol] = this.getOrbitalDistance(location, origin)))
        
            sorted.sort((a, b) => distances[a.symbol] - distances[b.symbol]);
        
            return sorted;
        }
    }
};

export default sortOrbits;