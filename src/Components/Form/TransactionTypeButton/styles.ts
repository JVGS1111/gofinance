import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, GestureHandlerRootView } from "react-native-gesture-handler";

interface IconProps {
    type: 'up' | 'down'
}
interface ContainerProps {
    isActive: boolean,
    type: 'up' | 'down'
}

export const Container = styled.View <ContainerProps>`
    width: 48%;

    border: 1.5px solid ${({ theme }) => theme.colors.text};

   
    border-radius: 5px;

    ${({ type, isActive }) => isActive && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
        border: none;
    `};

    ${({ type, isActive }) => isActive && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.sucess_light};
        border: none;
    `};
`

export const Icon = styled(Feather) <IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${({ theme, type }) => type === 'up' ? theme.colors.success : theme.colors.attention}
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

`;

export const Button = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    padding: 16px;
    justify-content: center;
`;

