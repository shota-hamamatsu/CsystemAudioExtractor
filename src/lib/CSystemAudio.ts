// @see https://github.com/crskycode/GARbro/blob/master/ArcFormats/Cyberworks/AudioTINK.cs
export class CSystemAudio {
    private data?: DataView;
    private offset: number = 0;

    constructor() {}

    public setData(buffer: ArrayBuffer){
        this.data = new DataView(buffer);
    }

    private readUInt32(): number | undefined {
        if(!this.data) return;
        const value = this.data.getUint32(this.offset, true);
        this.offset += 4;
        return value;
    }

    private readUInt16(): number | undefined{
        if(!this.data) return;
        const value = this.data.getUint16(this.offset, true);
        this.offset += 2;
        return value;
    }

    private readBytes(length: number): Uint8Array | undefined{
        if(!this.data) return;
        const bytes = new Uint8Array(this.data.buffer, this.offset, length);
        this.offset += length;
        return bytes;
    }

    public parse(): void {
        const signature = this.readBytes(4);
        // if (new TextDecoder().decode(signature) !== "TINK") {
        //     throw new Error("Invalid TINK file");
        // }

        const fileSize = this.readUInt32();
        const format = this.readUInt16();
        console.log(`Decode: ${new TextDecoder().decode(signature)}, File Size: ${fileSize}, Format: ${format}`);
    }
}