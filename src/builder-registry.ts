"use client";
import { builder, Builder } from "@builder.io/react";
import HydrationTestParent from "./components/HydrationTestParent";
import Counter from "./components/Counter/Counter";
import HeaderNavigation from "./components/Header/HeaderNavigation";

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
      type: "string",
    },
  ],
});

Builder.registerComponent("FAQ", {
  name: "FAQ Items",
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
          defaultValue: 'Home',
        },
        {
          name: "path",
          type: "string",
          defaultValue: "/",
        },
      ],
      showIf: (options) => {
        return options.get('label') 
      }
    },
    {
      name: "logo",
      type: "file",
    }
  ],
});

Builder.register("editor.settings", {
  styleStrictMode: true, // optional
  designTokens: {
    colors: [
      { name: "Brand Red", value: "var(--red, #ff0000)" },
      { name: "Brand Blue", value: "rgba(93, 150, 255, 1)" },
    ],
    spacing: [
      { name: "Large", value: "var(--space-large, 20px)" },
      { name: "Small", value: "var(--space-small, 10px)" },
      { name: "Tiny", value: "5px" },
    ],
    fontFamily: [
      { name: 'Serif Font', value: 'var(--serif-font, Times, serif)' },
      { name: 'Primary Font', value: 'Roboto, sans-serif' },
    ]
  },
});