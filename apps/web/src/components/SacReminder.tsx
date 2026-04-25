/**
 * SAC Code Reminder Component
 * Displays the Support-A-Creator code with smart display logic and copy functionality
 */
import { useState, useEffect } from 'react';
import {
  SAC_CONFIG,
  shouldDisplaySACCode,
  trackSACView,
  dismissSACCode,
  handleSACCopy,
  getSACDisplayText,
  formatSACCode,
  type SACContext,
} from '../lib/sac';

interface SacReminderProps {
  context: SACContext;
  className?: string;
  showDismiss?: boolean;
  autoTrack?: boolean;
}

export default function SacReminder({
  context,
  className = '',
  showDismiss = true,
  autoTrack = true,
}: SacReminderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  // Check if SAC code should be displayed
  useEffect(() => {
    const shouldShow = shouldDisplaySACCode(context);
    setIsVisible(shouldShow);

    if (shouldShow && autoTrack) {
      trackSACView(context);
    }
  }, [context, autoTrack]);

  // Handle copy to clipboard
  const handleCopy = async () => {
    const result = await handleSACCopy(context);
    
    if (result.success) {
      setIsCopied(true);
      setCopyMessage(result.message);
      
      // Reset copy state after duration
      setTimeout(() => {
        setIsCopied(false);
        setCopyMessage('');
      }, SAC_CONFIG.COPY_BEHAVIOR.SUCCESS_DURATION);
    }
  };

  // Handle dismiss
  const handleDismiss = () => {
    dismissSACCode(context);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const displayText = getSACDisplayText(context);
  const formattedCode = formatSACCode();

  return (
    <div className={`sac-reminder ${className}`}>
      <div className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          {/* SAC Code Display */}
          <div className="flex-1">
            <h3 className="font-cyber text-sm text-neon-blue mb-1">
              {displayText.title}
            </h3>
            <p className="font-body text-xs text-white/70 mb-2">
              {displayText.description}
            </p>
            <div className="flex items-center gap-2">
              <code className="font-mono text-lg font-bold text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                {formattedCode}
              </code>
              <button
                onClick={handleCopy}
                disabled={isCopied}
                className={`
                  font-cyber text-xs px-4 py-1.5 rounded-lg transition-all duration-200
                  ${isCopied 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-neon-blue/20 text-neon-blue border-neon-blue/30 hover:bg-neon-blue/30'
                  }
                  border
                `}
              >
                {isCopied ? '✓ Copied!' : displayText.cta}
              </button>
            </div>
          </div>

          {/* Dismiss Button */}
          {showDismiss && (
            <button
              onClick={handleDismiss}
              className="text-white/50 hover:text-white transition-colors p-1"
              aria-label="Dismiss"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Success Message */}
        {copyMessage && (
          <div className="mt-2 text-xs font-body text-green-400">
            {copyMessage}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Compact SAC Code Button Component
 * For inline display in smaller spaces
 */
interface SacButtonProps {
  context: SACContext;
  className?: string;
  showLabel?: boolean;
}

export function SacButton({ context, className = '', showLabel = true }: SacButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const shouldShow = shouldDisplaySACCode(context);
    setIsVisible(shouldShow);
  }, [context]);

  const handleCopy = async () => {
    const result = await handleSACCopy(context);
    
    if (result.success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), SAC_CONFIG.COPY_BEHAVIOR.SUCCESS_DURATION);
    }
  };

  if (!isVisible) return null;

  const formattedCode = formatSACCode();

  return (
    <button
      onClick={handleCopy}
      disabled={isCopied}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
        ${isCopied 
          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
          : 'bg-neon-blue/20 text-neon-blue border-neon-blue/30 hover:bg-neon-blue/30'
        }
        border font-cyber text-sm ${className}
      `}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
      {showLabel && <span>{formattedCode}</span>}
      {isCopied && <span className="text-xs">✓</span>}
    </button>
  );
}
