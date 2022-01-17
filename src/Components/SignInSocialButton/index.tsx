
import { RectButtonProps, GestureHandlerRootView } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { Button, ImageContainer, Text } from './styles';

interface SingInSocialButtonProps extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>
}

export function SingInSocialButton({
    title,
    svg: Svg,
    ...rest
}: SingInSocialButtonProps) {

    return (
        <GestureHandlerRootView>
            <Button {...rest}>
                <ImageContainer>
                    <Svg />
                </ImageContainer>
                <Text>{title}</Text>
            </Button>
        </GestureHandlerRootView>

    );
}