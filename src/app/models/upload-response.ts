export class UploadResponse {
    public id: number;
    public name: string;
    public hash: string;
    public sha256: string;
    public ext: string;
    public mime: string;
    public size: number;
    public url: string;
    public provider: string;
    public related: Array<string>;
}
