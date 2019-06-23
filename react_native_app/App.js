import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './pages/Home';
import Meal from './pages/Meal';
import Document from './pages/Document';

const Navigator = createBottomTabNavigator(
  {
    Home: Home,
    Meal: Meal,
    Document: Document
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
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
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#007ac1'
    }
  }
);

export default createAppContainer(Navigator);
