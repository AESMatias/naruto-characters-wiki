import react from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../views/Home.jsx';
import { About } from '../views/About.jsx';
import { SearchBy } from '../views/SearchBy.jsx';
import { Favorites } from '../views/Favorites.jsx';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { playSound } from '../utils/tapSound.jsx'
import { MaterialIcons } from '@expo/vector-icons';
import { CharDetails } from '../views/CharDetails.jsx';

const ButtomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackGroup() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={deletedHeader} />
            <Stack.Screen name="CharDetails" component={CharDetails} options={deletedHeader} />
        </Stack.Navigator>
    );
}

function ButtomTabGroup() {
    return (
        <ButtomTab.Navigator>
            <ButtomTab.Screen name="Naruto Characters!" component={StackGroup} options={homeOptions} />
            <ButtomTab.Screen name="Search By" component={SearchBy} options={searchByOptions} />
            <ButtomTab.Screen name="Favorites" component={Favorites} options={favOptions} />
            <ButtomTab.Screen name="About" component={About} options={aboutOptions} />
        </ButtomTab.Navigator>
    );
}

export function Navigator() {
    return (
        <NavigationContainer>
            <ButtomTabGroup />
        </NavigationContainer>
    );
}
const handlePressRouter = () => {
    playSound();
};
const deletedHeader = {
    headerShown: false,
    presentation: 'modal',
};
const homeOptions = {
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
    headerStyle: {
        backgroundColor: 'rgba(16,41,78,1)', // Header background color
        borderBottomWidth: 0.5, // Header bottom border width
        borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 60,
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
    tabBarBadge: 0,
    tabBarBadgeStyle: { fontSize: 11, width: 15, height: 15, borderRadius: 20, backgroundColor: 'red' },

    headerStyle: {
        backgroundColor: 'rgba(16,41,78,1)', // Header background color
        borderBottomWidth: 0.5, // Header bottom border width
        borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 60,
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
    headerStyle: {
        backgroundColor: 'rgba(16,41,78,1)', // Header background color
        borderBottomWidth: 0.5, // Header bottom border width
        borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 60,
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
        <FontAwesome name="github-square" size={30} color={color} />
    ),
    tabBarStyle: {
        backgroundColor: 'rgba(20,20,25,1)',
        borderTopWidth: 1.5,
        borderTopColor: 'white',
        height: 50,
    },
    tabBarBadge: 1,
    tabBarBadgeStyle: { fontSize: 11, width: 15, height: 15, borderRadius: 20, backgroundColor: '#FF8528' },

    headerStyle: {
        backgroundColor: 'rgba(16,41,78,1)', // Header background color
        borderBottomWidth: 0.5, // Header bottom border width
        borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 60,
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
