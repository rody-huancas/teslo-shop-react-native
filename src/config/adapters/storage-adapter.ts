import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageAdapter {
  static async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  static async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
      throw new Error(`Error al ahorrar la llave: ${key}`);
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar la llave: ${key}`);
    }
  }
}
