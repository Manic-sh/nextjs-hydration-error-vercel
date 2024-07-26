import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";
import { getAsyncProps } from "@builder.io/utils";
import Event from '../../components/HeroComponent/HeroComponent';

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}
const myData = {
  content: {
    data: {
      example: "your text here a",
    },
  },
};
export default async function Page(props: PageProps) {
  const builderModelName = "page";

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      enrich: true,
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
      cachebust: true,
      query: { id: 123 },
    })
    // Convert the result to a promise
    .toPromise();

  // Fetch additional data and pass it to Builder using getAsyncProps
  await getAsyncProps(content, {
    async myData() {
      const response = await fetch("https://api.restful-api.dev/objects", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const faqData = await response.json();

      return { faqData };
    },
  });
  return (
    <>
      {/* Render the Builder page */}
      <Event content={content}/>
      <RenderBuilderContent content={content} model={builderModelName} options={{query: {id: 123 }}} />
    </>
  );
}
