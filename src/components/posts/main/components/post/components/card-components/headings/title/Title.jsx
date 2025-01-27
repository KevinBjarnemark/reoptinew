const Title = ({ title, standalone }) => {
    const titleStyle = standalone ? { fontSize: '150%' } : {};
    return <h6 style={{ ...titleStyle }}>{title}</h6>;
};

export default Title;
