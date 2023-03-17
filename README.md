# Robotics

A collection of personal notes about robotics.

This template is based on astro [docs](https://github.com/withastro/astro/tree/main/examples/docs) example, but it has been extended for my needs.

Features:
- Full MDX, markdown support
- LaTeX support with global macros for consistent notation
- Multi-language i18n
- Sidebar navigation
- Automatic table of content
- Tailwing styling

## Global Available Components

- `Equation`: Used to produced LaTeX based equations
    - `formula`: Only support LaTeX text (without $$)
    - `description`: Support markdown and `inline` LaTeX.
- `Drawio`: Render a Drawio diagram file.
    - `description`: Support markdown and `inline` LaTeX.
- `Image`: Render a png, jpeg image.
    - `description`: Support markdown and `inline` LaTeX.

## Others (Not Global) Components

This type of component needs to be imported into the file in wich you want to use it. They are intended for specific used cases.

Examples of these components are:
- `Canvas` (threejs): Example of a Threejs component for 3D rendering.
- `JSXGraph` (JSXGraph): Example of JSXGraph, a library for interactive geometry, function plotting, charting, and data visualization.
