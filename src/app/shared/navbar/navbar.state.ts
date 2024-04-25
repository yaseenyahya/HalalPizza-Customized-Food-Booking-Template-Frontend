import { createReducer, on } from '@ngrx/store';
import * as appActions from './navbar.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface NavbarState {
  navbarHeight: number;
}

export const initialState: NavbarState = {
  navbarHeight: 0,
};

export const navbarReducer = createReducer(
  initialState,
  on(appActions.setNavbarHeight, (state, { navbarHeight }) => ({ ...state, navbarHeight:navbarHeight })),
);

export const selectNavbarState = createFeatureSelector<NavbarState>('navbar');

export const selectNavbarHeight = createSelector(
  selectNavbarState,
  (state: NavbarState) => state.navbarHeight,
);