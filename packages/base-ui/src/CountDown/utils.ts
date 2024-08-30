import { FormatType } from './CountDown';

export function formatTime(seconds: number, format: FormatType): string {
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedHours: string = String(hours).padStart(2, '0');
    const formattedMinutes: string = String(minutes).padStart(2, '0');
    const formattedSeconds: string = String(remainingSeconds).padStart(2, '0');
    switch (format) {
        case 'hh:mm':
            return `${formattedHours}:${formattedMinutes}`;
        case 'mm:ss':
            return `${formattedMinutes}:${formattedSeconds}`;
        case 'ss':
            return `${formattedSeconds}`;
        default:
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
}
