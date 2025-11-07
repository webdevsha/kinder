# Pelita Adaptive Reading Platform - Design Guidelines

## Design Approach

**Selected Framework:** Design System Approach (Material Design + Notion influences)

**Rationale:** Educational platform requiring clear information hierarchy, reading comfort, and professional polish for Year 5+ students, teachers, and parents. Sophistication over childishness is critical.

**Key Principles:**
- Clean, distraction-free reading experience
- Clear visual hierarchy for multi-level content
- Professional interface that respects young learners' maturity
- Organized library and dashboard layouts
- Comfortable long-form reading typography

---

## Typography System

**Font Stack (Google Fonts):**
- Primary: Inter (UI, navigation, buttons, labels)
- Reading: Literata or Lora (article body text - optimized for screen reading)

**Type Scale:**
- Headings: 2xl (30px), xl (24px), lg (20px)
- Body: base (16px) for reading content, sm (14px) for UI elements
- Labels: xs (12px) for metadata, tags
- Line height: 1.6 for body text (reading comfort), 1.4 for headings

**Weights:**
- Regular (400): Body text
- Medium (500): Subheadings, buttons
- Semibold (600): Section headings, active states
- Bold (700): Page titles, emphasis

---

## Layout System

**Spacing Primitives (Tailwind):**
- Primary spacing units: **2, 3, 4, 6, 8, 12, 16**
- Common patterns: p-4, p-6, p-8 for cards/containers
- Gap spacing: gap-4, gap-6 for grids
- Section margins: mb-8, mb-12, mb-16

**Layout Patterns:**
- Article reader: max-w-3xl centered (optimal reading width ~65-75 characters)
- Dashboard/Library: max-w-7xl with grid layouts
- Sidebar navigation: Fixed 240px (w-60) for teacher/parent views
- Cards: rounded-lg (8px), shadow-sm with consistent padding-6

---

## Component Library

### Navigation
- **Main Header:** Horizontal nav with logo left, user menu right, fixed positioning
- **Dashboard Sidebar:** Vertical nav for teachers/parents (Library, Students, Analytics)
- **Level Switcher:** Pill-style toggle showing reading levels (e.g., "Level 1" through "Level 5")

### Reading Interface
- **Article Header:** Title (text-2xl), byline, reading level badge, word count
- **Text Container:** Clean, wide margins, generous line spacing
- **Annotation Tools:** Floating toolbar (highlight, note) appearing on text selection
- **Progress Indicator:** Subtle reading progress bar at top

### Content Cards
- **Article Card:** Thumbnail (if available), title, excerpt (2 lines), metadata row (level, topic, date), rounded corners
- **Grid Layout:** 3-column on desktop (grid-cols-3), 2-column tablet, single mobile

### Interactive Elements
- **Quiz Questions:** Card-based with radio buttons, clear answer states (correct/incorrect feedback)
- **Write Prompt:** Full-width text editor with formatting toolbar, character count
- **Buttons:** Primary (solid), Secondary (outline), sizes: base (px-4 py-2), large (px-6 py-3)
- **Level Badges:** Rounded-full pills with subtle backgrounds

### Forms
- **Text Input (URL/Article Paste):** Large textarea with placeholder, max-height with scroll
- **Input Fields:** Consistent height (h-10), rounded borders, focus states with ring

### Feedback States
- **Loading:** Skeleton screens for article processing
- **Success:** Checkmark icons with brief messages
- **Error:** Inline validation messages below fields

---

## Images

**Hero Section:**
- **Primary Landing:** Large hero image (h-96 on desktop) featuring diverse Malaysian students reading/learning together
- Image description: Bright, engaging photo of Year 5+ students collaborating over reading materials, warm natural lighting
- Text overlay: Blurred-background buttons (backdrop-blur-sm) with semi-transparent backing

**Library/Article Thumbnails:**
- Placeholder images for articles (16:9 ratio, h-48)
- Generic reading/education themed illustrations when no specific image available
- Optional: Topic-based illustrations (news, science, culture)

**Dashboard:**
- Empty states: Simple illustrations for "No articles yet" states
- Achievement badges: Small icons for student progress (if implementing gamification)

---

## Layout Structure

### Landing Page (Marketing)
1. Hero with image background + CTA
2. Features grid (3 columns: Text Leveling, Quizzes, Writing)
3. How It Works (3-step process)
4. Target Audience (Students, Teachers, Parents - 3 cards)
5. CTA section

### Student Reading View
- Clean, centered article (max-w-3xl)
- Sticky header with level switcher
- Floating annotation toolbar
- Bottom: Next article suggestion

### Library/Dashboard
- Sidebar navigation (teachers/parents)
- Header with search/filter
- Article grid (3 columns)
- Pagination at bottom

### Quiz Interface
- Question counter (1 of 5)
- Large question text
- Answer options (full-width cards)
- Submit button, next question flow

### Write Interface
- Prompt display (top)
- Rich text editor (full-width, min-h-64)
- Toolbar: Bold, italic, bullet list, numbered list
- Character count, save draft button

---

## Key Differentiators

**Sophistication for Year 5+:**
- Avoid primary colors and cartoon aesthetics
- Use refined pastel palette (specified separately)
- Professional typography that respects reader maturity
- Clean, modern interface patterns

**Reading Optimization:**
- Generous whitespace around text
- Optimal line length (max-w-3xl = ~750px)
- Comfortable line height (1.6-1.8)
- Clear reading level differentiation without condescension

**Multi-User Support:**
- Clear role distinction (student vs. teacher/parent views)
- Dashboard for assignment and progress tracking
- Library organization with filtering by level, topic, date