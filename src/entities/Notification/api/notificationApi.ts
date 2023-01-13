import { rtkApi } from 'shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const notificationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], null>({
      query: () => ({
        url: '/notifications',
      }),
    }),
  }),
});

export const useNotifications = notificationsApi.useGetNotificationsQuery;
