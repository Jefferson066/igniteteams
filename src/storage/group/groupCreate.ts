import AsyncStorage from "@react-native-async-storage/async-storage";

import { GRUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string) {
    try {
        const storedGroups = await groupsGetAll();

        if (newGroup.trim().length === 0) {
            throw new AppError("Informe o nome da turma");
        }

        const groupAlreadyExists = storedGroups.includes(newGroup.trim());

        if (groupAlreadyExists) {
            throw new AppError("Já existe uma turma cadastrada com esse nome.");
        }

        const storage = JSON.stringify([...storedGroups, newGroup]);
        await AsyncStorage.setItem(GRUP_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}
