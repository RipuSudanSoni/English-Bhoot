# EnglishBhoot UI/UX Modernization - Full Implementation Plan

This document outlines the three-phase roadmap to transform EnglishBhoot into a modern, guidance-first language learning application.

---

## 🚀 Phase 1: Foundation & Home Screen Redesign (Week 1)
**Goal:** Establish the new 5-tab navigation and a high-engagement Home Screen.

### Proposed Changes:
1.  **Navigation (`AppNavigator.tsx`):**
    - Implement a 5-tab Bottom Bar: **Home**, **Learn**, **Explore**, **Saved**, **Profile**.
    - Use premium icons from `lucide-react-native`.
2.  **Home Screen Overhaul (`HomeScreen.tsx`):**
    - **Header**: Logo, side menu trigger, and notifications.
    - **Welcome Section**: Personalized greeting ("Hello, Ramesh!") + Level badge.
    - **Smart Search**: Prominent search bar at the top.
    - **Learning Path Card**: Progress bar + "Continue" button for the last read topic.
    - **Quick Actions (Grid)**: 4 main shortcuts (Speak, Grammar, Daily, Quiz).
    - **Recommendations**: Vertical list of "Recommended For You" cards.
    - **Popular Tags**: Horizontal scroll of trending topics.

---

## 📂 Phase 2: Explore Tab & Content Organization (Week 2)
**Goal:** Organize the 10+ categories into a clean, searchable "Explore" center.

### Proposed Changes:
1.  **Explore Tab (`ExploreScreen.tsx`):**
    - Group existing 10 categories into 3 logical clusters:
        - **Speaking Focus**: Start Speaking, Conversation, Interview English.
        - **Knowledge Focus**: Grammar, Vocabulary, Daily English.
        - **Practice Focus**: Courses, Practice, Free Resources.
    - Use a "Card + Icon" design for each category instead of simple lists.
2.  **Category Detail Redesign:**
    - Replace complex dropdowns with clean tabs and easy-to-read topic cards.

---

## 🧠 Phase 3: Smart Features & Personalization (Week 3)
**Goal:** Add progress tracking, persistence, and advanced discovery.

### Proposed Changes:
1.  **Progress Tracking:**
    - Integrate `AsyncStorage` to track completed topics and reading progress.
    - Display real progress percentages on the Home Screen.
2.  **Saved & Bookmarks:**
    - Build the `SavedScreen.tsx` to show bookmarked lessons and "Recently Viewed" items.
3.  **Search Optimization:**
    - Enhance search with category filters and "Recent Searches" memory.
4.  **Profile Section:**
    - User achievements, daily streaks, and basic settings.

---

## Verification Plan

### Manual Verification
- **Phase 1**: Verify tab switching and visual layout of the new Home Screen on Android.
- **Phase 2**: Ensure all 10 categories are accessible and correctly grouped in the Explore tab.
- **Phase 3**: Test bookmarking a lesson and seeing it appear in the "Saved" tab.
- **Phase 3**: Verify the progress bar updates when a lesson is read.
