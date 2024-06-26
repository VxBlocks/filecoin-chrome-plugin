import React, { useState } from 'react';
import { Input, Tooltip } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';

interface NumericInputProps {
    style: React.CSSProperties;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

export default function NumericInput(props: NumericInputProps) {
    const { value, onChange, placeholder } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };

    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };

    const title = value ? (
        <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
    ) : (
        'Input a number'
    );

    return (
        <Input
            {...props}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            maxLength={16}
            size="large" suffix={<CaretLeftOutlined />}
        />
    );
};

