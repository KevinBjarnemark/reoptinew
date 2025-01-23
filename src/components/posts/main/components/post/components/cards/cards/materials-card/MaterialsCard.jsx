import style from './MaterialsCard.module.css';
import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '../../../card-components/headings/title/Title';
import Subtitle from '../../../card-components/headings/subtitle/Subtitle';

const MappedMaterials = ({ materials }) => {
    return (
        <ul className={`flex-column-relative ${style['materials']}`}>
            {materials.map((material, index) => (
                <li key={index} className="flex-column-relative w-100">
                    <div
                        className={`flex-column-relative ${style['material']}`}
                    >
                        <h6>
                            <em>{material.quantity}</em>
                            {material.name}
                        </h6>

                        <p>{material.description}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

const MaterialsCard = ({ post, focused }) => {
    const mockedMaterials = [
        {
            quantity: '10',
            name: 'Wooden boards',
            description: 'Any wood type will do.',
        },
        {
            quantity: 'A couple of',
            name: 'Nails',
            description: 'Stainless 2 inches',
        },
    ];

    return (
        <div
            className={
                `flex-column-absolute ${sharedStyles.post} ` +
                sharedStyles['card-padding']
            }
        >
            <Title title={post.title} focused={focused} />
            <Subtitle subtitle="Materials" />
            <MappedMaterials materials={mockedMaterials} />
        </div>
    );
};

export default MaterialsCard;
