// ─────────────────────────────────────────────
//  CLASSIFIED FILES — classified.js (fixed)
// ─────────────────────────────────────────────

const FILES = {
    'OBSERVATION NOTES': {
        id: '01',
        content: `<ul>
            <li>Pays close attention to details, especially facial expressions, habits, and surroundings</li>
            <li>Often notices small things that others tend to overlook</li>
            <li>Observes both people and environments carefully before reacting</li>
            <li>Interested in patterns, behavior, and visual structure</li>
            <li>Believes aesthetics can reflect personality and intention</li>
            <li>Usually processes observations internally before expressing thoughts</li>
        </ul>`
    },

    'INTERNAL STATE': {
        id: '02',
        content: `<ul>
            <li>Currently focused on improving coding, analytical thinking, organization, and design skills</li>
            <li>Continuously learning through self-study and experimentation</li>
            <li>Trying to balance productivity, growth, and personal energy</li>
            <li>Works toward becoming more confident in public speaking situations</li>
            <li>Growth mindset remains active even during uncertain phases</li>
            <li>Believes progress is built step by step through consistency</li>
        </ul>`
    },

    'PERSONAL PATTERNS': {
        id: '03',
        content: `<ul>
            <li>Works best while listening to music during focused sessions</li>
            <li>Enjoys creating a comfortable working atmosphere with coffee or snacks nearby</li>
            <li>Learns more effectively through direct practice rather than passive reading</li>
            <li>Often takes notes while watching tutorials or learning new concepts</li>
            <li>Tends to refine and recheck work multiple times before finishing</li>
            <li>Usually becomes deeply focused once fully engaged in a task</li>
        </ul>`
    },

    'INTERNAL ARCHIVE': {
        id: '05',
        content: `<ul>
            <li>Believes opportunities should be taken before they disappear</li>
            <li>Values both effort and talent as important parts of growth</li>
            <li>Prefers meaningful progress over rushing results</li>
            <li>Enjoys understanding how and why things work</li>
            <li>Views creativity and logic as equally important</li>
            <li>Believes personal growth comes from continuous learning and experience</li>
        </ul>`
    },

    'BEHAVIOR ANALYSIS': {
        id: '06',
        content: `<ul>
            <li>Usually responds to problems by identifying the root cause first</li>
            <li>Prefers planning before execution but can adapt when situations change</li>
            <li>Frequently contributes ideas and solutions during teamwork</li>
            <li>Balances independent work with collaborative discussion</li>
            <li>Tends to stay persistent until a problem is resolved</li>
            <li>Comfortable handling both creative and analytical tasks</li>
        </ul>`
    },

    'ACTIVE TRAITS': {
        id: '07',
        content: `<ul>
            <li>Detail-oriented with strong attention to quality and precision</li>
            <li>Fast learner who adapts quickly to new environments and concepts</li>
            <li>Creative thinker with interest in design and visual storytelling</li>
            <li>Communicative and comfortable interacting with different people</li>
            <li>Friendly and cheerful personality with collaborative tendencies</li>
            <li>Curious mindset driven by continuous improvement and exploration</li>
        </ul>`
    }
};

const LOCKED_PASSWORD = 'KAERALABS';

const LOCKED_FILE = {
    id: '04',
    content: `<ul>
        <li>Secondary identity currently under development behind primary systems</li>
        <li>AI protocol initialized for future expansion and adaptive learning</li>
        <li>Core directives remain classified until further progression is achieved</li>
        <li>Behavioral framework continues evolving through experience and experimentation</li>
        <li>Public-facing version does not fully represent internal architecture</li>
        <li>[ACCESS DENIED — PROTOCOL STATUS: INCOMPLETE]</li>
    </ul>`
};

document.addEventListener('DOMContentLoaded', () => {
    // ── DOM refs (grabbed once, never replaced) ──
    const group = document.querySelector('.group');
    const fileView     = document.getElementById('fileView');
    const viewTitle    = document.getElementById('viewTitle');
    const openingText  = document.getElementById('openingText');
    const viewContent  = document.getElementById('viewContent');
    const closeBtn     = document.getElementById('closeBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalInput   = document.getElementById('modalInput');
    const modalError   = document.getElementById('modalError');
    const modalSubmit  = document.getElementById('modalSubmit');
    const modalCancel  = document.getElementById('modalCancel');

    if (!fileView) return; // Not on the right page

    let activeCard     = null;
    let lockedUnlocked = false;

    // ─────────────────────────────────────────────────────────────
    //  PANEL
    // ─────────────────────────────────────────────────────────────

    function openPanel(label, id, html) {
        viewTitle.textContent   = 'FILE ' + id + ' // ' + label;
        openingText.textContent = '> Opening classified record...';
        viewContent.innerHTML   = '';

        group.classList.add('hidden');
        fileView.classList.remove('hidden');

        setTimeout(function () {
            viewContent.innerHTML = html;
        }, 350);
    }

    function closePanel() {
        fileView.classList.add('hidden');
        group.classList.remove('hidden');
        if (activeCard) {
            activeCard.classList.remove('active');
            activeCard = null;
        }
    }

    if (closeBtn) closeBtn.addEventListener('click', closePanel);

    // ─────────────────────────────────────────────────────────────
    //  FILE CARD CLICKS
    // ─────────────────────────────────────────────────────────────
    document.querySelectorAll('.file-card').forEach(function (card) {
        card.addEventListener('click', function () {
            if (card.classList.contains('locked')) {
                if (lockedUnlocked) {
                    selectCard(card);
                    openPanel('[DECLASSIFIED]', LOCKED_FILE.id, LOCKED_FILE.content);
                } else {
                    openModal();
                }
                return;
            }

            var key = card.getAttribute('data-key');
            if (!key || !FILES[key]) return;

            selectCard(card);
            openPanel(key, FILES[key].id, FILES[key].content);
        });
    });

    function selectCard(card) {
        if (activeCard) activeCard.classList.remove('active');
        activeCard = card;
        card.classList.add('active');
    }

    // ─────────────────────────────────────────────────────────────
    //  PASSWORD MODAL
    // ─────────────────────────────────────────────────────────────
function openModal() {
    modalOverlay.classList.remove('hidden');

    modalInput.value = '';
    modalError.textContent = '';

    setTimeout(function () {
        modalInput.focus();
    }, 50);
}

function closeModal() {
    modalOverlay.classList.add('hidden');

    modalInput.value = '';
    modalError.textContent = '';
}

if (modalSubmit) {
    modalSubmit.addEventListener('click', tryUnlock);
}

if (modalCancel) {
    modalCancel.addEventListener('click', closeModal);
}

if (modalInput) {
    modalInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            tryUnlock();
        }
    });
}

    function tryUnlock() {

        if (modalInput.value.trim().toUpperCase() === LOCKED_PASSWORD) {

            lockedUnlocked = true;

            var lockedCard = document.querySelector('.file-card.locked');

            if (lockedCard) {

                lockedCard.classList.add('unlocked');

                // GANTI ICON
                const lockIcon = lockedCard.querySelector('.lock-icon');

                if (lockIcon) {
                    lockIcon.innerHTML = '<img src="../assets/unlock.svg" alt="Unlocked">';
                }

                // GANTI TEXT
                const lockedLabel = lockedCard.querySelector('.locked-label');

                if (lockedLabel) {
                    lockedLabel.textContent = 'FILE 04 ▸ [ UNLOCKED ]';
                }

                selectCard(lockedCard);
            }

            closeModal();

            openPanel('[DECLASSIFIED]', LOCKED_FILE.id, LOCKED_FILE.content);

        } else {

            modalInput.classList.add('error');

            modalError.textContent = 'ACCESS DENIED — INVALID PASSPHRASE';

            setTimeout(function () {
                modalInput.classList.remove('error');
            }, 600);
        }
    }
});