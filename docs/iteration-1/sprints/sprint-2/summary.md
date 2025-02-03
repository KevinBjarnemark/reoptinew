# Sprint 2

## Table of Contents

- 💪 [Goal](#goal)
- 🏆 [Achievements](#achievements)
- 🗻 [Challenges](#challenges)
- 🏃‍♂️ [Next Sprint](#next-sprint)
- 📉 [Results](#results)

## Goal

Build the following systems:
- User safety and content filtering
- Commenting system
- Like and rating system
- Post management (creation, editing, deletion, and viewing)

## Achievements

**Duration:** `7 Days`  
**Story points completed:** `17`

### ✅ **User safety & content filtering**  
- Developed an age-based restriction system to filter out inappropriate content for users under 16.
- Blocked user signups for users under 13.
- Designed a UI section for content safety selection during post creation.
- Applied backend logic to hide posts flagged as unsafe for children.

### ✅ **Commenting system**  
- Enabled logged-in users to comment on posts.
- Created a user-friendly UI for adding and displaying comments.
- Designed a structured comment section displaying:
  - Username
  - Comment creation date
- Ensured chronological ordering of comments.
- Added validation (character limits, input sanitization) to prevent spam.
- Restricted non-authenticated users from commenting.

### ✅ **Like & rating system**  
- Implemented a like button for posts that increments like count on click.
- Restricted non-authenticated users from using the like feature.
- Developed a post rating system based on three criteria:
  - Saves Money
  - Saves Time
  - Usefulness
- Designed interactive sliders for users to submit ratings.
- Implemented average score calculations for each criterion.
- Prevented users from rating their own posts.
- Restricted non-authenticated users from using the rating feature.

### ✅ **Post management (creation, editing, deletion, and viewing)**  
- Added a **post creation form** with:
  - Title, description, instructions, and tags.
  - List of materials and tools needed.
  - Image and text validation.
  - A URL copy button for sharing posts.
- Developed **post viewing functionality**:
  - Users can click on posts to view full details.
  - Post details page displays content, instructions, and comments.
- Implemented **post deletion system**:
  - Added a delete button for post removal.
  - Integrated a security step to prevent accidental deletions.
- Built **post editing functionality**:
  - Enabled post owners to modify their content.
  - Implemented role-based permissions.
  - Ensured all edits are validated before saving.

## Challenges

- **System Complexity**
  - Handling multipart stringified FormData (JavaScript) seamlessly with the API.
  - Ensuring strict age restriction logic while remaining code base clarity.
  - Linking components with URLs in different areas of the app.
  - Iterated components that requires render-efficient live updates.

## Next Sprint

- Use the already integrated filtering setup for querying search requests.
- Refactor CSS and React components for better reusability.

## Results

- Successfully built multiple engagement features, improving user interaction.
- Created a structured system for safe content consumption and management.
- Established a foundation for further improvements in content moderation and engagement analytics.
