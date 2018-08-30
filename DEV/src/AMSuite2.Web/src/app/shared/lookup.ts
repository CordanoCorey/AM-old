import { build } from '@caiu/core';
import { LookupValue } from '@caiu/http';

export const HOURS = [
    build(LookupValue, { name: '0', value: 0 }),
    build(LookupValue, { name: '1', value: 1 }),
    build(LookupValue, { name: '2', value: 2 }),
    build(LookupValue, { name: '3', value: 3 }),
    build(LookupValue, { name: '4', value: 4 }),
    build(LookupValue, { name: '5', value: 5 }),
    build(LookupValue, { name: '6', value: 6 }),
    build(LookupValue, { name: '7', value: 7 }),
    build(LookupValue, { name: '8', value: 8 }),
    build(LookupValue, { name: '9', value: 9 }),
    build(LookupValue, { name: '10', value: 10 }),
    build(LookupValue, { name: '12', value: 11 }),
    build(LookupValue, { name: '12', value: 12 })
];

export const MINUTES_BY_5 = [
    build(LookupValue, { name: '00', value: 0 }),
    build(LookupValue, { name: '05', value: 5 }),
    build(LookupValue, { name: '10', value: 10 }),
    build(LookupValue, { name: '15', value: 15 }),
    build(LookupValue, { name: '20', value: 20 }),
    build(LookupValue, { name: '25', value: 25 }),
    build(LookupValue, { name: '30', value: 30 }),
    build(LookupValue, { name: '35', value: 35 }),
    build(LookupValue, { name: '40', value: 40 }),
    build(LookupValue, { name: '45', value: 45 }),
    build(LookupValue, { name: '50', value: 50 }),
    build(LookupValue, { name: '55', value: 55 })
];

export const MINUTES_BY_15 = [
    build(LookupValue, { name: '00', value: 0 }),
    build(LookupValue, { name: '15', value: 15 }),
    build(LookupValue, { name: '30', value: 30 }),
    build(LookupValue, { name: '45', value: 45 })
];