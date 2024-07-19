"use client";
import { builder, Builder } from "@builder.io/react";
import HydrationTestParent from "./components/HydrationTestParent";
import Counter from "./components/Counter/Counter";

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
          name: "reviewText",
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
