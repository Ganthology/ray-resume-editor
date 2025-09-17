# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands

- `npm run dev` - Start the Next.js development server at http://localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start the production server after building
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run knip` - Check for unused dependencies and exports

### Environment Setup

- Node.js 18+ required
- Uses npm as package manager
- Development server typically runs on port 3000

## Project Architecture

### Technology Stack

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** for styling with Vanilla Extract for additional styling
- **Zustand** for state management with localStorage persistence
- **@react-pdf/renderer** for PDF generation
- **AI SDK** with OpenAI integration for AI chat features
- **@dnd-kit** for drag-and-drop functionality
- **Tiptap** for rich text editing

### Module-Based Architecture

The project follows a clean architecture with domain-driven design:

```
modules/
├── chat/         # AI chat interface with context generation
├── editor/       # Resume editor with preview capabilities
├── profile/      # User profile management
├── prompt/       # AI prompt constants
└── resume/       # Core resume domain logic
    ├── data/
    │   ├── entity/     # Domain entities (ResumeData, Experience, etc.)
    │   ├── repository/ # Data access abstractions
    │   └── source/     # Data source implementations
    └── view/           # UI components and PDF rendering
```

### Key Architectural Patterns

#### State Management

- **Central Store**: `app/store/resumeStore.ts` - Zustand store with localStorage persistence
- **Domain Entities**: All resume data types defined in `modules/resume/data/entity/`
- **State Persistence**: Automatic saving to localStorage with the "resume-store" key

#### AI Integration

- **Chat API**: `app/api/chat/route.ts` - OpenAI integration with structured tools
- **Context Generation**: AI maintains conversation context and updates resume data
- **Tool System**: Uses `generateContext` and `updateResume` tools for structured data extraction

#### PDF Generation

- **Resume PDF**: `modules/resume/view/component/ResumePDF.tsx` - React-PDF based rendering
- **Styling**: `modules/resume/view/style/pdfStyles.ts` and CSS-in-JS via Vanilla Extract
- **Export**: PDF generation with customizable fonts and layout density

### Component Structure

- **Platform Components**: Reusable UI components in `platform/component/ui/`
- **Module Components**: Feature-specific components within each module's `view/component/` directory
- **Screen Components**: Top-level page components in module `view/screen/` directories

### Data Flow

1. User interactions update Zustand store via actions
2. Store automatically persists to localStorage
3. Components re-render based on store changes
4. AI chat can analyze context and update resume data
5. PDF preview updates in real-time based on store state

### Important Implementation Details

#### Resume Data Structure

- **Modular Sections**: 8 resume sections (experience, education, skills, etc.)
- **Inclusion System**: Each item has an `included` boolean for show/hide functionality
- **Drag & Drop**: All sections support reordering via @dnd-kit
- **Module System**: Sections can be enabled/disabled and reordered

#### Authentication

- Simple localStorage-based auth in `platform/auth/AuthContext.tsx`
- No backend authentication - primarily for UI state management

#### Routing Structure

```
app/
├── page.tsx           # Landing page
├── editor/page.tsx    # Main resume editor (/editor)
├── chat/page.tsx      # AI chat interface (/chat)
├── dashboard/page.tsx # User dashboard
└── billing/page.tsx   # Billing/subscription page
```

## Development Guidelines

### Adding New Resume Sections

1. Create entity in `modules/resume/data/entity/`
2. Add to `ResumeData` interface
3. Update Zustand store with actions
4. Create editor component in `modules/editor/view/component/internal/`
5. Add PDF rendering logic in `ResumePDF.tsx`

### Working with AI Features

- Chat API enforces strict resume-building focus with mandatory redirect protocol
- Tools generate comprehensive context before updating structured resume data
- All AI responses must validate input against resume/career topics first

### State Management Patterns

- Use existing Zustand actions for data updates
- Ensure `included` property is set correctly for new items
- Maintain proper ordering for drag-and-drop functionality
- Always persist changes automatically through the store

### Styling Approach

- Tailwind CSS for primary styling
- Vanilla Extract for component-specific styles requiring CSS-in-JS
- PDF styles separate from web styles due to @react-pdf/renderer constraints

### Testing AI Integration

- Requires valid OpenAI API key in `OPENAI_API_SECRET_KEY` environment variable
- Chat interface validates resume-focused conversations
- Test both context generation and resume data extraction tools

### Shadcn UI utils

- It's located at @/platform/style/utils, do not re-init shadcn ui, or create new utils file for styling
