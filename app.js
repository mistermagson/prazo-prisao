/**
 * Prazo Prisão - Core Logic
 * Focado na gestão dos 90 dias do Art. 316 do CPP.
 */

// State Management
let processes = JSON.parse(localStorage.getItem('prazo-prisao-data')) || [];

// DOM Elements
const processList = document.getElementById('process-list');
const statTotal = document.getElementById('stat-total').querySelector('.stat-value');
const statCritical = document.getElementById('stat-critical').querySelector('.stat-value');
const statWarning = document.getElementById('stat-warning').querySelector('.stat-value');
const addBtn = document.getElementById('add-btn');
const modal = document.getElementById('modal-backdrop');
const closeModal = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const processForm = document.getElementById('process-form');
const alertSound = document.getElementById('alert-sound');

// Initialize
function init() {
    renderDashboard();
    requestNotificationPermission();
    checkDeadlinesForNotifications();
}

// Request Browser Notification Permission
async function requestNotificationPermission() {
    if ('Notification' in window) {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            await Notification.requestPermission();
        }
    }
}

// Date Calculations
function parseLocal理论(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return new Date(year, month - 1, day);
}

function calculateDeadline(arrestDateStr) {
    const arrestDate = parseLocal理论(arrestDateStr);
    const deadline = new Date(arrestDate);
    deadline.setDate(deadline.getDate() + 90);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
    
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
        deadlineDate: deadline,
        daysLeft: diffDays
    };
}

function getStatus(daysLeft) {
    if (daysLeft <= 5) return 'critical';
    if (daysLeft <= 15) return 'warning';
    return 'safe';
}

// Formatting
function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(date);
}

// Core Operations
function addProcess(number, date) {
    const newProcess = {
        id: Date.now().toString(),
        number: number,
        arrestDate: date,
        createdAt: new Date().toISOString()
    };
    
    processes.push(newProcess);
    saveData();
    renderDashboard();
    
    // Check if new process is critical
    const deadline = calculateDeadline(date);
    if (deadline.daysLeft <= 5) {
        playAlert();
    }
}

function deleteProcess(id) {
    processes = processes.filter(p => p.id !== id);
    saveData();
    renderDashboard();
}

function saveData() {
    localStorage.setItem('prazo-prisao-data', JSON.stringify(processes));
}

// UI Rendering
function renderDashboard() {
    processList.innerHTML = '';
    
    let criticalCount = 0;
    let warningCount = 0;
    
    if (processes.length === 0) {
        processList.innerHTML = `
            <div class="empty-state">
                <img src="https://img.icons8.com/isometric/200/empty-box.png" alt="Vazio">
                <h3>Nenhum processo cadastrado</h3>
                <p>Adicione processos penais para monitorar os prazos de 90 dias.</p>
            </div>
        `;
    } else {
        // Sort processes (critical first)
        const sortedProcesses = [...processes].sort((a, b) => {
            const dlA = calculateDeadline(a.arrestDate).daysLeft;
            const dlB = calculateDeadline(b.arrestDate).daysLeft;
            return dlA - dlB;
        });

        sortedProcesses.forEach(process => {
            const { deadlineDate, daysLeft } = calculateDeadline(process.arrestDate);
            const status = getStatus(daysLeft);
            
            if (status === 'critical') criticalCount++;
            if (status === 'warning') warningCount++;
            
            const card = document.createElement('div');
            card.className = `process-card ${status}`;
            card.innerHTML = `
                <div class="card-header">
                    <span class="process-num">${process.number}</span>
                    <span class="date-label">Preso em: ${formatDate(parseLocal理论(process.arrestDate))}</span>
                </div>
                <div class="card-body">
                    <div class="review-date-info">
                        <span class="date-label">Próxima Revisão</span>
                        <span class="next-review-date">${formatDate(deadlineDate)}</span>
                    </div>
                    <div class="days-left">
                        ${daysLeft <= 0 ? 'VENCIDO' : `${daysLeft} dias restantes`}
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn-delete" onclick="deleteProcess('${process.id}')">Excluir</button>
                </div>
            `;
            processList.appendChild(card);
        });
    }
    
    // Update stats
    statTotal.textContent = processes.length;
    statCritical.textContent = criticalCount;
    statWarning.textContent = warningCount;
}

// Alerts & Notifications
function playAlert() {
    alertSound.currentTime = 0;
    alertSound.play().catch(e => console.log('Audio requires user interaction first.'));
}

function checkDeadlinesForNotifications() {
    processes.forEach(process => {
        const { daysLeft } = calculateDeadline(process.arrestDate);
        if (daysLeft <= 5 && Notification.permission === 'granted') {
            new Notification('Alerta de Prazo Crítico', {
                body: `O processo ${process.number} vence em ${daysLeft} dias!`,
                icon: 'https://img.icons8.com/isometric/50/scales.png'
            });
        }
    });
}

// Modal Logic
addBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    // Set focus to input
    document.getElementById('process-number').focus();
});

closeModal.addEventListener('click', () => modal.classList.add('hidden'));
cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));

processForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const number = document.getElementById('process-number').value;
    const date = document.getElementById('arrest-date').value;
    
    addProcess(number, date);
    
    processForm.reset();
    modal.classList.add('hidden');
});

// Event delegation for dynamically created delete buttons would be better, 
// but for MVP inline onclick is simpler.
window.deleteProcess = deleteProcess;

// Start the app
init();
