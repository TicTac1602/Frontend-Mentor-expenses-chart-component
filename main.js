const graphDays = document.querySelector('.graph_days');
const graphBars = document.querySelector('.graph_bars');

fetch('./data.json')
    .then(response => response.json())
    .then(data => {

        let days = [];
        let amounts = [];

        for(let i = 0; i < data.length; i++) {
            days.push(data[i].day);
            amounts.push(data[i].amount);
        };
        // ======== days
        const day = days.map(item => {
            return `<p>${item}</p>`;
        }).join('');

        graphDays.innerHTML = day;
        
        // =========== bar items
        const barItems = amounts.map(item => {
            return `<div class="bar">
                        <p class="bar_tooltip">$${item}</p>
                    </div>`;
        }).join('');

        graphBars.innerHTML = barItems;

        // =========== bar heights & hover effect
        const maxHeight = Math.max(...amounts);
        const bars = document.querySelectorAll('.bar');
        bar_container = document.querySelectorAll('.graph_bars')[0];
        bar_container.style.height = `225px`;

        for(let i = 0; i < bars.length; i++) {
            if(amounts[i] == maxHeight) {
                bars[i].style.backgroundColor = `hsl(186, 34%, 60%)`;
                bars[i].classList.add('longest');
            };
            bars[i].style.height = `${10 * amounts[i] / maxHeight*10}%`;
        };

        graphBars.addEventListener('mouseover', e => {
            const element = e.target;
            const tooltip = element.querySelector('.bar_tooltip');

            if(element.classList.contains('bar')) {

                element.style.backgroundColor = `hsla(10, 79%, 65%, 0.75)`;
                if(element.classList.contains('longest')) {
                    element.style.backgroundColor = `hsla(186, 34%, 60%, .75)`;
                };

                tooltip.style.opacity = 1;
            };
        });
        graphBars.addEventListener('mouseout', e => {
            const element = e.target;
            const tooltip = element.querySelector('.bar_tooltip');

            if(element.classList.contains('bar')) {

                element.style.backgroundColor = `hsl(10, 79%, 65%)`;
                if(element.classList.contains('longest')) {
                    element.style.backgroundColor = `hsl(186, 34%, 60%)`;
                };

                tooltip.style.opacity = 0;
            };
        });

    });