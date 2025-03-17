export class CSystemAudio {
    private data: DataView;
    private offset: number = 0;

    constructor(buffer: ArrayBuffer) {
        this.data = new DataView(buffer);
    }

    private readUInt32(): number {
        const value = this.data.getUint32(this.offset, true);
        this.offset += 4;
        return value;
    }

    private readUInt16(): number {
        const value = this.data.getUint16(this.offset, true);
        this.offset += 2;
        return value;
    }

    private readBytes(length: number): Uint8Array {
        const bytes = new Uint8Array(this.data.buffer, this.offset, length);
        this.offset += length;
        return bytes;
    }

    public parse(): void {
        const signature = this.readBytes(4);
        if (new TextDecoder().decode(signature) !== "TINK") {
            throw new Error("Invalid TINK file");
        }

        const fileSize = this.readUInt32();
        const format = this.readUInt16();
        console.log(`File Size: ${fileSize}, Format: ${format}`);
    }
}