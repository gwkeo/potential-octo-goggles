declare global {
    interface Window {
      Telegram: {
        WebApp: {
          MainButton: {
            show: () => void;
            hide: () => void;
            setText: (text: string) => void;
            onClick: (callback: () => void) => void;
          };
          initDataUnsafe: {
            user?: {
              id: number;
              first_name: string;
              last_name?: string;
              username?: string;
              language_code?: string;
            };
          };
          themeParams: Record<string, string>;
          close: () => void;
          ready: () => void;
          onEvent: (event: string, callback: () => void) => void;
        };
      };
    }
  }
  
  export {};
  