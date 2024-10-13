# Contributing to Zerokoin

Thank you for considering contributing to Zerokoin! Please follow these guidelines to help maintain the quality and consistency of the project.

## Code Standards

- **Use TypeScript**: All code contributions should be written in TypeScript. Adhere to the rules and best practices of TypeScript to ensure type safety and clarity.
- **Write Standard Code**: Ensure your code is clean, readable, and well-structured. Avoid introducing unused code or leaving commented-out code in your submissions.
- **Naming Conventions**: Use clear and descriptive names for variables, functions, files, and branches. Stick to a consistent naming convention (e.g., `camelCase` for variables and functions, `PascalCase` for components, `kebab-case` for file names).

## Commit Messages

- **Write Meaningful Commits**: Your commit messages should clearly describe the changes you've made. Use the following format:
  - `feat: A short description of the feature added`
  - `fix: A short description of the bug fixed`
  - `chore: A short description of maintenance tasks`
  - `docs: A short description of documentation changes`

## Branching

- **Branch Naming**: Follow a consistent branch naming convention. For example:
  - `feature/short-description`
  - `bugfix/short-description`
  - `chore/short-description`
- **Keep Branches Up-to-Date**: Regularly sync your branch with the `main` branch to avoid conflicts and ensure smooth integration.

## Getting Started

To get started with Zerokoin, follow these steps:

1. **Clone the repository**:

Before you clone, make sure you have forked the repo into your account and just follow the preceeding steps.

```bash
   git clone https://github.com/yourusername/zerokoin.git
   cd zerokoin
```

2. **Install dependencies**:

```bash
    npm install
```

3. **Set up environment variables:**
   Create a `.env` file in the root directory.
   Add the necessary environment variables as described in the .env.example file.
4. **Run the development server**:
   ```bash
    npm run dev
   ```
5. **Build the project**:

- **Run `npm run build` Before Pushing**: Before you push your branch, make sure to run the build command to ensure there are no build errors:
  ```bash
  npm run build
  ```

## Pull Requests

**Open a Pull Request:** When you're ready to submit your changes, open a pull request against the main branch. Include a description of the changes and any relevant issue numbers.
**Review Process:** Your pull request will be reviewed by a team member. Be prepared to make revisions based on feedback.

## Code of Conduct

Please adhere to our Code of Conduct.

Thank you for contributing to Zerokoin! We look forward to working with you.
