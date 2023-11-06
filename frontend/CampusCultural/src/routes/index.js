import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../pages/Login'
import Home from '../pages/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Calendario from '../pages/Calendario';
import Perfil from '../pages/Perfil';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='AppNav'
                component={AppNav}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function AppNav() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#48b2fe',
                    height: '8%',
                },
            }}

        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#e7e7e7',
                    },
                    headerTitle: '',
                    tabBarIcon: ({ color, size, focused }) => {
                        return <View
                            style={[
                                styles.iconContainer,
                                focused && styles.iconContainerFocused
                            ]}
                        >
                            <Ionicons name="home" size={size} color='white' />
                            <Text style={styles.iconText}>INÍCIO</Text>
                        </View>
                    }

                }}
            />

            <Tab.Screen
                name='Calendario'
                component={Calendario}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#e7e7e7',
                    },
                    headerTitle: '',
                    tabBarIcon: ({ color, size, focused }) => {
                        return <View
                            style={[
                                styles.iconContainer,
                                focused && styles.iconContainerFocused
                            ]}
                        >
                            <Ionicons name="calendar" size={size} color='white' />
                            <Text style={styles.iconText}>CALENDÁRIO</Text>
                        </View>
                    }

                }}
            />

            <Tab.Screen
                name='Perfil'
                component={Perfil}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#e7e7e7',
                    },
                    headerTitle: '',
                    tabBarIcon: ({ color, size, focused }) => {
                        return <View
                            style={[
                                styles.iconContainer,
                                focused && styles.iconContainerFocused
                            ]}
                        >
                            <Ionicons name="person" size={size} color='white' />
                            <Text style={styles.iconText}>PERFIL</Text>
                        </View>
                    },
                    tabBarHideOnKeyboard: true
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        borderRadius: 30,
        padding: 5,
        width: 80,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainerFocused: {
        backgroundColor: '#45aaf2',
    },
    iconText: {
        color: 'white',
        fontSize: 8,
        fontWeight: 'bold'
    }
})
