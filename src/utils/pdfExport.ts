import html2pdf from 'html2pdf.js';

export async function downloadResumePdf(elementId: string, filename: string = 'Resume.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id #${elementId} not found.`);
    window.print();
    return;
  }

  const opt = {
    margin: [0.3, 0.3, 0.3, 0.3] as [number, number, number, number],
    filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 800,
    },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (err) {
    console.warn('html2pdf fallback to native print:', err);
    window.print();
  }
}

export function triggerPrint() {
  window.print();
}
