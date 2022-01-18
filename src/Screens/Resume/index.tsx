import { HistoryCard } from "../../Components/HistoryCard";
import { Container, Header, Title, Content, ChartContainer, MonthSelect, MonthSelectButton, MonthSelectIcon, Month, LoadContainer } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from "react";
import { categories } from "../../utils/categories";
import { VictoryPie } from 'victory-native';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from 'styled-components/native';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../Hooks/Auth";

interface ResponseTransactionsProps {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}
interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}


export function Resume() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
    const theme = useTheme();
    const { user } = useAuth();

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]));

    async function loadData() {
        setIsLoading(true)
        const dataKey = `@gofinance:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives: ResponseTransactionsProps[] = responseFormatted
            .filter((expensive: ResponseTransactionsProps) =>
                expensive.type === 'negative' &&
                new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
            );

        const expensiveTotal = expensives.reduce((acc: number, expensive: ResponseTransactionsProps) => {
            return acc + Number(expensive.amount);
        }, 0);

        const totalByCategory: CategoryData[] = [];

        categories.forEach((category) => {
            let categorySum = 0;
            expensives.forEach((expensive) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount);
                }
            })
            if (categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                const percent = `${(categorySum / expensiveTotal * 100).toFixed(1)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    totalFormatted: totalFormatted,
                    color: category.color,
                    percent: percent,
                });
            }

        });

        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    }

    function handlDateChange(action: 'next' | 'prev') {

        if (action === 'next') {
            const newDate = addMonths(selectedDate, 1);
            setSelectedDate(newDate);
        } else {
            const newDate = subMonths(selectedDate, 1);
            setSelectedDate(newDate);
        }
    }

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            {isLoading ?
                <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.secondary}
                        size='large'
                    />
                </LoadContainer> :

                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight(),
                    }}
                >
                    <MonthSelect>
                        <MonthSelectButton onPress={() => handlDateChange('prev')}>
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectButton>

                        <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

                        <MonthSelectButton onPress={() => handlDateChange('next')}>
                            <MonthSelectIcon name="chevron-right" />
                        </MonthSelectButton>
                    </MonthSelect>
                    <ChartContainer>
                        <VictoryPie
                            data={totalByCategories}
                            colorScale={totalByCategories.map(category => category.color)}
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape,
                                }
                            }}
                            labelRadius={50}
                            x="percent"
                            y="total"
                        />
                    </ChartContainer>
                    {
                        totalByCategories.map(item => {
                            return <HistoryCard
                                key={item.key}
                                color={item.color}
                                amount={item.totalFormatted}
                                title={item.name}
                            />

                        })
                    }
                </Content>
            }
        </Container>
    )
}