import { createAction, props } from '@ngrx/store';
export const setNavbarHeight = createAction('[Navbar] Set Height', props<{ navbarHeight: number }>());