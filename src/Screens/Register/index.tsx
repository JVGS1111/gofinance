
import { useEffect, useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import { Container, Header, Title, Form, Fields, TransactionsTypes } from "./styles";

import { Button } from "../../Components/Form/Button";
import { InputForm } from "../../Components/Form/InputForm";
import { CategorySelectButton } from "../../Components/Form/CategorySelectButton/Index";
import { TransactionTypeButton } from "../../Components/Form/TransactionTypeButton";

import { CategorySelect } from "../CategorySelect";

import uuid from 'react-native-uuid'
import { useForm } from 'react-hook-form'
import { useNavigation } from "@react-navigation/native";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../../Hooks/Auth";

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
        .required('O valor é obrigatorio')
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
})

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const { user } = useAuth();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const navigation = useNavigation();

    function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }
    function handleOpenSelectCategoryModal() {
        setTimeout(() => {
            setCategoryModalOpen(true);
        }, 900)//remover timeout

    }

    async function handleRegister(form: formData) {
        if (!transactionType) {
            return Alert.alert('selecione o tipo da transação')
        }
        if (category.key == 'category') {
            return Alert.alert('selecione a categoria')
        }
        const newTansaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const dataKey = `@gofinance:transactions_user:${user.id}`;

            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,
                newTansaction
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });
            navigation.navigate('Listagem' as any);

        } catch (err) {
            console.log(err);
            Alert.alert('Não foi possível salvar')

        }
    }

    useEffect(() => {
        async function loadData() {
            const dataKey = `@gofinance:transactions_user:${user.id}`;

            const data = await AsyncStorage.getItem(dataKey);
            console.log(data);

        }

        loadData();
    }, []);

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
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionsTypes>
                            <TransactionTypeButton isActive={transactionType === 'positive'} onPress={() => { handleTransactionsTypeSelect('positive') }} title="Income" type="up" />
                            <TransactionTypeButton isActive={transactionType === 'negative'} onPress={() => { handleTransactionsTypeSelect('negative') }} title="Outcome" type="down" />
                        </TransactionsTypes>
                        <CategorySelectButton
                            testID="button-category"
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>
                    <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
                </Form>
                <Modal testID="modal-category" visible={categoryModalOpen}>
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