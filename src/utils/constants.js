export const DEFAULT_POST = {
    title: '',
    description: '',
    instructions: '',
    default_image_index: 1,
    harmful_post: false,
    tags: null,
    harmful_tool_categories: [],
    harmful_material_categories: [],
    tools: [
        // Example:
        /* {
            quantity: '',
            name: '',
            description: '',
        }, */
    ],
    materials: [
        // Example:
        /* {
            quantity: '',
            name: '',
            description: '',
        }, */
    ],
    image: null,
};

/**
 * This is a backend error code/identifier that identifies
 * non-field errors
 */
export const NON_FIELD_ERRORS_STRING = 'non_field_errors';

export const ACCESS_TOKEN_LIFETIME = 15; // Minutes

export const VALIDATION_RULES = {
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 150,
        REGEX: /^[\w.@+-]+$/, // Unicode regex pattern
    },
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 128,
    },
    IMAGE: {
        VALID_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp'],
    },
    BIRTH_DATE: {
        MINIMUM_AGE: 13,
    },
    AGE_RESTRICTED_CONTENT_AGE: 16,
};

export const HARMFUL_TOOL_CATEGORIES = [
    {
        category: 'Sharp or Cutting Tools',
        examples: ['Knives', 'Blades', 'Scissors'],
    },
    {
        category: 'Fire-Producing Tools',
        examples: ['Lighters', 'Matches', 'Flammable Equipment'],
    },
    { category: 'Power Tools', examples: ['Drills', 'Saws', 'Grinders'] },
    {
        category: 'Electronics and High-Voltage Equipment',
        examples: ['Batteries', 'Electric Devices', 'Exposed Wiring'],
    },
    {
        category: 'Weapons or Weapon-Like Tools',
        examples: ['Firearms', 'Ammunition', 'Martial Arts Weapons'],
    },
    {
        category: 'Small or Choking Hazards',
        examples: ['Small Parts', 'Beads and Marbles'],
    },
    {
        category: 'Construction or Heavy-Duty Tools',
        examples: [
            'Hammers and Mallets',
            'Wrenches and Pliers',
            'Crowbars and Pry Bars',
        ],
    },
    {
        category: 'Outdoor or Gardening Tools',
        examples: [
            'Pruners and Shears',
            'Lawn Equipment',
            'Axes and Hatchets',
        ],
    },
    {
        category: 'Medical or Household Equipment',
        examples: ['Needles', 'Thermometers', 'Blades or Scalpels'],
    },
    {
        category: 'Digital Tools and Software',
        examples: [
            'Hacking Tools',
            'Age-Inappropriate Platforms',
            'Tracking Tools',
        ],
    },
    {
        category: 'Miscellaneous',
        examples: ['Ropes and Chains', 'Magnets', 'Heavy Objects'],
    },
];

export const HARMFUL_MATERIAL_CATEGORIES = [
    {
        category: 'Chemical Substances',
        examples: [
            'Bleach',
            'Ammonia',
            'Paint Thinners',
            'Cleaning Agents',
            'Paints and Solvents',
            'Pesticides',
        ],
    },
    {
        category: 'Flammable Materials',
        examples: ['Gasoline', 'Kerosene', 'Alcohol'],
    },
    {
        category: 'Toxic Substances',
        examples: ['Pesticides', 'Rat Poison', 'Lead Paint'],
    },
    {
        category: 'Explosive Materials',
        examples: ['Fireworks', 'Gunpowder', 'Aerosol Cans'],
    },
    {
        category: 'Corrosive Materials',
        examples: ['Acids', 'Lye', 'Battery Fluid'],
    },
    {
        category: 'Radioactive Materials',
        examples: ['Uranium', 'Radium', 'Plutonium'],
    },
    {
        category: 'Biological Hazards',
        examples: ['Mold Spores', 'Medical Waste', 'Animal Feces'],
    },
    {
        category: 'Choking Hazards',
        examples: ['Small Beads', 'Marbles', 'Small Magnets'],
    },
    {
        category: 'Sharp Materials',
        examples: ['Broken Glass', 'Metal Shards', 'Splintered Wood'],
    },
    {
        category: 'Fibrous Materials',
        examples: ['Asbestos', 'Fiberglass', 'Rock Wool'],
    },
    { category: 'Heavy Metals', examples: ['Mercury', 'Cadmium', 'Arsenic'] },
    {
        category: 'Powdered Materials',
        examples: [
            'Flour (explosive in dust form)',
            'Talcum Powder',
            'Cement Powder',
        ],
    },
];
