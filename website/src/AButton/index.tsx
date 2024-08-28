import React, { FC } from 'react';

export interface AButtonProps {
    title: string;
}

export const AButton: FC<AButtonProps> = ({title}) => {
    return (
        <h4>{title}</h4>
    );
};

export default AButton;
