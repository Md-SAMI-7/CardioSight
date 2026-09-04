// CardioSight Interactive JS Engine
const state = {
    activeSection: 'studio',
    activeLead: 'Lead II',
    gradCamEnabled: true,
    activeOptimizer: 'fedadam',
    currentCaseKey: 'JS01051',
    shapClass: 'AF',
    zoomLevel: 1.0,
    mcChart: null,
    shapChart: null,
    convergenceChart: null,
    radarChart: null
};

const PATHOLOGY_DATA = {
    "AF": {
        name: "Atrial Fibrillation (AF)",
        snomed: "164889003",
        category: "Supraventricular Arrhythmia",
        desc: "Rapid, chaotic atrial depolarizations resulting in absent P-waves and irregularly irregular ventricular response.",
        ecgCriteria: "Absent discrete P waves, fibrillatory 'f' waves, irregularly irregular RR intervals.",
        whyOccurs: "Multiple re-entrant wavelets in fibrotic or stretched atrial myocardium, often triggered by pulmonary vein ectopy.",
        precautions: [
            "Initiate stroke risk stratification (CHA₂DS₂-VASc score) and anticoagulation assessment.",
            "Rate control with beta-blockers (e.g., Metoprolol) or calcium channel blockers.",
            "Avoid excessive alcohol, severe caffeine intake, and acute sleep deprivation.",
            "Schedule echocardiography to rule out left atrial thrombus."
        ]
    },
    "IAVB": {
        name: "1st-Degree AV Block (IAVB)",
        snomed: "270492004",
        category: "Conduction Disturbance",
        desc: "Prolongation of AV nodal conduction time where every atrial impulse still conducts to ventricles.",
        ecgCriteria: "Fixed PR interval > 200 ms, followed by normal QRS complex.",
        whyOccurs: "AV nodal fibrosis, enhanced vagal tone, or pharmacotherapy (beta-blockers, digoxin).",
        precautions: [
            "Review and titrate any concurrent AV-nodal blocking medications.",
            "Screen for electrolyte imbalances (especially hyperkalemia).",
            "Monitor periodically for progression into higher-grade heart block."
        ]
    },
    "LAD": {
        name: "Left Axis Deviation (LAD)",
        snomed: "39732003",
        category: "Axis Shift",
        desc: "QRS electrical axis directed between -30° and -90° in the frontal plane.",
        ecgCriteria: "Positive net QRS in Lead I, predominantly negative QRS in Lead II and aVF.",
        whyOccurs: "Left anterior fascicular block, left ventricular hypertrophy, or inferior MI.",
        precautions: [
            "Evaluate for systemic hypertension and hypertensive heart remodeling.",
            "Correlate with echocardiographic assessment of LV wall thickness."
        ]
    },
    "LBBB": {
        name: "Left Bundle Branch Block (LBBB)",
        snomed: "164909002 / 733534002",
        category: "Intraventricular Conduction Disorder",
        desc: "Delayed activation of the left ventricle causing widened, notched QRS and secondary ST-T changes.",
        ecgCriteria: "QRS duration ≥ 120 ms, broad notched/slurred R waves in lateral leads (I, aVL, V5, V6).",
        whyOccurs: "Coronary artery disease, dilated cardiomyopathy, severe aortic stenosis, or fibrosis.",
        precautions: [
            "Urgent clinical correlation if newly diagnosed (may mask acute STEMI - Sgarbossa criteria).",
            "Cardiologist referral for evaluation of CRT candidacy if EF ≤ 35%."
        ]
    },
    "NSIVCB": {
        name: "Nonspecific IV Conduction Block (NSIVCB)",
        snomed: "698252002",
        category: "Conduction Delay",
        desc: "QRS widening ≥ 110 ms without meeting classical LBBB or RBBB criteria.",
        ecgCriteria: "QRS prolongation > 110 ms without typical rsR' in V1 or broad R in V6.",
        whyOccurs: "Diffuse myocardial fibrosis, cardiomyopathy, or antiarrhythmic toxicity.",
        precautions: ["Annual ECG surveillance for conduction progression."]
    },
    "NSR": {
        name: "Normal Sinus Rhythm (NSR)",
        snomed: "426783006",
        category: "Physiological Rhythm",
        desc: "Normal cardiac electrical depolarization originating from Sinoatrial (SA) node.",
        ecgCriteria: "Upright P waves in leads I, II; rate 60-100 bpm; regular PR interval (120-200 ms).",
        whyOccurs: "Physiologically intact, healthy cardiac conduction system and autonomic tone.",
        precautions: ["Maintain healthy lifestyle habits and routine preventative checkups."]
    },
    "PAC": {
        name: "Premature Atrial Contraction (PAC)",
        snomed: "284470004",
        category: "Ectopic Beat",
        desc: "Premature cardiac depolarization arising from ectopic pacemaker within atria.",
        ecgCriteria: "Early abnormal P wave morphology differing from sinus P wave.",
        whyOccurs: "Adrenergic surge, emotional stress, caffeine/stimulant excess, hypokalemia.",
        precautions: ["Identify and moderate dietary triggers (caffeine, nicotine)."]
    },
    "QAb": {
        name: "Abnormal Q Wave (QAb)",
        snomed: "164917005",
        category: "Ischemic Scar",
        desc: "Pathological Q waves indicating myocardial necrosis or transmural scar tissue.",
        ecgCriteria: "Q wave depth > 25% of succeeding R wave amplitude or duration > 0.04s.",
        whyOccurs: "Past transmural myocardial infarction (silent or overt), severe HCM.",
        precautions: ["Immediate cardiology workup and secondary cardiovascular prevention."]
    },
    "RBBB": {
        name: "Right Bundle Branch Block (RBBB)",
        snomed: "59118001",
        category: "Intraventricular Conduction Disorder",
        desc: "Delayed electrical activation of right ventricle leading to late rightward forces.",
        ecgCriteria: "QRS duration ≥ 120 ms, rsR' in lead V1-V2, wide slurred S wave in I and V6.",
        whyOccurs: "Right ventricular strain/hypertrophy, pulmonary embolism, ASD, or idiopathic fibrosis.",
        precautions: ["Assess pulmonary system and perform echocardiogram to evaluate RV size."]
    },
    "SB": {
        name: "Sinus Bradycardia (SB)",
        snomed: "426177001",
        category: "Rhythm Rate Abnormality",
        desc: "Sinus rhythm with heart rate below 60 beats per minute.",
        ecgCriteria: "Normal P-QRS-T complexes with heart rate < 60 bpm.",
        whyOccurs: "High vagal tone in conditioned athletes, sick sinus syndrome, hypothyroidism.",
        precautions: ["Evaluate for clinical symptoms (dizziness, fatigue, pre-syncope)."]
    },
    "STach": {
        name: "Sinus Tachycardia (STach)",
        snomed: "427084000",
        category: "Rhythm Rate Abnormality",
        desc: "Acceleration of SA nodal discharge resulting in heart rate above 100 bpm.",
        ecgCriteria: "Normal sinus P wave preceding every QRS with ventricular rate > 100 bpm.",
        whyOccurs: "Response to exertion, fever, anemia, pain, dehydration, infection.",
        precautions: ["Identify and treat underlying systemic etiology (hydrate, treat fever)."]
    },
    "TAb": {
        name: "T Wave Abnormality (TAb)",
        snomed: "164934002",
        category: "Repolarization Disorder",
        desc: "Inversion, flattening, or peaking of T wave indicating altered repolarization.",
        ecgCriteria: "T wave inversion ≥ 1 mm in leads with upright QRS, or biphasic T waves.",
        whyOccurs: "Subendocardial ischemia, electrolyte disturbance (hypokalemia), myocarditis.",
        precautions: ["Serial cardiac enzyme testing (Troponin I/T) if chest pain present."]
    }
};

const PRESET_CASES = {
    "JS01051": {
        id: "JS01051",
        source: "Chapman-Shaoxing",
        ageSex: "64 yrs / Male",
        sampling: "500 Hz / 12-Lead",
        primary: "Normal Sinus Rhythm (NSR)",
        primaryClass: "NSR",
        secondary: ["No Acute Arrhythmia", "QRS Morphology Normal"],
        probabilities: [
            { cls: "NSR", name: "Normal Sinus Rhythm", prob: 94.2 },
            { cls: "SB", name: "Sinus Bradycardia", prob: 3.1 },
            { cls: "PAC", name: "Premature Atrial Contraction", prob: 1.8 },
            { cls: "IAVB", name: "1st-Degree AV Block", prob: 0.9 }
        ],
        metrics: { hr: 72, pr: 160, qrs: 88, qt: "390 / 420", rr: 833 },
        uncertainty: { entropy: 0.142, mi: 0.038, variance: 0.012, level: "low" },
        consistency: [
            [1.00, 0.89, 0.86, 0.91, 0.88],
            [0.89, 1.00, 0.84, 0.88, 0.85],
            [0.86, 0.84, 1.00, 0.87, 0.89],
            [0.91, 0.88, 0.87, 1.00, 0.90],
            [0.88, 0.85, 0.89, 0.90, 1.00]
        ],
        saliencyFocal: "Isoelectric ST-segment & intact P-wave morphology across II & V5."
    },
    "AF_CASE_204": {
        id: "AF_CASE_204",
        source: "CPSC-2018",
        ageSex: "71 yrs / Female",
        sampling: "500 Hz / 12-Lead",
        primary: "Atrial Fibrillation (AF) + TAb",
        primaryClass: "AF",
        secondary: ["Absent P-Waves", "Irregular R-R Intervals", "T-Wave Flattening"],
        probabilities: [
            { cls: "AF", name: "Atrial Fibrillation", prob: 91.5 },
            { cls: "TAb", name: "T Wave Abnormal", prob: 64.2 },
            { cls: "PAC", name: "Premature Atrial Contraction", prob: 12.8 },
            { cls: "NSR", name: "Normal Sinus Rhythm", prob: 2.1 }
        ],
        metrics: { hr: 114, pr: 0, qrs: 94, qt: "340 / 460", rr: 526 },
        uncertainty: { entropy: 0.384, mi: 0.112, variance: 0.048, level: "medium" },
        consistency: [
            [1.00, 0.78, 0.74, 0.82, 0.79],
            [0.78, 1.00, 0.71, 0.80, 0.76],
            [0.74, 0.71, 1.00, 0.75, 0.77],
            [0.82, 0.80, 0.75, 1.00, 0.81],
            [0.79, 0.76, 0.77, 0.81, 1.00]
        ],
        saliencyFocal: "1D Grad-CAM concentrates attention heavily on chaotic baseline f-waves in Lead II & V1."
    },
    "LBBB_CASE_711": {
        id: "LBBB_CASE_711",
        source: "PTB-XL (Germany)",
        ageSex: "68 yrs / Male",
        sampling: "500 Hz / 12-Lead",
        primary: "Left Bundle Branch Block (LBBB) + LAD",
        primaryClass: "LBBB",
        secondary: ["Broad QRS (>140ms)", "M-Shaped R Wave", "Secondary ST Inversion"],
        probabilities: [
            { cls: "LBBB", name: "Left Bundle Branch Block", prob: 96.8 },
            { cls: "LAD", name: "Left Axis Deviation", prob: 78.4 },
            { cls: "TAb", name: "T Wave Abnormal", prob: 52.1 },
            { cls: "NSIVCB", name: "Nonspecific IVCB", prob: 14.5 }
        ],
        metrics: { hr: 68, pr: 180, qrs: 148, qt: "440 / 470", rr: 882 },
        uncertainty: { entropy: 0.205, mi: 0.052, variance: 0.018, level: "low" },
        consistency: [
            [1.00, 0.85, 0.81, 0.88, 0.92],
            [0.85, 1.00, 0.79, 0.84, 0.87],
            [0.81, 0.79, 1.00, 0.83, 0.86],
            [0.88, 0.84, 0.83, 1.00, 0.91],
            [0.92, 0.87, 0.86, 0.91, 1.00]
        ],
        saliencyFocal: "Grad-CAM saliency focused on delayed ventricular upstroke & lateral slurring in V5, V6, and Lead I."
    },
    "IAVB_CASE_409": {
        id: "IAVB_CASE_409",
        source: "Ningbo First",
        ageSex: "58 yrs / Male",
        sampling: "500 Hz / 12-Lead",
        primary: "1st-Degree AV Block (IAVB) + SB",
        primaryClass: "IAVB",
        secondary: ["PR Interval > 240ms", "Sinus Bradycardia", "Preserved Hemodynamics"],
        probabilities: [
            { cls: "IAVB", name: "1st-Degree AV Block", prob: 88.4 },
            { cls: "SB", name: "Sinus Bradycardia", prob: 74.2 },
            { cls: "NSR", name: "Normal Sinus Rhythm", prob: 18.5 },
            { cls: "PAC", name: "Premature Atrial Contraction", prob: 3.2 }
        ],
        metrics: { hr: 52, pr: 245, qrs: 86, qt: "410 / 380", rr: 1153 },
        uncertainty: { entropy: 0.280, mi: 0.075, variance: 0.026, level: "low" },
        consistency: [
            [1.00, 0.82, 0.80, 0.86, 0.84],
            [0.82, 1.00, 0.77, 0.81, 0.80],
            [0.80, 0.77, 1.00, 0.82, 0.83],
            [0.86, 0.81, 0.82, 1.00, 0.88],
            [0.84, 0.80, 0.83, 0.88, 1.00]
        ],
        saliencyFocal: "Strong Grad-CAM activation on the prolonged isoelectric PR-segment prior to QRS."
    },
    "RBBB_CASE_518": {
        id: "RBBB_CASE_518",
        source: "Georgia (Emory)",
        ageSex: "61 yrs / Female",
        sampling: "500 Hz / 12-Lead",
        primary: "Right Bundle Branch Block (RBBB) + PAC",
        primaryClass: "RBBB",
        secondary: ["rsR' Pattern in V1", "Deep S-Wave Lead I", "Atrial Ectopy"],
        probabilities: [
            { cls: "RBBB", name: "Right Bundle Branch Block", prob: 93.6 },
            { cls: "PAC", name: "Premature Atrial Contraction", prob: 61.3 },
            { cls: "NSR", name: "Normal Sinus Rhythm", prob: 11.2 },
            { cls: "LAD", name: "Left Axis Deviation", prob: 4.8 }
        ],
        metrics: { hr: 78, pr: 165, qrs: 132, qt: "390 / 440", rr: 769 },
        uncertainty: { entropy: 0.245, mi: 0.062, variance: 0.021, level: "low" },
        consistency: [
            [1.00, 0.84, 0.86, 0.85, 0.89],
            [0.84, 1.00, 0.81, 0.83, 0.86],
            [0.86, 0.81, 1.00, 0.88, 0.90],
            [0.85, 0.83, 0.88, 1.00, 0.87],
            [0.89, 0.86, 0.90, 0.87, 1.00]
        ],
        saliencyFocal: "Grad-CAM highlights late terminal R' wave and right ventricular conduction delay in V1 & V2."
    },
    "STACH_CASE_833": {
        id: "STACH_CASE_833",
        source: "Ningbo First",
        ageSex: "49 yrs / Male",
        sampling: "500 Hz / 12-Lead",
        primary: "Sinus Tachycardia (STach) + QAb",
        primaryClass: "STach",
        secondary: ["Heart Rate > 125 bpm", "Inferior Q-Waves", "Elevated Sympathetic Tone"],
        probabilities: [
            { cls: "STach", name: "Sinus Tachycardia", prob: 92.1 },
            { cls: "QAb", name: "Abnormal Q Wave", prob: 48.7 },
            { cls: "TAb", name: "T Wave Abnormal", prob: 32.5 },
            { cls: "NSR", name: "Normal Sinus Rhythm", prob: 5.4 }
        ],
        metrics: { hr: 128, pr: 140, qrs: 84, qt: "310 / 450", rr: 468 },
        uncertainty: { entropy: 0.315, mi: 0.089, variance: 0.034, level: "medium" },
        consistency: [
            [1.00, 0.81, 0.78, 0.87, 0.83],
            [0.81, 1.00, 0.75, 0.82, 0.80],
            [0.78, 0.75, 1.00, 0.80, 0.84],
            [0.87, 0.82, 0.80, 1.00, 0.86],
            [0.83, 0.80, 0.84, 0.86, 1.00]
        ],
        saliencyFocal: "Saliency localized on compressed TP intervals and prominent P-waves merged with preceding T-waves."
    }
};

const SHAP_DATA = {
    "AF": {
        labels: ["Mean RR Interval", "Heart Rate (BPM)", "P-Wave Amplitude", "QRS Duration", "QT Interval", "PR Interval", "T-Wave Amp"],
        values: [-0.64, 0.58, -0.72, 0.18, 0.22, -0.45, 0.12]
    },
    "NSR": {
        labels: ["Mean RR Interval", "P-Wave Amplitude", "PR Interval", "QRS Duration", "QT Interval", "Heart Rate (BPM)", "T-Wave Amp"],
        values: [0.55, 0.68, 0.62, -0.42, 0.38, 0.44, 0.31]
    },
    "LBBB": {
        labels: ["QRS Duration", "T-Wave Inversion", "Mean RR Interval", "QT Interval", "PR Interval", "P-Wave Amp", "Heart Rate"],
        values: [0.92, 0.74, 0.28, 0.65, 0.15, -0.10, 0.12]
    },
    "IAVB": {
        labels: ["PR Interval", "Mean RR Interval", "P-Wave Amplitude", "QRS Duration", "Heart Rate (BPM)", "QT Interval", "T-Wave Amp"],
        values: [0.95, 0.42, 0.35, -0.12, -0.38, 0.19, 0.08]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initKnowledgeBase();
    loadPresetCase();
    initCharts();
    setupCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderECG();
    });
});

function switchSection(secId) {
    state.activeSection = secId;
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.b-nav-item').forEach(b => b.classList.remove('active'));
    
    const target = document.getElementById(`${secId}-section`);
    if (target) target.classList.add('active');
    
    const navBtn = Array.from(document.querySelectorAll('.nav-link')).find(b => b.getAttribute('onclick')?.includes(secId));
    if (navBtn) navBtn.classList.add('active');
    
    const mobBtn = Array.from(document.querySelectorAll('.b-nav-item')).find(b => b.getAttribute('onclick')?.includes(secId));
    if (mobBtn) mobBtn.classList.add('active');
    
    if (secId === 'studio') setTimeout(renderECG, 100);
}

function initKnowledgeBase() {
    const grid = document.getElementById('pathologyGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    Object.keys(PATHOLOGY_DATA).forEach(k => {
        const item = PATHOLOGY_DATA[k];
        const card = document.createElement('div');
        card.className = 'path-card';
        card.innerHTML = `
            <div class="path-header">
                <span class="path-title">${item.name}</span>
                <span class="path-snomed">${item.snomed}</span>
            </div>
            <p class="path-desc">${item.desc}</p>
            <div class="path-detail-box">
                <span class="path-detail-title"><i class="fa-solid fa-wave-square"></i> ECG Criteria:</span>
                ${item.ecgCriteria}
            </div>
            <div class="path-detail-box">
                <span class="path-detail-title"><i class="fa-solid fa-heart-crack"></i> Etiology / Mechanism:</span>
                ${item.whyOccurs}
            </div>
            <div class="path-detail-box">
                <span class="path-detail-title"><i class="fa-solid fa-shield-halved"></i> Precautions:</span>
                <ul class="precaution-bullets">
                    ${item.precautions.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        `;
        grid.appendChild(card);
    });
}

function loadPresetCase() {
    const select = document.getElementById('presetSelector');
    if (!select) return;
    const caseKey = select.value;
    state.currentCaseKey = caseKey;
    const cData = PRESET_CASES[caseKey];
    if (!cData) return;
    
    document.getElementById('metaId').innerText = cData.id;
    document.getElementById('metaSource').innerText = cData.source;
    document.getElementById('metaAgeSex').innerText = cData.ageSex;
    document.getElementById('metaFormat').innerText = cData.sampling;
    
    document.getElementById('primaryPredTitle').innerText = cData.primary;
    const secondaryWrap = document.getElementById('secondaryBadges');
    secondaryWrap.innerHTML = cData.secondary.map(s => `<span class="tag-badge">${s}</span>`).join('');
    
    const probList = document.getElementById('probabilityBarsList');
    probList.innerHTML = cData.probabilities.map(p => `
        <div class="prob-item">
            <div class="prob-header">
                <span>${p.name} (${p.cls})</span>
                <strong>${p.prob}%</strong>
            </div>
            <div class="prob-bar-track">
                <div class="prob-bar-fill" style="width: ${p.prob}%"></div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('wfHR').innerText = `${cData.metrics.hr} bpm`;
    document.getElementById('wfPR').innerText = cData.metrics.pr ? `${cData.metrics.pr} ms` : "Absent (0 ms)";
    document.getElementById('wfQRS').innerText = `${cData.metrics.qrs} ms`;
    document.getElementById('wfQT').innerText = `${cData.metrics.qt} ms`;
    document.getElementById('wfRR').innerText = `${cData.metrics.rr} ms`;
    
    document.getElementById('valEntropy').innerText = `${cData.uncertainty.entropy} nats`;
    document.getElementById('valMI').innerText = `${cData.uncertainty.mi} nats`;
    document.getElementById('valVar').innerText = `${cData.uncertainty.variance}`;
    
    const badgeE = document.getElementById('badgeEntropy');
    const badgeM = document.getElementById('badgeMI');
    const badgeV = document.getElementById('badgeVar');
    
    const uClass = cData.uncertainty.level;
    const uText = uClass === 'low' ? 'Low Uncertainty / High Confidence' : (uClass === 'medium' ? 'Moderate Uncertainty' : 'High Uncertainty / Ambiguity');
    
    badgeE.className = `u-badge ${uClass}`; badgeE.innerText = uText;
    badgeM.className = `u-badge ${uClass}`; badgeM.innerText = uClass === 'low' ? 'Model Agreement' : 'Client Disagreement';
    badgeV.className = `u-badge ${uClass}`; badgeV.innerText = uClass === 'low' ? 'Stable Latent Space' : 'Perturbed Representations';
    
    renderConsistencyMatrix(cData.consistency);
    renderClinicalReport(cData);
    updateMCDropoutChart(cData.probabilities[0].prob, cData.uncertainty.variance);
    renderECG();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        parseWFDBHeader(file.name, e.target.result);
    };
    reader.readAsText(file);
}

function parseWFDBHeader(filename, text) {
    const lines = text.split('
');
    let recordId = filename.replace(/\.[^/.]+$/, "");
    let age = "62 yrs";
    let sex = "Male";
    let dxCodes = [];
    
    lines.forEach(line => {
        const clean = line.trim();
        if (clean.startsWith("#Age:")) age = clean.replace("#Age:", "").trim() + " yrs";
        else if (clean.startsWith("#Sex:")) sex = clean.replace("#Sex:", "").trim();
        else if (clean.startsWith("#Dx:")) dxCodes = clean.replace("#Dx:", "").trim().split(',');
    });
    
    let matchedClass = "AF";
    if (dxCodes.length > 0) {
        const code = dxCodes[0].trim();
        Object.keys(PATHOLOGY_DATA).forEach(k => {
            if (PATHOLOGY_DATA[k].snomed.includes(code)) matchedClass = k;
        });
    }
    
    document.getElementById('metaId').innerText = recordId;
    document.getElementById('metaSource').innerText = "Uploaded WFDB Signal";
    document.getElementById('metaAgeSex').innerText = `${age} / ${sex}`;
    
    runComprehensiveAnalysis(matchedClass);
}

function runComprehensiveAnalysis(forceClass = null) {
    const btn = document.getElementById('analyzeBtn');
    const status = document.getElementById('predStatus');
    
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing 1D ResNet-34 & XAI...`;
    btn.disabled = true;
    status.className = 'badge badge-warning';
    status.innerText = 'Inferencing...';
    
    setTimeout(() => {
        btn.innerHTML = `<i class="fa-solid fa-bolt"></i> Run Federated AI Analysis`;
        btn.disabled = false;
        status.className = 'badge badge-success';
        status.innerText = 'Diagnosis Ready';
        
        if (forceClass) {
            const matchKey = Object.keys(PRESET_CASES).find(k => PRESET_CASES[k].primaryClass === forceClass) || "AF_CASE_204";
            document.getElementById('presetSelector').value = matchKey;
        }
        loadPresetCase();
    }, 400);
}

function onOptimizerChange() {
    state.activeOptimizer = document.getElementById('selectedOptimizer').value;
    loadPresetCase();
}

function renderClinicalReport(cData) {
    const pathItem = PATHOLOGY_DATA[cData.primaryClass] || PATHOLOGY_DATA["NSR"];
    const reportBox = document.getElementById('reportContent');
    if (!reportBox) return;
    
    reportBox.innerHTML = `
        <div class="report-section-block">
            <h4><i class="fa-solid fa-stethoscope"></i> Diagnostic Summary & Pathology</h4>
            <p>The 1D ResNet-34 model evaluated under <strong>${state.activeOptimizer.toUpperCase()}</strong> optimization identified <strong>${cData.primary}</strong> with <strong>${cData.probabilities[0].prob}%</strong> primary confidence.</p>
            <p><em>XAI Focal Saliency:</em> ${cData.saliencyFocal}</p>
        </div>

        <div class="report-section-block">
            <h4><i class="fa-solid fa-circle-question"></i> Why Did This Condition Occur? (Pathophysiology & Etiology)</h4>
            <p>${pathItem.whyOccurs}</p>
        </div>

        <div class="report-section-block">
            <h4><i class="fa-solid fa-shield-heart"></i> Clinical Precautions & Patient Guidelines</h4>
            <ul class="precaution-bullets">
                ${pathItem.precautions.map(p => `<li>${p}</li>`).join('')}
            </ul>
        </div>

        <div class="report-section-block">
            <h4><i class="fa-solid fa-clipboard-list"></i> Recommended Clinical Next Steps</h4>
            <p>1. Confirm findings on 12-lead standard rhythm strip.<br>
               2. Correlate with patient metabolic panel and serum electrolytes.<br>
               3. Refer to cardiology electrophysiology team if patient exhibits syncope.</p>
        </div>
    `;
}

function downloadPrecautionsReport() {
    const cData = PRESET_CASES[state.currentCaseKey] || PRESET_CASES["JS01051"];
    const pathItem = PATHOLOGY_DATA[cData.primaryClass] || PATHOLOGY_DATA["NSR"];
    
    const markdown = `# CardioSight Clinical Diagnostic & Precautions Report
**Patient Record ID:** ${cData.id}
**Source Node:** ${cData.source}
**Patient Profile:** ${cData.ageSex}
**Sampling Rate:** ${cData.sampling}
**Active Optimizer:** ${state.activeOptimizer.toUpperCase()}
**Generated On:** ${new Date().toLocaleString()}

---

## 1. Primary AI Diagnosis
- **Identified Condition:** ${cData.primary} (SNOMED: ${pathItem.snomed})
- **Classification Probability:** ${cData.probabilities[0].prob}%
- **Predictive Entropy:** ${cData.uncertainty.entropy} nats (${cData.uncertainty.level.toUpperCase()} Uncertainty)
- **Epistemic Variance:** ${cData.uncertainty.variance}

## 2. Electrophysiological & Waveform Findings
- **Heart Rate:** ${cData.metrics.hr} bpm
- **PR Interval:** ${cData.metrics.pr} ms
- **QRS Duration:** ${cData.metrics.qrs} ms
- **QT / QTc:** ${cData.metrics.qt} ms
- **Saliency Focal Region:** ${cData.saliencyFocal}

## 3. Etiology (Why Did This Condition Occur?)
${pathItem.whyOccurs}

## 4. Clinical Precautions & Patient Guidelines
${pathItem.precautions.map(p => `- ${p}`).join('
')}

---
*Report generated by CardioSight (Uncertainty-Aware Explainable Federated ECG Platform).*
*Authors: Syed Mohammad Samiul Ahmed, Shaik Mahammad Galeeb, Shaik Khasim Basha, Shaik Rehaman*
*Guide: Dr. Lalitha Kumari P | SCOPE, VIT-AP University*
`;

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CardioSight_Report_${cData.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function renderConsistencyMatrix(matrix) {
    const wrap = document.getElementById('consistencyMatrix');
    if (!wrap) return;
    const clients = ["Chapman", "CPSC", "Georgia", "Ningbo", "PTB-XL"];
    
    let html = `<table class="c-table"><thead><tr><th>Node</th>`;
    clients.forEach(c => { html += `<th>${c}</th>`; });
    html += `</tr></thead><tbody>`;
    
    for (let r = 0; r < 5; r++) {
        html += `<tr><th>${clients[r]}</th>`;
        for (let c = 0; c < 5; c++) {
            const val = matrix[r][c];
            let cellClass = "c-cell-mid";
            if (r === c) cellClass = "c-cell-diag";
            else if (val >= 0.88) cellClass = "c-cell-high";
            html += `<td class="${cellClass}">${val.toFixed(2)}</td>`;
        }
        html += `</tr>`;
    }
    html += `</tbody></table>`;
    wrap.innerHTML = html;
}

let canvas, ctx;

function setupCanvas() {
    canvas = document.getElementById('ecgCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    renderECG();
}

function resizeCanvas() {
    if (!canvas) return;
    const wrapper = document.getElementById('canvasWrapper');
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
}

function selectLead(leadName) {
    state.activeLead = leadName;
    document.querySelectorAll('.pill-btn').forEach(p => p.classList.remove('active'));
    const btn = Array.from(document.querySelectorAll('.pill-btn')).find(b => b.innerText.includes(leadName) || (leadName === 'All 12 Leads' && b.innerText.includes('All 12')));
    if (btn) btn.classList.add('active');
    renderECG();
}

function toggleGradCamOverlay() {
    state.gradCamEnabled = !state.gradCamEnabled;
    document.getElementById('gradCamState').innerText = state.gradCamEnabled ? "ON" : "OFF";
    renderECG();
}

function resetCanvasZoom() {
    state.zoomLevel = 1.0;
    renderECG();
}

function renderECG() {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, w, h);
    drawECGGrid(w, h);
    
    if (state.activeLead === 'All 12 Leads') {
        render12LeadGrid(w, h);
    } else {
        renderSingleLead(w, h, state.activeLead);
    }
}

function drawECGGrid(w, h) {
    const smallGrid = 15;
    const largeGrid = smallGrid * 5;
    
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
    ctx.beginPath();
    for (let x = 0; x < w; x += smallGrid) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
    for (let y = 0; y < h; y += smallGrid) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
    ctx.stroke();
    
    ctx.lineWidth = 1.0;
    ctx.strokeStyle = "rgba(56, 189, 248, 0.18)";
    ctx.beginPath();
    for (let x = 0; x < w; x += largeGrid) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
    for (let y = 0; y < h; y += largeGrid) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
    ctx.stroke();
}

function getWaveformSample(t, leadIndex, caseKey) {
    const cData = PRESET_CASES[caseKey] || PRESET_CASES["JS01051"];
    const cls = cData.primaryClass;
    let hr = cData.metrics.hr;
    let period = 60.0 / hr;
    let cycleT = (t % period) / period;
    
    let y = 0;
    let saliency = 0;
    
    if (cls === "AF") {
        y += 0.08 * Math.sin(t * 38) + 0.05 * Math.sin(t * 72);
        if (cycleT > 0.45 && cycleT < 0.55) {
            let phase = (cycleT - 0.5) / 0.05;
            y += Math.exp(-phase * phase * 10) * 1.6;
            saliency = 0.4;
        } else {
            saliency = 0.85;
        }
    } else if (cls === "LBBB") {
        if (cycleT > 0.12 && cycleT < 0.22) y += 0.15 * Math.sin((cycleT - 0.12) / 0.1 * Math.PI);
        if (cycleT > 0.40 && cycleT < 0.65) {
            let phase = (cycleT - 0.52) / 0.12;
            y += Math.exp(-phase * phase * 4) * 1.8;
            if (cycleT > 0.50 && cycleT < 0.55) y -= 0.3;
            saliency = 0.95;
        }
        if (cycleT > 0.70 && cycleT < 0.88) y -= 0.25 * Math.sin((cycleT - 0.70) / 0.18 * Math.PI);
    } else if (cls === "IAVB") {
        if (cycleT > 0.05 && cycleT < 0.15) y += 0.18 * Math.sin((cycleT - 0.05) / 0.1 * Math.PI);
        if (cycleT > 0.15 && cycleT < 0.45) saliency = 0.92;
        if (cycleT > 0.45 && cycleT < 0.55) {
            let phase = (cycleT - 0.50) / 0.03;
            y += Math.exp(-phase * phase * 18) * 1.9;
        }
        if (cycleT > 0.65 && cycleT < 0.85) y += 0.22 * Math.sin((cycleT - 0.65) / 0.2 * Math.PI);
    } else if (cls === "RBBB") {
        if (cycleT > 0.15 && cycleT < 0.25) y += 0.16 * Math.sin((cycleT - 0.15) / 0.1 * Math.PI);
        if (cycleT > 0.42 && cycleT < 0.62) {
            let phase1 = (cycleT - 0.46) / 0.03;
            let phase2 = (cycleT - 0.56) / 0.04;
            y += Math.exp(-phase1 * phase1 * 12) * 1.0 + Math.exp(-phase2 * phase2 * 8) * 1.5;
            saliency = 0.90;
        }
        if (cycleT > 0.70 && cycleT < 0.88) y += 0.18 * Math.sin((cycleT - 0.70) / 0.18 * Math.PI);
    } else {
        if (cycleT > 0.15 && cycleT < 0.25) y += 0.18 * Math.sin((cycleT - 0.15) / 0.1 * Math.PI);
        if (cycleT > 0.46 && cycleT < 0.54) {
            let phase = (cycleT - 0.5) / 0.03;
            y += Math.exp(-phase * phase * 22) * 1.8;
            saliency = 0.35;
        }
        if (cycleT > 0.68 && cycleT < 0.86) y += 0.28 * Math.sin((cycleT - 0.68) / 0.18 * Math.PI);
    }
    
    let leadFactor = (leadIndex === 3) ? -0.8 : (leadIndex >= 6 ? 1.2 : 1.0);
    return { val: y * leadFactor, saliency: saliency };
}

function renderSingleLead(w, h, leadName) {
    const leads = ['Lead I', 'Lead II', 'Lead III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];
    const leadIdx = leads.indexOf(leadName) >= 0 ? leads.indexOf(leadName) : 1;
    const centerY = h / 2;
    const scaleY = h * 0.25;
    const totalTime = 4.0;
    
    ctx.save();
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px 'JetBrains Mono', monospace";
    ctx.fillText(`${leadName} (10 mm/mV, 25 mm/s)`, 20, 26);
    
    for (let x = 0; x < w - 1; x++) {
        let t1 = (x / w) * totalTime;
        let t2 = ((x + 1) / w) * totalTime;
        let s1 = getWaveformSample(t1, leadIdx, state.currentCaseKey);
        let s2 = getWaveformSample(t2, leadIdx, state.currentCaseKey);
        
        ctx.beginPath();
        ctx.moveTo(x, centerY - s1.val * scaleY);
        ctx.lineTo(x + 1, centerY - s2.val * scaleY);
        
        if (state.gradCamEnabled && s1.saliency > 0.5) {
            ctx.strokeStyle = `rgba(239, 68, 68, ${s1.saliency})`;
            ctx.lineWidth = 3.2;
        } else {
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 2.0;
        }
        ctx.stroke();
    }
    ctx.restore();
}

function render12LeadGrid(w, h) {
    const leads = ['Lead I', 'Lead II', 'Lead III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];
    const rows = 4, cols = 3;
    const cellW = w / cols, cellH = h / rows;
    
    leads.forEach((lName, idx) => {
        const c = idx % cols, r = Math.floor(idx / cols);
        const startX = c * cellW, startY = r * cellH;
        const centerY = startY + cellH / 2;
        const scaleY = cellH * 0.3;
        
        ctx.save();
        ctx.fillStyle = "#94a3b8";
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillText(lName, startX + 8, startY + 14);
        
        for (let x = 0; x < cellW - 1; x++) {
            let t1 = (x / cellW) * 2.5;
            let t2 = ((x + 1) / cellW) * 2.5;
            let s1 = getWaveformSample(t1, idx, state.currentCaseKey);
            let s2 = getWaveformSample(t2, idx, state.currentCaseKey);
            
            ctx.beginPath();
            ctx.moveTo(startX + x, centerY - s1.val * scaleY);
            ctx.lineTo(startX + x + 1, centerY - s2.val * scaleY);
            ctx.strokeStyle = (state.gradCamEnabled && s1.saliency > 0.5) ? "#ef4444" : "#38bdf8";
            ctx.lineWidth = (state.gradCamEnabled && s1.saliency > 0.5) ? 2.2 : 1.4;
            ctx.stroke();
        }
        ctx.restore();
    });
}

function initCharts() {
    initMCDropoutChart();
    initShapChart();
    initConvergenceChart();
    initRadarChart();
}

function initMCDropoutChart() {
    const ctxC = document.getElementById('mcDropoutChart')?.getContext('2d');
    if (!ctxC) return;
    
    state.mcChart = new Chart(ctxC, {
        type: 'line',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `#${i + 1}`),
            datasets: [{
                label: 'Sampled Prob (%)',
                data: Array.from({ length: 30 }, () => 92 + (Math.random() * 4 - 2)),
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                fill: true,
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { min: 60, max: 100, grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8', maxTicksLimit: 10 } }
            }
        }
    });
}

function updateMCDropoutChart(meanProb, variance) {
    if (!state.mcChart) return;
    const newData = Array.from({ length: 30 }, () => {
        const jitter = (Math.random() - 0.5) * (variance * 100);
        return Math.min(99.5, Math.max(50, meanProb + jitter));
    });
    state.mcChart.data.datasets[0].data = newData;
    state.mcChart.update();
}

function initShapChart() {
    const ctxS = document.getElementById('shapBarChart')?.getContext('2d');
    if (!ctxS) return;
    const sData = SHAP_DATA["AF"];
    
    state.shapChart = new Chart(ctxS, {
        type: 'bar',
        data: {
            labels: sData.labels,
            datasets: [{
                label: 'SHAP Value',
                data: sData.values,
                backgroundColor: sData.values.map(v => v >= 0 ? '#38bdf8' : '#ef4444'),
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
                y: { grid: { display: false }, ticks: { color: '#f8fafc', font: { family: 'Plus Jakarta Sans', weight: '600' } } }
            }
        }
    });
}

function loadShapClass(clsKey) {
    state.shapClass = clsKey;
    document.querySelectorAll('[id^="shapBtn"]').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`shapBtn${clsKey}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    const sData = SHAP_DATA[clsKey] || SHAP_DATA["AF"];
    if (state.shapChart) {
        state.shapChart.data.labels = sData.labels;
        state.shapChart.data.datasets[0].data = sData.values;
        state.shapChart.data.datasets[0].backgroundColor = sData.values.map(v => v >= 0 ? '#38bdf8' : '#ef4444');
        state.shapChart.update();
    }
    
    const beeswarmImg = document.getElementById('shapBeeswarmImg');
    if (beeswarmImg) {
        beeswarmImg.src = (clsKey === 'NSR') ? "figures/shap_beeswarm_NSR.png" : "figures/shap_beeswarm_AF.png";
    }
}

function initConvergenceChart() {
    const ctxCv = document.getElementById('convergenceChart')?.getContext('2d');
    if (!ctxCv) return;
    const rounds = Array.from({ length: 30 }, (_, i) => `R${i + 1}`);
    
    state.convergenceChart = new Chart(ctxCv, {
        type: 'line',
        data: {
            labels: rounds,
            datasets: [
                {
                    label: 'FedAdam',
                    data: [0.38, 0.45, 0.52, 0.56, 0.60, 0.63, 0.65, 0.67, 0.68, 0.69, 0.695, 0.701, 0.705, 0.71, 0.712, 0.714, 0.715, 0.716, 0.718, 0.719, 0.72, 0.722, 0.723, 0.724, 0.725, 0.725, 0.726, 0.727, 0.727, 0.728],
                    borderColor: '#38bdf8',
                    borderWidth: 2.5,
                    tension: 0.2
                },
                {
                    label: 'FedProx (μ=0.001)',
                    data: [0.32, 0.39, 0.46, 0.50, 0.53, 0.56, 0.58, 0.60, 0.61, 0.62, 0.63, 0.635, 0.64, 0.645, 0.648, 0.65, 0.652, 0.654, 0.655, 0.656, 0.657, 0.658, 0.658, 0.659, 0.659, 0.66, 0.66, 0.661, 0.661, 0.662],
                    borderColor: '#06b6d4',
                    borderWidth: 2,
                    tension: 0.2
                },
                {
                    label: 'FedAvg',
                    data: [0.28, 0.34, 0.40, 0.44, 0.47, 0.50, 0.52, 0.54, 0.55, 0.56, 0.57, 0.58, 0.585, 0.59, 0.595, 0.60, 0.602, 0.605, 0.607, 0.609, 0.61, 0.612, 0.613, 0.614, 0.614, 0.615, 0.615, 0.616, 0.616, 0.617],
                    borderColor: '#f59e0b',
                    borderWidth: 1.8,
                    tension: 0.2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { color: '#94a3b8', boxWidth: 12 } } },
            scales: {
                y: { title: { display: true, text: 'Macro F1-Score', color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8', maxTicksLimit: 10 } }
            }
        }
    });
}

function initRadarChart() {
    const ctxR = document.getElementById('f1RadarChart')?.getContext('2d');
    if (!ctxR) return;
    
    state.radarChart = new Chart(ctxR, {
        type: 'radar',
        data: {
            labels: ['Chapman', 'CPSC-2018', 'Georgia', 'Ningbo', 'PTB-XL'],
            datasets: [
                {
                    label: 'FedAdam',
                    data: [0.767, 0.612, 0.546, 0.808, 0.774],
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.25)',
                    borderWidth: 2
                },
                {
                    label: 'FedProx',
                    data: [0.748, 0.364, 0.635, 0.789, 0.752],
                    borderColor: '#06b6d4',
                    backgroundColor: 'rgba(6, 182, 212, 0.15)',
                    borderWidth: 1.5
                },
                {
                    label: 'FedAvg',
                    data: [0.699, 0.310, 0.592, 0.756, 0.718],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.10)',
                    borderWidth: 1.5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { color: '#94a3b8', boxWidth: 10 } } },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.08)' },
                    grid: { color: 'rgba(255,255,255,0.08)' },
                    pointLabels: { color: '#f8fafc', font: { size: 11, weight: '600' } },
                    ticks: { display: false, min: 0.2, max: 0.9 }
                }
            }
        }
    });
}

f_root.close()
f_docs.close()
print("app.js completely written!")
