import {
  UseInterceptors,
  Post,
  UploadedFile,
  Controller,
  Res,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response, Request, Express } from 'express';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = file.originalname.split(' ')[0];
          const fileExtension =
            file.originalname.split('.')[
              file.originalname.split('.').length - 1
            ];
          const newFileName =
            randomName.split('').join('-') +
            '-' +
            Date.now() +
            '.' +
            fileExtension;

          cb(null, newFileName);
        },
      }),
    }),
  )
  async uploadFileToGcs(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    console.log(file);

    const bucketName = '7sigma-interview-tony';

    const { blob, blobStream } = await this.uploadService.StorageService(file);

    blobStream.on('error', (err) => {
      console.log(err);
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      res
        .status(200)
        .send({ message: 'File uploaded successfully', url: publicUrl });
    });

    blobStream.end(req.file.buffer);
  }
}
