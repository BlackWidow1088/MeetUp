import { Container } from 'src/app/store/model';
import { ApplicationState } from './model';
import { computeReducer, ComputeActions } from './action-reducer';

export const applicationContainer: Container<ApplicationState>[] = [
  {
    name: 'compute',
    reducer: computeReducer,
    actions: Object.keys(ComputeActions)
  }
];

