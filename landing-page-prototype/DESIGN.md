```markdown
# Design System Specification: Editorial Intelligence

## 1. Overview & Creative North Star
**Creative North Star: The Academic Curator**
This design system rejects the "SaaS dashboard" aesthetic in favor of a high-end editorial experience. It is designed to feel like a premium digital monograph—airy, authoritative, and deeply optimistic. We move beyond the "template" look by utilizing massive typographic scales, intentional asymmetry, and a rejection of traditional structural lines.

The system is built on the principle of **Atmospheric Clarity**. Instead of boxing content into rigid grids, we allow the layout to breathe, using white space as a functional element that guides the eye. Overlapping elements and "leaking" layouts create a sense of movement and organic growth, reflecting the journey of learning.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a "Pure & Punchy" philosophy. We use a base of warm neutrals to evoke fine paper, contrasted against high-chroma accents that denote action and intelligence.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Boundaries must be defined solely through background color shifts or tonal transitions.
- Use `surface` (#fcf9f6) for the primary canvas.
- Use `surface_container_low` (#f6f3f1) to define secondary content zones.
- Use `surface_container_highest` (#e5e2e0) for deep-set interactive areas.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets of fine paper. 
*   **Level 0 (Canvas):** `background` (#fcf9f6).
*   **Level 1 (Section):** `surface_container_low` (#f6f3f1).
*   **Level 2 (Inlay):** `surface_container_lowest` (#ffffff) cards.
*   **Level 3 (Interactive):** Glassmorphic overlays with `backdrop-blur: 12px`.

### The "Glass & Gradient" Rule
To elevate CTAs, use subtle linear gradients (e.g., `primary` #0058c3 to `primary_container` #0070f3) at a 135-degree angle. Floating navigation or modal headers must use semi-transparent `surface` colors with a blur effect to let the underlying content "glow" through the interface.

---

## 3. Typography
Typography is our primary architectural tool. We utilize a massive scale contrast to create an editorial hierarchy.

*   **Display (Inter):** Massive, bold headers (`display-lg`: 3.5rem) with **tight tracking (-0.04em)**. This creates a "block" of text that feels like a physical headline.
*   **Body (Inter):** Generous line height (1.6) for maximum readability.
*   **Contextual Mono:** Use for technical data or progress metrics to provide a "lab-grown" precision feel.

**Hierarchy Strategy:** 
The gap between `display-lg` and `body-md` should be jarring but intentional. If a headline is important, make it heroic. If it’s body text, make it invisible.

---

## 4. Elevation & Depth
We convey hierarchy through **Tonal Layering** rather than drop shadows.

*   **The Layering Principle:** Depth is achieved by placing a `surface_container_lowest` (#ffffff) card on a `surface_container_low` (#f6f3f1) background. This creates a "lift" that is felt, not seen.
*   **Ambient Shadows:** For floating elements (Modals/Popovers), use a shadow color tinted with the `on_surface` color at 4% opacity. 
    *   *Spec:* `0px 20px 40px rgba(28, 28, 26, 0.04)`
*   **The Ghost Border:** If a boundary is required for accessibility, use `outline_variant` (#c1c6d7) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons
*   **Primary:** `primary` (#0058c3) background, `on_primary` (#ffffff) text. Roundedness: `md` (0.75rem). Transition: 300ms ease-out.
*   **Secondary (Coral):** `secondary` (#99462a) background for high-energy student actions (e.g., "Start Exam").
*   **Tertiary:** No background. Bold `primary` text with an underline that appears on hover via a long-duration (1000ms) draw animation.

### Input Fields
*   **Style:** Minimalist. No border. Use `surface_container_highest` (#e5e2e0) as a bottom-weighted fill.
*   **Interaction:** On focus, the background shifts to `primary_fixed` (#d8e2ff) with a 1000ms transition.

### Cards & Lists
*   **Rule:** Forbid divider lines.
*   **Separation:** Use `spacing-8` (2.75rem) of vertical white space or a shift to `surface_container_low` to distinguish between list items.
*   **Interaction:** Cards should gently scale (1.02x) over 1200ms when hovered, using a "lazy" cubic-bezier curve `(0.2, 0.8, 0.2, 1)`.

### Progress "Orbs" (Custom Component)
Instead of standard progress bars, use "Orbs"—soft, blurred spheres of `tertiary_container` (#cea700) that grow in scale and saturation as a student completes modules.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical layouts. Let a headline sit 20% from the left while the body text sits 40% from the left.
*   **Do** use long-duration transitions (1200ms+) for page entries. Elements should "drift" into place.
*   **Do** embrace the "Pure White" (#ffffff) for card backgrounds to make them pop against the off-white `surface` (#fcf9f6).

### Don't
*   **Don't** use Dark Mode. This system is strictly light-themed to maintain its optimistic, academic feel.
*   **Don't** use sharp corners. Use the `md` (0.75rem) or `lg` (1rem) tokens to keep the interface feeling approachable.
*   **Don't** use standard "Grey" for text. Use `on_surface_variant` (#414754) for a softer, more sophisticated slate tone.

---

## 7. Motion & Soul
All transitions must be **Long & Gentle**. 
*   **Standard Duration:** 1000ms.
*   **Hero Duration:** 1500ms.
*   **Easing:** `cubic-bezier(0.05, 0.7, 0.1, 1.0)`. 

This creates a "liquid" feel where the UI doesn't just change—it evolves. When a user navigates, elements shouldn't pop; they should fade and slide with a sense of weight and intention.```