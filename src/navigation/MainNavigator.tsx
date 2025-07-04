import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { Platform } from "react-native";
import About from "../screens/About";
import DrawerContent from "../screens/DrawerContent";
import Home from "../screens/Home";
import HymnDetails from "../screens/HymnDetails";
import HymnEdit from "../screens/HymnEdit";
import Preferences from "../screens/Preferences";
import SplashScreen from "../screens/SplashScreen";
import DevNavigationHelper from "../components/DevNavigationHelper";

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Preferences: undefined;
  About: undefined;
  HymnDetails: { hymnCode: string; hymnsCode: string[] };
  HymnEdit: { hymnCode: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// A wrapper component that includes the DevNavigationHelper to navigate back to last hymn
const NavigationWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <DevNavigationHelper />
  </>
);

const MainNavigator = () => {
  if (Platform.OS !== "web") {
    React.useEffect(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }, []);
  }

  return (
    <NavigationWrapper>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="HomeStack" component={HomeStackNavigator} />
        <Drawer.Screen name="Preferences" component={Preferences} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationWrapper>
  );
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
      screenListeners={{
        beforeRemove: () => {
          if (Platform.OS !== "web") ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="HymnDetails"
        component={HymnDetails}
        listeners={{
          focus: () => {
            if (Platform.OS !== "web") ScreenOrientation.unlockAsync();
          },
        }}
      />
      <Stack.Screen name="HymnEdit" component={HymnEdit} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
