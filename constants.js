/**
 * All path aliases to models and their relative path. This acts as a
 * 'single source of truth' and is referenced and used by by both Vite
 * and Jest.
 *
 * Format: {customName, relativePath}
 */
export const PATH_ALIASES = {
    // Constants
    constants: './src/utils/constants',
    // Contexts and providers
    'app-loading-context':
        './src/context/loading/app-loading/AppLoadingContext',
    'app-loading-provider':
        './src/context/loading/app-loading/AppLoadingProvider',
    'general-loading-context':
        './src/context/loading/general-loading/GeneralLoadingContext',
    'general-loading-provider':
        './src/context/loading/general-loading/GeneralLoadingProvider',
    'notification-provider': './src/context/notification/NotificationProvider',
    'notification-context': './src/context/notification/NotificationContext',
    'app-close-button-context':
        './src/context/app-close-button/AppCloseButtonContext',
    'app-close-button-provider':
        './src/context/app-close-button/AppCloseButtonProvider',
    'alert-context': './src/context/alert-context/AlertContext',
    'post-provider': './src/context/posts/post/PostProvider',
    'post-context': './src/context/posts/post/PostContext',
    'edited-post-provider':
        './src/context/posts/edited-post/EditedPostProvider',
    'edited-post-context': './src/context/posts/edited-post/EditedPostContext',
    'screen-context': './src/context/screen-context/ScreenContext',
    'screen-provider': './src/context/screen-context/ScreenProvider',
    // Components
    'border-separator':
        './src/components/separators/border-separator/BorderSeparator',
    'app-close-button':
        './src/components/buttons/app-close-button/AppCloseButton',
    'triangle-button':
        './src/components/buttons/triangle-button/TriangleButton',
    'faded-background-shadow':
        './src/components/backgrounds/faded-background-shadow/' +
        'FadedBackgroundShadow',
    // Cards and card components
    c: './src/components/posts/main/components/post/components/cards/cards/',
    'c-c':
        './src/components/posts/main/components/post/components/' +
        'card-components/',
    // Checkbox builder folder
    'c-builder':
        './src/components/posts/main/components/post/components/' +
        'card-components/builders/checkbox-builder/',
    // Functions
    debug: './src/utils/log',
    'basic-button': './src/components/buttons/basic-button/BasicButton',
    authentication: './src/functions/authentication',
    helpers: './src/utils/helpers',
    // Images
    images: './src/assets/images',
    'default-avatar-image': './src/assets/images/user/default-avatar.webp',
    // Custom hooks
    'use-simulate-loading': './src/hooks/effects/useSimulateLoading',
    'use-api': './src/hooks/api/useAPI',
    'use-neutralize-app': './src/hooks/misc/useNeutralizeApp',
};
