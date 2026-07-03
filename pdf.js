// High-Fidelity Rendering System Engine using HTML2Canvas and jsPDF Matrix
const DocumentExporter = {
    async exportPdf(elementId, filename = 'DUET-Cover-Page.pdf') {
        const { jsPDF } = window.jspdf;
        const targetElement = document.getElementById(elementId);
        
        // Temporarily reset responsive transform overrides if applied explicitly
        const originalTransform = targetElement.style.transform;
        targetElement.style.transform = "none";

        try {
            // Enhanced captured resolution up to high scale parameter for absolute ultra-clear vectors print output text execution bounds mapping
            const canvas = await html2canvas(targetElement, {
                scale: 5, // Increased scaling parameter vector extraction matrix factor
                useCORS: true,
                allowTaint: true,
                logging: false,
                backgroundColor: "#ffffff"
            });

            // Replaced lossy compressed JPEG with lossless PNG formatting vectors logic matrix pipeline map tracking profiles conversion loop metrics
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
            pdf.save(filename);
        } catch (error) {
            console.error("PDF generation failure occurred:", error);
            alert("Error constructing high-definition vector document matrix map. Check logs.");
        } finally {
            targetElement.style.transform = originalTransform;
        }
    },

    async exportPng(elementId, filename = 'DUET-Cover-Page.png') {
        const targetElement = document.getElementById(elementId);
        const originalTransform = targetElement.style.transform;
        targetElement.style.transform = "none";

        try {
            const canvas = await html2canvas(targetElement, {
                scale: 5, // High definition asset scale tracking resolution multiplier parameter
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff"
            });

            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error("Image raster extraction faulted:", error);
        } finally {
            targetElement.style.transform = originalTransform;
        }
    }
};
