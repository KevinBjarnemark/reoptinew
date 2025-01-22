const Title = ({ title, focused }) => {
    const titleStyle = focused ? { fontSize: '150%' } : {};
    return <h6 style={{ ...titleStyle }}>{title}</h6>;
};

export default Title;
