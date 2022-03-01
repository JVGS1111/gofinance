import 'jest-fetch-mock'

import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from './Auth';
import fetchMock from 'jest-fetch-mock';
import * as ExpoAuth from 'expo-auth-session';
import { mocked } from 'ts-jest/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

fetchMock.enableMocks();

const userTest = {
    id: 'any_id',
    email: 'john.doe@email.com',
    name: 'John Doe',
    photo: 'any_photo.png'
};
jest.mock('expo-auth-session');

import { startAsync } from 'expo-auth-session';

describe('Auth Hook', () => {
    it('should be able to sign in with Google account existing', async () => {

        const successAuth = mocked(startAsync as any, true);

        successAuth.mockReturnValue({
            type: 'success',
            params: {
                access_token: 'any_token',
            }
        })

        fetchMock.mockResponseOnce(JSON.stringify(userTest));

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.singInWithGoogle());

        expect(result.current.user.email)
            .toBe(userTest.email);
    });
    beforeEach(async () => {
        const userCollectionKey = "@gofinances:user";
        await AsyncStorage.removeItem(userCollectionKey);
    });
    it('user should not connect if cancel authentication with Google', async () => {

        const canceledAuth = mocked(startAsync as any, true);

        canceledAuth.mockReturnValue({
            type: 'cancel',
        })

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.singInWithGoogle());

        expect(result.current.user).not.toHaveProperty('id');
    });
})