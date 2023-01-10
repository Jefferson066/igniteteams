import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

import { Container } from "./styles";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { groupsGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
    const [groups, setGroups] = useState<string[]>([]);

    const { navigate } = useNavigation();

    function handleNewGroup() {
        navigate("new");
    }

    async function fetchGroups() {
        try {
            const data = await groupsGetAll();
            setGroups(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenGroup = (group: string) => {
        navigate("players", { group });
    };

    useFocusEffect(
        useCallback(() => {
            fetchGroups();
        }, [])
    );

    return (
        <Container>
            <Header />
            <Highlight title="Turmas" subtitle="jogue com sua turma" />

            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <GroupCard
                        onPress={() => handleOpenGroup(item)}
                        title={item}
                    />
                )}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                ListEmptyComponent={() => (
                    <ListEmpty message="Que tal cadastrar a primeira turma?" />
                )}
            />

            <Button onPress={handleNewGroup} title="Criar nova turma" />
        </Container>
    );
}
