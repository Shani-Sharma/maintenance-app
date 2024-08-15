import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateInvoice = (data) => {
  const pdf = new jsPDF({
    unit: 'mm', // Using millimeters as the unit
    format: 'a4' // A4 size paper
  });

  // Fetch the template HTML from the public directory
  fetch('/assets/InvoiceTemplate.html')
    .then(response => response.text())
    .then(html => {
      // Replace placeholders with actual data
      const filledHtml = html
        .replace('{{invoiceNumber}}', data.invoiceNumber)
        .replace('{{invoiceDate}}', data.invoiceDate)
        .replace('{{dueDate}}', data.dueDate)
        .replace('{{customerName}}', data.customerName)
        .replace('{{customerAddress}}', data.customerAddress)
        .replace('{{customerPhone}}', data.customerPhone)
        .replace('{{flatNumber}}', data.flatNumber)
        .replace('{{unitPrice}}', data.unitPrice)
        .replace('{{totalPrice}}', data.totalPrice)
        .replace('{{subtotal}}', data.subtotal)
        .replace('{{taxRate}}', data.taxRate)
        .replace('{{taxes}}', data.taxes)
        .replace('{{totalAmount}}', data.totalAmount);

      // Convert HTML to canvas and then to PDF
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = filledHtml;
      document.body.appendChild(tempDiv);

      html2canvas(tempDiv, {
        scale: 2, // Adjust the scale if needed for better resolution
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 size width in mm
        const pageHeight = 297; // A4 size height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        const position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('invoice.pdf');
        document.body.removeChild(tempDiv);
      });
    });
};
