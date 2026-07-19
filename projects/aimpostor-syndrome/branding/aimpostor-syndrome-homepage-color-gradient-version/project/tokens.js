/**
 * AImpostor Syndrome — design tokens (Gradient direction)
 * Shared across the homepage and the episode template so both inherit one system.
 * Import in a DC logic class:  const { color, font, space } = await import('./tokens.js');
 * Spelling note: it's "impostor" (with an o). Canonical everywhere.
 */

export const color = {
  // Brand — gradient is load-bearing; use it only for hero moments.
  coral:   '#FF6B5E',
  magenta: '#E0559B',
  violet:  '#8B5CF6', // also the solid UI accent
  // Neutrals
  ink:     '#0D1017', // dark ground
  surface: '#14181F', // raised dark surface / body text on light
  slate:   '#8A93A6', // muted labels, secondary text
  paper:   '#F7F6F2', // light ground
  white:   '#FFFFFF',
};

/** The one true brand gradient. Always 135°, coral → magenta → violet, never reversed. */
export const gradient = 'linear-gradient(135deg, #FF6B5E 0%, #E0559B 52%, #8B5CF6 100%)';

export const font = {
  display: "'Space Grotesk', sans-serif", // display + UI: 400/500/600/700
  mono:    "'JetBrains Mono', monospace",  // code + labels: 400/500/700
  // type scale (px / weight)
  scale: {
    display: { size: 62, weight: 600, tracking: '-0.03em' },
    h1:      { size: 40, weight: 600, tracking: '-0.02em' },
    h2:      { size: 28, weight: 600, tracking: '-0.01em' },
    body:    { size: 17, line: 1.6 },
    label:   { size: 12, weight: 700, tracking: '0.18em', upper: true }, // mono
    code:    { size: 14 }, // mono
  },
};

/** 4px base spacing scale. */
export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40, xxl: 64, xxxl: 100 };

export const radius = { pill: 999, avatar: 34, card: 16, button: 10 };

/** Gradient rules — the whole point of this direction.
 *  Use the gradient ONLY for: the mark, the primary button, the "AI" in a hero
 *  headline, one signature accent per screen. Everything else is solid violet or ink.
 *  Never more than one gradient element per viewport. */
export const rules = {
  gradientPerViewport: 1,
  gradientReservedFor: ['mark', 'primary-button', 'hero-AI', 'one-signature-accent'],
};

export default { color, gradient, font, space, radius, rules };
