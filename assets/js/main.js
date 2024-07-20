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

    $(document).on('click', 'a[href]', function (e) {
        var href = $(this).attr('href');
        
        if (! href) {
            return;
        }
        
        if (href.indexOf('#') === 0) {
            var hash = $(this).attr('href');

            if (hash === '#') {
                $('html, body').animate({
                    scrollTop: 0
                });

                location.hash = hash;

                e.preventDefault();
                e.stopPropagation();
                return;
            }

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
                scrollTop: offset.top - 80
            });

            location.hash = hash;

            e.preventDefault();
            e.stopPropagation();
            
            return;
        }
        
        if (href.indexOf('http') === 0) {
            $(this).attr('target', '_blank');
        }
    });

    var scrollHandlerTimeout = 0;

    var scrollHandler = function (scroll) {
        if (scrollHandlerTimeout) {
            clearTimeout(scrollHandlerTimeout);
        }

        scrollHandlerTimeout = setTimeout(function () {
            scrollHandlerTimeout = 0;

            var $header = $('.post-content').find('h2, h3, h4');

            for (var index = 0; index < $header.length; index++) {
                var $el = $header.eq(index);
                var offset = $el.offset();

                if (! offset) {
                    continue;
                }

                if (offset.top >= (scroll + 100)) {
                    var nextIndex = Math.max(index - 1, 0);

                    if (($(window).scrollTop() + $(window).height()) === $(document).height()) {
                        nextIndex = $header.length - 1;
                    }

                    var $entries = $('.toc-minimap').find('.toc-h2, .toc-h3, .toc-h4');
                    $entries.removeClass('active');
                    $entries.eq(nextIndex).addClass('active');

                    break;
                }
            }
        }, 100);
    }
    
    $(document).on('scroll', function () {
        var scrollTop = $(document).scrollTop();
        
        if (scrollTop < 30) {
            $('html').removeClass('scrolled');
        } else {
            $('html').addClass('scrolled');
        }
        
        scrollHandler(scrollTop);
    });
    
    $(window).on('resize', function () {
        var scrollTop = $(document).scrollTop();
        
        scrollHandler(scrollTop);
    });

    var deferreds = [];
    $('img').each(function() {
        if (!this.complete) {
            var deferred = $.Deferred();
            $(this).one('load', deferred.resolve);
            deferreds.push(deferred);
        }
    });
    $.when.apply($, deferreds).done(function() {
        var scrollTop = $(document).scrollTop();

        scrollHandler(scrollTop);
    });
    
    var tocMinimapTimeout = 0;
    
    $('#toc-minimap').on('mouseover', function () {
        var $el = $(this);
        $el.addClass('active').removeClass('collapsed');
        
        if (tocMinimapTimeout) {
            clearTimeout(tocMinimapTimeout);
        }

        tocMinimapTimeout = setTimeout(function () {
            tocMinimapTimeout = 0;

            $el.addClass('animated'); 
        }, 100); 
    }).on('mouseout', function () {
        var $el = $(this);

        if (tocMinimapTimeout) {
            clearTimeout(tocMinimapTimeout);
        }
        
        tocMinimapTimeout = setTimeout(function () {
            tocMinimapTimeout = 0;

            $el.removeClass('active').removeClass('animated').addClass('collapsed');
        }, 100);
    });
})(jQuery, jQuery);