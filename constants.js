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
    useSimulateLoading: './src/hooks/effects/useSimulateLoading',
};
