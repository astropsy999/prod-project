import { getCounter } from './getCounter';
describe('getCounter', function () {
    test('should return counter value', function () {
        var state = {
            counter: { value: 10 },
        };
        expect(getCounter(state)).toEqual({ value: 10 });
    });
});
