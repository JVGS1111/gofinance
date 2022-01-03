
import { useState } from "react";
import { Button } from "../../Components/Form/Button";
import { CategorySelectButton } from "../../Components/Form/CategorySelectButton/Index";
import { Input } from "../../Components/Form/Inputs";
import { TransactionTypeButton } from "../../Components/Form/TransactionTypeButton";
import { Container, Header, Title, Form, Fields, TransactionsTypes } from "./styles";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../Components/Form/InputForm";
import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface formData {
    name: string;
    amount: string;
}
const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatorio'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
})

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

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

    function handleRegister(form: formData) {
        if (!transactionType) {
            return Alert.alert('selecione o tipo da transação')
        }
        if (category.key == 'category') {
            return Alert.alert('selecione a categoria')
        }
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        console.log(data);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            control={control}
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            name="name"
                            placeholder="Nome"
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            control={control}
                            name="amount"
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.name && errors.name.message}
                        />
                        <TransactionsTypes>
                            <TransactionTypeButton isActive={transactionType === 'up'} onPress={() => { handleTransactionsTypeSelect('up') }} title="Income" type="up" />
                            <TransactionTypeButton isActive={transactionType === 'down'} onPress={() => { handleTransactionsTypeSelect('down') }} title="Outcome" type="down" />
                        </TransactionsTypes>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>
                    <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
}