import chroma from 'chroma-js';
import { it } from 'vitest';

it('should work', () => {
    // expect(chroma.valid('red')).toBe(true);
    console.log(chroma('#0091ff').darken(0.16).hex());
    console.log(chroma.mix('#0091ff', '#000', 0.16, 'rgb').hex());
    // expect(chroma.mix('#0091ff', chroma('#000').alpha(0.16).hex(), 0.5, 'rgb').hex()).toBe('#007ad6');
});
