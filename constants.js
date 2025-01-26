/**
 * All path aliases to models and their relative path. This acts as a
 * 'single source of truth' and is referenced and used by by both Vite
 * and Jest.
 *
 * Format: {customName, relativePath}
 */
export const PATH_ALIASES = {
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
    'border-separator':
        './src/components/separators/border-separator/BorderSeparator',
    debug: './src/utils/log',
    'basic-button': './src/components/buttons/basic-button/BasicButton',
    authentication: './src/functions/authentication',
    'default-avatar-image': './src/assets/images/user/default-avatar.webp',
    'use-simulate-loading': './src/hooks/effects/useSimulateLoading',
    'app-close-button':
        './src/components/buttons/app-close-button/AppCloseButton',
    'app-close-button-context':
        './src/context/app-close-button/AppCloseButtonContext',
    'app-close-button-provider':
        './src/context/app-close-button/AppCloseButtonProvider',
    'use-api': './src/hooks/api/useAPI',
    'use-neutralize-app': './src/hooks/misc/useNeutralizeApp',
    'alert-context': './src/context/alert-context/AlertContext',
    'post-provider': './src/context/post/PostProvider',
    'post-context': './src/context/post/PostContext',

    // Images
    images: './src/assets/images',

    // Cards and card components
    c: './src/components/posts/main/components/post/components/cards/cards/',
    'c-c':
        './src/components/posts/main/components/post/components/' +
        'card-components/',
};
