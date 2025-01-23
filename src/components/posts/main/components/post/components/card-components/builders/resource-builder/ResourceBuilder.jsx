import style from './ResourceBuilder.module.css';

const ResourceBuilder = ({ resources }) => {
    if (resources) {
        return (
            <ul className={'flex-column-relative ' + style.container}>
                {resources.map((resource, index) => (
                    <li key={index} className="flex-column-relative w-100">
                        <div
                            className={
                                'flex-column-relative ' + style.resource
                            }
                        >
                            <h6>
                                <em>{resource.quantity}</em>
                                {resource.name}
                            </h6>

                            <p>{resource.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
    return null;
};

export default ResourceBuilder;
