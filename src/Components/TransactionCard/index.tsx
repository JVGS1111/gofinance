import { categories } from '../../utils/categories'
import { formatDatesToDisplay } from '../../utils/formatDates';
import { Container, Title, Amount, Footer, Category, Icon, CategoryName, Date } from './styles'


interface TransactionCardProps {
    data: DataProps
}

export interface DataProps {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

export function TransactionCard({ data }: TransactionCardProps) {
    const category = categories.filter(
        item => item.key == data.category
    )[0];
    const date = formatDatesToDisplay(data.date);

    return (
        <Container>
            <Title>
                {data.name}
            </Title>
            <Amount type={data.type}>
                {data.type == 'negative' && '-'}
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{date}</Date>
            </Footer>
        </Container>
    )
}