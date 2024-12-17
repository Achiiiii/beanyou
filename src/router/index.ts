import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import liff from '@line/liff';
import { queryToken, mutateCreateUser } from '../api/helper';

const liffIds = {
  RelaxEvents: '2002732079-VG0J9B6k',
  EmotionalScoreRecords: '2002732079-qw8Vp5jA',
  Recommendation: '2002732079-NyYk8MOl',
  Register: '2002732079-MYPpl8Qb',
  Star: '2002732079-WOMpwoQv',
};

export default route(function (/* { store, ssrContext } */) {
  // const createHistory = process.env.SERVER
  //   ? createMemoryHistory
  //   : process.env.VUE_ROUTER_MODE === 'history'
  //   ? createWebHistory
  //   : createWebHashHistory;

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createWebHistory(process.env.VUE_ROUTER_BASE),
  });

  router.beforeEach((to, next) => {
    liff
      .init({
        liffId: liffIds[to.name],
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          liff
            .getProfile()
            .then((profile) => {
              localStorage.setItem('displayName', profile.displayName);
              localStorage.setItem('pictureUrl', profile.pictureUrl);
              localStorage.setItem('statusMessage', profile.statusMessage);
              localStorage.setItem('userId', profile.userId);
              localStorage.setItem('lineAccessToken', liff.getAccessToken());
              const { result, onResult } = queryToken(
                profile.userId,
                localStorage.getItem('lineAccessToken')
              );
              onResult(async () => {
                const accessToken = result.value?.token.data;
                if (!accessToken) {
                  const data = {
                    userCreateInput: {
                      lineUserId: profile.userId,
                      appUuid: '3c0b2ab3-f410-4132-8395-4b86f0fc0ea5',
                    },
                  };
                  const { mutate } = await mutateCreateUser();
                  mutate(data);
                } else {
                  next;
                }
              });
            })
            .catch((err) => {
              console.log('error', err);
              next;
            });
        }
      })
      .catch((err) => {
        console.log(err);
        next;
      });
  });

  return router;
});
