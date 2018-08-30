import { Collection, BaseEntity, build } from '@caiu/core';
import { FileUpload } from '@caiu/common';
import { Store } from '@caiu/store';

import { CurrentUser } from '../../shared/models';

export class File extends BaseEntity {
    fileName = '';
    fileSize = 0;
    fileBinary: any[] = [];
    fileString = '';
    fileExtension = '';
    mimeType = '';

    static getSrcPrefix(mimeType: string): string {
        return `data:${mimeType};base64,`;
    }

    get src(): string {
        return this.mimeType && this.fileBinary ? `data:${this.mimeType};base64,${this.fileBinary}` : '';
    }

    get srcPrefix(): string {
        return `data:${this.mimeType};base64,`;
    }

    toBinary() {
        return this.mimeType && this.fileBinary ? `data:${this.mimeType};base64,${this.fileBinary}` : '';
    }
}
export class Files extends Collection<File> {

    constructor() {
        super(File);
    }
}

export function fileToBinary(f: File) {
    return f.mimeType && f.fileBinary ? `data:${f.mimeType};base64,${f.fileBinary}` : '';
}

export function mapFileUpload(upload: FileUpload, file?: File) {
    return build(File, {
        fileBinary: upload.src.replace(File.getSrcPrefix(upload.type), ''),
        fileExtension: upload.extension,
        fileName: upload.name,
        fileSize: upload.size,
        mimeType: upload.type,
        id: file ? file.id : 0
    });
}
