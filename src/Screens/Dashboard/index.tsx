import { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HighLightCard } from '../../Components/HighlightCard';
import { TransactionCard, DataProps } from '../../Components/TransactionCard';
import { Container, Header, Title, LoadContainer, UserWrapper, LogoutButton, UserInfo, Transactions, HighLightCards, Photo, User, UserGreeting, UserName, Icon, ListTransactions } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { LastTransaction } from '../../Components/HighlightCard/styles';

export interface DataListProps extends DataProps {
    id: string;
}
interface highLightData {
    entries: highLightDataProps;
    expensive: highLightDataProps;
    total: highLightDataProps;
}
interface highLightDataProps {
    amount: string;
    lastTransaction: string;
}
const dataKey = '@gofinance:transactions';

export function Dashboard() {
    //AsyncStorage.clear()
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highLightData, setHighLightData] = useState<highLightData>({
        entries: {
            amount: '',
            lastTransaction: ''
        },
        expensive: {
            amount: '',
            lastTransaction: ''
        },
        total: {
            amount: '',
            lastTransaction: ''
        }
    } as highLightData);

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ) {

        if (!collection[0]) {
            return '';
        }

        const lastTransactions = Math.max.apply(Math,
            collection.filter(transaction => transaction.type === type)
                .map(transaction => new Date(transaction.date).getTime())
        );
        if (lastTransactions.toString() == '-Infinity') {
            return ''
        }
        return formatDateToString(lastTransactions)
    }

    function formatDateToString(date: string | number | Date) {
        const atDate = new Date(date);
        return `${atDate.getDate()} de ${atDate.toLocaleDateString('pt-BR', { month: 'long' })}`

    }

    async function loadTransactions() {
        const response = await AsyncStorage.getItem(dataKey);

        const transactionsFromStorage = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormated: DataListProps[] = transactionsFromStorage
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }
                const amount = Number(item.amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date))

                return {
                    id: item.id,
                    name: item.name,
                    amount: amount,
                    type: item.type,
                    category: item.category,
                    date: date
                }
            })
        const total = entriesTotal - expensiveTotal;


        setTransactions(transactionsFormated);

        const lastTransactionsEntries = getLastTransactionDate(transactionsFormated, 'positive') as string;
        const lastTransactionsExpensive = getLastTransactionDate(transactionsFormated, 'negative') as string;
        const totalInterval = `01 a ${lastTransactionsExpensive ? lastTransactionsExpensive : '01'}`;

        setHighLightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionsEntries.length > 1 ? `Ultima entrada dia ${lastTransactionsEntries}` : 'Não há transações recentes'
            },
            expensive: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionsExpensive.length > 1 ? `Ultima sáida dia ${lastTransactionsExpensive}` : ''
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        })
        setIsLoading(false);
    }
    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container >
            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.secondary}
                            size='large'
                        />
                    </LoadContainer> :
                    <>
                        <Header>
                            <UserWrapper>
                                <UserInfo>
                                    <Photo source={{ uri: 'https://github.com/JVGS1111.png' }} />
                                    <User>
                                        <UserGreeting>Olá, </UserGreeting>
                                        <UserName>João</UserName>
                                    </User>
                                </UserInfo>
                                <LogoutButton >
                                    <Icon name="power" />
                                </LogoutButton>
                            </UserWrapper>
                        </Header>
                        <HighLightCards>
                            <HighLightCard
                                title='Entradas'
                                amount={highLightData.entries.amount}
                                lastTransaction={highLightData.entries.lastTransaction}
                                type='up'
                            />
                            <HighLightCard
                                title='Saídas'
                                amount={highLightData.expensive.amount}
                                lastTransaction={highLightData.expensive.lastTransaction}
                                type='down'
                            />
                            <HighLightCard
                                title='Total'
                                amount={highLightData.total.amount}
                                lastTransaction={highLightData.total.lastTransaction}
                                type='total'
                            />
                        </HighLightCards>
                        <Transactions>
                            <Title>
                                Listagem
                            </Title>
                            <ListTransactions
                                data={transactions}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                    return <TransactionCard data={item} />
                                }}
                            />
                        </Transactions>
                    </>
            }
        </Container>
    )
}

