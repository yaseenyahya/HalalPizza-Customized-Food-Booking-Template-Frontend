import { combineReducers } from '@ngrx/store';
import { navbarReducer,NavbarState } from './shared/navbar/navbar.state';
import { topbarReducer,TopbarState } from './shared/topbar/topbar.state';

export interface RootState {
  navbar: NavbarState;
  topbar: TopbarState;
}
export const rootReducer = combineReducers({
  navbar: navbarReducer,
  topbar: topbarReducer,
 // Add your other reducer here
});