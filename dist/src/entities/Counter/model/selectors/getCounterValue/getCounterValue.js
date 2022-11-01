import { createSelector } from '@reduxjs/toolkit';
import { getCounter } from '../getCounter/getCounter';
export var getCounterValue = createSelector(getCounter, function (counter) { return counter.value; });
