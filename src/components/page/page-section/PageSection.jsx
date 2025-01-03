import style from './PageSection.module.css';

/**
 * A reusable component for creating styled sections with a title and child content.
 *
 * @param {object} props The properties passed to the component.
 * @param {string} props.title The title displayed at the top of the section.
 * @param {React.ReactNode} props.children The child elements to be rendered within the section.
 * @returns {JSX.Element} A styled section element with a title and content.
 */
const PageSection = (props) => {
    const {
        title = "",
        children
    } = props;

    return (
        <section 
            className="flex-column-relative align-items-center"
            style={{
                backgroundColor: "var(--color-dark-background)",
                width: "80%",
                padding: "1% 0",
            }}
        >
        <div 
            className="flex-column-relative w-75 align-items-center" 
            style={{
                backgroundColor: "var(--color-gray-component-background)",
                borderRadius: "15px",
            }}
        >
            <h5 className={`${style["title"]} mt-3`}>{title}</h5>
            {children}
        </div>
    </section>
  );
}

export default PageSection