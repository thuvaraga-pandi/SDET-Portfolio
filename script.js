/* ==========================================================================
   Thuvaraga Pandi - SDET 1 Portfolio Interactive JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initSkillFilters();
    initThemeToggle();
    initMobileMenu();
    initScrollHeader();
});

/* 1. Hero Section Typewriter Effect */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const words = [
        "Automation",
        "AI Agent Tooling",
        "Quality Engineering",
        "Selenium & Java",
        "Python QA Utilities"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 120;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* 2. Skill Category Filtering */
function initSkillFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/* 3. Theme Toggle (Dark / Light) */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('sdet_portfolio_theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('sdet_portfolio_theme', 'dark');
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('sdet_portfolio_theme', 'light');
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });
}

/* 4. Mobile Menu Navigation */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        menuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

/* 5. Smart Dynamic Scroll Navbar (Auto-Hide on Scroll Down, Reveal on Scroll Up) */
function initScrollHeader() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Shadow toggle
        if (currentScrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Auto-hide logic
        const navLinks = document.getElementById('nav-links');
        const isMobileNavOpen = navLinks && navLinks.classList.contains('active');

        if (currentScrollY > 80 && currentScrollY > lastScrollY && !isMobileNavOpen) {
            // Scrolling DOWN -> hide navbar
            navbar.classList.add('nav-hidden');
        } else {
            // Scrolling UP or at top -> reveal navbar
            navbar.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
    });

    // Reveal navbar when user hovers near top of browser window
    window.addEventListener('mousemove', (e) => {
        if (e.clientY < 60) {
            navbar.classList.remove('nav-hidden');
        }
    });
}

/* ==========================================================================
   6. Interactive QA & AI Playground Functions
   ========================================================================== */

// Switch Console Mode Tabs
function switchConsoleMode(mode) {
    document.querySelectorAll('.console-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.console-panel').forEach(panel => panel.classList.add('hidden'));

    document.getElementById(`tab-${mode}`).classList.add('active');
    document.getElementById(`panel-${mode}`).classList.remove('hidden');
}

// Mode A: Test Suite Execution Simulator
let isRunningTest = false;

const testSuitesData = {
    smoke: [
        { name: "VerifyLoginPage_POM_Load", duration: 180, status: "PASS" },
        { name: "AuthenticateUser_ValidCredentials", duration: 320, status: "PASS" },
        { name: "CheckDashboardNavigation_Elements", duration: 250, status: "PASS" },
        { name: "PostmanAPI_HealthCheck_StatusCode200", duration: 150, status: "PASS" },
        { name: "SnipToDoc_UtilityInit_Check", duration: 210, status: "PASS" }
    ],
    regression: [
        { name: "POM_UserRegistration_DataDriven", duration: 410, status: "PASS" },
        { name: "SeleniumGrid_CrossBrowser_Chrome_Firefox", duration: 520, status: "PASS" },
        { name: "CucumberBDD_OrderCheckout_Scenario", duration: 680, status: "PASS" },
        { name: "PostmanAPI_GET_Defects_Assertion", duration: 230, status: "PASS" },
        { name: "AIAgentSkill_Execution_Verification", duration: 350, status: "PASS" },
        { name: "JiraRESTAPI_FetchMetrics_Validation", duration: 290, status: "PASS" },
        { name: "SnipToDoc_ScreenshotCapture_DocxExport", duration: 450, status: "PASS" },
        { name: "Regression_NegativeLogin_Validation", duration: 310, status: "PASS" },
        { name: "JenkinsCI_NightlyPipeline_Trigger", duration: 240, status: "PASS" }
    ],
    api: [
        { name: "GET /api/v1/auth/session", duration: 110, status: "PASS" },
        { name: "POST /api/v1/automation/reports", duration: 190, status: "PASS" },
        { name: "GET /rest/api/3/search?jql=project=QA", duration: 240, status: "PASS" },
        { name: "PUT /api/v1/agent/skills/update", duration: 160, status: "PASS" },
        { name: "DELETE /api/v1/temp/artifacts", duration: 140, status: "PASS" }
    ]
};

function runTestSuiteSimulation() {
    if (isRunningTest) return;

    const suiteSelect = document.getElementById('suite-select').value;
    const tests = testSuitesData[suiteSelect] || testSuitesData.smoke;
    const terminal = document.getElementById('terminal-screen');
    const runBtn = document.getElementById('btn-run-tests');
    const progressBar = document.getElementById('progress-bar-fill');

    isRunningTest = true;
    runBtn.disabled = true;
    runBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing Suite...';
    terminal.innerHTML = '';
    progressBar.style.width = '0%';

    appendTerminalLine(terminal, `[INFO] Initializing Test Suite: ${suiteSelect.toUpperCase()} ...`, 'info');
    appendTerminalLine(terminal, `[INFO] Framework: Selenium WebDriver + Java + TestNG (Page Object Model)`, 'comment');
    appendTerminalLine(terminal, `[INFO] Driver: ChromeDriver v124 (Selenium Grid Node 127.0.0.1:4444)`, 'comment');
    appendTerminalLine(terminal, `--------------------------------------------------------------------------`, 'comment');

    let passedCount = 0;
    let failedCount = 0;
    let totalDuration = 0;
    let index = 0;

    const interval = setInterval(() => {
        if (index < tests.length) {
            const test = tests[index];
            totalDuration += test.duration;
            
            if (test.status === 'PASS') {
                passedCount++;
                appendTerminalLine(terminal, `[PASS] [${test.duration}ms] ${test.name} ... SUCCESS`, 'pass');
            } else {
                failedCount++;
                appendTerminalLine(terminal, `[FAIL] [${test.duration}ms] ${test.name} ... ASSERTION ERROR`, 'fail');
            }

            // Update Progress
            const pct = Math.round(((index + 1) / tests.length) * 100);
            progressBar.style.width = `${pct}%`;

            document.getElementById('metric-total').textContent = tests.length;
            document.getElementById('metric-passed').textContent = passedCount;
            document.getElementById('metric-failed').textContent = failedCount;
            document.getElementById('metric-time').textContent = `${(totalDuration / 1000).toFixed(2)}s`;

            terminal.scrollTop = terminal.scrollHeight;
            index++;
        } else {
            clearInterval(interval);
            appendTerminalLine(terminal, `--------------------------------------------------------------------------`, 'comment');
            appendTerminalLine(terminal, `[SUMMARY] Total: ${tests.length} | Passed: ${passedCount} | Failed: ${failedCount} | Pass Rate: 100%`, 'summary');
            appendTerminalLine(terminal, `[REPORT] ExtentReport generated & synced with Jira REST API.`, 'info');
            
            runBtn.disabled = false;
            runBtn.innerHTML = '<i class="fa-solid fa-play"></i> Re-Execute Automation Suite';
            isRunningTest = false;
        }
    }, 400);
}

function appendTerminalLine(container, text, typeClass) {
    const line = document.createElement('div');
    line.className = `terminal-line ${typeClass}`;
    line.textContent = text;
    container.appendChild(line);
}

// Mode B: SnipToDoc Simulator Logic
let capturedEvidences = [];

function captureSnipStep() {
    const inputField = document.getElementById('snip-step-name');
    const statusSelect = document.getElementById('snip-status');
    const evidenceList = document.getElementById('evidence-list');
    const countSpan = document.getElementById('snip-count');

    const stepDesc = inputField.value.trim() || `Step ${capturedEvidences.length + 1}: Validate UI Elements & API Responses`;
    const status = statusSelect.value;

    capturedEvidences.push({ desc: stepDesc, status: status, time: new Date().toLocaleTimeString() });

    countSpan.textContent = capturedEvidences.length;

    // Render in Evidence Box
    renderEvidenceList();
    inputField.value = '';
}

function renderEvidenceList() {
    const evidenceList = document.getElementById('evidence-list');
    if (capturedEvidences.length === 0) {
        evidenceList.innerHTML = '<div class="empty-evidence">No screenshot evidence captured yet. Enter step info and click \'Capture & Append Step\'.</div>';
        return;
    }

    evidenceList.innerHTML = '';
    capturedEvidences.forEach((ev, idx) => {
        const item = document.createElement('div');
        item.className = 'evidence-item';
        item.innerHTML = `
            <div>
                <strong>Step ${idx + 1}:</strong> ${ev.desc}
                <br><small style="color: var(--text-muted);"><i class="fa-regular fa-clock"></i> ${ev.time} | Screenshot_Step_${idx + 1}.png</small>
            </div>
            <span class="evidence-badge ${ev.status}">${ev.status}</span>
        `;
        evidenceList.appendChild(item);
    });
}

function generateDocxReport() {
    if (capturedEvidences.length === 0) {
        alert('Please capture at least 1 test step before generating the Word Document!');
        return;
    }

    alert(`✓ SnipToDoc Desktop Utility Simulation:\nSuccessfully compiled ${capturedEvidences.length} captured screenshots into 'QA_Test_Evidence_Report_${Date.now()}.docx'.\n\nWord Document styled with headers, timestamps, and step metadata!`);
}

// Mode C: Jira REST API Metrics Simulator
function fetchJiraMetrics() {
    const rawJson = document.getElementById('jira-raw-json');
    rawJson.textContent = 'Connecting to Jira REST API endpoint (https://jira.company.internal/rest/api/3)...';

    setTimeout(() => {
        const mockPayload = {
            "project": "QA_AUTOMATION_ENTERPRISE",
            "sprint": "Sprint 42 - AI & Selenium Automation",
            "execution_metrics": {
                "total_test_cases": 142,
                "automated_passed": 136,
                "automated_failed": 6,
                "pass_percentage": "95.8%",
                "open_defects": 3,
                "time_saved_hours": "64.5 hrs"
            },
            "automation_stack": {
                "ui_framework": "Selenium WebDriver (Java + TestNG + POM)",
                "api_framework": "Postman REST Assured",
                "reporting_tools": ["SnipToDoc Python Utility", "Jira REST Metric Reporter"]
            },
            "status": 200,
            "timestamp": new Date().toISOString()
        };

        rawJson.textContent = JSON.stringify(mockPayload, null, 2);

        document.getElementById('jira-total').textContent = mockPayload.execution_metrics.total_test_cases;
        document.getElementById('jira-pass-rate').textContent = mockPayload.execution_metrics.pass_percentage;
        document.getElementById('jira-defects').textContent = mockPayload.execution_metrics.open_defects;
        document.getElementById('jira-time-saved').textContent = mockPayload.execution_metrics.time_saved_hours;
    }, 600);
}

/* ==========================================================================
   7. Copy Email & Form Submission Handlers
   ========================================================================== */
function copyEmailToClipboard() {
    const email = "thuvarak3345@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const feedback = document.getElementById('copy-feedback');
        if (feedback) {
            feedback.style.display = 'block';
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 3000);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const formResponse = document.getElementById('form-response');

    formResponse.className = 'form-response success';
    formResponse.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your message has been sent successfully. Thuvaraga will get back to you shortly.`;
    
    document.getElementById('contact-form').reset();
}

/* 3D Project Card Flip Function (SnipToDoc Only) */
function toggleSnipCardFlip(event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const flipper = document.getElementById('flip-card-1');
    if (flipper) {
        flipper.classList.toggle('is-flipped');
    }
}

function flipProjectCard(cardId, event) {
    toggleSnipCardFlip(event);
}

function simulateGenerateWordDoc(event) {
    if (event) {
        event.stopPropagation();
    }
    alert("✓ SnipToDoc Utility:\n\nSuccessfully generated formatted Word document!\nCompiled 2 screenshot evidence step(s) to:\nC:\\Users\\QA_Automation\\Documents\\QA_Test_Evidence_Report.docx");
}

/* ==========================================================================
   8. SnipToDoc Desktop Application Interactive Simulation Modal Functions
   ========================================================================== */
let appSnipCaptures = [];

function openSnipToDocModal() {
    const modal = document.getElementById('sniptodoc-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSnipToDocModal() {
    const modal = document.getElementById('sniptodoc-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeSnipToDocModalOnBackdrop(e) {
    if (e.target.classList.contains('app-modal-backdrop')) {
        closeSnipToDocModal();
    }
}

function triggerAppCapture(type) {
    const list = document.getElementById('app-comments-list');
    const countBadge = document.getElementById('app-snip-count');
    const statusbar = document.getElementById('app-statusbar');

    const captureId = appSnipCaptures.length + 1;
    const timestamp = new Date().toLocaleTimeString();
    const mockStepName = `${type} Snip #${captureId} - Captured at ${timestamp}`;

    appSnipCaptures.push({ id: captureId, type: type, time: timestamp, name: mockStepName });

    if (countBadge) countBadge.textContent = `${appSnipCaptures.length} captures`;

    // Render list item
    if (list) {
        if (appSnipCaptures.length === 1) list.innerHTML = '';

        const item = document.createElement('div');
        item.className = 'win-comment-item';
        item.innerHTML = `
            <div>
                <strong>${type} Capture #${captureId}:</strong> Auto-cropped screenshot saved
                <br><small style="color: #666;">Time: ${timestamp} &bull; Image_${captureId}.png</small>
            </div>
            <span style="color: #0078d7; font-weight: 600;">Saved</span>
        `;
        list.insertBefore(item, list.firstChild);
    }

    if (statusbar) {
        statusbar.innerHTML = `Status: Captured ${type} Snip #${captureId} &bull; Saved to document buffer`;
    }
}

function changeAppFolder() {
    const folderDisplay = document.getElementById('app-folder-display');
    const newFolder = prompt("Enter output folder path:", folderDisplay.textContent || "C:\\Users\\QA_Automation\\Documents");
    if (newFolder) {
        folderDisplay.textContent = newFolder;
    }
}

function exportAppDocx() {
    if (appSnipCaptures.length === 0) {
        alert("Please perform at least one screenshot capture before generating Word Document!");
        return;
    }

    const folderDisplay = document.getElementById('app-folder-display').textContent;
    alert(`✓ SnipToDoc Desktop Utility:\n\nSuccessfully generated formatted Word document!\nSaved ${appSnipCaptures.length} screenshot evidence step(s) to:\n${folderDisplay}\\QA_Test_Evidence_Report.docx`);
    
    const statusbar = document.getElementById('app-statusbar');
    if (statusbar) {
        statusbar.innerHTML = `Status: Exported ${appSnipCaptures.length} steps to QA_Test_Evidence_Report.docx`;
    }
}
