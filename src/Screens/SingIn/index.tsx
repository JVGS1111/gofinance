import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from "./styles"

import AppleSvg from '../../Assets/apple.svg';
import GoogleSvg from '../../Assets/google.svg';
import LogoSvg from '../../Assets/logo.svg';

import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { SingInSocialButton } from '../../Components/SignInSocialButton'
import { useAuth } from "../../Hooks/Auth";
import { useState } from "react";
import { useTheme } from "styled-components/native";

export function SignIn() {

    const [isLoading, setIsLoading] = useState(false);

    const { singInWithGoogle, singInWithApple } = useAuth();
    const theme = useTheme();

    async function handleSingInWithGoogle() {
        try {
            setIsLoading(true);
            return await singInWithGoogle();
        } catch (err: any) {
            console.log(err);

            Alert.alert('Não foi possivel conectar a conta google');
            setIsLoading(false);
        }
    }
    async function handleSingInWithApple() {
        try {
            setIsLoading(true);
            return await singInWithApple();
        } catch (err: any) {
            console.log(err);

            Alert.alert('Não foi possivel conectar a conta Apple');
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {`\n`}
                        finanças de forma {`\n`}
                        muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu Login com {`\n`}
                    uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SingInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSingInWithGoogle}
                    />
                    {Platform.OS === 'ios' &&
                        <SingInSocialButton
                            title="Entrar com Apple"
                            svg={AppleSvg}
                            onPress={handleSingInWithApple}
                        />}
                </FooterWrapper>

                {isLoading && <ActivityIndicator
                    color={theme.colors.shape}
                    size={20}
                    style={{ marginTop: 18 }}
                />}
            </Footer>
        </Container>
    )
}