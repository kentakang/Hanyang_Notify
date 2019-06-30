import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './pages/Home';
import Meal from './pages/Meal';
import Document from './pages/Document';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';

const Navigator = createBottomTabNavigator(
  {
    Home,
    Meal,
    Document,
    Schedule,
    Settings,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const IconComponent = Ionicons;
        let iconName;

        switch (routeName) {
          case 'Home':
            iconName = `ios-home`;
            break;
          case 'Meal':
            iconName = 'ios-restaurant';
            break;
          case 'Document':
            iconName = 'ios-document';
            break;
          case 'Schedule':
            iconName = 'ios-calendar';
            break;
          case 'Settings':
            iconName = 'ios-settings';
            break;
          default:
            break;
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#007ac1',
    },
  }
);

export default createAppContainer(Navigator);
