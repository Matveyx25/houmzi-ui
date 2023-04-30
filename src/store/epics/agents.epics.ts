import { interval, Observable } from 'rxjs';
import { AgentsActionTypes, GetAgents, GetAgentsFailed, GetAgentsSuccess } from '../actions/agents.actions';
import { ofType } from 'redux-observable';
import { mergeMap, pluck, throttle } from 'rxjs/operators';
import { getAgents } from '../../services/agents.service';
import { IAgentsResponse } from '../../interfaces/agents-response.interface';

export const getAgentsEpic = (action$: Observable<GetAgents>) => action$.pipe(
  ofType<GetAgents>(AgentsActionTypes.getAgents),
  pluck('payload'),
  throttle(() => interval(1000)),
  mergeMap((currentPage: number) =>
    getAgents(null, currentPage)
      .then((agentsResponse: IAgentsResponse) => new GetAgentsSuccess(agentsResponse))
      .catch(() => new GetAgentsFailed()),
  ),
);
