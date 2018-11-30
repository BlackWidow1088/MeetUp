
export interface Action {
  type: string;
  payload?: any;
}

// optional second type for ActionReducer Interface
export interface ActionReducer<T, Action =  Action> {
  (state: T | undefined, action: Action): T;
}

