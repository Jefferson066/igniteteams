import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useState } from "react";

export function NewGroup() {
    const [group, setGroup] = useState('');
    const { navigate } = useNavigation();

    const handleNew = () => {
        navigate("players", { group });
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

                <Input placeholder="Nome da turma" onChangeText={setGroup}/>

                <Button
                    title="Criar"
                    style={{ marginTop: 20 }}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    );
}
