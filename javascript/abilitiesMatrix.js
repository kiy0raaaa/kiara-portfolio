document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill-item:not(.locked)');
    const analysisName = document.getElementById('analysisName');
    const analysisPercent = document.getElementById('analysisPercent');
    const analysisDesc = document.getElementById('analysisDesc');
    const typingLine = document.getElementById('typingLine');
    const analysisMeta = document.getElementById('analysisMeta');
    const systemStatus = document.getElementById('systemStatus');

    const skillData = {
        creativity: { 
            name: 'Creativity', 
            desc: 'Skilled at refining ideas into more polished and engaging concepts, especially in visual design, storytelling, and creative project development.', 
            attr: 'COGNITIVE', 
            cls: 'TIER-A', 
            module: 'MOD-CR-84' 
        }, 

        logic: { 
            name: 'Logic', 
            desc: 'Comfortable working with structured and analytical thinking, particularly in problem-solving situations involving mathematics, systems, and technical reasoning.', 
            attr: 'ANALYTICAL', 
            cls: 'TIER-A', 
            module: 'MOD-LG-86' 
        }, 

        problemSolving: { 
            name: 'Problem Solving', 
            desc: 'Able to quickly identify issues, analyze possible causes, and search for effective solutions through research, experimentation, and persistence.', 
            attr: 'STRATEGIC', 
            cls: 'TIER-A', 
            module: 'MOD-PS-88' 
        }, 

        communication: { 
            name: 'Communication', 
            desc: 'Strong communication skills with the ability to actively collaborate, express ideas clearly, and adapt well in both teamwork and social environments.', 
            attr: 'SOCIAL', 
            cls: 'TIER-S', 
            module: 'MOD-CM-89' 
        }, 

        design: { 
            name: 'Design', 
            desc: 'Passionate about visual design and digital aesthetics, with experience creating presentations, content, layouts, and futuristic-inspired visuals using tools such as Canva, CapCut, and Visual Studio Code.', 
            attr: 'ARTISTIC', 
            cls: 'TIER-S', 
            module: 'MOD-DS-91' 
        }
    };

    // Animate progress bars on load
    setTimeout(() => {
        document.querySelectorAll('.skill-bar-fill, .diag-bar-fill').forEach(bar => {
            const target = bar.getAttribute('data-target');
            if (target) bar.style.width = target + '%';
        });
        systemStatus.textContent = 'Analysis complete. Awaiting input.';
    }, 300);

    // Typing effect with cancellation
    let typingTimeout;
    function typeText(element, text, speed = 30) {
        if (typingTimeout) clearTimeout(typingTimeout);
        element.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                typingTimeout = setTimeout(type, speed);
            }
        }
        type();
    }

    const handleInteraction = (skill) => {
        const key = skill.getAttribute('data-skill');
        const data = skillData[key];
        if (!data) return;

        skills.forEach(s => s.classList.remove('active'));
        skill.classList.add('active');

        analysisName.textContent = data.name;
        analysisPercent.textContent = skill.getAttribute('data-value') + '%';
        analysisDesc.textContent = data.desc;
        typeText(typingLine, '> Accessing module ' + data.module + '...');

        analysisMeta.innerHTML = `
            <div class="meta-row"><span class="meta-label">ATTRIBUTE</span><span class="meta-val">${data.attr}</span></div>
            <div class="meta-row"><span class="meta-label">CLASS</span><span class="meta-val">${data.cls}</span></div>
            <div class="meta-row"><span class="meta-label">MODULE ID</span><span class="meta-val">${data.module}</span></div>
        `;
    };

    skills.forEach(skill => {
        skill.addEventListener('mouseenter', () => handleInteraction(skill));
        skill.addEventListener('click', () => handleInteraction(skill));
    });
});
