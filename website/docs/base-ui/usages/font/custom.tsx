import { Font } from '@quec/panel-base-ui';
import React, { useState } from 'react';

export default () => {
    const [num, setNum] = useState(0);
    return (
        <Font
            onPress={() => setNum(num + 1)}
            style={{
                color: 'orange',
                lineHeight: 50,
                fontWeight: '900',
                borderStyle: 'dashed',
                padding: 10,
                borderRadius: 10,
                borderColor: 'currentColor',
                borderWidth: 1,
            }}
        >
            你好，{num.toString()}
        </Font>
    );
};
