const routes = [
  {
    path: '/',
    component: () => import('layouts/RelaxLayout.vue'),
    children: [
      {
        path: '/relax',
        name: 'RelaxEvents',
        component: () => import('src/pages/relaxEvents.vue'),
      },
      {
        path: '/emotional',
        name: 'EmotionalScoreRecords',
        component: () => import('src/pages/emotionalScoreRecords.vue'),
      },
      {
        path: '/emotional/record',
        name: 'Record',
        component: () => import('src/pages/recordPage.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('src/pages/registerPage.vue'),
      },
      {
        path: '/star',
        name: 'Star',
        component: () => import('src/pages/starPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/RecommendationLayout.vue'),
    children: [
      {
        path: '/recommendation',
        name: 'Recommendation',
        component: () => import('src/pages/proRecommendation.vue'),
      },
      {
        path: '/recommendation/psychologists',
        name: 'Psychologists',
        component: () => import('src/pages/recommendationPsychologists.vue'),
      },
      {
        path: '/recommendation/clinics',
        name: 'Clinics',
        component: () => import('src/pages/recommendationClinics.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/index',
        name: 'IndexPage',
        component: () => import('src/pages/IndexPage.vue'),
      },
      {
        path: '/home',
        name: 'HomePage',
        component: () => import('src/pages/HomePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
