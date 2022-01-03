import { Container, Error } from "./styles";
import { Input } from "../Inputs";
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

interface InputFormProps extends TextInputProps {
    control: Control;
    name: string;
    error: string;
}
export function InputForm({ control, error, name, ...rest }: InputFormProps) {

    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...rest} />
                )}
                name={name}
            />
            {error && <Error>{error}</Error>}



        </Container>
    )
}