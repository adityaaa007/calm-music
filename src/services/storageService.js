import { Storage } from "react-native-appwrite";
import client from "./appwriteService.js";
import conf from "../conf/conf.js";

export class StorageService {
  bucket;

  constructor() {
    this.bucket = new Storage(client);
  }

  getImage({ fileId }) {
    try {
      const file = this.bucket.getFilePreview(
        conf.appwriteImagesBucketId,
        fileId
      );
      // console.log('file: '+file);
      return file;
    } catch (error) {
      console.log("getImage error: " + error);
      return false;
    }
  }

  async getAllImages() {
    try {
      const files = await this.bucket.listFiles(conf.appwriteImagesBucketId);
      // console.log('file: '+file);
      return files;
    } catch (error) {
      console.log("getAllImages error: " + error);
      return false;
    }
  }

  getAudio({ fileId }) {
    try {
      const file = this.bucket.getFileDownload(
        conf.appwriteAudioBucketId,
        fileId
      );
      // console.log('file: '+file.href);
      return file.href;
    } catch (error) {
      console.log("getAudio error: " + error);
      return false;
    }
  }

  getVideo({ fileId }) {
    try {
      const file = this.bucket.getFileDownload(
        conf.appwriteImagesBucketId,
        fileId
      );
      // console.log('file: '+file);
      return file.href;
    } catch (error) {
      console.log("getAudio error: " + error);
      return false;
    }
  }
}

const storageService = new StorageService();
export default storageService;
