const Centered: React.FC<{}> = ({ children }) => {
    return (
        <div
            style={{
                width: '100%',
                margin: '0 auto',
                textAlign: 'center',
            }}
        >
            {children}
        </div>
    );
};

export default Centered;
