import { isValid } from "../src/utils";
import { formatMoney } from "../src/utils";

describe('isValid', () => {
    test('should return false if given an undefined value', () => {
        expect(isValid(undefined)).toEqual(false);
    });
    test('should return false if given a null value', () => {
        expect(isValid(null)).toEqual(false);
    });
    test('should return true if given a number',() => {
        expect(isValid(3)).toEqual(true);
    });
    test('should return true if given a string',() => {
        expect(isValid('hello')).toEqual(true);
    });
    test('should return true if given a array',() => {
        expect(isValid(['hello','world'])).toEqual(true);
    });
    test('should return true if given a valid object',() => {
        expect(isValid({name:"mike"})).toEqual(true);
    });
    test('should return true if given a valid object',() => {
        expect(isValid({})).toEqual(true);
    });
})

describe('formatMoney', () => {
    test('should return dollar value if given 0', () => {
        expect(formatMoney(0)).toEqual("0.00");
    });
    test('should return 2 decimal when given 1.1', () => {
        expect(formatMoney(1.1)).toEqual("1.10");
    });
    test('should return 2 decimal when given 1.123', () => {
        expect(formatMoney(1.23456789)).toEqual("1.23");
    });
})
