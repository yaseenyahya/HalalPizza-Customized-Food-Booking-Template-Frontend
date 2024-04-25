import { createAction, props } from '@ngrx/store';

  export const setTopbarHeight = createAction('[Topbar] Set Height', props<{ topbarHeight: number }>());