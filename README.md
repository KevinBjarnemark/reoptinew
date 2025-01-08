# Reoptinew

**Navigate to the live app** [here](https://reoptinew-09d333f23d8e.herokuapp.com/) 🔥

## Table of Contents

- 🌐 [API and GitHub Projects](#api)
- 🎨 [UX-Design](#ux-design)
- 📉 [Agile](#agile)
- ❌ [Error handling](#error-handling)
- 🛠️ [Technologies](#technologies)
- 🌌 [Philosophy](#philosophy)
- 🖊️ [References](#references)


## API

The Reoptinew web app uses a decoupled architecture, separating the frontend and backend repositories. The **backend API repository** can be found [**here**](https://github.com/KevinBjarnemark/reoptinew-api). Both of these repositories share the same [Kanban board](https://github.com/users/KevinBjarnemark/projects/10).

## UX-Design

### Initial Design 🎨

The design of this app was originally crafted using illustrations and vector editing tools to explore how the components could coexist.

![Screenshot](docs/assets/development_process/initial_design.gif "A GIF-video of multiple vector illustrations.")

### Logo and brand name

![Screenshot](docs/assets/brand/logo.webp "A GIF-video of multiple vector illustrations.")

**Reoptinew**:

- **Re:** as in redo, reimagine, rebuild, remake, etc,.
- **opt:** as in optimize.
- **i:** as in "I" or "me".
- **new:** Represents something new, novel, or unseen.

The Reoptinew logo is designed to inspire users to build something new. The "R" reclining on its back 
symbolizes ingenuity and simplicity, something that feels tangible and achievable, much like a crafted solution to a practical problem.

The logo features a minimalistic design with clean, clear shapes, ensuring easy recognition even at smaller sizes. Whether displayed as a bookmark or seen at a distance, its simplicity enhances visibility and memorability.

#### Strategic placement 

The Reoptinew's logo has a fixed position at the top as users scroll. 

This is a strategic approach that provides several benefits:

- **Brand Recall:** The constant visibility of the logo ensures that users are consistently reminded of Reoptinew’s identity, strengthening their association with the app.

- **Screenshots as Marketing:** When users take screenshots for sharing or reference, the fixed logo will enhance brand recognition. This creates organic opportunities for promotion when screenshots are shared on social media or with others.

This thoughtful approach makes the logo not only a symbol of the app but also a functional tool for branding and user engagement.

### Central Content Placement

The thought process behind the placing of elements has been influenced by a [medium article](https://medium.com/@hayavuk/ui-ux-design-fundamentals-for-the-front-end-developers-688ba43eaed4) shared by [Hajime Yamasaki Vukelic](https://medium.com/@hayavuk). This article explains widely recognized design standards used to draw the user's attention effectively. 

For example, the post visible in the feed is emphasized by being placed prominently and slightly elevated on the screen. This strategic layout aligns with familiar user expectations and is proven to direct attention.

### Exploration, Engagement, and Contrast 

The stacking of cards within the interface invites users to explore further, tapping into a fundamental human curiosity, our intrigue with the unknown. This design element mimics the timeless metaphor of waving an empty fist to a child, igniting curiosity about what lies within, only to later reveal it empty-handed. This playful interaction captures the essence of discovery, enticing users to uncover the more "hidden" within the app.

The dark background combined with white cards ensures sharp contrast. This technique aligns with [Gestalt principles](https://www.interaction-design.org/literature/topics/gestalt-principles?srsltid=AfmBOopo24IttjTdh5gS7TBtJD96vAoGnYgzmxstOmXZKEjgCqhliGe0) of visual design, where contrast creates focus and separates key elements from the surroundings.

### Consistency and Sizing

Reoptinew’s minimalistic interface have been designed with a clean, universal design ethos. 

- Common icons such as the magnifying glass for search and the hamburger menu for navigation are used, providing an intuitive user experience.
- Navigation menu and sidebar tools are easily accessible and within reach as the user scrolls on the page.
- Titles and key text elements are larger and bold to attract immediate attention.
- Supporting details, such as user interaction counts, are smaller but remain highly visible, ensuring a clear flow of information.

### Texture

Try to think of anything in the natural world that is entirely devoid of texture and uniformly single-colored. Even snow possesses a subtle texture, and the sky is adorned with clouds and shifting gradients of color. Due to this observation, large elements are equipped with either interactive components or textures. For instance, the page background incorporates circular patterns that add depth and resolution without overwhelming or distracting the user. Moreover, the pattern texture is mimicking parts of the logo to subliminally reinforce brand identity.

### Minimalistic approach

The design embraces minimalism to create a distraction-free, efficient user experience. Posts have a clean, card-like design that separates content neatly, making it easy for users to digest information without visual clutter. A dual search system, with options for simple or filtered searches, creates a simplistic view for both casual users and power users.

### Keep the user informed

Features, such as the "Logged in as Joe" indicator, keep the user informed about the status of the app. This is a strategic design originated from [Jakob Nielsen](https://www.nngroup.com/people/jakob-nielsen/) who emphasized that the user should constantly be informed about the status of the app. 

### More

- The design facilitates scalability by leaving ample room for future features without overloading the current design.

## Agile

The Reoptinew project has been developed using an **Agile methodology** with only a single iteration so far. In-depth documentation for the first iteration, its sprints, diagrams, and more can be found [here](docs/iteration_1).

## Error handling

> ❕ **Note**  
> The error-handling system in Reoptinew seamlessly handles both frontend and backend errors. For a detailed overview of backend error handling, refer to the [**backend repository**](https://github.com/KevinBjarnemark/reoptinew-api).

Reoptinew gracefully manages errors across the application by wrapping critical functions in try-catch blocks at multiple levels. This ensures errors, whether expected or unexpected, are captured and handled consistently. Unexpected errors are displayed as `Something went wrong`, preventing confusing or technical error messages from disrupting the user experience. All error messages are carefully reviewed, approved, and tailored to improve clarity and usability.
 
### Alert window

All types of errors and notifications are displayed in the [Alert Window](src/components/alerts/alert-window/AlertWindow.jsx). The strongest feauture of this component is that it allows errors to be thrown across the app without overwhelming the user, or erasing previous data. The user is fully informed about the **status of the app** and is able to toggle between the fired alerts/errors in the order they were thrown. All alerts/errors will be removed from memory when the user closes the alert window, this improves the user experience, increases performance, and provides control.   

> ⛔️ **Known issue**   
> Alerts may occasionally appear out of chronological order due to how React processes rendering queues. Although this can be resolved with useRef, the issue is minor and currently not prioritized.  

Moreover, the alert system follows a modern, non-intrusive design with engaging animations and intruiging colors to further enhance the UX. When an alert/error is executed or toggled, a strong color that matches the alert/error-type will flash to gain the user's attention.

## Technologies

Read more about the programming languages, frameworks, and tools used to build **Reoptinew** in this section.

<details>
    <summary>
        Vite
    </summary>

**A build tool designed for modern web development.** 

Vite optimizes production builds with ESBuild and Rollup. It also offers Hot Module Replacement (HMR) which enables instant updates to specific parts of your application during development, without requiring a full page reload.

</details>

<details>
    <summary>
        Bootstrap
    </summary>

**A CSS framework for responsive web design.** 

Bootstrap provides a collection of CSS utilities, components, and a responsive grid system to streamline front-end development. This project exclusively uses Bootstrap’s CSS utility classes to achieve consistent styling and layout, without relying on its prebuilt components or JavaScript.

</details>

<details>
    <summary>
        Jest
    </summary>

**A JavaScript testing framework.** 

Jest is commonly used for testing JavaScript and TypeScript code. It includes features for mocking, snapshot testing, and generating coverage reports. It is compatible with a variety of libraries and frameworks and supports both unit and integration tests.

</details>

<details>
    <summary>
        jwtDecode
    </summary>

**A utility for decoding JSON Web Tokens.**

jwtDecode is a lightweight library used to decode the payload of a JSON Web Token (JWT) without validating its signature. It can be used to extract claims or information embedded within the token.

</details>

## Philosophy

### Bootstrap Usage Philosophy

This project leverages [Bootstrap’s](https://getbootstrap.com/) CSS utilities as a foundation for responsive and consistent design, while deliberately avoiding [React-Bootstrap](https://www.npmjs.com/package/react-bootstrap) and its prebuilt components. This approach ensures a design that is uniquely tailored to Reoptinew. **Here's why:**

1. **Flexibility and Customization**  
    React-Bootstrap’s prebuilt components (e.g., `Button`, `Card`, `Modal`) are robust but often impose structural limitations.
    By exclusively using Bootstrap’s utility classes (e.g., `d-flex`, `text-center`, `mt-4`), this project achieves greater customization and control over the final result.

2. **Lightweight and Streamlined Code**  
    Avoiding [React-Bootstrap](https://www.npmjs.com/package/react-bootstrap) reduces dependencies, resulting in:

    - **A leaner bundle size**
    - **Simplified code without unnecessary abstraction layers**

3. **Unique components for Brand Identity**  
    To create a user experience that feels uniquely Reoptinew, this project avoids Bootstrap’s prebuilt JavaScript components, such as modals and dropdowns. The goal is to craft interactive features that align more closely with the app’s branding and visual identity, moving beyond generic solutions.

    By focusing on custom implementations, this approach opens the door for **long-term flexibility**. As needs evolve, these components can be iteratively improved or expanded without the constraints of prebuilt structures. This philosophy prioritizes flexibility and scalability, allowing the design and functionality to grow naturally over time.

    The goal is to achieve a more distinctive design and enhances brand awareness by emphasizing elements unique to Reoptinew.

## References

- [Bootstrap](https://www.npmjs.com/package/bootstrap)
