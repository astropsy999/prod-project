import { createSlice } from '@reduxjs/toolkit';
var initialState = {};
export var userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
});
// Action creators are generated for each case reducer function
export var userActions = userSlice.actions;
export var userReducer = userSlice.reducer;
