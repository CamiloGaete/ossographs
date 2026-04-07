# Ossographic Design System

## Brand

- **Name:** Ossographic
- **Industry:** Signage, printing, advertising (Santiago, Chile)
- **Language:** Spanish (es-CL)
- **Tone:** Professional, craftsmanship-forward, direct

## Colors

### Primary
- `--green-primary: #7AB648` — Main brand green
- `--green-secondary: #8DC63F` — Lighter accent
- `--green-hover: #6CA23F` — Interactive hover state
- `--green-dark: #4A8A2A` — Gradient endpoint, depth
- `--green-tint: #E8F5D9` — Badges, light backgrounds
- `--green-glow: rgba(122, 182, 72, 0.3)` — Box shadow glow

### Neutrals
- `--dark: #1A1A1A` — Primary dark background
- `--near-black: #242424` — Card surfaces on dark
- `--charcoal: #2D2D2D` — Secondary dark
- `--white: #FFFFFF`
- `--off-white: #FAFAFA` — Alternating section backgrounds
- `--light-gray: #F3F4F6` — Input backgrounds, placeholders
- `--medium-gray: #9CA3AF` — Secondary text
- `--border-gray: #D1D5DB` — Borders, dividers

### Accent
- `#FBBF24` — Star ratings (gold)

## Typography

### Fonts
- **Headings:** Montserrat (500, 700, 900)
- **Body:** Inter (400, 500, 600, 700)

### Scale
- Hero headline: 64px / 900 / 1.1 line-height
- Section title: 36px / 700
- Section tag: 12-13px / 600 / letter-spacing 3px / uppercase
- Body: 16px / 400 / 28px line-height
- Small: 13-14px / 500
- Badge: 11px / 600

## Spacing

- Section padding: 100px vertical, 80px horizontal (desktop)
- Section padding: 48px vertical, 24px horizontal (tablet/mobile)
- Card gap: 20-24px
- Inner content gap: 16-28px
- Component gap: 12-16px

## Radii

- `--radius-sm: 8px` — Buttons, inputs
- `--radius-md: 12px` — Cards, icons
- `--radius-lg: 16px` — Large cards, gallery
- `--radius-xl: 24px` — Hero visual, feature images

## Shadows

- `--shadow-sm: 0 1px 3px rgba(0,0,0,0.08)`
- `--shadow-md: 0 4px 12px rgba(0,0,0,0.1)`
- `--shadow-lg: 0 8px 30px rgba(0,0,0,0.12)`
- `--shadow-xl: 0 20px 50px rgba(0,0,0,0.15)`

## Patterns

### Gradients
- Primary button: `linear-gradient(135deg, #7AB648 0%, #4A8A2A 100%)`
- Text gradient (hero): `linear-gradient(135deg, #FFF 0%, rgba(255,255,255,0.85) 100%)`
- Ambient glow: `radial-gradient(ellipse, rgba(122,182,72,0.08), transparent)`

### Interactions
- Hover lift: `translateY(-2px)` with enhanced shadow
- Button press: `translateY(0)` snap-back
- Nav link underline: width 0 to 100% on hover
- Card border: transparent to `rgba(122,182,72,0.2)` on hover
- Transition easing: `ease` 0.2-0.3s, cart drawer `cubic-bezier(0.22, 1, 0.36, 1)`

### Dark sections
- Use `--dark` background with `--near-black` card surfaces
- Subtle `radial-gradient` ambient light in corners
- Border: `rgba(255,255,255,0.04-0.06)`
- Text: white headings, `--medium-gray` body

### Light sections
- Alternate between `--white` and `--off-white`
- Cards: white with `rgba(0,0,0,0.06)` border
- Green accents via tags, icons, stats

## Breakpoints

- Desktop: 1440px (max-width container)
- Tablet: 1024px
- Mobile: 640px
