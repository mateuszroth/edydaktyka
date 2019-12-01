import * as shortid from 'shortid';
import { createWriteStream } from 'fs';
import * as mkdirp from 'mkdirp';

export const uploadDir = './static/uploads';

export const ensureUploadDirExists = (): void => {
    mkdirp.sync(uploadDir);
};

export const storeUpload = async ({ stream, filename }): Promise<any> => {
    const id = shortid.generate();
    const path = `${uploadDir}/${id}-${filename}`;

    return new Promise((resolve, reject): any =>
        stream
            .pipe(createWriteStream(path))
            .on('finish', () => resolve({ id, path }))
            .on('error', reject),
    );
};
