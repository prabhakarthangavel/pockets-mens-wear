export class FileStatus {   
    file: File;
    percentage: number

    constructor(file: File, percentage: number) {
        this.file = file,
        this.percentage = percentage
    }
}