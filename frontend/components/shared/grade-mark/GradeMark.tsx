import { Tag } from "antd";

export function getReadableGrade(grade): string {
    return parseFloat(String(Number(grade) / 10)).toFixed(1);
}

const GradeMark: React.FC<{ grade: number, gradedOn?: Date }> = ({ grade, gradedOn }) => {
    return (
        <>
            <Tag color={grade === 20 ? 'red' : 'green'}>{getReadableGrade(grade)}</Tag>
            {gradedOn && `(${new Date(gradedOn).toLocaleDateString()})`}
        </>
    );
}

export default GradeMark;