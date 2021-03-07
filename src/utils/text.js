export function prettifyEnum(type) {
    return type.replace('_', ' ').split(' ').map(v => v[0] + v.substring(1).toLowerCase()).join(' ');
}