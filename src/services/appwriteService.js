import { Client } from "react-native-appwrite";
import conf from "../conf/conf.js";

const client = new Client();

client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId)
  .setPlatform(conf.appwritePlatform);

export default client;
