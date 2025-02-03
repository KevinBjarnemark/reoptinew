# Reoptinew

## Table of Contents

- 🗺️ [Project Map](#map)
- 🌐 [API and GitHub Projects](#api)
- 🎨 [UX-Design](#ux-design)
- 📉 [Agile](#agile)
- ❌ [Error handling](#error-handling)
- 🛠️ [Technologies](#technologies)
- 🔧 [Testing](#testing)
- 🌌 [Philosophy](#philosophy)
- 🖥️ [Code Documentation](#code-documentation)
- ✨ [Credits](#credits)
- 🖊️ [References](#references)

## Project Map 

The "map" below provides an overview of key resources in this project. 

#### External resources

- 🖥️ [Live web app](https://reoptinew-09d333f23d8e.herokuapp.com/)  
- 🌐 [API Repository (with documentation)](https://github.com/KevinBjarnemark/reoptinew-api)  

#### Documentation

- 📉 [First iteration](docs/iteration-1/README.md)  
- 📉 [Sprints](docs/iteration-1/sprints)  
- 📃 [GitHub Projects (Kanban)](https://github.com/users/KevinBjarnemark/projects/10).

## API

The Reoptinew web app uses a decoupled architecture, separating the frontend and backend repositories. The **backend API repository** can be found [**here**](https://github.com/KevinBjarnemark/reoptinew-api). Both of these repositories share the same [Kanban board](https://github.com/users/KevinBjarnemark/projects/10).

## UX-Design

### Initial Design 🎨

The design of this app was originally crafted using illustrations and vector editing tools to explore how the components could coexist.

![Screenshot](docs/assets/development-process/initial-design.gif "A GIF-video of multiple vector illustrations.")

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

The Reoptinew project has been developed using an **Agile methodology** with only a single iteration so far. In-depth documentation for the first iteration, its sprints, diagrams, and more can be found [here](docs/iteration-1).

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

</details>

<details>
    <summary>
        Prettier
    </summary>

**Code formatter** 

Prettier ensures consistent code formatting by parsing the code with default and customized formatting rules. It supports a wide range of languages, including JavaScript, TypeScript, HTML, CSS, JSON, and more. Prettier integrates seamlessly with editors. Here's this project's configuration file for it [Configuration file](.prettierrc).

</details>

<details>
    <summary>
        React Testing Library
    </summary>

**A lightweight library for testing React components** 

React Testing Library focuses on testing components as users interact with them, rather than testing implementation details. It encourages best practices by querying the DOM in ways that simulate real user actions and accessibility standards.

</details>

<details>
    <summary>
         Identity Obj Proxy
    </summary>

**A Jest utility for mocking CSS Modules in JavaScript tests.**

This library simplifies testing components that rely on CSS Modules by mapping class names to their string equivalents. This ensures CSS imports in your tests don’t break and allows you to verify that the correct class names are applied without worrying about the actual CSS.

</details>

## Known Issues

Let's list some known issues that should be prioritized. 

⛔️ **Post Pagination**  
Right now all posts are returned to the user. This is a serious issue and should be easy to implement, given the current systems in place. 

## Testing

### 📱 Testing on Physical Devices

Ensuring **Reoptinew** delivers a seamless experience across devices is a critical part of development. The following section outlines the methods and tools used for responsive design testing, including media queries and Vite-specific optimizations.

#### Configuration

To mimic a similar setup as Reoptinew, some configuration is needed. 

- **Bind Server to Local Network's IPv4 Address**

First we'll need to enable other devices to access your network and app by binding the server to your local network's IPv4 address.

> ⚠️ **NOTE**  
>Binding to your private IPv4 address (e.g., 192.168.x.x) means only devices on the same local network can access it. This is generally safe for testing.
>
>However, binding to 0.0.0.0 listens on all interfaces, which could expose the server to unintended connections if you're on an unsecured or public network. Never expose .env files containing sensitive information like API keys or credentials.

In this repository, the local development IP is stored in [.env.development](.env.development) (not publicly visible). If you store yours as an environment variable, it should be configured in [vite.config.js](vite.config.js) like in the example below.

```js
server: {
    host: env.VITE_API_HOST,
    port: 5173,
},
```

- **Backend setup**

In the backend, when running the development server locally, the following environment variables ensure accessibility from various devices within the network.

> ❕ **Note**
> You cannot have both the API and frontend on the same port, in our case, the `DEV_SERVER_HOST` is set to `8000`.   

```python
# settings.py
dev_server_host = config("DEV_SERVER_HOST")
dev_server_frontend_port = config("DEV_SERVER_FRONTEND_PORT")

if DEBUG:
    # Allow localhost in development
    CORS_ALLOWED_ORIGINS = [
        f"http://{dev_server_host}:{int(dev_server_frontend_port)}"
    ]
    ALLOWED_HOSTS = [dev_server_host]
else:
    # Allow the deployed frontend in production
    CORS_ALLOWED_ORIGINS = [
        "https://reoptinew-09d333f23d8e.herokuapp.com",
    ]
    ALLOWED_HOSTS = ["reoptinew-api-c16dc2520739.herokuapp.com"]
```

- **Test on a mobile device** 

Open the development app on mobile via `http://your-local-ip:5173/`.

## Philosophy

### Bootstrap

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

    The goal is to achieve a more distinctive design that enhances brand awareness by emphasizing elements unique to Reoptinew.

### Testing

#### [Jest](https://jestjs.io/) vs [Vitest](https://vitest.dev/)

I choose to work with Jest in this project due to its maturity and widespread adoption. The list of big and successful companies that use Jest is massive. Jest is trusted by a large number of big and successful companies, making it a well-established and reliable choice. 

That said, Vitest offers some compelling advantages, such as faster performance and seamless integration with `Vite`, which is used in this project. Using Vite with Jest requires Babel for ES Module support, which adds unnecessary dependencies compared to Vitest, which works natively with Vite.

## Code Documentation

### Debugging

Debugging functions have been moderately sprinkled throughout the project. These custom functions are designed to write logs to the console **only in development mode**, using `import.meta.env.MODE` to detect the environment. As a result they are automatically stripped out during a Vite production build.

**Example:**  
```javascript
debug("s", showDebugging, 'Sign up successful', response);
```

The benefits of this approach include: 

- Simplifying troubleshooting
- Offering global overview for advanced development needs. 
- Assisting with asserting tests in complex scenarios. For example, these logs can capture `useState` values or other internal states when interacting with deeply nested components that rely on hooks and contexts.
- Saving time by avoiding repetative console.log statements that need to be written and manually removed.


### Error handling

Many functions are wrapped in try-catch blocks, but some aren't. This is a technique for improving readability and clarity. 

Here's an example, look at the **size difference** and **readability** of `A` vs `B`

### ❌ A

```javascript
const someFunction = () => {
    try {
        const obj = {value: "Hello"}
        return obj.value.nested.nonExistingValue; // This will throw an error
    } catch (error) {
        alert("Something went wrong");
    }
};

const someOtherFunction = () => {
    try {
        const someFunctionValue = someFunction();
        if (someFunctionValue === undefined){
            throw new Error("someFunction() threw an error!");
        }
    } catch (error) {
        alert(error);
    }
};
```

### ✔️ B 
```javascript
const someFunction = () => {
    const obj = {value: "Hello"}
    return obj.value.nested.nonExistingValue; // This will throw an error
};

const someOtherFunction = () => {
    try {
        someFunction();
    } catch (error) {
        alert(error);
    }
};
```

This project has been developed using this approach to:

- Avoid **silent errors** thrown in nested functions
- Reduce repetition
- Increase code-base clarity
- Mitigate error-handling confusion

Keep an eye out for this (example below) in doc strings. These are added to the functions that are expected to already be placed in a try block.

``` javascript
/**
 *
 * @throws Errors must be handled by the caller
 */
```

### Reusability and Repetition

Many techniques have been used to centralize functionality, avoid repetition, and streamline the code base as a whole. Best practices have been followed thoroughly throughout the development with:

- [Global Constants](src/utils/constants.js) 
- Conditional Environment Variables (Vite)
- [Global Utilities](src/utils)
- Functional Components
- Custom Hooks
- Contexts
- [Global Functions](src/functions)

## Credits

### Code

- **Common Imports for Tests**
    - [raquelhortab](https://stackoverflow.com/users/6878997/raquelhortab) in [this thread](https://stackoverflow.com/questions/71378709/is-there-a-way-to-predefine-common-imports-for-all-test-files-in-jest) showcased how to predefine common imports for all tests. In [this file](jest.setup.js) I've utilized this solution but using `globalThis` instead of the `global` object, which isn't supported in ES Modules.  

- **Conditional Environment Variables with Seamless Mocking**
    - [fuhrmanator](https://stackoverflow.com/users/1168342/fuhrmanator) in [this thread](https://stackoverflow.com/questions/72128718/test-suite-failed-to-run-import-meta-env-vite) inspired me to avoid importing environment variables with with `import.meta.env`. The approach is to only import it once and then mock that file in Jest. I didn't use his solution exactly, but his approach inspired me. Instead of directly importing with Vite, environment variables are imported only once in [env.js](env.js).

### Fonts

- [Niramit](https://fonts.google.com/specimen/Niramit)

## References

- [Bootstrap](https://www.npmjs.com/package/bootstrap)
