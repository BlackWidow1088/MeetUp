
import { ActionReducer, Action } from 'src/app/store/model/action-reducer.model';
import { ApplicationState } from 'src/app/application-store/model';
import { ComputeActions } from './compute.action';

export function computeReducer(state: ApplicationState, action: Action): ApplicationState {
  switch (action.type) {
    case ComputeActions.pushId:
      state.compute.idList.push(2);
      return state;
    case ComputeActions.deleteId:
      state.compute.idList.splice(0, 1);
      return state;
    default:
      return state;
  }
}
