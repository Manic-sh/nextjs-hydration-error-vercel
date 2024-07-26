"use client";
import { builder, Builder } from "@builder.io/react";
import HydrationTestParent from "./components/HydrationTestParent";
import Counter from "./components/Counter/Counter";
import HeaderNavigation from "./components/Header/HeaderNavigation";
import Reviews from "./components/Reviews/Reviews";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(HydrationTestParent, {
  name: "HydrationTestParent",
  inputs: [
    {
      name: "text",
      type: "string",
      required: true,
    },
  ],
});

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
      defaultValue: 99,
    },
    {
      name: "content",
      type: "code",
    },
    {
      name: "myVal",
      type: "list",
      defaultValue:[{subfieldText: "<h1>Helllo</h1>"}, {subfieldText: "<h1>Helllo</h1>" }],
      subFields: [
        {
          name: "subfieldText",
          type: "richText",
        },
      ],
      onChange: (options) => {
        const myVal = options.get('myVal');
        if (myVal.length < 2) {
          alert('Minimum items is 2, add items to continue.');
          // Re-add removed item to ensure minimum of 2
          while (myVal.length < 2) {
            myVal.push({ subfieldText: "" });
          }
          options.set('myVal', myVal);
        }
      },
    },
  ],
});

Builder.registerComponent(Reviews, {
  name: "Reviews",
  friendlyName: "Reviews",
  inputs: [
    {
      name: "reviews",
      type: "list",
      defaultValue: [{ reviewText: "hello" }],
      subFields: [
        {
          name: "navItems",
          type: "string",
          defaultValue: '"You are the best"',
        },
        {
          name: "reviewAuthor",
          type: "string",
          defaultValue: "Jane Smith",
        },
        {
          name: "image",
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
          required: true,
          defaultValue:
            "https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d",
        },
      ],
    },
  ],
});

Builder.registerComponent(HeaderNavigation, {
  name: "HeaderNavigation",
  inputs: [
    {
      name: "navItems",
      type: "list",
      defaultValue: [{ label: "Title", path: "/" }],
      subFields: [
        {
          name: "label",
          type: "string",
          defaultValue: "Home",
        },
        {
          name: "path",
          type: "string",
          defaultValue: "/",
        },
      ],
    },
    {
      name: "logo",
      type: "file",
    },
  ],
});

// Builder.register("editor.settings", {
//   styleStrictMode: true, // optional
//   designTokens: {
//     colors: [
//       { name: "Brand Red", value: "var(--red, #ff0000)" },
//       { name: "Brand Blue", value: "rgba(93, 150, 255, 1)" },
//     ],
//     spacing: [
//       { name: "Large", value: "var(--space-large, 20px)" },
//       { name: "Small", value: "var(--space-small, 10px)" },
//       { name: "Tiny", value: "5px" },
//     ],
//     fontFamily: [
//       { name: 'Serif Font', value: 'var(--serif-font, Times, serif)' },
//       { name: 'Primary Font', value: 'Roboto, sans-serif' },
//     ]
//   },
// });

// Reconfigure the insert menu to exclude the "Custom Components" section
// Builder.register('insertMenu', {
//   name: 'Our Custom Insert Menu',
//   items: [
//     { name: 'Text Blocks' },  // Keep other sections as needed
//     { name: 'Image Blocks' }, // Example sections to keep
//     // Add any other sections you want to keep
//   ],
// });

// Builder.register('editor.settings', { customInsertMenu: true });

Builder.registerComponent("FAQ", {
  name: "FAQ",
  inputs: [
    {
      name: "data",
      type: "list",
      subFields: [
        { name: "id", type: "number" },
        { name: "name", type: "string" },
        {
          name: "data",
          type: "object",
          subFields: [
            { name: "color", type: "string" },
            { name: "capacity", type: "string" },
            { name: "price", type: "string" },
            { name: "generation", type: "string" },
            { name: "CPU model", type: "string" },
          ],
        },
      ],
    },
  ],
});
