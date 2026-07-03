// High-Fidelity Rendering System Engine using HTML2Canvas and jsPDF Matrix[cite: 3]
const DocumentExporter = {
    async exportPdf(elementId, filename = 'DUET-Cover-Page.pdf') {
        const { jsPDF } = window.jspdf;
        const targetElement = document.getElementById(elementId);
        
        // Temporarily reset responsive transform overrides if applied explicitly[cite: 3]
        const originalTransform = targetElement.style.transform;
        targetElement.style.transform = "none";[cite: 3]

        try {
            // Enhanced capture clarity with high-definition rendering constraints mapping
            const canvas = await html2canvas(targetElement, {
                scale: 5, // Maximized vector scale output parameters mapping
                useCORS: true,
                allowTaint: true,
                logging: false,
                backgroundColor: "#ffffff"
            });

            // Replaced legacy compressed format stream parameters with sharp PNG configuration mapping
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
            pdf.save(filename);
        } catch (error) {
            console.error("PDF generation failure occurred:", error);[cite: 3]
            alert("Error constructing high-definition vector document matrix map. Check logs.");[cite: 3]
        } finally {
            targetElement.style.transform = originalTransform;[cite: 3]
        }
    },

    async exportPng(elementId, filename = 'DUET-Cover-Page.png') {
        const targetElement = document.getElementById(elementId);
        const originalTransform = targetElement.style.transform;[cite: 3]
        targetElement.style.transform = "none";[cite: 3]

        try {
            const canvas = await html2canvas(targetElement, {
                scale: 5, // High sharpness asset multiplier
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff"
            });

            const link = document.createElement('a');[cite: 3]
            link.download = filename;[cite: 3]
            link.href = canvas.toDataURL('image/png');[cite: 3]
            link.click();[cite: 3]
        } catch (error) {
            console.error("Image raster extraction faulted:", error);[cite: 3]
        } finally {
            targetElement.style.transform = originalTransform;[cite: 3]
        }
    }
};
