import AsyncStorage from "@react-native-async-storage/async-storage";

import { GRUP_COLLECTION } from "@storage/storageConfig";

export async function groupsGetAll() {
    try {
        const storage = await AsyncStorage.getItem(GRUP_COLLECTION);

        const groups: string[] = storage ? JSON.parse(storage) : [];

        return groups;
    } catch (error) {
        throw error;
    }
}
