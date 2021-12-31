import { Container, Title, Amount, Footer, Category, Icon, CategoryName, Date } from './styles'


interface TransactionCardProps {
    data: DataProps
}

export interface DataProps {
    type: 'positive' | 'negative';
    title: string;
    amount: string;
    category: Category;
    date: string;
}

interface Category {
    name: string;
    icon: string;
}
export function TransactionCard({ data }: TransactionCardProps) {

    return (
        <Container>
            <Title>
                {data.title}
            </Title>
            <Amount type={data.type}>
                {data.type == 'negative' && '-'}
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={data.category.icon} />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}