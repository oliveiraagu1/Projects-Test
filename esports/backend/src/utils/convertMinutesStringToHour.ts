// 1080 -> 18:00

export function convertMinutesStringToHour(minuteAmount: number){

    const hours = Math.floor(minuteAmount / 60);
    const minutes = minuteAmount % 60;

    return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2, '0')}`
}