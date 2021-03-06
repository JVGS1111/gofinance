import React from "react";
import { render } from "@testing-library/react-native";
import { Input } from './';
import theme from '../../../Global/styles/theme';
import { ThemeProvider } from "styled-components/native";

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
)

//teste com contexto
describe('Input Component', () => {
    it('must have specific border color when active', () => {
        const { getByTestId } = render(
            <Input
                testID="input-email"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                active={true}
            />, {
            wrapper: Providers
        })

        const inputComponent = getByTestId('input-email');
        expect(inputComponent.props.style[0].borderColor)
            .toEqual('#e83f5b');
        expect(inputComponent.props.style[0].borderWidth)
            .toEqual(3);

    })
})