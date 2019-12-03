import { Radio } from 'antd';

const ReportGrade: React.FC<{ defaultValue: number; onClick: (e: React.MouseEvent<HTMLInputElement>) => void }> = ({
    defaultValue,
    onClick,
}) => {
    return (
        <Radio.Group defaultValue={defaultValue} buttonStyle="solid">
            <Radio.Button checked={defaultValue === 20} value="20" onClick={onClick}>
                2
            </Radio.Button>
            <Radio.Button checked={defaultValue === 30} value="30" onClick={onClick}>
                3
            </Radio.Button>
            <Radio.Button checked={defaultValue === 35} value="35" onClick={onClick}>
                3.5
            </Radio.Button>
            <Radio.Button checked={defaultValue === 40} value="40" onClick={onClick}>
                4
            </Radio.Button>
            <Radio.Button checked={defaultValue === 45} value="45" onClick={onClick}>
                4.5
            </Radio.Button>
            <Radio.Button checked={defaultValue === 50} value="50" onClick={onClick}>
                5
            </Radio.Button>
        </Radio.Group>
    );
};

export default ReportGrade;
