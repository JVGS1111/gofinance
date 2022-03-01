import { Container } from "./styles";
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
    active?: boolean;
}

export function Input({ active = false, ...rest }: InputProps) {

    return (
        <Container
            active={active}
            {...rest} />
    )

}