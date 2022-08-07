import { useMemo, useState } from 'react';
import { ApiStatus, defaultApiStatuses, IDLE } from '@/api/constants/apiStatus';

type Statuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, boolean>;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const prepareStatuses = (currentStatus: ApiStatus): Statuses => {
  const statuses = {} as Statuses;

  for (const status of defaultApiStatuses) {
    const normalizedStatus = capitalize(status.toLowerCase());
    const normalizedStatusKey = `is${normalizedStatus}` as keyof Statuses;
    statuses[normalizedStatusKey] = status === currentStatus;
  }

  return statuses;
};

export const useApiStatus = (currentStatus: ApiStatus = IDLE) => {
  const [status, setStatus] = useState<ApiStatus>(currentStatus);
  const statuses = useMemo(() => prepareStatuses(status), [status]);

  return {
    status,
    setStatus,
    ...statuses,
  };
};
