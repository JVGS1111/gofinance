
import { Container, Category, Icon } from "./styles";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface CategorySelectProps {
    title: string;
    onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: CategorySelectProps) {
    return (
        <GestureHandlerRootView>
            <Container onPress={onPress}>
                <Category>{title}</Category>
                <Icon name='chevron-down' />
            </Container>
        </GestureHandlerRootView>
    )
}