"use client";
import { builder, Builder } from "@builder.io/react";
import HydrationTestParent from "./components/HydrationTestParent";

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
