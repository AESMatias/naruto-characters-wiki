import react from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../views/Home.jsx';
import { About } from '../views/About.jsx';
import { SearchBy } from '../views/SearchBy.jsx';
import { Favorites } from '../views/Favorites.jsx';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { playSound } from '../utils/tapSound.jsx'
import { MaterialIcons } from '@expo/vector-icons';
import { CharDetails } from '../views/CharDetails.jsx';
import { Updates } from '../views/Updates.jsx';
import { MyAccount } from '../views/MyAccount.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveData } from '../utils/handleData.jsx';
import { incrementCounterFavorites } from '../store/slices/AccountSlice.jsx';
import { updateFavoritesLength } from '../utils/handleData.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'react-native';

// Navigator
export function Navigator() {

    dispatch = useDispatch();
    updateFavoritesLength(incrementCounterFavorites, dispatch);

    //TODO: The two lines below produces different result...
    const { counterFavorites } = useSelector(state => state.userReducer);
    // const counterFavorites = useSelector(state => state.userReducer.counterFavorites);

    // const counterFavoritesHandler = () => {
    //     updateFavoritesLength(incrementCounterFavorites, dispatch);
    //     const counterFavorites = useSelector(state => state.userReducer.counterFavorites);
    //     setInterval(() => {
    //         // Alert.alert('Counter Favorites', counterFavorites.toString());
    //         updateFavoritesLength(incrementCounterFavorites, dispatch);
    //     }, 5000);
    //     return counterFavorites;
    // };

    const favOptions = {
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ color, size }) => (
            <AntDesign name="star" size={24} color={color} />
        ),
        tabBarStyle: {
            backgroundColor: 'rgba(20,20,25,1)',
            borderTopWidth: 1.5,
            borderTopColor: 'white',
            height: 50,
        },
        tabBarBadge: counterFavorites,
        tabBarBadgeStyle: { fontSize: 9, width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' },

        headerShown: true, // Show the header
        headerStyle: {
            backgroundColor: 'rgba(16,41,78,1)', // Header background color
            borderBottomWidth: 0.5, // Header bottom border width
            borderBottomColor: 'white', // Header bottom border color
            elevation: 0, // Header elevation in Android (to avoid shadow)
            height: 0,
        },
        headerTintColor: 'red',
        headerTitleStyle: {
            fontWeight: 'bold', // Header title font weight
            color: 'white', // Header title text color
            fontSize: 15, // Header title font size
            maxWidth: '100%', // Maximum width for the header title
            textAlign: 'center', // Horizontal alignment of header title
            textShadowColor: 'black', // Header title text shadow color
            textShadowOffset: { width: 0.7, height: 0.7 }, // Header title text shadow offset
            textShadowRadius: 2, // Header title text shadow radius

        },
        headerTitleAlign: 'center', // Horizontal alignment of header title
        headerTitleContainerStyle: {
            flex: 1, // Expand title container to occupy all available space
            alignItems: 'center', // Align title horizontally in center
            justifyContent: 'center', // Align title vertically in center
        },
        headerTransitionStyle: 'screen', // Header transition style (screen, fade, slide)
    };


    const topTab = createMaterialTopTabNavigator();

    const TopTabGroup = () => {
        return (
            <topTab.Navigator>
                <topTab.Screen name="Top 1 " component={MyAccount} options={topMyAccount} />
                <topTab.Screen name="Top 4" component={Updates} options={topMyAccount} />
            </topTab.Navigator>
        );
    }


    // DrawerGroup
    const Drawer = createDrawerNavigator();
    function DrawerGroup() {
        return (
            <Drawer.Navigator screenOptions={{
                drawerIcon: ({ focused, color, size }) => (
                    <TouchableOpacity>
                        <AntDesign name="menu-fold" size={15} color={'white'} />
                    </TouchableOpacity>
                ),
            }}>
                <Drawer.Screen name="Home" component={StackGroup} options={drawer} />
                <Drawer.Screen name="Updates" component={Updates} options={drawer} />
                <Drawer.Screen name="My Account" component={TopTabGroup} options={drawerMyAccount} />
                {/* <Drawer.Screen name="Home" component={ButtomTabGroup} />
                <Drawer.Screen name="Search By" component={SearchBy} />
                <Drawer.Screen name="Favorites" component={Favorites} />
                <Drawer.Screen name="About" component={About} /> */}
            </Drawer.Navigator>
        );
    }

    // StackGroup
    const Stack = createNativeStackNavigator();
    function StackGroup() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={ButtomTabGroup} options={deletedHeader} />
                <Stack.Screen name="CharDetails" component={CharDetails} options={deletedHeader} />
            </Stack.Navigator>
        );
    }
    // ButtomTabGroup
    const ButtomTab = createBottomTabNavigator();
    function ButtomTabGroup() {
        return (
            <ButtomTab.Navigator>
                <ButtomTab.Screen name="Naruto Characters!" component={Home} options={homeOptions} />
                <ButtomTab.Screen name="Search By" component={SearchBy} options={searchByOptions} />
                <ButtomTab.Screen name="Favorites" component={Favorites} options={favOptions} />
                <ButtomTab.Screen name="About" component={About} options={aboutOptions} />
            </ButtomTab.Navigator>
        );
    }

    return (
        <NavigationContainer>
            {/* <ButtomTabGroup /> */}
            {/* <StackGroup /> */}
            <DrawerGroup />
        </NavigationContainer>
    );
}
const topMyAccount = {
    tabBarLabel: 'Search By',
    tabBarStyle: {
        backgroundColor: 'rgba(20,20,25,1)',
        borderTopWidth: 1.5,
        borderTopColor: 'white',
        height: 0,
    },
    headerShown: false, // Show the header
    headerStyle: {
        backgroundColor: 'rgba(16,41,78,1)', // Header background color
        borderBottomWidth: 0.5, // Header bottom border width
        borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 0,
    },
    headerTintColor: 'red',
    headerTitleStyle: {
        fontWeight: 'bold', // Header title font weight
        color: 'white', // Header title text color
        fontSize: 15, // Header title font size
        maxWidth: '100%', // Maximum width for the header title
        textAlign: 'center', // Horizontal alignment of header title
        textShadowColor: 'black', // Header title text shadow color
        textShadowOffset: { width: 0.7, height: 0.7 }, // Header title text shadow offset
        textShadowRadius: 2, // Header title text shadow radius

    },
    headerTitleAlign: 'center', // Horizontal alignment of header title
    headerTitleContainerStyle: {
        flex: 1, // Expand title container to occupy all available space
        alignItems: 'center', // Align title horizontally in center
        justifyContent: 'center', // Align title vertically in center
    },
};


const drawer = {
    headerShown: true, // Show the header
    headerTitleAlign: 'center', // Align the header title to center
    headerTitleStyle: {
        color: 'white', // Change the color of the letters
        fontSize: 15, // Change the font size if necessary
        fontWeight: 'bold',
    },
    headerTintColor: 'white', // Color of the button to open the Drawer
    headerStyle: {
        backgroundColor: '#141419',
        borderBottomWidth: 0.5, // Header bottom border width
        borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 80,
    },
    drawerStyle: {
        backgroundColor: 'rgba(5, 15, 25, 1)',
        width: 250,
        paddingTop: '80%', // Adjust space from the top of the screen

    },
    drawerType: 'front', // Type of Drawer (front)
    drawerWidth: 200, // Width of the Drawer
    drawerBackgroundColor: 'rgba(20, 20, 25, 0.8)', // Drawer background color
    overlayColor: 'rgba(0, 0, 0, 0.85)', // Color of overlay when opening the Drawer
    minSwipeDistance: 50, // Minimum swipe distance to open the Drawer
    drawerLockMode: 'unlocked', // Drawer lock mode ('locked-closed', 'locked-open', 'unlocked')
    hideStatusBar: false, // Hide status bar when opening the Drawer
    statusBarAnimation: 'fade', // Status bar animation when opening the Drawer
    swipeEdgeWidth: 50, // Width of the activation area of the Drawer when swiping from the edge
    drawerLabelStyle: {
        color: 'white', // Change the color of the letters
        fontSize: 20, // Change the font size if necessary
        fontWeight: 'bold',
    },
};

const deletedHeader = {
    headerShown: false,
    presentation: 'modal',
};
const drawerMyAccount = {
    headerTitleAlign: 'center', // Align the header title to center
    headerTitleStyle: {
        color: 'white', // Change the color of the letters
        fontSize: 15, // Change the font size if necessary
        fontWeight: 'bold',
    },
    headerTintColor: 'white', // Color of the button to open the Drawer
    headerShown: true, // Show the header
    headerStyle: {
        backgroundColor: '#141419',
        // borderBottomWidth: 0.5, // Header bottom border width
        // borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 50,
    },

    drawerStyle: {
        backgroundColor: 'rgba(5, 15, 25, 1)',
        width: 250,
        paddingTop: '80%', // Adjust space from the top of the screen
    },
    drawerType: 'front', // Type of Drawer (front)
    drawerWidth: 200, // Width of the Drawer
    // drawerBackgroundColor: 'rgba(20, 20, 25, 0.8)', // Drawer background color
    overlayColor: 'rgba(0, 0, 0, 0.85)', // Color of overlay when opening the Drawer
    minSwipeDistance: 50, // Minimum swipe distance to open the Drawer
    drawerLockMode: 'unlocked', // Drawer lock mode ('locked-closed', 'locked-open', 'unlocked')
    hideStatusBar: false, // Hide status bar when opening the Drawer
    statusBarAnimation: 'fade', // Status bar animation when opening the Drawer
    swipeEdgeWidth: 50, // Width of the activation area of the Drawer when swiping from the edge
    drawerLabelStyle: {
        color: 'white', // Change the color of the letters
        fontSize: 20, // Change the font size if necessary
        fontWeight: 'bold',
    },
};

const homeOptions = {

    // headerLeft: () => (
    //     <TouchableOpacity onPress={() => navigation.openDrawer()}>
    //         <FontAwesome name="bars" size={30} color="white" style={{ marginLeft: 10 }} />
    //     </TouchableOpacity>
    // ),
    tabBarLabel: 'Home',
    tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="shuriken" size={35} color={color} />
    ),
    tabBarStyle: {
        backgroundColor: 'rgba(20,20,25,1)',
        borderTopWidth: 1.5,
        borderTopColor: 'white',
        height: 50,
    },
    headerShown: true, // Show the header
    headerStyle: {
        backgroundColor: 'rgba(16,41,78,1)', // Header background color
        borderBottomWidth: 0.5, // Header bottom border width
        borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 0,
    },
    headerTitleStyle: {
        fontWeight: 'bold', // Header title font weight
        color: 'white', // Header title text color
        fontSize: 14, // Header title font size
        maxWidth: '100%', // Maximum width for the header title
        textAlign: 'center', // Horizontal alignment of header title
        textShadowColor: 'black', // Header title text shadow color
        textShadowOffset: { width: 0.7, height: 0.7 }, // Header title text shadow offset
        textShadowRadius: 2, // Header title text shadow radius
    },
    headerTitleAlign: 'center', // Horizontal alignment of header title
    headerTitleContainerStyle: {
        flex: 1, // Expand title container to occupy all available space
        alignItems: 'center', // Align title horizontally in center
        justifyContent: 'center', // Align title vertically in center
    },
    headerTransitionStyle: 'screen', // Header transition style (screen, fade, slide)
};

const searchByOptions = {
    tabBarLabel: 'Search By',
    tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="person-search" size={32} color={color} />
    ),
    tabBarStyle: {
        backgroundColor: 'rgba(20,20,25,1)',
        borderTopWidth: 1.5,
        borderTopColor: 'white',
        height: 50,
    },
    headerShown: true, // Show the header
    headerStyle: {
        backgroundColor: 'rgba(16,41,78,1)', // Header background color
        borderBottomWidth: 0.5, // Header bottom border width
        borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 0,
    },
    headerTintColor: 'red',
    headerTitleStyle: {
        fontWeight: 'bold', // Header title font weight
        color: 'white', // Header title text color
        fontSize: 15, // Header title font size
        maxWidth: '100%', // Maximum width for the header title
        textAlign: 'center', // Horizontal alignment of header title
        textShadowColor: 'black', // Header title text shadow color
        textShadowOffset: { width: 0.7, height: 0.7 }, // Header title text shadow offset
        textShadowRadius: 2, // Header title text shadow radius

    },
    headerTitleAlign: 'center', // Horizontal alignment of header title
    headerTitleContainerStyle: {
        flex: 1, // Expand title container to occupy all available space
        alignItems: 'center', // Align title horizontally in center
        justifyContent: 'center', // Align title vertically in center
    },
    headerTransitionStyle: 'screen', // Header transition style (screen, fade, slide)
};

const aboutOptions = {
    tabBarLabel: 'About',
    tabBarIcon: ({ color, size }) => (
        // <FontAwesome name="github-square" size={30} color={color} />

        <Image source={require('../assets/logo.png')} style={
            {
                width: 30,
                height: 30,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'white',
                marginVertical: 1,
                padding: 1,
            }
        } />

    ),
    tabBarStyle: {
        backgroundColor: 'rgba(20,20,25,1)',
        borderTopWidth: 1.5,
        borderTopColor: 'white',
        height: 50,
    },
    // tabBarBadge: 1,
    // tabBarBadgeStyle: { fontSize: 11, width: 20, height: 20, borderRadius: 10, backgroundColor: '#FF8528' },

    headerShown: true, // Show the header
    headerStyle: {
        backgroundColor: 'rgba(16,41,78,1)', // Header background color
        borderBottomWidth: 0.5, // Header bottom border width
        borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 0,
    },
    headerTintColor: 'red',
    headerTitleStyle: {
        fontWeight: 'bold', // Header title font weight
        color: 'white', // Header title text color
        fontSize: 15, // Header title font size
        maxWidth: '100%', // Maximum width for the header title
        textAlign: 'center', // Horizontal alignment of header title
        textShadowColor: 'black', // Header title text shadow color
        textShadowOffset: { width: 0.7, height: 0.7 }, // Header title text shadow offset
        textShadowRadius: 2, // Header title text shadow radius
    },
    headerTitleAlign: 'center', // Horizontal alignment of header title
    headerTitleContainerStyle: {
        flex: 1, // Expand title container to occupy all available space
        alignItems: 'center', // Align title horizontally in center
        justifyContent: 'center', // Align title vertically in center
    },
    headerTransitionStyle: 'screen', // Header transition style (screen, fade, slide)
};
