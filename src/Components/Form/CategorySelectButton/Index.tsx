
import { Container, Category, Icon } from "./styles";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GestureHandlerRootViewProps } from "react-native-gesture-handler/lib/typescript/GestureHandlerRootView";


interface CategorySelectProps extends GestureHandlerRootViewProps {
    title: string;
    onPress: () => void;
}

export function CategorySelectButton({ title, onPress, ...rest }: CategorySelectProps) {
    return (
        <GestureHandlerRootView {...rest}>
            <Container onPress={onPress}>
                <Category>{title}</Category>
                <Icon name='chevron-down' />
            </Container>
        </GestureHandlerRootView>
    )
}