/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// Initialize Google Generative AI for embeddings
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

/**
 * Retrieves relevant information from Pinecone vector database
 * @param userQuery - The user's natural language query
 * @returns A string containing the retrieved context
 */
export async function retrivalServer(userQuery: string): Promise<string> {
  try {
    // Get the Pinecone index (replace 'your-index-name' with your actual index name)
    const indexName = process.env.PINECONE_INDEX_NAME || "career-coach";
    const index = pinecone.index(indexName);

    // Generate embeddings for the user query using Google GenAI
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(userQuery);
    const queryEmbedding = result.embedding.values;

    // Query Pinecone with the embedding
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: 5, // Return top 5 most relevant results
      includeMetadata: true,
    });

    // Extract and format the results
    if (!queryResponse.matches || queryResponse.matches.length === 0) {
      return "No relevant information found in the knowledge base.";
    }

    // Combine the retrieved contexts
    const contexts = queryResponse.matches
      .map((match: any) => {
        const metadata = match.metadata;
        const text = metadata?.text || metadata?.content || "";
        const score = match.score?.toFixed(4) || "N/A";
        return `[Relevance: ${score}] ${text}`;
      })
      .filter((text: string) => text.length > 0)
      .join("\n\n");

    return contexts || "No relevant information found.";
  } catch (error) {
    console.error("Error in retrivalServer:", error);
    return `Error retrieving information: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}
