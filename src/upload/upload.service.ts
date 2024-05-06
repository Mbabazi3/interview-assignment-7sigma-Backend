import { HttpStatus, Injectable, Res, Req } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as multer from 'multer';
import * as path from 'path';
import { Readable } from 'stream';
import { Response, Request } from 'express';
//import { Express } from 'express';

@Injectable()
export class UploadService {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    this.storage = new Storage({
      projectId: 'atomic-quasar-419101',
      credentials: {
        client_email: 'tony-913@atomic-quasar-419101.iam.gserviceaccount.com',
        private_key:
          '-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQDIDs7OhuuIy20X\nwFMmoJa9N7WSNXCyzEKyrWam6mFv50ynI4tb9OHtGZ5WCSz9JCTWXSzlhVH8Q1a6\nHgfcvyrYnRMhvy/C2aOLpAxCUIz8VP/F9Gcg98qPh4rCVGa3dYsNwq0OocOYKbnT\nJ8QXVaqZ7aeAG3O4IT6F5Cg+QXOf7Brlwd6J5/X75ku5zJl1g2A8DOcs3pVXkqdj\nfX7HRLQVdfu3N+6KoJqhThW2upkqPeCW6gciTYmJyPi5gm+Cb11nODKrXBJYqr0l\nruAFZ0vzBY+On0i6P3fjxDOanIGf6+AvwgD8r4xwLHw67RTnxwOainav85geBSZE\newUd1s+BAgMBAAECggEAEIUvhPy9fbz9t97DBw8vD3ZGnUmiMjOdpONelRVJAUyG\nhw1PfGMdFn8ddQGaOFe4HocQdm4jWmtloaYp9EvJghx7eFeRPjwKbjU4aW/9Kneq\n7On9K6rmrGJPHjPJzSfM2TCsqYcIb7vvW01e+yXQ+hfW04SA0nFVWEliXNy7C3c2\ncAunVsA4+1ei18tiLE6mEMjAF0678aO4LXNDP1rhtKSwTvRLy34kw2bjh73pA7/G\nE+28HpT2s2GC6ox5TAlTogULEKrqdKaxm0v126jiH0mLoasBtdGWRLhWRaaDqB0j\nWGEv39SqtHzZoDKRsAvVHLKOUJRovD3nktzxxad8iQKBgQD2q9sNbSXYMk+4RQCv\n/RjvmezeZeZOoaUCvaI/pKE8wN01+sqAJosecacI1gE9NxqJJFNCE6rEedz/RNfd\nbWBRMHcdQpUT6FHAF2S07jKzIDtdt9iepkLRQWxSiCVq7ygeJEEuJ5pD8AZ9BqkI\nl8rcn5VW7tIHS2tDQfNUjzbw6QKBgQDPn6ok1oKEjQ1RBBjq4uj4gO1HGkR84QaZ\nMsaqjMBsvT4ltrjze6xphFMGZB4xI3lxIrbW1Ajp+l73e9+ZX1ZESxwpi22OG57E\nO6sRYalRCdHC2uoZsVhlylPPvGyt3zhsAVHT1K9dyqeRO74LBJmkMmUhyDRG6/YA\nRywcHs+K2QKBgH1dwqsEOiOzDkk86KiJHc9Ij9ZIO9Di3paSApAN/9R8wPDaUWjo\nLfR/FsGq4l5WTyo8SARhMn1A4kzqlDt5h2Y8F43LdTD09feG7Cv4k9PuIb3z3ihj\nn7nyYjdf8oRyoBURn/7xKbo1l1abt/UiEHworyHLpvsGHbHFJwJm9ylhAn9/VGwE\nK4nfwKFqDhk58+7seCUMdg+KhnaFfZ5Y+fkItwZmGqlSqYYTMBO616usdxUDTUbU\neTT+SY30OQPoC4/cUjPzRo7pmAbGUdGX10z/ZgY+egMXvqt3wZ2kyOnduAfiNOz5\n/HWQD7i0WO8z0p5nFIDxNtbYp902Tm++zyZ5AoGAUwYKboZxr9IEYH0b15xOltNO\nS4GTm5j+TFBRPLTeW31G6oN8/YFWTo5e7wqFKmN3S46LYzYgT/qNFyx8NutqQatW\nA9RLa/97DmrSV4q+zDqynZ1qLdMAc0rci+s69mXebLoc1fZDgbziiWIaghZBaSUF\no4mxb8DOpVS85cXJ48U=\n-----END PRIVATE KEY-----\n',
      },
      keyFilename: 'atomic-quasar-419101-96ed642f551e.json',
    });
    this.bucketName = '7sigma-interview-tony';
  }

  async StorageService(file: Express.Multer.File) {
    if (!file) {
      throw new Error('File or file buffer is missing');
    }

    const bucket = this.storage.bucket(this.bucketName);

    const blob = bucket.file(file.originalname);

    const blobStream = blob.createWriteStream({
      resumable: false,
      public: false,
      contentType: file.mimetype,
    });

    return { blob, blobStream };
  }
}
