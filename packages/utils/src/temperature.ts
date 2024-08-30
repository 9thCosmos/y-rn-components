export const fahrenheitToCelsius = (fahrenheit: number): number => {
    return ((fahrenheit - 32) * 5) / 9;
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test.todo('fahrenheitToCelsius');
}

export const celsiusToFahrenheit = (celsius: number): number => {
    return (celsius * 9) / 5 + 32;
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test.todo('celsiusToFahrenheit');
}
