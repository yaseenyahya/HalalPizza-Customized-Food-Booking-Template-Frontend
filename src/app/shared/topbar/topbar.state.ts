// app.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as appActions from './topbar.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TopbarState {
  topbarHeight: number;
}

export const initialState: TopbarState = {
  topbarHeight: 0,
};

export const topbarReducer = createReducer(
  initialState,
  on(appActions.setTopbarHeight, (state, { topbarHeight }) => ({ ...state, topbarHeight })),
);
export const selectTopbarState = createFeatureSelector('topbar');

export const selectTopbarHeight = createSelector(
  selectTopbarState,
  (state: any) => state.topbarHeight
);