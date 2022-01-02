
import { useState } from "react";
import { Button } from "../../Components/Form/Button";
import { CategorySelectButton } from "../../Components/Form/CategorySelectButton/Index";
import { Input } from "../../Components/Form/Inputs";
import { TransactionTypeButton } from "../../Components/Form/TransactionTypeButton";
import { Container, Header, Title, Form, Fields, TransactionsTypes } from "./styles";
import { Modal } from "react-native";
import { CategorySelect } from "../CategorySelect";

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }
    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
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
                    <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>
                <Button title="Enviar" />
            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    )
}