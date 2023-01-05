import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

export function NewGroup() {
    const [group, setGroup] = useState("");
    const { navigate } = useNavigation();

    const handleNew = async () => {
        try {
            await groupCreate(group);
            navigate("players", { group });
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert("Novo grupo", error.message)
            }else{
                console.error(error)
                Alert.alert("Operação inválida", "Erro ao realizar operação");
            }
        }
    };

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <Highlight
                    title="Nova turma"
                    subtitle="crie a turma para adicionar as pessoas"
                />

                <Input placeholder="Nome da turma" onChangeText={setGroup} />

                <Button
                    title="Criar"
                    style={{ marginTop: 20 }}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    );
}
