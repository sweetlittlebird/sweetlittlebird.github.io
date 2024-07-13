(function (jQuery, $) {
    if (location.hostname !== 'localhost') {
        // Initialize Google Analytics
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'G-EWGY9N8QXY');

        // Initialize Disqus
        if (document.getElementById('disqus_thread') && location.hostname !== 'localhost') {
            (function () { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = 'https://sweet-little-bird-1.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })();
        }
    }

    $(document).on('click', 'a[href^="#"]', function (e) {
        var hash = $(this).attr('href');
        var hashTxt = decodeURIComponent(hash.substring(1));
        var elem = document.getElementById(hashTxt);

        if (! elem) {
            return;
        }

        var offset = $(elem).offset();

        if (! offset) {
            return;
        }

        $('html, body').animate({
            scrollTop: offset.top
        });

        location.hash = hash;

        e.preventDefault();
        e.stopPropagation();
    });
})(jQuery, jQuery);