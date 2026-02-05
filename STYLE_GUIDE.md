# BuyUnrepped Design Style Guide

## Color Palette

### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-blue` | `#39b6ff` | Primary CTAs, interactive elements, links, pill badges |
| `brand-navy` | `#1b5373` | Headers, authority text, high-emphasis copy, footer background |

### Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-gold` | `#f7c74a` | Star ratings, highlights. Use sparingly to draw attention to key details. Never use for warnings or alerts. |
| `brand-green` | `#23b666` | Confirmation and success states only (savings amounts, completed steps, checkmarks). |

### Neutrals & Backgrounds

| Token | Hex | Usage |
|-------|-----|-------|
| White | `#FFFFFF` | Card surfaces, form containers, content boxes on cream backgrounds |
| `brand-cream` | `#F8F5F0` | **Site-wide page background.** Used on ALL pages, not just the landing page. |
| Gray 100 | `#F3F4F6` | Card borders, dividers, disclaimer boxes |
| Gray 500 | `#6B7280` | Secondary body text, captions |
| Gray 700 | `#374151` | Body text on light backgrounds |

### Color Rules

- **Do not** use `brand-gold` for warning or error states. It is reserved for star ratings and positive emphasis.
- **Do not** use `brand-green` for links, buttons, or decorative elements. It signals savings/success only.
- **Do not** use raw hex values in components. Always reference Tailwind `brand-*` tokens.
- Dark backgrounds should use `brand-navy`. Pair with white or `brand-blue` text.
- On cream backgrounds, cards and form containers should be white (`bg-white`) with subtle shadow.
- **ALL pages** use `bg-brand-cream` as the page background.

---

## Page Root Wrapper

Every page must use this root wrapper pattern:

```tsx
<div className="min-h-screen bg-brand-cream font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
  <Header />
  {/* Page content */}
  <Footer />
</div>
```

Key attributes:
- `bg-brand-cream` — consistent warm background across the entire site
- `font-sans` — Inter typeface
- `text-brand-navy` — default text color
- `selection:bg-brand-blue selection:text-white` — branded text selection highlight

---

## Typography

### Font

The entire site uses **Inter** (regular weight, 400) as the single typeface. Use weight variations for hierarchy, not different font families.

| Tailwind Class | Usage |
|----------------|-------|
| `font-sans` | Default — applies site-wide via body |

### Type Scale

| Level | Classes | Usage |
|-------|---------|-------|
| Hero | `text-5xl md:text-6xl lg:text-[76px] font-bold tracking-tight` | Landing page hero only |
| H1 | `text-5xl md:text-6xl font-bold` | Page titles (inner pages) |
| H2 | `text-4xl md:text-5xl font-bold` | Major section headings |
| H3 | `text-2xl font-bold` | Card titles, subsections |
| H4 | `text-xl font-semibold` | Minor headings |
| Body | `text-lg text-gray-500` | Paragraph text |
| Small / Label | `text-sm font-bold uppercase tracking-wider` | Tags, badges, overlines |
| Caption | `text-sm text-gray-400` | Timestamps, metadata |

### Typography Rules

- Headings use `brand-navy` (`#1b5373`) for color.
- Body text uses `gray-500` or `gray-700` depending on context.
- Links use `brand-blue` with `hover:underline` or `hover:opacity-80`.
- Never use all-caps for body text. Reserve uppercase for labels and overlines.
- Use `tracking-tight` on large headings. Use `tracking-wider` on small labels.
- Do not add `font-serif` or any secondary typeface. Inter handles all roles.

---

## Spacing

### Section Spacing

| Context | Classes |
|---------|---------|
| Large sections | `py-20 md:py-24 lg:py-32` |
| Standard sections | `py-16 md:py-20` or `py-24` |
| Compact sections | `py-8 md:py-12` |

### Container

```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

For narrower content pages (privacy, terms, blog posts):
```
max-w-4xl mx-auto px-4 sm:px-6 lg:px-8
```

### Component Spacing

| Context | Classes |
|---------|---------|
| Card padding | `p-6 md:p-8` |
| Stack gap (cards) | `gap-6 md:gap-8` |
| Stack gap (text) | `space-y-4` or `space-y-6` |
| Inline gap | `gap-2` or `gap-3` |

---

## Components

### Buttons

**Primary CTA**
```
px-8 py-4 bg-brand-blue text-white font-bold rounded-full
hover:bg-cyan-700 transition-colors shadow-lg
```

**Secondary**
```
px-8 py-4 border-2 border-gray-200 text-brand-navy font-bold rounded-full
hover:border-brand-navy hover:bg-gray-50 transition-colors
```

**Text / Link**
```
text-brand-blue font-bold hover:underline
```

### SectionBadge (Pill Badge)

Reusable component (`SectionBadge.tsx`) used above every section heading on **all pages** (not just the landing page).

```
inline-block text-sm font-bold uppercase tracking-wider
text-brand-blue bg-brand-blue/10 px-4 py-1.5 rounded-full
```

**Dark background variant**: Pass `className="bg-white/20 text-white"` to override for use on gradient/navy backgrounds.

Usage:
```tsx
import SectionBadge from './components/SectionBadge';

<SectionBadge>How It Works</SectionBadge>
<SectionBadge className="bg-white/20 text-white">Get Started</SectionBadge>
```

### Cards

**Standard card (on cream background)**
```
bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow
```

Use cards sparingly. Reserve for:
- How It Works step cards
- Feature grid cards
- Pricing cards
- Testimonial card
- FAQ accordion items

### Inline List (Card-Free Pattern)

For feature lists, benefit lists, and informational items, prefer the inline icon + text pattern over cards to avoid card overuse:

```tsx
<div className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl mx-auto">
  <div className="flex items-start gap-4">
    <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Check className="w-4 h-4 text-brand-blue" />
    </div>
    <div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
</div>
```

**Negative variant** (for "what we are not" style items):
```tsx
<div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
  <X className="w-4 h-4 text-red-500" />
</div>
```

### Simple Checklist

For shorter lists without descriptions:
```tsx
<li className="flex items-start gap-3">
  <div className="w-5 h-5 mt-0.5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
    <Check className="w-3 h-3 text-brand-blue" />
  </div>
  <span className="text-gray-700 font-medium">{text}</span>
</li>
```

### Stats Bar

Centered `grid-cols-2 md:grid-cols-4` of stats. No accent line needed.

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
  <div>
    <p className="text-3xl md:text-4xl font-bold text-brand-navy">$15K+</p>
    <p className="text-sm text-gray-500 mt-1">Average Buyer Savings</p>
  </div>
</div>
```

### Testimonial Carousel

Single large white card with quotation mark SVG, quote text, 5 gold stars, avatar initials + name + location, and green savings pill. Navigation via prev/next arrow buttons and dot indicators.

State: `activeTestimonial` index cycling through testimonials array.

### FAQ Accordion

Stacked white `rounded-xl` cards with question + chevron. Expand/collapse on click.

State: `openFaq` index (`null` = all closed). Only one item open at a time.

```tsx
<div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
  <button className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
    <span className="font-bold pr-4">{question}</span>
    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
  </button>
  {open && <div className="px-5 pb-5"><p className="text-gray-500 leading-relaxed">{answer}</p></div>}
</div>
```

### Inline FAQ (No Accordion)

For simpler FAQ sections on inner pages, use the inline icon + text pattern:

```tsx
<div className="flex items-start gap-4">
  <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
    <span className="text-brand-blue font-bold text-sm">?</span>
  </div>
  <div>
    <h3 className="text-lg font-bold mb-2">{question}</h3>
    <p className="text-gray-500 leading-relaxed">{answer}</p>
  </div>
</div>
```

### Range Slider Calculator

Custom-styled `<input type="range">` with cross-browser CSS (WebKit + Firefox). Thumb is `brand-blue` circle with white border. Track is gray-200.

Three comparison cards stacked vertically:
1. White card with red "Traditional Agent" badge — shows 3% fee
2. `bg-brand-blue` card with white "BuyUnrepped" badge — shows flat fee
3. `bg-orange-50` card with green "Your Savings" badge — shows difference

### Disclaimer Box

For legal disclaimers or important notices:

```tsx
<div className="bg-gray-100 rounded-xl px-6 py-4 border border-gray-200">
  <p className="text-xs text-gray-400 leading-relaxed">
    <span className="font-bold text-gray-500">Disclaimer:</span> {text}
  </p>
</div>
```

### Badges / Tags

```
inline-block text-sm font-bold uppercase tracking-wider
text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full
```

### Success State (Inline)

```
flex items-center gap-3 px-5 py-4 bg-green-50 border border-green-200 rounded-full
```

Use only after a confirmed action (form submit, signup complete).

---

## Page Hero Pattern

Every inner page should follow a consistent hero pattern:

```tsx
<section className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
  <SectionBadge>{pageName}</SectionBadge>
  <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4">
    {title}
  </h1>
  <p className="text-xl text-gray-500">
    {subtitle}
  </p>
</section>
```

---

## Header

- 3-column flex: logo left (`flex-1`), centered nav links (`flex-none`), CTA right (`flex-1 justify-end`)
- Background: `bg-brand-cream/80 backdrop-blur-sm` — matches the site-wide cream background
- Sticky with `z-50`, `border-b border-gray-100/50`
- Logo: Next.js `<Image>` component using `/images/buyunrepped-cropped.png` with `h-14 w-auto`, `unoptimized` prop
- Nav links: `text-xs font-bold uppercase tracking-wide` with active state `text-brand-navy` and default `text-gray-500 hover:text-brand-navy`
- Mobile hamburger menu with slide-down panel (`bg-brand-cream`)

## Footer

- Background: `bg-brand-navy` (dark)
- Text colors: headings `text-white`, links `text-gray-400 hover:text-white`
- 4 link columns: Product, Resources, Company, Legal
- Social icons in `w-10 h-10 rounded-full border border-white/20` circles
- Bottom bar: copyright left, tagline right, `border-t border-white/10` divider

---

## Forms

Forms on cream backgrounds should use white containers:

```tsx
<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
  <form className="space-y-6">
    {/* fields */}
  </form>
</div>
```

**Input fields:**
```
w-full px-4 py-3 rounded-lg border border-gray-200 bg-white
focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all
```

**Submit button:**
```
w-full py-4 bg-brand-blue text-white font-bold rounded-full
hover:bg-cyan-700 transition-colors shadow-lg
```

**Hero email collection form:**
```tsx
<form className="flex flex-col sm:flex-row gap-3 max-w-xl">
  <input
    type="email"
    placeholder="Enter your email"
    className="flex-1 px-5 py-4 rounded-full border border-gray-200 bg-white text-base outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
  />
  <button className="px-8 py-4 bg-brand-blue text-white text-base font-bold rounded-full hover:bg-cyan-700 transition-all shadow-lg">
    Join Early Access
  </button>
</form>
```

---

## Borders & Dividers

| Context | Classes |
|---------|---------|
| Card border | `border border-gray-100` |
| Section divider | `border-t border-gray-100` |
| Active / Focus | `border-brand-blue` |
| Highlighted | `border-brand-gold` (sparingly) |

---

## Shadows

| Level | Classes | Usage |
|-------|---------|-------|
| Subtle | `shadow-sm` | Cards at rest on cream bg |
| Elevated | `shadow-lg` | Cards on hover, testimonial card |
| Prominent | `shadow-xl` or `shadow-2xl` | Hero mockup, modals, calculator |

---

## Hover & Transitions

All interactive elements should include smooth transitions:

```
transition-all duration-300
```

| Effect | Classes |
|--------|---------|
| Lift | `hover:-translate-y-0.5` |
| Scale | `hover:scale-[1.01]` |
| Shadow | `hover:shadow-lg` |
| Color shift | `hover:bg-cyan-700` (for brand-blue buttons) |
| Arrow nudge | `group-hover:translate-x-1` |

---

## Rounded Corners

| Context | Classes |
|---------|---------|
| Buttons | `rounded-full` |
| Cards | `rounded-2xl` |
| CTA Banner | `rounded-3xl` |
| Form containers | `rounded-3xl` |
| Inputs | `rounded-lg` (in forms) or `rounded-full` (hero email) |
| Badges | `rounded-full` |
| Images | `rounded-2xl` or `rounded-3xl` |

---

## Icons

Use **lucide-react** for all icons. Keep a consistent size per context:

| Context | Size |
|---------|------|
| Inline with text | `w-4 h-4` |
| Checklist icons | `w-3 h-3` (inside `w-5 h-5` circle) or `w-4 h-4` (inside `w-8 h-8` circle) |
| Card icons | `w-5 h-5` or `w-6 h-6` |
| Feature icons | `w-8 h-8` |
| Hero / decorative | `w-10 h-10` or larger |

Icon containers for list items:
- Small: `w-5 h-5 rounded-full bg-brand-blue/10`
- Standard: `w-8 h-8 rounded-full bg-brand-blue/10`

Icon color should match adjacent text color or use `brand-blue` for accent.

---

## Responsive Breakpoints

| Prefix | Min Width | Usage |
|--------|-----------|-------|
| (none) | 0px | Mobile-first base styles |
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets, show desktop nav |
| `lg:` | 1024px | Desktop |

### Grid Patterns

| Layout | Classes |
|--------|---------|
| 2-up | `grid grid-cols-1 md:grid-cols-2 gap-8` |
| 3-up | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` |
| 4-up | `grid grid-cols-2 md:grid-cols-4 gap-6` |
| 2-col with gap | `grid lg:grid-cols-2 gap-16 items-center` |

---

## Do / Don't

| Do | Don't |
|----|-------|
| Use `brand-cream` for ALL page backgrounds | Use `bg-white` as the page background |
| Use `brand-blue` for CTAs and links | Use green or gold for CTAs |
| Use `brand-navy` for headings | Use pure black (`#000`) for text |
| Use `brand-gold` for star ratings only | Use `brand-gold` for warnings or errors |
| Use `brand-green` for savings/success | Use `brand-green` for decorative accents |
| Keep buttons `rounded-full` | Mix rounded and square buttons |
| Use Inter for everything — vary weight | Add a second typeface or use `font-serif` |
| Reference `brand-*` Tailwind tokens | Hardcode hex values in components |
| Use SectionBadge above section headings on ALL pages | Use plain text overlines or skip badges on inner pages |
| White cards on cream backgrounds | Gray cards on cream backgrounds |
| Use inline icon + text lists for features/benefits | Wrap every list item in a card |
| Add `selection:bg-brand-blue selection:text-white` | Use default browser selection colors |
| Use `bg-white` for form containers on cream bg | Use `bg-gray-50` for form containers |
