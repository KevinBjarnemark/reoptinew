
# Sprint 1

## Table of Contents

- 💪 [Goal](#goal)
- 🏆 [Achievements](#achievements)
- 🗻 [Challenges](#challenges)
- 🏃‍♂️ [Next Sprint ](#next-sprint)
- 📉 [Results](#results)

## Goal

Build the following systems:
- Navigation
- Authentication
- System feedback
- Account deletion

## Achievements 

**Duration:** `4 Days`  
**Story points completed:** `9`

### ✅ Built a navigation system  
- Designed a navigation system accessible on small devices.

### ✅ **Integrated authentication**  
- Implemented seamless backend integration with features like throttling and custom hooks.
- Validated fields on both the front and back end, improving performance and reducing unnecessary API requests.
- Added a reusable custom hook for form submissions, streamlining functionality and reducing repetition.
- Integrated client-side throttling into the SubmitButton component to prevent spamming (e.g., clicking multiple times quickly). When a user submits, all buttons across the app are disabled until the server responds.

### ✅ **Built multiple feedback systems**  
- **Loading Spinner**
    - Designed a spinner integrated into the Logo component. The logo itself acts as the spinner, enhancing brand awareness. The spinner can be toggled conditionally within the Logo component.
- **Loading Screen**
    - Displays whenever the entire app is loading. This "appLoadingState" is triggered during operations like authentication.
- **Alert Window**
    - Handles multiple message types (e.g., errors, server errors, info, tasks).
- **Instant feedback**
    - Async operations (e.g., form submissions) updates the header logo with a loading animation, assuring users that their request is being processed. The SubmitButton also changes color for visual feedback.
- **Notification system**
    - Added a notification system using a simulated loading hook. This pauses async functions and displays quick messages like "Submitted form!", "Action successful", or "Couldn't sign you up :(".

### ✅ **Built an account deletion system**    
- Designed a pop-up window for account deletion.
- Integrated a password confirmation step to prevent accidental account deletions.

## Challenges

- **Testing Complex React Components**
    - Testing components that rely on hooks using values from contexts significantly increased testing complexity.
    - Many attempts led to "testing the mock" rather than the actual app. This might become easier in future library updates.

- **Integration of Backend Custom Errors**
    - Implementing custom error messages. More details are documented in the API repository (credits section).

## Next Sprint 

- With reusable systems now in place, the next sprint should be more straightforward.

## Results

- All features and additional systems were successfully integrated.
- The reusable components, hooks, and contexts provide a solid foundation for future development.
