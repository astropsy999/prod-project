import { counterActions, counterReducer } from './counterSlice';
describe('counterSlice.test', function () {
    test('decrement', function () {
        var state = { value: 10 };
        expect(counterReducer(state, counterActions.decrement())).toEqual({
            value: 9,
        });
    });
    test('increment', function () {
        var state = { value: 10 };
        expect(counterReducer(state, counterActions.increment())).toEqual({
            value: 11,
        });
    });
    test('should work with empty state', function () {
        expect(counterReducer(undefined, counterActions.increment())).toEqual({
            value: 1,
        });
    });
});
