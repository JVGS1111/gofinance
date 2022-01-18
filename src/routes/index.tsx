import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from '../Hooks/Auth';
import AppLoading from 'expo-app-loading';

export function Routes() {

    const { user, userStorageLoading } = useAuth();

    if (userStorageLoading) {
        return <AppLoading />
    }

    return (
        <NavigationContainer>
            {user.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    )
}