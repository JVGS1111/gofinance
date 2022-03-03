import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Register } from '.'
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from "styled-components/native";
import theme from '../../Global/styles/theme';

const Providers: React.FC = ({ children }) => (
    <NavigationContainer>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </NavigationContainer>
)
describe('Register Screen', () => {
    it('should be open category modal when user click on the category button', async () => {
        const { getByTestId } = render(
            <Register />,
            {
                wrapper: Providers
            }
        )

        const categoryModal = getByTestId("modal-category")
        const buttonCategory = getByTestId('button-category');

        fireEvent(buttonCategory, 'press')//evento de click
        await waitFor(() => { //assincrono
            expect(categoryModal.props.visible).toBeTruthy();
        })


    })
})