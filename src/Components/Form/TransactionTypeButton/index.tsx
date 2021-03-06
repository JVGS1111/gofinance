
import { TouchableOpacityProps } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Icon, Title, Button } from "./styles";

interface TransactionTypeButtonProps extends TouchableOpacityProps {
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

        <Container isActive={isActive} type={type}>

            <Button {...rest}>
                <Icon name={icons[type]} type={type} />
                <Title>
                    {title}
                </Title>
            </Button>

        </Container>

    )
}