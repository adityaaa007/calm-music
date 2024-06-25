import client from "./appwriteService";
import conf from "../conf/conf";
import { Databases } from "react-native-appwrite";

export class DatabaseService {
  databases;

  constructor() {
    this.databases = new Databases(client);
  }

  async getGenres() {
    try {
      const genres = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );

      return genres.documents;
    } catch (error) {
      console.log("getGenres error: " + error);
      return false;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
