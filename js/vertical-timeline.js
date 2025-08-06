// Enhanced Vertical Timeline Component
// This creates a vertical timeline with staggered positioning exactly as requested:
// - First item on top left
// - Next timeline marker starts halfway down the previous textbox
// - Alternating left and right sides

class StaggeredTimeline {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = [
            {
                id: 1,
                position: 'left',
                date: 'December 2020 - Current',
                title: 'Solutions Architect, DCAI',
                company: 'Intel Corp',
                responsibilities: [
                    'Covered Oracle including OCI (Oracle Cloud), Oracle DB and Exadata',
                    'Covered Microsoft including Azure and SQL Server',
                    'Influenced edge design strategies for CESG',
                    'Drove hardware options to enable new products on IA for external CSPs'
                ]
            },
            {
                id: 2,
                position: 'right',
                date: 'April 2018 - November 2020',
                title: 'Enterprise Platform Architect',
                company: 'Intel Corp',
                responsibilities: [
                    'Architected secure network deployment in single tenant OCI using compartments and VCNs',
                    'Implemented tenant and service authentication by federating to enterprise Azure AD using SAML',
                    'Deployed OCI ecosystem using \'infrastructure as code\' principles using Terraform',
                    'Key member on team selecting new PDM/PLM platform for Intel'
                ]
            },
            {
                id: 3,
                position: 'left',
                date: 'October 2010 - April 2018',
                title: 'Lead Infrastructure Architect',
                company: 'Intel Corp',
                responsibilities: [
                    'Engineered Highly Available multi-site failover capability for SPEED platform',
                    'Implemented PowerShell automation to reduce time spent on issues',
                    'Architected and developed automated CI pipeline for SPEED NGS platform',
                    'Led transition of about 100 physical servers to VMs'
                ]
            },
            {
                id: 4,
                position: 'right',
                date: 'June 2005 - October 2010',
                title: 'Staff Software Engineer, Digital Health Group',
                company: 'Intel Corp',
                responsibilities: [
                    'Development lead for Arlington Application team of 8 SW engineers',
                    'Worked on Intel Reader (Intel Achievement Award winner)',
                    'Participated on Intel Health Guide Team (Intel Achievement Award winner)',
                    'Led Mobile Clinical Assistant Team (Intel Achievement Award winner)'
                ]
            }
        ];
        this.init();
    }

    init() {
        if (!this.container) {
            console.error('Timeline container not found');
            return;
        }

        this.render();
        this.addEventListeners();
    }

    render() {
        const timelineHTML = `
            <div class="staggered-timeline">
                <div class="timeline-line"></div>
                ${this.data.map((item, index) => this.createTimelineItem(item, index)).join('')}
            </div>
        `;
        
        this.container.innerHTML = timelineHTML;
    }

    createTimelineItem(item, index) {
        const offsetTop = index * 280; // Further increased spacing: stagger each item by 280px for optimal vertical space
        
        return `
            <div class="timeline-item timeline-item-${item.position}" 
                 style="top: ${offsetTop}px;" 
                 data-index="${index}">
                <div class="timeline-marker">
                    <div class="timeline-marker-inner"></div>
                </div>
                <div class="timeline-content">
                    <div class="timeline-date">${item.date}</div>
                    <h3 class="timeline-title">${item.title}</h3>
                    <h4 class="timeline-company">${item.company}</h4>
                    <ul class="timeline-responsibilities">
                        ${item.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    addEventListeners() {
        // Add scroll animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        this.container.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        // Add hover effects
        this.container.querySelectorAll('.timeline-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('hovered');
            });
            
            item.addEventListener('mouseleave', () => {
                item.classList.remove('hovered');
            });
        });
    }
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StaggeredTimeline('timeline-container');
});
