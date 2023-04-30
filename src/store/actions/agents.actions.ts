import { Action } from 'redux';
import { IAgentsResponse } from '../../interfaces/agents-response.interface';

export enum AgentsActionTypes {
  getAgents = '[Agents] Get Agents',
  getAgentsSuccess = '[Agents] Get Agents Success',
  getAgentsFailed = '[Agents] Get Agents Failed',
}

export class GetAgents implements Action {
  readonly type = AgentsActionTypes.getAgents;

  constructor(public payload: number) {
  }
}

export class GetAgentsSuccess implements Action {
  readonly type = AgentsActionTypes.getAgentsSuccess;

  constructor(public payload: IAgentsResponse) {
  }
}

export class GetAgentsFailed implements Action {
  readonly type = AgentsActionTypes.getAgentsFailed;
}

export type AgentsActions =
  | GetAgents
  | GetAgentsSuccess
  | GetAgentsFailed
  ;
