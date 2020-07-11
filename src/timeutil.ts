

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