import { TouchableOpacityProps } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Icon, Title } from "./styles";

interface TransactionTypeButtonProps extends RectButtonProps {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
}

const icons = {
    up: "arrow-up-circle",
    down: 'arrow-down-circle'
}
export function TransactionTypeButton({ title, isActive, type, ...rest }: TransactionTypeButtonProps) {


    return (
        <Container {...rest} isActive={isActive} type={type}>
            <Icon name={icons[type]} type={type} />
            <Title>
                {title}
            </Title>
        </Container>
    )
}