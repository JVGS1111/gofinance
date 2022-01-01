
import { useState } from "react";
import { Button } from "../../Components/Form/Button";
import { CategorySelect } from "../../Components/Form/CategorySelect/Index";
import { Input } from "../../Components/Form/Inputs";
import { TransactionTypeButton } from "../../Components/Form/TransactionTypeButton";
import { Container, Header, Title, Form, Fields, TransactionsTypes } from "./styles";

export function Register() {

    const [transactionType, setTransactionType] = useState('');

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="Preço" />
                    <TransactionsTypes>
                        <TransactionTypeButton isActive={transactionType === 'up'} onPress={() => { handleTransactionsTypeSelect('up') }} title="Income" type="up" />
                        <TransactionTypeButton isActive={transactionType === 'down'} onPress={() => { handleTransactionsTypeSelect('down') }} title="Outcome" type="down" />
                    </TransactionsTypes>
                    <CategorySelect title="Categoria" />
                </Fields>
                <Button title="Enviar" />
            </Form>

        </Container>
    )
}