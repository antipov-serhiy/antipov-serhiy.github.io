(function () {

    // moving point by svg path ------------------------

    let paddingTop = document.querySelector('#services-wrapper').offsetTop;
    let scrollValue = document.querySelector('.path-wrapper').scrollHeight;
    let minScrollPercentage = 0;
    let maxScrollPercentage = 1;
    let path = document.querySelector('#point-path')
    let pathLength = path.getTotalLength();

    window.addEventListener('scroll', function positionPoint() {
        let scrollPercentage = ((document.documentElement.scrollTop - paddingTop) / scrollValue).toFixed(4);

        if (scrollPercentage < minScrollPercentage || screen.width < 1024 || scrollPercentage > maxScrollPercentage) return;
        else {
            let moving = path.getPointAtLength(pathLength * scrollPercentage);
            let point = document.querySelector('#point');
            point.setAttribute('transform', 'translate(' + moving.x + ',' + moving.y + ')');
        }
    });
})();