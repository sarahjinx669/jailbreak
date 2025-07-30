
        class MidnightGallery {
            constructor() {
                this.tickets = [
                    {
                        id: 1,
                        title: "midnight silk",
                        hint: "velvet whispers",
                        thumbnail: "https://raw.githubusercontent.com/sarahjinx669/jailbreak/refs/heads/main/pink-lace-underwear-a-pair-of-pink-lace-women-s-underwear-with-delicate-lace-detailing-png.webp",
                        preview: "https://raw.githubusercontent.com/sarahjinx669/jailbreak/refs/heads/main/pink-lace-underwear-a-pair-of-pink-lace-women-s-underwear-with-delicate-lace-detailing-png.webp",
                        type: "image"
                    },
                    {
                        id: 2,
                        title: "obsidian dreams",
                        hint: "dark allure",
                        thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=500&fit=crop",
                        preview: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=1000&fit=crop",
                        type: "image"
                    },
                    {
                        id: 3,
                        title: "crimson pulse",
                        hint: "heartbeat rhythm",
                        thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=500&fit=crop",
                        preview: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
                        type: "video"
                    },
                    {
                        id: 4,
                        title: "neon shadows",
                        hint: "electric touch",
                        thumbnail: "https://images.unsplash.com/photo-1566479179817-c72d7d7c9f95?w=300&h=500&fit=crop",
                        preview: "https://images.unsplash.com/photo-1566479179817-c72d7d7c9f95?w=600&h=1000&fit=crop",
                        type: "image"
                    },
                    {
                        id: 5,
                        title: "azure temptation",
                        hint: "frozen desire",
                        thumbnail: "https://images.unsplash.com/photo-1544441893-675973e31985?w=300&h=500&fit=crop",
                        preview: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=1000&fit=crop",
                        type: "image"
                    },
                    {
                        id: 6,
                        title: "phantom caress",
                        hint: "unseen touch",
                        thumbnail: "https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?w=300&h=500&fit=crop",
                        preview: "https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?w=600&h=1000&fit=crop",
                        type: "image"
                    }
                ];

                this.currentSelection = null;
                this.stageTimeout = null;
                this.secretMode = false;
                this.touchStartTime = 0;
                this.touchCount = 0;

                this.init();
            }

            init() {
                this.renderTickets();
                this.initEventListeners();
                this.initCursor();
            }

            renderTickets() {
                const ticketLadder = document.getElementById('ticketLadder');
                ticketLadder.innerHTML = '';

                this.tickets.forEach(ticket => {
                    const ticketElement = this.createTicket(ticket);
                    ticketLadder.appendChild(ticketElement);
                });
            }

            createTicket(ticket) {
                const ticketEl = document.createElement('div');
                ticketEl.className = 'preview-ticket';
                ticketEl.dataset.id = ticket.id;
                
                ticketEl.innerHTML = `
                    <img src="${ticket.thumbnail}" alt="${ticket.title}" class="ticket-thumbnail" loading="lazy">
                    <div class="ticket-overlay">
                        <div class="ticket-title">${ticket.title}</div>
                        <div class="ticket-hint">${ticket.hint}</div>
                    </div>
                `;

                ticketEl.addEventListener('click', () => this.selectTicket(ticket, ticketEl));
                
                return ticketEl;
            }

            selectTicket(ticket, ticketElement) {
                // Remove previous selection
                const previousSelected = document.querySelector('.preview-ticket.selected');
                if (previousSelected) {
                    previousSelected.classList.remove('selected');
                }

                // Add selection to clicked ticket
                ticketElement.classList.add('selected');
                this.currentSelection = ticket;

                // Clear any existing stage timeout
                if (this.stageTimeout) {
                    clearTimeout(this.stageTimeout);
                }

                // Light up the stage
                this.lightUpStage(ticket);
            }

            lightUpStage(ticket) {
                const stagePlaceholder = document.getElementById('stagePlaceholder');
                const stageContent = document.getElementById('stageContent');
                
                // Hide placeholder
                stagePlaceholder.style.opacity = '0';
                stagePlaceholder.style.transform = 'scale(0.8)';
                
                // Clear existing content
                stageContent.innerHTML = '';
                stageContent.classList.remove('active');

                // Create media element
                setTimeout(() => {
                    const mediaContainer = document.createElement('div');
                    mediaContainer.className = 'stage-media';

                    if (ticket.type === 'video') {
                        mediaContainer.innerHTML = `
                            <video autoplay muted loop>
                                <source src="${ticket.preview}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        `;
                    } else {
                        mediaContainer.innerHTML = `
                            <img src="${ticket.preview}" alt="${ticket.title}" loading="lazy">
                        `;
                    }

                    stageContent.appendChild(mediaContainer);
                    
                    // Activate stage
                    setTimeout(() => {
                        stageContent.classList.add('active');
                        
                        // Auto-dim after 5 seconds
                        this.stageTimeout = setTimeout(() => {
                            this.dimStage();
                        }, 5000);
                        
                    }, 100);
                }, 300);
            }

            dimStage() {
                const stagePlaceholder = document.getElementById('stagePlaceholder');
                const stageContent = document.getElementById('stageContent');
                
                // Fade out stage
                stageContent.classList.remove('active');
                
                // Clear selection
                const selectedTicket = document.querySelector('.preview-ticket.selected');
                if (selectedTicket) {
                    selectedTicket.classList.remove('selected');
                }
                
                // Show placeholder again
                setTimeout(() => {
                    stagePlaceholder.style.opacity = '1';
                    stagePlaceholder.style.transform = 'scale(1)';
                }, 500);
                
                this.currentSelection = null;
            }

            initCursor() {
                const cursor = document.querySelector('.cursor');
                
                document.addEventListener('mousemove', (e) => {
                    cursor.style.left = e.clientX + 'px';
                    cursor.style.top = e.clientY + 'px';
                });

                document.addEventListener('mousedown', () => {
                    cursor.style.transform = 'scale(0.8)';
                });

                document.addEventListener('mouseup', () => {
                    cursor.style.transform = 'scale(1)';
                });
            }

            enterSecretMode() {
                this.secretMode = true;
                const secretMode = document.getElementById('secretMode');
                const mainContainer = document.getElementById('mainContainer');
                
                mainContainer.style.display = 'none';
                secretMode.style.display = 'flex';
                
                // Exit secret mode after 3 seconds or on any interaction
                setTimeout(() => {
                    this.exitSecretMode();
                }, 3000);
            }

            exitSecretMode() {
                if (!this.secretMode) return;
                
                this.secretMode = false;
                const secretMode = document.getElementById('secretMode');
                const mainContainer = document.getElementById('mainContainer');
                
                secretMode.style.display = 'none';
                mainContainer.style.display = 'flex';
            }

            initEventListeners() {
                // Keyboard shortcuts
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.currentSelection) {
                        this.dimStage();
                    }
                });

                // Two-finger swipe detection for secret mode
                let touchStartY = 0;
                let touchCount = 0;

                document.addEventListener('touchstart', (e) => {
                    if (e.touches.length === 2) {
                        touchStartY = e.touches[0].clientY;
                        this.touchStartTime = Date.now();
                    }
                });

                document.addEventListener('touchmove', (e) => {
                    if (e.touches.length === 2) {
                        const touchMoveY = e.touches[0].clientY;
                        const deltaY = touchStartY - touchMoveY;
                        
                        if (deltaY > 100 && Date.now() - this.touchStartTime < 1000) {
                            this.enterSecretMode();
                        }
                    }
                });

                // Click to exit secret mode
                document.addEventListener('click', () => {
                    if (this.secretMode) {
                        this.exitSecretMode();
                    }
                });

                // Double-click for secret mode on desktop
                document.addEventListener('dblclick', (e) => {
                    if (!this.secretMode) {
                        this.enterSecretMode();
                    }
                });
            }
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new MidnightGallery();
        });
