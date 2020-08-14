import { countReset } from "console";


export function toTimeString(seconds: number) {
    const hour = Math.floor(seconds / 60);
    seconds = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minutes.toString().padStart(2, '0');
    const secondStr = seconds.toString().padStart(2, '0');
    return `${hourStr}:${minuteStr}:${secondStr}`;
}


export function groupCountsByTime(times: number[], timeSize: number) : number[] {
    const counts = [];
    let currentMax = 0;
    for(const time of times) {
        while(currentMax < time) {
            counts.push(0);
            currentMax += timeSize;
        }
        const lastIndex = counts.length - 1;
        counts[lastIndex]++;
    }
    return counts;
}