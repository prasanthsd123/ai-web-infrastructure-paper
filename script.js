// Color Palette
const colors = {
    orange: '#FF6B35',
    orangeLight: '#FF8C61',
    orangeDark: '#E55A28',
    orangeAccent: '#FF9F6D',
    gray900: '#111827',
    gray800: '#1F2937',
    gray700: '#374151',
    gray600: '#4B5563',
    gray500: '#6B7280',
    gray400: '#9CA3AF',
    gray300: '#D1D5DB',
    gray200: '#E5E7EB',
    gray100: '#F3F4F6',
    gray50: '#F9FAFB'
};

// Chart.js Global Configuration
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
Chart.defaults.color = colors.gray600;
Chart.defaults.borderColor = colors.gray200;

// 1. Content Completeness Chart
const contentCompletenessCtx = document.getElementById('contentCompletenessChart');
if (contentCompletenessCtx) {
    new Chart(contentCompletenessCtx, {
        type: 'bar',
        data: {
            labels: ['Client-Side Rendered', 'Server-Side Rendered', 'Static Site Generated'],
            datasets: [
                {
                    label: 'GPTBot',
                    data: [8.3, 94.1, 97.2],
                    backgroundColor: colors.orange,
                },
                {
                    label: 'PerplexityBot',
                    data: [11.2, 92.8, 96.8],
                    backgroundColor: colors.orangeLight,
                },
                {
                    label: 'ClaudeBot',
                    data: [9.7, 93.5, 97.1],
                    backgroundColor: colors.orangeAccent,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Content Completeness by Rendering Mode and Crawler',
                    font: { size: 16, weight: '600' },
                    color: colors.gray900
                },
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Content Completeness (%)',
                        font: { weight: '600' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Rendering Mode',
                        font: { weight: '600' }
                    }
                }
            }
        }
    });
}

// 2. Token Consumption Chart
const tokenConsumptionCtx = document.getElementById('tokenConsumptionChart');
if (tokenConsumptionCtx) {
    new Chart(tokenConsumptionCtx, {
        type: 'bar',
        data: {
            labels: ['Raw HTML', 'Cleaned HTML', 'Clean Text', 'Markdown'],
            datasets: [{
                label: 'Token Count',
                data: [12847, 8563, 2941, 1823],
                backgroundColor: [
                    colors.gray400,
                    colors.gray500,
                    colors.orangeLight,
                    colors.orange
                ],
                borderColor: [
                    colors.gray500,
                    colors.gray600,
                    colors.orangeDark,
                    colors.orangeDark
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Token Consumption Across Content Representations',
                    font: { size: 16, weight: '600' },
                    color: colors.gray900
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const baseline = 12847;
                            const efficiency = ((baseline - value) / baseline * 100).toFixed(1);
                            return [
                                'Tokens: ' + value.toLocaleString(),
                                'Reduction: ' + efficiency + '%'
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Mean Token Count',
                        font: { weight: '600' }
                    }
                }
            }
        }
    });
}

// 3. Latency Profile Chart
const latencyProfileCtx = document.getElementById('latencyProfileChart');
if (latencyProfileCtx) {
    new Chart(latencyProfileCtx, {
        type: 'line',
        data: {
            labels: ['TTFB', 'TTFC', 'Total Load'],
            datasets: [
                {
                    label: 'CSR (Cold Cache)',
                    data: [847, 3421, 5234],
                    borderColor: colors.gray500,
                    backgroundColor: 'rgba(107, 114, 128, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'SSR (Cold Cache)',
                    data: [634, 1823, 2456],
                    borderColor: colors.orangeLight,
                    backgroundColor: 'rgba(255, 140, 97, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'SSG (CDN Edge)',
                    data: [142, 456, 721],
                    borderColor: colors.orange,
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Latency Metrics by Rendering Mode',
                    font: { size: 16, weight: '600' },
                    color: colors.gray900
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Time (milliseconds)',
                        font: { weight: '600' }
                    }
                }
            }
        }
    });
}

// 4. Truncation Rate Chart
const truncationRateCtx = document.getElementById('truncationRateChart');
if (truncationRateCtx) {
    new Chart(truncationRateCtx, {
        type: 'line',
        data: {
            labels: ['2,000 tokens', '4,000 tokens', '8,000 tokens', '16,000 tokens'],
            datasets: [
                {
                    label: 'HTML Truncated',
                    data: [91, 78, 54, 23],
                    borderColor: colors.gray500,
                    backgroundColor: 'rgba(107, 114, 128, 0.1)',
                    borderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    tension: 0.3
                },
                {
                    label: 'Text Truncated',
                    data: [38, 18, 7, 2],
                    borderColor: colors.orangeLight,
                    backgroundColor: 'rgba(255, 140, 97, 0.1)',
                    borderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    tension: 0.3
                },
                {
                    label: 'Markdown Truncated',
                    data: [12, 3, 1, 0],
                    borderColor: colors.orange,
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    borderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Truncation Rates at Different Token Limits',
                    font: { size: 16, weight: '600' },
                    color: colors.gray900
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Percentage of Pages Truncated (%)',
                        font: { weight: '600' }
                    }
                }
            }
        }
    });
}

// 5. Latency Improvement Chart
const latencyImprovementCtx = document.getElementById('latencyImprovementChart');
if (latencyImprovementCtx) {
    new Chart(latencyImprovementCtx, {
        type: 'bar',
        data: {
            labels: ['TTFB (p50)', 'TTFB (p95)', 'TTFB (p99)', 'Total Response'],
            datasets: [
                {
                    label: 'Baseline (HTML)',
                    data: [423, 1247, 2134, 3421],
                    backgroundColor: colors.gray400
                },
                {
                    label: 'Hypotext (Markdown)',
                    data: [94, 187, 312, 203],
                    backgroundColor: colors.orange
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Latency Improvements with Hypotext',
                    font: { size: 16, weight: '600' },
                    color: colors.gray900
                },
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            if (context.datasetIndex === 1) {
                                const baseline = context.chart.data.datasets[0].data[context.dataIndex];
                                const improved = context.parsed.y;
                                const improvement = ((baseline - improved) / baseline * 100).toFixed(1);
                                return 'Improvement: ' + improvement + '%';
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Time (milliseconds)',
                        font: { weight: '600' }
                    }
                }
            }
        }
    });
}

// 6. Token Reduction Chart
const tokenReductionCtx = document.getElementById('tokenReductionChart');
if (tokenReductionCtx) {
    new Chart(tokenReductionCtx, {
        type: 'bar',
        data: {
            labels: ['Product Pages', 'Blog Posts', 'Documentation', 'Landing Pages'],
            datasets: [
                {
                    label: 'HTML Tokens',
                    data: [9234, 14567, 11892, 8123],
                    backgroundColor: colors.gray400
                },
                {
                    label: 'Markdown Tokens',
                    data: [1123, 2341, 1876, 987],
                    backgroundColor: colors.orange
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Token Reduction by Content Type',
                    font: { size: 16, weight: '600' },
                    color: colors.gray900
                },
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            if (context.datasetIndex === 1) {
                                const htmlTokens = context.chart.data.datasets[0].data[context.dataIndex];
                                const mdTokens = context.parsed.y;
                                const reduction = ((htmlTokens - mdTokens) / htmlTokens * 100).toFixed(1);
                                return 'Reduction: ' + reduction + '%';
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Token Count',
                        font: { weight: '600' }
                    }
                }
            }
        }
    });
}

// 7. Crawler Behavior Chart
const crawlerBehaviorCtx = document.getElementById('crawlerBehaviorChart');
if (crawlerBehaviorCtx) {
    new Chart(crawlerBehaviorCtx, {
        type: 'bar',
        data: {
            labels: ['GPTBot', 'PerplexityBot', 'ClaudeBot'],
            datasets: [
                {
                    label: 'Pre-Hypotext (visits/day)',
                    data: [47, 62, 31],
                    backgroundColor: colors.gray400
                },
                {
                    label: 'Post-Hypotext (visits/day)',
                    data: [143, 187, 98],
                    backgroundColor: colors.orange
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'AI Crawler Visit Frequency Changes',
                    font: { size: 16, weight: '600' },
                    color: colors.gray900
                },
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            if (context.datasetIndex === 1) {
                                const before = context.chart.data.datasets[0].data[context.dataIndex];
                                const after = context.parsed.y;
                                const increase = ((after - before) / before * 100).toFixed(0);
                                return 'Increase: +' + increase + '%';
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Visits per Day',
                        font: { weight: '600' }
                    }
                }
            }
        }
    });
}

// 8. Test Corpus Chart
const corpusChartCtx = document.getElementById('corpusChart');
if (corpusChartCtx) {
    new Chart(corpusChartCtx, {
        type: 'doughnut',
        data: {
            labels: ['Client-Side Rendered', 'Server-Side Rendered', 'Static Site Generated'],
            datasets: [{
                data: [40, 40, 40],
                backgroundColor: [
                    colors.gray500,
                    colors.orangeLight,
                    colors.orange
                ],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Test Corpus Distribution (120 pages)',
                    font: { size: 16, weight: '600' },
                    color: colors.gray900
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + ' pages';
                        }
                    }
                }
            }
        }
    });
}

// 9. Web Bifurcation Diagram (Radar Chart)
const webBifurcationCtx = document.getElementById('webBifurcationDiagram');
if (webBifurcationCtx) {
    new Chart(webBifurcationCtx, {
        type: 'radar',
        data: {
            labels: ['Interactivity', 'Visual Effects', 'JavaScript Dependency', 'Token Efficiency', 'Machine Readability', 'Parse Speed'],
            datasets: [
                {
                    label: 'Application Web (Human-Optimized)',
                    data: [95, 90, 85, 15, 20, 30],
                    borderColor: colors.gray500,
                    backgroundColor: 'rgba(107, 114, 128, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Semantic Web (AI-Optimized)',
                    data: [10, 15, 5, 95, 98, 95],
                    borderColor: colors.orange,
                    backgroundColor: 'rgba(255, 107, 53, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'The Bifurcation of the Modern Web',
                    font: { size: 16, weight: '600' },
                    color: colors.gray900
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// 10. Architecture Diagram (Custom visualization)
const architectureDiagramCtx = document.getElementById('architectureDiagram');
if (architectureDiagramCtx) {
    const ctx = architectureDiagramCtx.getContext('2d');
    const canvas = architectureDiagramCtx;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;

    // Drawing configuration
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Helper function to draw rounded rectangle
    function drawRoundedRect(x, y, w, h, r, fillColor, strokeColor) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();

        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
        if (strokeColor) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    // Helper function to draw arrow
    function drawArrow(fromX, fromY, toX, toY, color) {
        const headlen = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.lineTo(toX, toY);
        ctx.fillStyle = color;
        ctx.fill();
    }

    // Draw components
    const boxWidth = 140;
    const boxHeight = 70;
    const spacing = 50;

    // User/Agent
    drawRoundedRect(50, 30, boxWidth, boxHeight, 10, colors.gray100, colors.gray400);
    ctx.fillStyle = colors.gray800;
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('User / Agent', 50 + boxWidth / 2, 30 + boxHeight / 2);

    // CDN Edge
    const edgeX = (width / 2) - (boxWidth / 2);
    drawRoundedRect(edgeX, 30, boxWidth, boxHeight, 10, colors.orange, colors.orangeDark);
    ctx.fillStyle = 'white';
    ctx.fillText('CDN Edge', edgeX + boxWidth / 2, 30 + boxHeight / 2 - 10);
    ctx.font = '12px sans-serif';
    ctx.fillText('(Hypotext)', edgeX + boxWidth / 2, 30 + boxHeight / 2 + 10);

    // Origin Server (React)
    const originX = edgeX - 100;
    const originY = 200;
    drawRoundedRect(originX, originY, boxWidth, boxHeight, 10, colors.gray100, colors.gray400);
    ctx.fillStyle = colors.gray800;
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Origin Server', originX + boxWidth / 2, originY + boxHeight / 2 - 10);
    ctx.font = '12px sans-serif';
    ctx.fillText('(React/Next.js)', originX + boxWidth / 2, originY + boxHeight / 2 + 10);

    // Edge Render (Markdown)
    const renderX = edgeX + boxWidth + 80;
    const renderY = 200;
    drawRoundedRect(renderX, renderY, boxWidth, boxHeight, 10, colors.orangeLight, colors.orangeDark);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Edge Render', renderX + boxWidth / 2, renderY + boxHeight / 2 - 10);
    ctx.font = '12px sans-serif';
    ctx.fillText('(Markdown)', renderX + boxWidth / 2, renderY + boxHeight / 2 + 10);

    // Human Browser Output
    const humanX = 50;
    const humanY = 320;
    drawRoundedRect(humanX, humanY, boxWidth, boxHeight, 10, colors.gray100, colors.gray400);
    ctx.fillStyle = colors.gray800;
    ctx.font = '12px sans-serif';
    ctx.fillText('Human Browser', humanX + boxWidth / 2, humanY + boxHeight / 2);

    // AI Crawler Output
    const aiX = width - 50 - boxWidth;
    const aiY = 320;
    drawRoundedRect(aiX, aiY, boxWidth, boxHeight, 10, colors.orangeLight, colors.orangeDark);
    ctx.fillStyle = 'white';
    ctx.font = '12px sans-serif';
    ctx.fillText('AI Crawler', aiX + boxWidth / 2, aiY + boxHeight / 2);

    // Draw arrows
    drawArrow(50 + boxWidth, 30 + boxHeight / 2, edgeX, 30 + boxHeight / 2, colors.gray500);
    drawArrow(edgeX + boxWidth / 2, 30 + boxHeight, originX + boxWidth / 2, originY, colors.gray500);
    drawArrow(edgeX + boxWidth / 2, 30 + boxHeight, renderX + boxWidth / 2, renderY, colors.orange);
    drawArrow(originX + boxWidth / 2, originY + boxHeight, humanX + boxWidth / 2, humanY, colors.gray500);
    drawArrow(renderX + boxWidth / 2, renderY + boxHeight, aiX + boxWidth / 2, aiY, colors.orange);

    // Add labels
    ctx.font = '11px sans-serif';
    ctx.fillStyle = colors.gray600;
    ctx.textAlign = 'left';
    ctx.fillText('Request', 50 + boxWidth + 10, 30 + boxHeight / 2 - 10);
    ctx.fillText('Human', edgeX - 50, 120);
    ctx.fillText('AI Agent', edgeX + boxWidth + 30, 120);
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.content-box, .constraint-card, .principle-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Console message
console.log('%c🚀 AI Web Infrastructure Research Paper', 'font-size: 20px; font-weight: bold; color: #FF6B35;');
console.log('%cDeveloped with modern web technologies', 'font-size: 12px; color: #6B7280;');
