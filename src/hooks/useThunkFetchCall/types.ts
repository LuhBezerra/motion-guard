export enum ThunkActionStatuses {
  Unset = '',
  Fulfilled = 'fulfilled',
  Pending = 'pending',
  Rejected = 'rejected',
}

export interface Status {
  actionName: string;
  value:
    | ThunkActionStatuses.Unset
    | ThunkActionStatuses.Pending
    | ThunkActionStatuses.Fulfilled
    | ThunkActionStatuses.Rejected;
}

export interface ThunkStateStatus {
  status?: Status[];
}