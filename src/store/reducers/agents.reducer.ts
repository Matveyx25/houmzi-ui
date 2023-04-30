import { IAgent } from '../../interfaces/agent.interface';
import { AgentsActions, AgentsActionTypes } from '../actions/agents.actions';
import { IAgentsResponse } from '../../interfaces/agents-response.interface';

export interface IState {
  total: number
  items: IAgent[]
  currentPage: number
}

const initialState: IState = {
  total: null,
  items: [],
  currentPage: null,
};

export function reducer(state: IState = initialState, actions: AgentsActions): IState {
  if (actions.type === AgentsActionTypes.getAgentsSuccess)
    return setState(state, actions.payload);
  return state;
}

function setState(state: IState, agentResponse: IAgentsResponse): IState {
  const { items } = state;

  if (!items.length) return { ...agentResponse, currentPage: 0 };

  return {
    total: agentResponse.total,
    items: [...state.items, ...agentResponse.items],
    currentPage: ++state.currentPage,
  };
}
