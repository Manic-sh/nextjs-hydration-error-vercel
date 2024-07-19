// pages/edit-symbol.jsx

import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

// Replace with your Public API Key.
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function Page() {
  return <RenderBuilderContent model={"symbol"} /> 
}