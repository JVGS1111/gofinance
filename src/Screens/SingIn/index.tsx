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

import { RFValue } from "react-native-responsive-fontsize";

import { SingInSocialButton } from '../../Components/SignInSocialButton'
import { useAuth } from "../../Hooks/Auth";

export function SignIn() {

    const { } = useAuth();

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
                    />
                    <SingInSocialButton
                        title="Entrar com Apple"
                        svg={AppleSvg}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}