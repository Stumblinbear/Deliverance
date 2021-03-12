
export const prettifyEnum = {
    methods: {
        prettifyEnum(type) {
            if(!type) return 'N/A';
            return type.replace('_', ' ').split(' ').map(v => v[0] + v.substring(1).toLowerCase()).join(' ');
        }
    }
};

export const abbreviate = {
    methods: {
        abbreviate(num) {
            if(num === undefined || num === null) return 'N/A';
            if(Number.isNaN(num)) return 'NaN';

            let abbr = '';
            var rounded = num;
        
            if(num >= 1e12) {
                abbr = ' T';
                rounded = num / 1e12;
            }else if(num >= 1e9) {
                abbr = ' B';
                rounded = num / 1e9;
            }else if(num >= 1e6) {
                abbr = ' M';
                rounded = num / 1e6;
            }else if(num >= 1e3) {
                abbr = 'k';
                rounded = num / 1e3;
            }
        
            return parseFloat(rounded.toFixed(2)) + abbr;
        }
    }
};