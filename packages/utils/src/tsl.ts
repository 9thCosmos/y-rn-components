export const tslParse = () => {
    console.log('todo');
};
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    test.todo('tslParse');
}
