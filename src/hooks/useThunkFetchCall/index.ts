import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Status, ThunkActionStatuses } from './types';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { usePrevious } from '../usePrevious';

type RootStateKeys = keyof RootState;

export const useThunkFetchCall = (slice: RootStateKeys, actionName: string) => {
  const status: Status | undefined = useSelector((state: RootState | any) =>
    state[slice]?.status?.find(
      (currentStatus: Status) => currentStatus.actionName === actionName
    )
  );
  const error = useSelector((state: RootState | any) => state[slice]?.error);

  const isFulfilled = status?.value === ThunkActionStatuses.Fulfilled;
  const isUnset = status?.value === ThunkActionStatuses.Unset || !status?.value;
  const isLoading = status?.value === ThunkActionStatuses.Pending;
  const isRejected = status?.value === ThunkActionStatuses.Rejected;
  const wasLoading = usePrevious(isLoading);
  const wasFulfilled = usePrevious(isFulfilled);

  return { isFulfilled, wasFulfilled, isUnset, isLoading, wasLoading, isRejected, error };
};

export const setThunkActionStatus = (
  builder: ActionReducerMapBuilder<any>,
  action: any
) =>
  builder
    .addCase(action.pending, (state, currentAction) => {
      const actionType = getActionName(currentAction.type);

      const previousStatus =
        typeof state.status === 'object' ? state.status : [];

      const newStatus = previousStatus?.filter(
        (currentStatus: Status) => currentStatus?.actionName !== actionType
      );

      const status = [
        ...newStatus,
        {
          actionName: actionType,
          value: ThunkActionStatuses.Pending,
        },
      ];

      state.status = status;
      state.error = undefined;
    })
    .addCase(action.rejected, (state, currentAction) => {
      const actionType = getActionName(currentAction.type);
      const previousStatus = state.status || [];

      const newStatus = previousStatus.filter(
        (currentStatus: Status) => currentStatus?.actionName !== actionType
      );

      const status = [
        ...newStatus,
        {
          actionName: actionType,
          value: ThunkActionStatuses.Rejected,
        },
      ];

      state.status = status;
      state.error = currentAction?.payload?.message;
    });

export const getActionName = (actionType: string) => {
  const actionSplited = actionType?.split('/');

  return actionSplited?.[0];
};

export const setFulfilledThunkActionStatus = (state: any, action: any) => {
  const actionType = action?.typePrefix;

  const previousStatus = typeof state.status === 'object' ? state.status : [];

  const newStatus = previousStatus.filter(
    (currentStatus: Status) => currentStatus.actionName !== actionType
  );

  const status = [
    ...newStatus,
    {
      actionName: actionType,
      value: ThunkActionStatuses.Fulfilled,
    },
  ];

  state.status = status;
  state.error = undefined;
};
