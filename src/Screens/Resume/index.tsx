import { HistoryCard } from "../../Components/HistoryCard";
import { Container, Header, Title, Content, ChartContainer } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { categories } from "../../utils/categories";
import { VictoryPie } from 'victory-native';

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
}

const dataKey = '@gofinance:transactions';


export function Resume() {

    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    async function loadData() {
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives: ResponseTransactionsProps[] = responseFormatted
            .filter((expensive: ResponseTransactionsProps) => expensive.type === 'negative');

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

                const percent = `(categorySum / expensiveTotal * 100).toFixed(0)`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    totalFormatted: totalFormatted,
                    color: category.color
                });
            }

        });

        setTotalByCategories(totalByCategory);
    }
    useEffect(() => {
        loadData();
    }, []);

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <Content>
                <ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        x="name"
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
        </Container>
    )
}