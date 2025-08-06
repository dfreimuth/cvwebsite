// Clean Timeline Implementation - Rebuilt from scratch
// Creates a vertical timeline with perfect center alignment and staggered positioning

class StaggeredTimeline {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = [
            {
                id: 1,
                side: 'left',
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
                side: 'right',
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
                side: 'left',
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
                side: 'right',
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
        this.setupInteractions();
    }

    render() {
        // Create the main timeline structure
        this.container.innerHTML = `
            <div class="timeline-wrapper">
                <div class="timeline-center-line"></div>
                ${this.data.map((item, index) => this.createTimelineItem(item, index)).join('')}
            </div>
        `;
    }

    createTimelineItem(item, index) {
        const yPosition = index * 300; // Stagger items vertically
        
        return `
            <div class="timeline-entry ${item.side}" style="top: ${yPosition}px;">
                <div class="timeline-dot"></div>
                <div class="timeline-box">
                    <div class="timeline-date-badge">${item.date}</div>
                    <h3 class="timeline-job-title">${item.title}</h3>
                    <h4 class="timeline-company-name">${item.company}</h4>
                    <ul class="timeline-duties">
                        ${item.responsibilities.map(duty => `<li>${duty}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    setupInteractions() {
        // Scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        this.container.querySelectorAll('.timeline-entry').forEach(entry => {
            observer.observe(entry);
        });

        // Hover effects
        this.container.querySelectorAll('.timeline-entry').forEach(entry => {
            entry.addEventListener('mouseenter', () => {
                entry.classList.add('hover-active');
            });
            
            entry.addEventListener('mouseleave', () => {
                entry.classList.remove('hover-active');
            });
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new StaggeredTimeline('timeline-container');
});
