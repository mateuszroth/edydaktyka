import { ColumnFilterItem } from "antd/lib/table";

export function stringToColor(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xff;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

export function getUserInitials(user) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
}

export const getTableFilters = (data: any, propertyName: string): ColumnFilterItem[] => {
    const map = new Map();
    data.forEach(report => {
        const property = report[propertyName];
        if (!map.get(property)) {
            map.set(property, {
                text: property,
                value: property,
            })
        }
    });
    return [...map.values()];
}

