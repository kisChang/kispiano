export class MidiUsb {

    private static used = 0;
    private static inputs: any;
    private static outputs: any;

    public static init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!('requestMIDIAccess' in navigator)) {
                reject('暂不支持此设备！');
            } else {
                if (MidiUsb.isInit()){
                    resolve();
                }else {
                    //@ts-ignore
                    navigator.requestMIDIAccess().then((midi) => {
                        MidiUsb.inputs = Array.from(midi.inputs.values());
                        MidiUsb.outputs = Array.from(midi.outputs.values());
                        if (MidiUsb.outputs.length > 0){
                            MidiUsb.used = 0;
                        }
                        resolve();
                    });
                }
            }
        })
    }

    public static isInit(){
        if (!MidiUsb.getInputs()){
            return false;
        }else {
            return MidiUsb.getInputs().length > 0 && MidiUsb.used >= 0;
        }
    }

    public static getInputs(){
        return MidiUsb.inputs;
    }
    public static getOutputs(){
        return MidiUsb.outputs;
    }

    public static getUsedIn(){
        if (MidiUsb.isInit()){
            return MidiUsb.getInputs()[MidiUsb.used];
        }else {
            return undefined;
        }
    }
    public static getUsedOut(){
        if (MidiUsb.isInit()){
            return MidiUsb.getOutputs()[MidiUsb.used];
        }else {
            return undefined;
        }
    }


    public static midiOutOn(noteCode: number, arg: number){
        const midi: any = MidiUsb.getUsedOut();
        if (midi){
            midi.send([0x90, noteCode, arg])
        }

    }
    public static midiOutOff(noteCode: number, arg: number){
        const midi: any = MidiUsb.getUsedOut();
        if (midi){
            midi.send([0x80, noteCode, arg])
        }
    }

    private static FUNCMAP = {};
    private static idInc = 0;
    public static listenerChange(func: (midiIn: any, midiOut: any) => void): number {
        const id = MidiUsb.idInc ++;
        // @ts-ignore
        MidiUsb.FUNCMAP[id] = func;
        func(MidiUsb.getUsedIn(), MidiUsb.getUsedOut());
        return id;
    }

    public static unListenerChange(lisId: number){
        // @ts-ignore
        delete MidiUsb.FUNCMAP[lisId];
    }

}