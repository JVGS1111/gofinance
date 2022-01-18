import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';
import { Container, Title } from './styles';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
}

export function Button({ title, onPress, ...rest }: ButtonProps) {
    return (

        <Container {...rest} onPress={onPress}>
            <Title>
                {title}
            </Title>
        </Container>

    )
}