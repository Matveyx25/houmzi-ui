import { IRootState } from '../reducers';
import { createSelector } from 'reselect';
import { IState } from '../reducers/agents.reducer';

const _agents = (state: IRootState) => state.agents;

export const agents = createSelector(
  _agents,
  (agents: IState) => agents,
);
