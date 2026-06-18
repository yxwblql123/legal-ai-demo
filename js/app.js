// DocuScan - Contract Review Platform Demo
// Professional contract review demo

function $(id) { return document.getElementById(id); }

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

/* FAQ Toggle */
function toggleFaq(item) {
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');
    
    if (item.classList.contains('open')) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
        answer.style.paddingTop = '0';
        answer.style.paddingBottom = '0';
    } else {
        document.querySelectorAll('.faq-item.open').forEach(o => {
            o.classList.remove('open');
            o.querySelector('.faq-answer').style.maxHeight = '0';
            o.querySelector('.faq-answer').style.paddingTop = '0';
            o.querySelector('.faq-answer').style.paddingBottom = '0';
        });
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.paddingTop = '18px';
        answer.style.paddingBottom = '18px';
    }
}

/* Sample Contracts Data */
const sampleContracts = {
    nda: {
        filename: 'Mutual_NDA_Sample.pdf',
        status: 'Analysis Complete',
        statusClass: 'complete',
        riskCounts: { high: 2, medium: 1, low: 0 },
        text: `<h3>MUTUAL NON-DISCLOSURE AGREEMENT</h3>
<p><strong>THIS AGREEMENT</strong> is entered into as of January 1, 2026, by and between <strong>ABC Corporation</strong> ("Disclosing Party") and <strong>XYZ Inc.</strong> ("Receiving Party").</p>

<h4>1. CONFIDENTIAL INFORMATION</h4>
<p class="clause-text">"Confidential Information" means any information disclosed by either party that is marked "Confidential" or would reasonably be understood to be confidential given the nature of the information and circumstances of disclosure.</p>

<h4>2. OBLIGATIONS <span class="risk-badge high">HIGH RISK</span></h4>
<p class="clause-text risk-high-text">The Receiving Party shall hold all Confidential Information in strict confidence and shall not disclose such information to any third party <span class="highlight">without the prior written consent of the Disclosing Party</span>. The Receiving Party shall use the Confidential Information only for the purpose of evaluating a potential business relationship.</p>

<h4>3. TERM <span class="risk-badge medium">MEDIUM RISK</span></h4>
<p class="clause-text risk-medium-text">This Agreement shall remain in effect for a period of <span class="highlight">three (3) years</span> from the date of execution, unless earlier terminated by either party with 30 days written notice.</p>

<h4>4. INDEMNIFICATION <span class="risk-badge high">HIGH RISK</span></h4>
<p class="clause-text risk-high-text">Each party agrees to indemnify, defend, and hold harmless the other party from and against any claims, damages, losses, and expenses arising out of or related to any breach of this Agreement <span class="highlight">including reasonable attorney's fees, regardless of fault or negligence</span>.</p>`
    },
    msa: {
        filename: 'Master_Service_Agreement_Sample.pdf',
        status: 'Analysis Complete',
        statusClass: 'complete',
        riskCounts: { high: 3, medium: 2, low: 1 },
        text: `<h3>MASTER SERVICE AGREEMENT</h3>
<p><strong>THIS MASTER SERVICE AGREEMENT</strong> ("Agreement") is entered into as of January 1, 2026 by and between <strong>TechCorp Inc.</strong> ("Company") and <strong>ServicePro LLC</strong> ("Service Provider").</p>

<h4>1. SERVICES</h4>
<p class="clause-text">Service Provider shall perform the services described in each Statement of Work ("SOW") executed by both parties. Company may terminate any SOW with <span class="highlight">5 days written notice</span>.</p>

<h4>2. PAYMENT TERMS <span class="risk-badge high">HIGH RISK</span></h4>
<p class="clause-text risk-high-text">Company shall pay Service Provider within <span class="highlight">forty-five (45) days</span> of receipt of a valid invoice. Late payments shall accrue interest at <span class="highlight">1.5% per month</span>, compounded monthly.</p>

<h4>3. INTELLECTUAL PROPERTY <span class="risk-badge medium">MEDIUM RISK</span></h4>
<p class="clause-text risk-medium-text">All work product developed by Service Provider in the performance of the Services shall be considered "work made for hire" and owned by <span class="highlight">Company exclusively</span>. Service Provider hereby assigns all rights.</p>

<h4>4. LIMITATION OF LIABILITY <span class="risk-badge high">HIGH RISK</span></h4>
<p class="clause-text risk-high-text">IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR <span class="highlight">INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES</span>, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. TOTAL LIABILITY SHALL NOT EXCEED <span class="highlight">THE AMOUNT PAID IN THE PRIOR 3 MONTHS</span>.</p>

<h4>5. TERMINATION <span class="risk-badge medium">MEDIUM RISK</span></h4>
<p class="clause-text risk-medium-text">Either party may terminate this Agreement with <span class="highlight">ten (10) days notice</span>. All unpaid invoices become due immediately upon termination.</p>`
    },
    employment: {
        filename: 'Employment_Agreement_Sample.pdf',
        status: 'Analysis Complete',
        statusClass: 'complete',
        riskCounts: { high: 0, medium: 1, low: 2 },
        text: `<h3>EMPLOYMENT AGREEMENT</h3>
<p><strong>THIS EMPLOYMENT AGREEMENT</strong> is entered into as of January 1, 2026, between <strong>GreatCompany Inc.</strong> ("Company") and <strong>Jane Doe</strong> ("Employee").</p>

<h4>1. POSITION AND DUTIES</h4>
<p class="clause-text">Employee is hired as <span class="highlight">At-Will Employee</span>. Employee agrees to devote full time and attention to Company's business.</p>

<h4>2. COMPENSATION</h4>
<p class="clause-text">Company shall pay Employee a base salary of <strong>$120,000 per year</strong>, payable in bi-weekly installments. Employee is eligible for annual bonus at Company's sole discretion.</p>

<h4>3. NON-COMPETE <span class="risk-badge medium">MEDIUM RISK</span></h4>
<p class="clause-text risk-medium-text">During employment and for a period of <span class="highlight">twelve (12) months</span> after termination, Employee shall not engage in any business that competes with Company within <span class="highlight">the United States</span>.</p>

<h4>4. CONFIDENTIALITY</h4>
<p class="clause-text">Employee agrees to hold all proprietary information in strict confidence and not to disclose such information to any third party during or after employment.</p>

<h4>5. TERMINATION</h4>
<p class="clause-text">Employment is at-will and may be terminated by either party at any time, with or without cause, with or without notice.</p>`
    }
};

/* Load Sample Contract */
function loadSample(type) {
    const data = sampleContracts[type];
    if (!data) return;
    
    document.querySelectorAll('.sample-item').forEach(el => el.classList.remove('active'));
    if (event && event.currentTarget) event.currentTarget.classList.add('active');
    
    const contractText = $('contractText');
    const filename = $('demoFilename');
    const status = $('demoStatus');
    
    if (contractText) {
        contractText.style.opacity = '0';
        setTimeout(() => {
            contractText.innerHTML = data.text;
            contractText.style.opacity = '1';
        }, 250);
    }
    
    if (filename) filename.textContent = data.filename;
    if (status) {
        status.textContent = 'Analyzing...';
        status.className = 'toolbar-status analyzing';
        setTimeout(() => {
            status.textContent = data.status;
            status.className = 'toolbar-status complete';
        }, 1200);
    }
    
    updateRiskCounts(data.riskCounts);
}

function updateRiskCounts(counts) {
    const panel = $('analysisPanel');
    if (!panel) return;
    const summary = panel.querySelector('.risk-summary');
    if (summary) {
        summary.innerHTML = `
            <div class="risk-count high">${counts.high} High</div>
            <div class="risk-count medium">${counts.medium} Medium</div>
            <div class="risk-count low">${counts.low} Low</div>`;
    }
}

function triggerUpload() {
    const input = $('fileUpload');
    if (input) input.click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const filename = $('demoFilename');
    const status = $('demoStatus');
    const contractText = $('contractText');
    
    if (filename) filename.textContent = file.name;
    if (status) {
        status.textContent = 'Uploading...';
        status.className = 'toolbar-status analyzing';
    }
    if (contractText) {
        contractText.innerHTML = `
            <div style="text-align:center; padding:40px; color:var(--text-muted);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" style="margin-bottom:16px;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                <p><strong>${file.name}</strong> uploaded!</p>
                <p style="margin-top:8px;">Analysis would start automatically in the full version.</p>
                <button class="btn btn-primary btn-sm" onclick="loadSample('nda')" style="margin-top:16px;">Try Sample NDA Instead</button>
            </div>`;
    }
    setTimeout(() => {
        if (status) {
            status.textContent = 'Ready';
            status.className = 'toolbar-status complete';
        }
    }, 1800);
}

function downloadReport() {
    showToast('Report downloaded! (Demo — full version generates PDF/Word)');
}
function showEdits() {
    showToast('Redline edit suggestions would open here (full version)');
}

function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

/* Counter Animation */
function animateCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

/* Initialize */
document.addEventListener('DOMContentLoaded', function() {
    // Counter animation
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { animateCounters(); observer.disconnect(); }
            });
        }, { threshold: 0.5 });
        observer.observe(statsBar);
    }
    
    // Smooth scroll nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Navbar shadow on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        navbar.style.boxShadow = window.scrollY > 50 ? 'var(--shadow)' : '';
    }, { passive: true });
});
