export const trackSACCodeCopy = (context: string): void => {
  // Track copy event
  (window as any).gtag?.('event', 'sac_code_copy', {
    context: context,
    timestamp: Date.now()
  });
};

export const trackSACCodeDismiss = (context: string): void => {
  // Track dismiss event
  (window as any).gtag?.('event', 'sac_code_dismiss', {
    context: context,
    timestamp: Date.now()
  });
};

export const trackSACCodeConversion = (context: string): void => {
  // Track conversion event
  (window as any).gtag?.('event', 'sac_code_conversion', {
    context: context,
    timestamp: Date.now()
  });
};

export const trackSACCodeView = (context: string): void => {
  // Track view event
  (window as any).gtag?.('event', 'sac_code_view', {
    context: context,
    timestamp: Date.now()
  });
};
