import React, {Component} from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Home from './pages/Home';

const Navigator = createBottomTabNavigator({
  Home: Home
});

export default createAppContainer(Navigator);
