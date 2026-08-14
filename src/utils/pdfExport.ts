const sanitizeTitle = (filename: string) =>
  filename.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim() || 'Resume';

/**
 * Uses the browser's native print engine so the saved PDF contains real,
 * selectable text instead of screenshots. This is substantially safer for ATS
 * parsing and also preserves links and vector-sharp type.
 */
export async function downloadResumePdf(elementId: string, filename: string = 'Resume.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id #${elementId} not found.`);
    return;
  }

  const originalTitle = document.title;
  const originalTransform = element.style.transform;
  const originalMarginBottom = element.style.marginBottom;

  document.title = sanitizeTitle(filename);
  element.style.transform = 'none';
  element.style.marginBottom = '0';
  element.classList.add('is-native-pdf-export');

  const restore = () => {
    document.title = originalTitle;
    element.style.transform = originalTransform;
    element.style.marginBottom = originalMarginBottom;
    element.classList.remove('is-native-pdf-export');
    window.removeEventListener('afterprint', restore);
  };

  window.addEventListener('afterprint', restore, { once: true });

  try {
    await document.fonts.ready;
    window.print();
  } catch (error) {
    restore();
    console.error('Native PDF export failed:', error);
    window.alert('Could not open the PDF save dialog. Please use the Print button.');
  }
}

export function triggerPrint() {
  window.print();
}
