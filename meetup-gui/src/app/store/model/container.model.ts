import { ActionReducer } from './action-reducer.model';

export interface Container<T> {
  name: string;
  reducer: ActionReducer<T>;
  actions: string[];
}
