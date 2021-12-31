import * as React from 'react';
import { HighLightCard } from '../../Components/HighlightCard';
import { TransactionCard, DataProps } from '../../Components/TransactionCard';
import { Container, Header, Title, UserWrapper, UserInfo, Transactions, HighLightCards, Photo, User, UserGreeting, UserName, Icon, ListTransactions } from './styles';


export interface DataListProps extends DataProps {
    id: string
}
export function Dashboard() {

    const data: DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: 'Desenvolvimento de site',
            amount: 'R$ 10,000.00',
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '20/02/2021'
        },
        {
            id: '2',
            type: 'negative',
            title: 'Desenvolvimento de site',
            amount: 'R$ 10,000.00',
            category: {
                name: 'Alumentação',
                icon: 'coffee'
            },
            date: '20/02/2021'
        },
        {
            id: '3',
            type: 'positive',
            title: 'Desenvolvimento de site',
            amount: 'R$ 10,000.00',
            category: {
                name: 'Casa',
                icon: 'shopping-bag'
            },
            date: '20/02/2021'
        }
    ]
    return (
        <Container >
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://github.com/JVGS1111.png' }} />
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>João</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>
            <HighLightCards

            >
                <HighLightCard
                    title='Entradas'
                    amount='R$ 10.000,00'
                    lastTransaction='Ultima transação dia 13 de abril'
                    type='up'
                />
                <HighLightCard
                    title='Saídas'
                    amount='R$ 200,00'
                    lastTransaction='Ultima transação dia 13 de abril'
                    type='down'
                />
                <HighLightCard
                    title='Total'
                    amount='R$ 10.000,00'
                    lastTransaction='Ultima transação dia 13 de abril'
                    type='total'
                />

            </HighLightCards>
            <Transactions>
                <Title>
                    Listagem
                </Title>
                <ListTransactions
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return <TransactionCard data={item} />
                    }}
                />
            </Transactions>
        </Container>
    )
}

