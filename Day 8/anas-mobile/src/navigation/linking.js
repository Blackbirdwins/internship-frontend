import * as Linking from 'expo-linking';

export const prefix = Linking.createURL('/');

export const linking = {
  prefixes: [prefix, 'anasmobile://', 'https://anasmobile.app'],
  config: {
    screens: {
      Main: {
        screens: {
          Tabs: {
            screens: {
              Home: '',
              Search: 'search',
              Favorites: 'favorites',
              Profile: 'profile',
            },
          },
        },
      },
      Details: { path: 'product/:id', parse: { id: (id) => Number(id) } },
      Settings: 'settings',
      Help: 'help',
      About: 'about',
      ApiDemo: 'api-demo',
      ApiListing: 'api-products',
      ApiDetails: { path: 'api-product/:id', parse: { id: (id) => Number(id) } },
      HooksDemo: 'hooks',
      Auth: 'login',
    },
  },
};