import { Slider as SliderBase, SliderProps } from './Slider';
import { SliderDouble, SliderDoubleProps } from './SliderDouble';

export const Slider = Object.assign(SliderBase, {
    Double: SliderDouble,
});

export type { SliderProps, SliderDoubleProps };
