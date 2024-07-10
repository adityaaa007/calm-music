import conf from "../conf/conf.js";
import client from "./appwriteService.js";
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
