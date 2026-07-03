// Main Orchestration Controller Engine
document.addEventListener("DOMContentLoaded", () => {
    // Form Node bindings
    const form = document.getElementById("coverForm");
    const inputs = form.querySelectorAll("input, select, textarea");
    
    // Auto-Populate Autocomplete Form Controls
    const populateDatalists = () => {
        const deptList = document.getElementById("deptOptions");
        if (deptList && typeof DUET_DATA_HUB !== "undefined") {
            DUET_DATA_HUB.departments.forEach(d => {
                let opt = document.createElement("option");
                opt.value = d;
                deptList.appendChild(opt);
            });
        }

        const teacherList = document.getElementById("teacherOptions");
        if (teacherList && typeof DUET_DATA_HUB !== "undefined") {
            DUET_DATA_HUB.teachers.forEach(t => {
                let opt = document.createElement("option");
                opt.value = t.name;
                teacherList.appendChild(opt);
            });
        }
    };

    // Auto Font Resizing Engine for dynamic text parameters
    const autoResizeText = (element, maxFontSize = 24, minFontSize = 12) => {
        let size = maxFontSize;
        element.style.fontSize = size + "pt";
        while (element.scrollHeight > element.offsetHeight && size > minFontSize) {
            size--;
            element.style.fontSize = size + "pt";
        }
    };

    // Safe Data Binding Loop updating View Canvas elements synchronously
    const bindLivePreview = () => {
        // Map form IDs to target Element DOM strings directly (Updated to include teacherUniv)
        const mapping = {
            "deptInput": "viewDept",
            "courseCode": "viewCourseCode",
            "courseTitle": "viewCourseTitle",
            "expTitle": "viewExpTitle",
            "studentName": "viewStudentName",
            "studentId": "viewStudentId",
            "year": "viewYear",
            "semester": "viewSemester",
            "session": "viewSession",
            "teacherName": "viewTeacherName",
            "teacherDesignation": "viewTeacherDesg",
            "teacherDept": "viewTeacherDept",
            "teacherUniv": "viewTeacherUniv",
            "expDate": "viewExpDate",
            "subDate": "viewSubDate"
        };

        Object.keys(mapping).forEach(id => {
            const inputEl = document.getElementById(id);
            const viewEl = document.getElementById(mapping[id]);
            
            if (inputEl && viewEl) {
                const handler = () => {
                    let val = inputEl.value;
                    // Format output checks
                    if ((id === 'expDate' || id === 'subDate') && val) {
                        const d = new Date(val);
                        val = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                    }
                    viewEl.innerText = val || "—";
                    
                    if (id === 'expTitle') {
                        autoResizeText(viewEl, 19, 10);
                    }
                };

                inputEl.addEventListener("input", handler);
                inputEl.addEventListener("change", handler);
            }
        });

        // Setup autocomplete event behaviors directly mapped to teacher/course lists
        const teacherNameInput = document.getElementById("teacherName");
        if (teacherNameInput) {
            teacherNameInput.addEventListener("change", (e) => {
                if (typeof DUET_DATA_HUB !== "undefined") {
                    const match = DUET_DATA_HUB.teachers.find(t => t.name === e.target.value);
                    if (match) {
                        document.getElementById("teacherDesignation").value = match.designation;
                        document.getElementById("teacherDept").value = match.dept;
                        // Dispatch event updates to fire live sync cycles refresh
                        document.getElementById("teacherDesignation").dispatchEvent(new Event('input'));
                        document.getElementById("teacherDept").dispatchEvent(new Event('input'));
                    }
                }
            });
        }

        const courseCodeInput = document.getElementById("courseCode");
        if (courseCodeInput) {
            courseCodeInput.addEventListener("input", (e) => {
                if (typeof DUET_DATA_HUB !== "undefined") {
                    const match = DUET_DATA_HUB.courses.find(c => c.code.toLowerCase() === e.target.value.toLowerCase().trim());
                    if (match) {
                        document.getElementById("courseTitle").value = match.title;
                        document.getElementById("courseTitle").dispatchEvent(new Event('input'));
                    }
                }
            });
        }
    };

    // Custom Canvas Logo Uploader Handler Matrix
    const logoUploadInput = document.getElementById("logoUpload");
    if (logoUploadInput) {
        logoUploadInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    document.getElementById("previewLogo").src = event.target.result;
                    document.getElementById("previewLogo").style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Local Storage Autosave Systems Pipeline Functions
    const saveStateToLocalStorage = () => {
        const state = {};
        inputs.forEach(input => {
            if (input.type !== 'file') state[input.id] = input.value;
        });
        localStorage.setItem("duet_cover_autosave", JSON.stringify(state));
    };

    const loadStateFromLocalStorage = () => {
        const saved = localStorage.getItem("duet_cover_autosave");
        if (saved) {
            try {
                const state = JSON.parse(saved);
                Object.keys(state).forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.value = state[id];
                        el.dispatchEvent(new Event('input'));
                    }
                });
            } catch (e) { console.error("Error restoration parsing:", e); }
        }
    };

    // Trigger local tracking auto saves across interactions
    form.addEventListener("input", saveStateToLocalStorage);

    // Export Controls Wire up
    document.getElementById("btnPdf").addEventListener("click", () => DocumentExporter.exportPdf("a4Page"));
    document.getElementById("btnPng").addEventListener("click", () => DocumentExporter.exportPng("a4Page"));
    document.getElementById("btnPrint").addEventListener("click", () => window.print());
    
    document.getElementById("btnReset").addEventListener("click", (e) => {
        e.preventDefault();
        form.reset();
        localStorage.removeItem("duet_cover_autosave");
        inputs.forEach(i => i.dispatchEvent(new Event('input')));
        // Locked to the configured image asset profile corresponding to image_f85cf0.png
        document.getElementById("previewLogo").src = "logo.png";
    });

    // Data Actions Engine Setup configurations
    document.getElementById("btnCopy").addEventListener("click", (e) => {
        e.preventDefault();
        let extractStr = "";
        inputs.forEach(i => {
            if(i.type !== 'file' && i.value) {
                extractStr += `${i.placeholder || i.id}: ${i.value}\n`;
            }
        });
        navigator.clipboard.writeText(extractStr);
        alert("Cover Page configuration metrics copied safely to clipboard context.");
    });

    document.getElementById("btnSaveJson").addEventListener("click", (e) => {
        e.preventDefault();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem("duet_cover_autosave") || "{}");
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", "duet_cover_config.json");
        dlAnchor.click();
    });

    document.getElementById("btnLoadJson").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                localStorage.setItem("duet_cover_autosave", evt.target.result);
                loadStateFromLocalStorage();
            };
            reader.readAsText(file);
        }
    });

    // Initialization Sequence
    populateDatalists();
    bindLivePreview();
    loadStateFromLocalStorage();

    // Fire baseline initialization layout frame ticks
    inputs.forEach(i => i.dispatchEvent(new Event('input')));
});
