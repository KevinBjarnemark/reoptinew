import style from './PageSection.module.css';

/**
 * A reusable component for creating styled sections with a title and
 * child content.
 *
 * @param {object} props The properties passed to the component.
 * @param {string} props.title The title displayed at the top of the section.
 * @param {React.ReactNode} props.children The child elements to be rendered
 * within the section.
 * @returns {JSX.Element} A styled section element with a title and content.
 */
const PageSection = (props) => {
    const { title = '', children } = props;

    return (
        <section
            className="flex-column-relative align-items-center w-100 pt-4"
            style={{
                backgroundColor: 'var(--color-dark-background)',
                padding: '1% 0',
            }}
        >
            <div
                className="flex-column-relative align-items-center"
                style={{
                    width: '94%',
                    backgroundColor: 'var(--color-gray-component-background)',
                    borderRadius: '15px',
                }}
            >
                {title ? (
                    <h5 className={`${style['title']} mt-3`}>{title}</h5>
                ) : null}
                {children}
            </div>
        </section>
    );
};

export default PageSection;
