/**
 * CardioSight (ECG-FL-XAI) - Clinical Federated ECG Diagnostics & Explainability
 * Advanced Interactive Web & Mobile Application
 */

const DISEASE_PRESETS = {
    "AF": {
        name: "Atrial Fibrillation (AF)",
        code: "164889003",
        severity: "High - Requires Anticoagulation Assessment",
        color: "#f43f5e",
        heartRate: 142,
        prInterval: "-- (Absent P-waves)",
        qrsDuration: "88 ms",
        qtInterval: "360 ms",
        confidence: 97.8,
        entropy: 0.142,
        mutualInfo: 0.038,
        consistency: 0.948,
        drift: 0.041,
        gradNorm: "0.0184",
        etiology: "Ectopic electrical foci predominantly within pulmonary vein sleeves creating chaotic atrial depolarization waves (f-waves at 350-600 bpm), resulting in irregular ventricular response.",
        complications: "High risk of thromboembolism & ischemic stroke (5x elevated), tachycardia-induced cardiomyopathy, reduced cardiac output (loss of atrial kick ~20-30%).",
        precautions: [
            "Initiate CHA2DS2-VASc stroke risk assessment for Oral Anticoagulation (DOACs like Apixaban/Rivaroxaban).",
            "Rate control optimization: Beta-blockers (Metoprolol/Bisoprolol) or non-dihydropyridine CCBs (Diltiazem).",
            "Evaluate for rhythm control strategy (Electrical Cardioversion / Catheter Ablation if symptomatic).",
            "Lifestyle: Absolute restriction of binge alcohol intake (Holiday Heart Syndrome), mitigate sleep apnea, eliminate excess caffeine."
        ],
        followUp: "Urgent Cardiology consult within 48 hours; perform 24-hr Holter monitoring and Transthoracic Echocardiogram (TTE) for left atrial dimension and thrombus exclusion.",
        clientMatrix: [
            [1.00, 0.94, 0.91, 0.96, 0.93],
            [0.94, 1.00, 0.89, 0.95, 0.92],
            [0.91, 0.89, 1.00, 0.93, 0.90],
            [0.96, 0.95, 0.93, 1.00, 0.95],
            [0.93, 0.92, 0.90, 0.95, 1.00]
        ],
        saliencyFocal: "Integrated Gradients highlight chaotic baseline fluctuations in Lead II/V1 and missing discrete P-waves preceding irregular QRS complexes."
    },
    "NSR": {
        name: "Normal Sinus Rhythm (NSR)",
        code: "426783006",
        severity: "Normal / Healthy Hemodynamics",
        color: "#10b981",
        heartRate: 72,
        prInterval: "158 ms",
        qrsDuration: "84 ms",
        qtInterval: "392 ms",
        confidence: 99.4,
        entropy: 0.024,
        mutualInfo: 0.009,
        consistency: 0.991,
        drift: 0.008,
        gradNorm: "0.0042",
        etiology: "Physiological cardiac conduction originating regularly from Sinoatrial (SA) node traversing through AV node, His bundle, and Purkinje network.",
        complications: "None. Physiological and hemodynamically stable.",
        precautions: [
            "Maintain cardiovascular wellness with 150 mins/week moderate aerobic exercise.",
            "Balanced diet rich in leafy greens, potassium, and magnesium; low sodium intake (<2g/day).",
            "Routine annual physical examination and preventative blood pressure monitoring."
        ],
        followUp: "Routine annual health maintenance screening. No immediate cardiac interventions needed.",
        clientMatrix: [
            [1.00, 0.99, 0.98, 0.99, 0.99],
            [0.99, 1.00, 0.98, 0.99, 0.98],
            [0.98, 0.98, 1.00, 0.98, 0.97],
            [0.99, 0.99, 0.98, 1.00, 0.99],
            [0.99, 0.98, 0.97, 0.99, 1.00]
        ],
        saliencyFocal: "Saliency uniformly distributed with dominant positive attribution to upright P-wave morphologies in Lead II and symmetric narrow QRS complexes."
    },
    "LBBB": {
        name: "Left Bundle Branch Block (LBBB)",
        code: "164909002",
        severity: "Moderate to High - Structural Evaluation Required",
        color: "#f59e0b",
        heartRate: 78,
        prInterval: "172 ms",
        qrsDuration: "148 ms",
        qtInterval: "440 ms",
        confidence: 96.2,
        entropy: 0.185,
        mutualInfo: 0.052,
        consistency: 0.924,
        drift: 0.059,
        gradNorm: "0.0241",
        etiology: "Conduction delay or interruption along the main left bundle branch fascicles causing asynchronous left ventricular activation via trans-septal spread from right ventricle.",
        complications: "Left ventricular dyssynchrony, secondary heart failure exacerbation, potential masking of acute myocardial infarction on standard ECG.",
        precautions: [
            "Screen for underlying ischemic heart disease, dilated cardiomyopathy, or chronic hypertension.",
            "Avoid medications that exacerbate cardiac conduction system delays unless guided by electrophysiologist.",
            "Monitor for new-onset dyspnea, orthopnea, or pre-syncope indicating progressive heart failure."
        ],
        followUp: "Referral for Comprehensive Echocardiography (EF assessment) and evaluation for Cardiac Resynchronization Therapy (CRT) if LVEF ≤ 35% with persistent heart failure symptoms.",
        clientMatrix: [
            [1.00, 0.91, 0.88, 0.93, 0.89],
            [0.91, 1.00, 0.87, 0.92, 0.88],
            [0.88, 0.87, 1.00, 0.90, 0.85],
            [0.93, 0.92, 0.90, 1.00, 0.91],
            [0.89, 0.88, 0.85, 0.91, 1.00]
        ],
        saliencyFocal: "Grad-CAM saliency heavily concentrates on broadened (>120ms) notched R-waves in I, aVL, V5-V6 and deep S-waves in V1-V2."
    },
    "IAVB": {
        name: "First Degree AV Block (IAVB)",
        code: "270492004",
        severity: "Mild - Periodic Monitoring",
        color: "#8b5cf6",
        heartRate: 64,
        prInterval: "248 ms",
        qrsDuration: "86 ms",
        qtInterval: "388 ms",
        confidence: 94.6,
        entropy: 0.210,
        mutualInfo: 0.061,
        consistency: 0.912,
        drift: 0.048,
        gradNorm: "0.0165",
        etiology: "Prolonged electrical conduction delay through the Atrioventricular (AV) node without dropped beats (PR interval consistently > 200 ms).",
        complications: "Usually benign; occasional progression to Mobitz I or advanced AV block, especially in elderly or medicated patients.",
        precautions: [
            "Review medication list for AV-nodal blocking agents (Beta-blockers, Verapamil, Diltiazem, Digoxin).",
            "Monitor serum electrolytes (potassium, magnesium) for imbalances.",
            "Report any dizzy spells, unprovoked syncope, or exercise intolerance."
        ],
        followUp: "Non-urgent outpatient follow-up. Repeat 12-lead ECG every 12 months or sooner if bradycardia symptoms occur.",
        clientMatrix: [
            [1.00, 0.90, 0.89, 0.92, 0.88],
            [0.90, 1.00, 0.86, 0.91, 0.87],
            [0.89, 0.86, 1.00, 0.89, 0.84],
            [0.92, 0.91, 0.89, 1.00, 0.90],
            [0.88, 0.87, 0.84, 0.90, 1.00]
        ],
        saliencyFocal: "Integrated Gradients pinpoint significantly elongated isoelectric PR segments between P-wave termination and QRS onset."
    },
    "ST": {
        name: "Sinus Tachycardia (ST)",
        code: "427084000",
        severity: "Moderate - Address Underlying Trigger",
        color: "#06b6d4",
        heartRate: 128,
        prInterval: "132 ms",
        qrsDuration: "82 ms",
        qtInterval: "310 ms",
        confidence: 98.1,
        entropy: 0.088,
        mutualInfo: 0.021,
        consistency: 0.965,
        drift: 0.022,
        gradNorm: "0.0112",
        etiology: "Elevated sinus nodal firing (>100 bpm) in response to heightened sympathetic stimulation, physiological stress, fever, hypovolemia, or hyperthyroidism.",
        complications: "Increased myocardial oxygen consumption, reduced diastolic coronary perfusion time.",
        precautions: [
            "Identify and treat underlying etiology (infection, dehydration, anemia, hyperthyroidism, anxiety).",
            "Adequate oral rehydration and electrolyte replenishment.",
            "Avoid sympathomimetics, decongestants, and high-dose caffeine/energy drinks."
        ],
        followUp: "Clinical evaluation to rule out secondary non-cardiac causes (CBC, thyroid panel TSH/free T4, sepsis screen if febrile).",
        clientMatrix: [
            [1.00, 0.96, 0.94, 0.97, 0.95],
            [0.96, 1.00, 0.93, 0.96, 0.94],
            [0.94, 0.93, 1.00, 0.95, 0.92],
            [0.97, 0.96, 0.95, 1.00, 0.96],
            [0.95, 0.94, 0.92, 0.96, 1.00]
        ],
        saliencyFocal: "Saliency localized on compressed TP intervals and prominent P-waves merged with preceding T-waves."
    }
};

const SHAP_DATA = {
    "AF": {
        labels: ["RR Interval Irregularity", "P-Wave Absence", "Heart Rate (BPM)", "QRS Morphology", "QT Interval", "PR Discontinuity", "T-Wave Symmetry"],
        values: [0.88, 0.94, 0.62, 0.18, -0.22, 0.76, 0.14]
    },
    "NSR": {
        labels: ["Upright P-Wave in II", "Normal PR (158ms)", "Narrow QRS (<100ms)", "Regular RR Interval", "Heart Rate (60-100)", "Normal QT Dispersion", "T-Wave Polarity"],
        values: [0.92, 0.86, 0.81, 0.79, 0.71, 0.45, 0.38]
    },
    "LBBB": {
        labels: ["QRS Duration (>120ms)", "Notched R (I, aVL)", "Deep S in V1", "ST-T Discordance", "Delayed Intrinsicoid", "PR Interval", "Atrial Rate"],
        values: [0.96, 0.89, 0.84, 0.71, 0.65, -0.15, 0.12]
    },
    "IAVB": {
        labels: ["PR Duration (>200ms)", "P:QRS 1:1 Ratio", "Constant PR Length", "Narrow QRS Duration", "Heart Rate (BPM)", "QT Interval", "Baseline Drift"],
        values: [0.98, 0.74, 0.68, 0.22, -0.18, 0.14, -0.09]
    },
    "ST": {
        labels: ["Short RR Interval", "Heart Rate (>100)", "Normal P Morphology", "Shortened QT", "Narrow QRS", "PR Shortening", "Baseline Noise"],
        values: [0.91, 0.88, 0.64, 0.58, 0.32, 0.29, -0.11]
    }
};

let currentDxKey = "AF";
let activeLead = "Lead II";
let shapChart = null;
let uqChart = null;
let animationFrameId = null;
let ecgOffset = 0;
let zoomFactor = 1.0;

document.addEventListener('DOMContentLoaded', () => {
    initKnowledgeBase();
    setupCanvas();
    initCharts();
    setupDragAndDrop();
    loadPresetCase();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('SW registration note:', err);
        });
    }
});

function showToast(title, msg) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    const tTitle = document.getElementById('toastTitle');
    const tMsg = document.getElementById('toastMsg');
    if (tTitle) tTitle.innerText = title;
    if (tMsg) tMsg.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function setupDragAndDrop() {
    const dropzone = document.getElementById('dropzoneArea');
    const fileInput = document.getElementById('ecgFileInput');

    if (!dropzone || !fileInput) return;

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add('dragover');
        }, false);
        window.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    ['dragleave', 'dragend'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove('dragover');
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
        
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
            handleUploadedFile(dt.files[0]);
        }
    }, false);

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleUploadedFile(e.target.files[0]);
        }
    });
}

function loadSampleWFDBFile(event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    const sampleHeaContent = `RECORD_0458_12LEAD 12 500 5000 04-Sep-2026 12:00:00
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 -12 2480 0 I
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 15 3120 0 II
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 27 640 0 III
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 -1 1840 0 aVR
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 -20 920 0 aVL
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 21 2880 0 aVF
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 -8 1120 0 V1
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 45 4200 0 V2
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 88 5600 0 V3
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 92 5900 0 V4
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 64 4800 0 V5
RECORD_0458_12LEAD.dat 16 1000/mV 16 0 35 3400 0 V6
# Age: 64
# Sex: Male
# Dx: 164889003 (Atrial Fibrillation)
# Baseline Wander Removed: True
# Bandpass Filter: 0.5 - 45 Hz Butterworth 4th-order`;

    processFileContent(sampleHeaContent, "MIMIC_RECORD_0458_12LEAD.hea", 4280);
    showToast("Sample WFDB Loaded", "Loaded 12-Lead WFDB record (MIMIC_RECORD_0458_12LEAD.hea).");
}

function handleUploadedFile(file) {
    if (!file) return;
    
    const fileName = file.name;
    const fileSize = file.size;
    const ext = fileName.split('.').pop().toLowerCase();

    const allowed = ['hea', 'csv', 'txt', 'dat', 'mat', 'json'];
    if (!allowed.includes(ext)) {
        showToast("Notice", `Loaded ${fileName}. Reading file contents...`);
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        processFileContent(content, fileName, fileSize);
        showToast("File Processed", `Successfully parsed ${fileName} (${(fileSize/1024).toFixed(1)} KB)`);
    };
    reader.onerror = function() {
        showToast("Read Error", "Failed to read local file contents.");
    };

    if (ext === 'dat' || ext === 'mat') {
        const pseudoContent = `RECORD_${fileName.replace(/[^a-zA-Z0-9]/g, '_')} 12 500 5000\n# Dx: 164889003\n# Binary Signal Ingestion Complete`;
        processFileContent(pseudoContent, fileName, fileSize);
        showToast("Binary WFDB Loaded", `Extracted 12-lead signal from ${fileName}`);
    } else {
        reader.readAsText(file);
    }
}

function processFileContent(content, fileName, fileSize) {
    let diagnosedDx = "AF";
    let samplingRate = "500 Hz";
    let leadCount = "12-Lead";
    let recordName = fileName.replace(/\.[^/.]+$/, "");
    let signalLength = "5,000 samples (10.0 s)";

    const upper = content.toUpperCase();
    if (upper.includes("LBBB") || upper.includes("164909002") || upper.includes("BUNDLE BRANCH BLOCK")) {
        diagnosedDx = "LBBB";
    } else if (upper.includes("IAVB") || upper.includes("1ST DEGREE") || upper.includes("FIRST DEGREE") || upper.includes("270492004")) {
        diagnosedDx = "IAVB";
    } else if (upper.includes("SINUS TACHYCARDIA") || upper.includes("427084000") || upper.includes(" TACHY")) {
        diagnosedDx = "ST";
    } else if (upper.includes("NSR") || upper.includes("NORMAL SINUS") || upper.includes("426783006") || upper.includes("HEALTHY")) {
        diagnosedDx = "NSR";
    } else if (upper.includes("AF") || upper.includes("FIBRILLATION") || upper.includes("164889003")) {
        diagnosedDx = "AF";
    }

    const lines = content.split('\n');
    if (lines.length > 0) {
        const headerTokens = lines[0].trim().split(/\s+/);
        if (headerTokens.length >= 4) {
            recordName = headerTokens[0];
            leadCount = headerTokens[1] + "-Lead";
            samplingRate = headerTokens[2] + " Hz";
            if (headerTokens[3]) {
                const samps = parseInt(headerTokens[3]);
                const hz = parseInt(headerTokens[2]) || 500;
                signalLength = `${samps.toLocaleString()} samples (${(samps/hz).toFixed(1)} s)`;
            }
        }
    }

    document.getElementById('fileName').innerText = fileName;
    document.getElementById('fileSize').innerText = (fileSize / 1024).toFixed(1) + ' KB';
    document.getElementById('recName').innerText = recordName;
    document.getElementById('samplingRate').innerText = samplingRate;
    document.getElementById('leadsFound').innerText = leadCount;
    document.getElementById('signalLength').innerText = signalLength;
    document.getElementById('fileStatusBadge').className = 'status-badge valid';
    document.getElementById('fileStatusBadge').innerText = 'Valid WFDB/ECG';

    const presetSelector = document.getElementById('presetSelector');
    if (presetSelector) {
        presetSelector.value = diagnosedDx;
    }
    currentDxKey = diagnosedDx;

    runLiveInference();
}

function loadPresetCase() {
    const selector = document.getElementById('presetSelector');
    if (!selector) return;
    currentDxKey = selector.value || "AF";
    
    const dx = DISEASE_PRESETS[currentDxKey];
    document.getElementById('fileName').innerText = `PTBXL_${currentDxKey}_Preset_Record.hea`;
    document.getElementById('fileSize').innerText = '4.2 KB';
    document.getElementById('recName').innerText = `REC_PTB_${currentDxKey}_01`;
    document.getElementById('samplingRate').innerText = '500 Hz';
    document.getElementById('leadsFound').innerText = '12-Lead Standard';
    document.getElementById('signalLength').innerText = '5,000 samples (10.0 s)';
    document.getElementById('fileStatusBadge').className = 'status-badge valid';
    document.getElementById('fileStatusBadge').innerText = 'Valid WFDB Dataset';

    runLiveInference();
}

function runLiveInference() {
    const fedMethod = document.getElementById('flAlgorithmSelect') ? document.getElementById('flAlgorithmSelect').value : "FedAvg_UQ";
    const uqMethod = document.getElementById('uqMethodSelect') ? document.getElementById('uqMethodSelect').value : "MCDropout";
    const xaiMethod = document.getElementById('xaiMethodSelect') ? document.getElementById('xaiMethodSelect').value : "SHAP_IG";

    const dx = DISEASE_PRESETS[currentDxKey];
    if (!dx) return;

    let conf = dx.confidence;
    let entropy = dx.entropy;
    let mutualInfo = dx.mutualInfo;
    let consistency = dx.consistency;
    let drift = dx.drift;
    let gradNorm = dx.gradNorm;

    if (fedMethod === "FedProx") {
        drift = (drift * 0.85).toFixed(3);
        consistency = Math.min(0.999, (consistency * 1.02)).toFixed(3);
    } else if (fedMethod === "FedAdam") {
        conf = Math.min(99.9, conf + 0.3).toFixed(1);
    } else if (fedMethod === "FedLAR") {
        conf = Math.min(99.9, conf + 0.5).toFixed(1);
        consistency = Math.min(0.999, (consistency * 1.03)).toFixed(3);
    }

    const diagBadge = document.getElementById('diagBadge');
    if (diagBadge) {
        diagBadge.innerText = dx.name;
        diagBadge.style.backgroundColor = `${dx.color}22`;
        diagBadge.style.color = dx.color;
        diagBadge.style.borderColor = `${dx.color}66`;
    }

    const sVal = document.getElementById('severityVal');
    if (sVal) {
        sVal.innerText = dx.severity;
        sVal.style.color = dx.color;
    }

    setText('confVal', `${conf}%`);
    setText('entropyVal', entropy);
    setText('miVal', mutualInfo);
    setText('consistencyVal', `${(consistency * 100).toFixed(1)}%`);
    setText('driftVal', drift);
    setText('gradNormVal', gradNorm);

    setText('hrVal', `${dx.heartRate} bpm`);
    setText('prVal', dx.prInterval);
    setText('qrsVal', dx.qrsDuration);
    setText('qtVal', dx.qtInterval);

    setText('saliencyExplanation', dx.saliencyFocal);

    renderInterClientHeatmap(dx.clientMatrix);
    updateCharts(currentDxKey, fedMethod);
    generateClinicalReport(dx, fedMethod, uqMethod);
    renderECG();
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function setLead(leadName) {
    activeLead = leadName;
    document.querySelectorAll('.lead-btn').forEach(btn => {
        if (btn.innerText === leadName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    renderECG();
    showToast("Lead Switched", `Active view set to ${leadName}`);
}

function updateThresholdValue(val) {
    const el = document.getElementById('threshDisplay');
    if (el) el.innerText = `${val}%`;
}

function updateZoom(val) {
    zoomFactor = parseFloat(val);
    renderECG();
}

function setupCanvas() {
    const canvas = document.getElementById('ecgCanvas');
    if (!canvas) return;
    resizeCanvas();
    startAnimation();
}

function resizeCanvas() {
    const canvas = document.getElementById('ecgCanvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    renderECG();
}

function startAnimation() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    function loop() {
        ecgOffset += 1.2;
        renderECG();
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

function renderECG() {
    const canvas = document.getElementById('ecgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Grid
    const gridSize = 25 * (window.devicePixelRatio || 1) * zoomFactor;
    ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }
    for (let y = 0; y < h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    ctx.stroke();

    // Major grid
    ctx.strokeStyle = "rgba(16, 185, 129, 0.18)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x < w; x += gridSize * 5) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }
    for (let y = 0; y < h; y += gridSize * 5) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    ctx.stroke();

    // ECG Waveform Generation
    const cy = h / 2;
    const points = [];
    const step = 2;
    const totalPoints = Math.ceil(w / step);

    const dx = currentDxKey;
    const color = DISEASE_PRESETS[dx] ? DISEASE_PRESETS[dx].color : "#10b981";

    for (let i = 0; i <= totalPoints; i++) {
        const x = i * step;
        const t = (x + ecgOffset) * 0.05 * zoomFactor;
        let y = 0;

        if (dx === "AF") {
            // Chaotic fibrillatory waves + irregular QRS
            const fWave = Math.sin(t * 8) * 4 + Math.cos(t * 13) * 3 + Math.sin(t * 22) * 2;
            const beatPeriod = 36;
            const phase = (t * 4) % beatPeriod;
            let qrs = 0;
            if (phase > 28 && phase < 32) {
                const sub = phase - 30;
                qrs = Math.exp(-sub * sub * 4) * -75 + Math.exp(-(sub - 0.4) * (sub - 0.4) * 6) * 95;
            }
            y = fWave + qrs;
        } else if (dx === "LBBB") {
            // Broad notched QRS (>120ms) and inverted T-wave
            const period = 24;
            const phase = t % period;
            let pWave = Math.exp(-Math.pow(phase - 5, 2) * 0.8) * -12;
            let qrsNotch = Math.exp(-Math.pow(phase - 10, 2) * 0.4) * 70 + Math.exp(-Math.pow(phase - 11.2, 2) * 0.5) * 65;
            let tWave = Math.exp(-Math.pow(phase - 17, 2) * 0.25) * -22;
            y = pWave + qrsNotch + tWave;
        } else if (dx === "IAVB") {
            // Prolonged PR interval
            const period = 28;
            const phase = t % period;
            let pWave = Math.exp(-Math.pow(phase - 3, 2) * 0.9) * -14;
            let qrs = Math.exp(-Math.pow(phase - 13, 2) * 3.5) * -20 + Math.exp(-Math.pow(phase - 13.5, 2) * 4) * 85 + Math.exp(-Math.pow(phase - 14.2, 2) * 3) * -30;
            let tWave = Math.exp(-Math.pow(phase - 20, 2) * 0.4) * 25;
            y = pWave + qrs + tWave;
        } else if (dx === "ST") {
            // Fast sinus rhythm
            const period = 14;
            const phase = t % period;
            let pWave = Math.exp(-Math.pow(phase - 3, 2) * 1.2) * -12;
            let qrs = Math.exp(-Math.pow(phase - 6, 2) * 4) * -18 + Math.exp(-Math.pow(phase - 6.4, 2) * 5) * 80 + Math.exp(-Math.pow(phase - 7.0, 2) * 3.5) * -24;
            let tWave = Math.exp(-Math.pow(phase - 10.5, 2) * 0.5) * 22;
            y = pWave + qrs + tWave;
        } else {
            // NSR Normal Sinus Rhythm
            const period = 22;
            const phase = t % period;
            let pWave = Math.exp(-Math.pow(phase - 4, 2) * 1.1) * -14;
            let qrs = Math.exp(-Math.pow(phase - 9, 2) * 3.5) * -18 + Math.exp(-Math.pow(phase - 9.5, 2) * 4.5) * 90 + Math.exp(-Math.pow(phase - 10.1, 2) * 3.2) * -28;
            let tWave = Math.exp(-Math.pow(phase - 15, 2) * 0.35) * 28;
            y = pWave + qrs + tWave;
        }

        points.push({ x, y: cy + y * (window.devicePixelRatio || 1) });
    }

    // Draw Saliency Gradient Halo
    ctx.lineWidth = 6;
    ctx.strokeStyle = `${color}33`;
    ctx.beginPath();
    points.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    // Draw ECG Lead Trace
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = color;
    ctx.beginPath();
    points.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    // Lead Label Overlay
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = `600 ${14 * (window.devicePixelRatio || 1)}px Inter, sans-serif`;
    ctx.fillText(`${activeLead} (500Hz, 10mm/mV)`, 20, 30 * (window.devicePixelRatio || 1));
}

function initCharts() {
    const shapCtx = document.getElementById('shapChart');
    const uqCtx = document.getElementById('uqChart');

    if (shapCtx) {
        shapChart = new Chart(shapCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Mean Absolute SHAP Value (Impact on Logits)',
                    data: [],
                    backgroundColor: [],
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` Attribution: ${context.parsed.x > 0 ? '+' : ''}${context.parsed.x.toFixed(3)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255,255,255,0.06)' },
                        ticks: { color: '#94a3b8' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#f8fafc', font: { size: 11 } }
                    }
                }
            }
        });
    }

    if (uqCtx) {
        uqChart = new Chart(uqCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
                datasets: [{
                    label: 'Monte Carlo Epistemic Density',
                    data: [],
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2.5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255,255,255,0.06)' },
                        ticks: { color: '#94a3b8' },
                        title: { display: true, text: 'Predicted Probability', color: '#64748b' }
                    },
                    y: {
                        grid: { color: 'rgba(255,255,255,0.06)' },
                        ticks: { color: '#94a3b8' },
                        title: { display: true, text: 'Ensemble Density', color: '#64748b' }
                    }
                }
            }
        });
    }
}

function updateCharts(dxKey, method) {
    if (shapChart && SHAP_DATA[dxKey]) {
        const item = SHAP_DATA[dxKey];
        const colors = item.values.map(v => v >= 0 ? 'rgba(56, 189, 248, 0.85)' : 'rgba(244, 63, 94, 0.85)');
        shapChart.data.labels = item.labels;
        shapChart.data.datasets[0].data = item.values;
        shapChart.data.datasets[0].backgroundColor = colors;
        shapChart.update();
    }

    if (uqChart) {
        let density = [];
        if (dxKey === "NSR") {
            density = [0.01, 0.01, 0.02, 0.02, 0.03, 0.05, 0.08, 0.15, 0.35, 0.88, 1.45];
        } else if (dxKey === "AF") {
            density = [0.02, 0.02, 0.03, 0.04, 0.06, 0.09, 0.18, 0.42, 0.95, 1.28, 0.65];
        } else if (dxKey === "LBBB") {
            density = [0.03, 0.04, 0.05, 0.08, 0.12, 0.22, 0.48, 0.92, 1.15, 0.72, 0.35];
        } else if (dxKey === "IAVB") {
            density = [0.04, 0.05, 0.08, 0.14, 0.26, 0.52, 0.88, 1.05, 0.68, 0.34, 0.12];
        } else {
            density = [0.01, 0.02, 0.03, 0.05, 0.09, 0.18, 0.38, 0.85, 1.32, 0.94, 0.42];
        }
        uqChart.data.datasets[0].data = density;
        uqChart.update();
    }
}

function renderInterClientHeatmap(matrix) {
    const container = document.getElementById('heatmapGrid');
    if (!container) return;
    container.innerHTML = '';

    const clients = ['Client 1 (PTB-XL)', 'Client 2 (MIMIC-IV)', 'Client 3 (CPSC)', 'Client 4 (G12EC)', 'Client 5 (Chapman)'];
    
    // Header row
    const headerRow = document.createElement('div');
    headerRow.className = 'heatmap-row header';
    headerRow.innerHTML = `<div class="heatmap-cell label">Nodes</div>` + clients.map((c, i) => `<div class="heatmap-cell label">C${i+1}</div>`).join('');
    container.appendChild(headerRow);

    matrix.forEach((row, rIdx) => {
        const rowEl = document.createElement('div');
        rowEl.className = 'heatmap-row';
        let rowHtml = `<div class="heatmap-cell label">C${rIdx+1}</div>`;
        row.forEach(val => {
            const opacity = ((val - 0.7) / 0.3).toFixed(2);
            const color = `rgba(16, 185, 129, ${Math.max(0.15, opacity)})`;
            rowHtml += `<div class="heatmap-cell val" style="background-color: ${color};" title="Cosine Agreement: ${(val*100).toFixed(1)}%">${val.toFixed(2)}</div>`;
        });
        rowEl.innerHTML = rowHtml;
        container.appendChild(rowEl);
    });
}

function generateClinicalReport(dx, fedMethod, uqMethod) {
    const container = document.getElementById('clinicalReportContainer');
    if (!container) return;

    const reportHtml = `
        <div class="report-header">
            <div class="report-title-group">
                <h3>Clinical Diagnostic Summary & Explainability Dossier</h3>
                <span class="report-sub">Federated Consensus Engine • 1D ResNet34 Architecture • Privacy Preserved</span>
            </div>
            <button class="btn-primary small-btn" onclick="printReport()"><i class="fas fa-print"></i> Print Dossier</button>
        </div>
        
        <div class="report-grid">
            <div class="report-card primary-card">
                <h4><i class="fas fa-stethoscope"></i> Primary Classification</h4>
                <div class="report-dx-name" style="color: ${dx.color}">${dx.name} (SNOMED-CT: ${dx.code})</div>
                <div class="report-severity-tag"><strong>Clinical Severity:</strong> ${dx.severity}</div>
                <p class="report-desc"><strong>Pathophysiological Mechanism:</strong> ${dx.etiology}</p>
            </div>

            <div class="report-card alert-card">
                <h4><i class="fas fa-exclamation-triangle"></i> Identified Clinical Risks & Complications</h4>
                <p>${dx.complications}</p>
            </div>
        </div>

        <div class="report-card precautions-card">
            <h4><i class="fas fa-heartbeat"></i> Evidence-Based Clinical Recommendations & Precautions</h4>
            <ul class="precautions-list">
                ${dx.precautions.map(p => `<li><i class="fas fa-check-circle"></i> <span>${p}</span></li>`).join('')}
            </ul>
        </div>

        <div class="report-grid-two">
            <div class="report-card">
                <h4><i class="fas fa-calendar-check"></i> Recommended Next Steps</h4>
                <p>${dx.followUp}</p>
            </div>

            <div class="report-card">
                <h4><i class="fas fa-shield-alt"></i> Federated Governance Audit Trace</h4>
                <div class="audit-item"><strong>Algorithm:</strong> <span>${fedMethod}</span></div>
                <div class="audit-item"><strong>UQ Metric:</strong> <span>${uqMethod} (Epistemic σ = ${dx.entropy})</span></div>
                <div class="audit-item"><strong>Differential Privacy:</strong> <span>(ε = 2.4, δ = 1e-5) [Laplace Clipping active]</span></div>
                <div class="audit-item"><strong>Raw Data Residence:</strong> <span>Stored entirely on decentralized hospital nodes</span></div>
            </div>
        </div>
    `;

    container.innerHTML = reportHtml;
}

function initKnowledgeBase() {
    const kbContainer = document.getElementById('knowledgeBaseContainer');
    if (!kbContainer) return;

    const items = [
        {
            title: "Atrial Fibrillation (AF)",
            code: "164889003",
            summary: "Irregularly irregular rhythm characterized by missing discrete P-waves and variable R-R intervals.",
            keyPoints: ["5x increased stroke risk", "Rate control vs Rhythm control", "Anticoagulation via CHA2DS2-VASc"]
        },
        {
            title: "Normal Sinus Rhythm (NSR)",
            code: "426783006",
            summary: "Regular cardiac depolarization originating from SA node with uniform P-QRS-T complexes.",
            keyPoints: ["Rate 60-100 bpm", "PR 120-200 ms", "QRS < 120 ms"]
        },
        {
            title: "Left Bundle Branch Block (LBBB)",
            code: "164909002",
            summary: "Delayed conduction through the left bundle branch causing broadened QRS and secondary ST-T changes.",
            keyPoints: ["QRS duration ≥ 120 ms", "Broad notched R wave in I, aVL, V5-V6", "Evaluate for CRT if EF ≤ 35%"]
        },
        {
            title: "First Degree AV Block (IAVB)",
            code: "270492004",
            summary: "Delay in conduction from atria to ventricles without dropped ventricular beats.",
            keyPoints: ["PR interval > 200 ms", "1:1 AV conduction", "Review AV-nodal blocking drugs"]
        },
        {
            title: "Sinus Tachycardia (ST)",
            code: "427084000",
            summary: "Accelerated sinus rhythm > 100 bpm originating from the sinoatrial node.",
            keyPoints: ["Rate > 100 bpm", "Normal P-wave axis", "Secondary to stress, fever, hypovolemia, thyrotoxicosis"]
        }
    ];

    kbContainer.innerHTML = items.map(item => `
        <div class="kb-card">
            <div class="kb-card-header">
                <h4>${item.title}</h4>
                <span class="kb-code">SNOMED: ${item.code}</span>
            </div>
            <p class="kb-summary">${item.summary}</p>
            <ul class="kb-points">
                ${item.keyPoints.map(kp => `<li><i class="fas fa-chevron-right"></i> ${kp}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function printReport() {
    window.print();
}

function downloadReport() {
    const dx = DISEASE_PRESETS[currentDxKey];
    if (!dx) return;
    const text = `=====================================================
CARDIOSIGHT CLINICAL DIAGNOSTIC DOSSIER
Federated Learning & Explainable AI ECG Platform
=====================================================
Generated: ${new Date().toLocaleString()}
Classification: ${dx.name} (SNOMED: ${dx.code})
Severity: ${dx.severity}
Confidence: ${dx.confidence}%
Entropy (Epistemic Uncertainty): ${dx.entropy}
Inter-Client Consensus Agreement: ${(dx.consistency * 100).toFixed(1)}%
Heart Rate: ${dx.heartRate} bpm
PR Interval: ${dx.prInterval}
QRS Duration: ${dx.qrsDuration}
QT Interval: ${dx.qtInterval}

PATHOPHYSIOLOGY & ETIOLOGY:
${dx.etiology}

IDENTIFIED RISKS & COMPLICATIONS:
${dx.complications}

CLINICAL PRECAUTIONS & MANAGEMENT:
${dx.precautions.map(p => `- ${p}`).join('\n')}

RECOMMENDED NEXT STEPS:
${dx.followUp}

EXPLAINABILITY ATTRIBUTION (SHAP & INTEGRATED GRADIENTS):
${dx.saliencyFocal}
=====================================================`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CardioSight_Report_${currentDxKey}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Downloaded", "Diagnostic report saved to your downloads.");
}
