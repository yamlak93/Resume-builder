import type { ResumeData } from "./types"

export const exportToPDF = async (resumeData: ResumeData, elementId: string) => {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error("Resume element not found")
  }

  try {
    // Use browser's native print functionality as a more reliable approach
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      throw new Error("Could not open print window")
    }

    // Clone the element and its styles
    const clonedElement = element.cloneNode(true) as HTMLElement

    // Create a complete HTML document for printing
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${resumeData.personalInfo.name} - Resume</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.5;
              color: #333;
              background: white;
            }
            
            .max-w-4xl {
              max-width: 56rem;
              margin: 0 auto;
            }
            
            .mx-auto {
              margin-left: auto;
              margin-right: auto;
            }
            
            .bg-white {
              background-color: white;
            }
            
            .p-8 {
              padding: 2rem;
            }
            
            .shadow-lg {
              box-shadow: none;
            }
            
            .text-4xl {
              font-size: 2.25rem;
              line-height: 2.5rem;
            }
            
            .text-3xl {
              font-size: 1.875rem;
              line-height: 2.25rem;
            }
            
            .text-2xl {
              font-size: 1.5rem;
              line-height: 2rem;
            }
            
            .text-xl {
              font-size: 1.25rem;
              line-height: 1.75rem;
            }
            
            .text-lg {
              font-size: 1.125rem;
              line-height: 1.75rem;
            }
            
            .text-base {
              font-size: 1rem;
              line-height: 1.5rem;
            }
            
            .text-sm {
              font-size: 0.875rem;
              line-height: 1.25rem;
            }
            
            .text-xs {
              font-size: 0.75rem;
              line-height: 1rem;
            }
            
            .font-bold {
              font-weight: 700;
            }
            
            .font-semibold {
              font-weight: 600;
            }
            
            .font-medium {
              font-weight: 500;
            }
            
            .font-light {
              font-weight: 300;
            }
            
            .mb-2 {
              margin-bottom: 0.5rem;
            }
            
            .mb-3 {
              margin-bottom: 0.75rem;
            }
            
            .mb-4 {
              margin-bottom: 1rem;
            }
            
            .mb-6 {
              margin-bottom: 1.5rem;
            }
            
            .mb-8 {
              margin-bottom: 2rem;
            }
            
            .mt-1 {
              margin-top: 0.25rem;
            }
            
            .mt-2 {
              margin-top: 0.5rem;
            }
            
            .pb-2 {
              padding-bottom: 0.5rem;
            }
            
            .pb-6 {
              padding-bottom: 1.5rem;
            }
            
            .flex {
              display: flex;
            }
            
            .flex-wrap {
              flex-wrap: wrap;
            }
            
            .justify-between {
              justify-content: space-between;
            }
            
            .justify-center {
              justify-content: center;
            }
            
            .items-center {
              align-items: center;
            }
            
            .items-start {
              align-items: flex-start;
            }
            
            .items-baseline {
              align-items: baseline;
            }
            
            .gap-1 {
              gap: 0.25rem;
            }
            
            .gap-2 {
              gap: 0.5rem;
            }
            
            .gap-4 {
              gap: 1rem;
            }
            
            .text-center {
              text-align: center;
            }
            
            .text-right {
              text-align: right;
            }
            
            .text-blue-600 {
              color: #2563eb;
            }
            
            .text-green-600 {
              color: #16a34a;
            }
            
            .text-purple-600 {
              color: #9333ea;
            }
            
            .text-red-600 {
              color: #dc2626;
            }
            
            .text-gray-600 {
              color: #4b5563;
            }
            
            .text-gray-700 {
              color: #374151;
            }
            
            .border-b-2 {
              border-bottom-width: 2px;
            }
            
            .border-blue-600 {
              border-color: #2563eb;
            }
            
            .border-green-600 {
              border-color: #16a34a;
            }
            
            .border-purple-600 {
              border-color: #9333ea;
            }
            
            .border-red-600 {
              border-color: #dc2626;
            }
            
            .border-gray-600 {
              border-color: #4b5563;
            }
            
            .border-gray-300 {
              border-color: #d1d5db;
            }
            
            .list-disc {
              list-style-type: disc;
            }
            
            .list-inside {
              list-style-position: inside;
            }
            
            .space-y-1 > * + * {
              margin-top: 0.25rem;
            }
            
            .space-y-2 > * + * {
              margin-top: 0.5rem;
            }
            
            .space-y-4 > * + * {
              margin-top: 1rem;
            }
            
            .leading-relaxed {
              line-height: 1.625;
            }
            
            .uppercase {
              text-transform: uppercase;
            }
            
            .tracking-wide {
              letter-spacing: 0.025em;
            }
            
            .tracking-widest {
              letter-spacing: 0.1em;
            }
            
            .italic {
              font-style: italic;
            }
            
            .grid {
              display: grid;
            }
            
            .grid-cols-2 {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            
            .w-4 {
              width: 1rem;
            }
            
            .h-4 {
              height: 1rem;
            }
            
            .w-1\\/3 {
              width: 33.333333%;
            }
            
            .w-2\\/3 {
              width: 66.666667%;
            }
            
            .bg-gradient-to-b {
              background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
            }
            
            .from-blue-600 {
              --tw-gradient-from: #2563eb;
              --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0));
            }
            
            .to-blue-800 {
              --tw-gradient-to: #1e40af;
            }
            
            .text-white {
              color: white;
            }
            
            .bg-white {
              background-color: white;
            }
            
            .bg-opacity-20 {
              background-color: rgba(255, 255, 255, 0.2);
            }
            
            .rounded {
              border-radius: 0.25rem;
            }
            
            .px-2 {
              padding-left: 0.5rem;
              padding-right: 0.5rem;
            }
            
            .py-1 {
              padding-top: 0.25rem;
              padding-bottom: 0.25rem;
            }
            
            .relative {
              position: relative;
            }
            
            .absolute {
              position: absolute;
            }
            
            .left-0 {
              left: 0;
            }
            
            .top-2 {
              top: 0.5rem;
            }
            
            .top-5 {
              top: 1.25rem;
            }
            
            .left-1\\.5 {
              left: 0.375rem;
            }
            
            .w-3 {
              width: 0.75rem;
            }
            
            .h-3 {
              height: 0.75rem;
            }
            
            .w-0\\.5 {
              width: 0.125rem;
            }
            
            .h-full {
              height: 100%;
            }
            
            .rounded-full {
              border-radius: 9999px;
            }
            
            .pl-6 {
              padding-left: 1.5rem;
            }
            
            /* Print specific styles */
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                print-color-adjust: exact;
              }
              
              .shadow-lg {
                box-shadow: none !important;
              }
              
              .border {
                border: none !important;
              }
              
              .rounded-lg {
                border-radius: 0 !important;
              }
            }
            
            /* Hide icons in print */
            svg {
              display: none;
            }
            
            /* Badge styles */
            .inline-flex {
              display: inline-flex;
            }
            
            .items-center {
              align-items: center;
            }
            
            .rounded-full {
              border-radius: 9999px;
            }
            
            .border {
              border-width: 1px;
            }
            
            .border-gray-200 {
              border-color: #e5e7eb;
            }
            
            .bg-gray-100 {
              background-color: #f3f4f6;
            }
            
            .px-2\\.5 {
              padding-left: 0.625rem;
              padding-right: 0.625rem;
            }
            
            .py-0\\.5 {
              padding-top: 0.125rem;
              padding-bottom: 0.125rem;
            }
            
            .text-xs {
              font-size: 0.75rem;
              line-height: 1rem;
            }
            
            .font-medium {
              font-weight: 500;
            }
            
            .text-gray-800 {
              color: #1f2937;
            }
          </style>
        </head>
        <body>
          ${clonedElement.outerHTML}
        </body>
      </html>
    `

    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Wait for content to load
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 500)
    }

    // Fallback if onload doesn't fire
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 1000)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw new Error("Failed to generate PDF. Please try using your browser's print function (Ctrl+P) instead.")
  }
}
