import pdf from "pdf-parse";

export const extractTextFromPDF = async (
  pdfBuffer: Buffer
): Promise<string> => {
  try {
    const data = await pdf(pdfBuffer);

    return data.text;
  } catch (error) {
    console.error("PDF extraction error:", error);

    throw new Error("Failed to extract PDF text");
  }
};