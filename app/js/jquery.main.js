jQuery(function ($) {

    'use strict';

    $(function () {

        $.each($('.site'), function () {
            new Page($(this))
        });

        $.each($('.header-menu'), function () {
            new Menu($(this));
        });

        $.each($('.contact-us__form .form-validation'), function () {
            new FormValidation($(this))
        });

        $.each($('.main-slider'), function () {
            new SliderMain($(this));
        });

        $.each($('.news'), function () {
            new News($(this));
        });

        $.each($('.speakers_load'), function () {
            new Speakers($(this));
        });

        $.each($('.exhibitors_load'), function () {
            new Exhibitors($(this));
        });

        $.each($('.media-gallery'), function () {
            new MediaGallery($(this))
        });

        $.each($('.schedule__items'), function () {
            new ScheduleOpen($(this))
        });

        $.each($('.more-content'), function () {
            new AddMoreContent($(this));
        });

        $.each($('.social-feed'), function () {
            new AddMoreSocial($(this));
        });

        $.each($('.schedule__filters'), function () {
            new FilterSchedule($(this));
        });

    });

    var Page = function (obj) {

        var _self = this,
            _obj = obj,
            _increase = _obj.find('.site__increase'),
            _footer = _obj.find('.site__footer'),
            _content = _obj.find('.site__content'),
            _header = $('.site__header'),
            _window = $(window);

        var _addEvents = function () {

                _window.on({
                    load: function () {

                        _calculateFooterHeight();
                        _fixedHeader();

                    },
                    resize: function () {
                        _calculateFooterHeight();
                    },
                    scroll: function () {

                        _fixedHeader();

                    }

                })

            },
            _calculateFooterHeight = function () {

                _increase.css({
                    height: _footer.innerHeight()
                });

            },
            _fixedHeader = function () {

                if (_window.scrollTop() > 0) {

                    _header.addClass('fixed');

                } else {

                    _header.removeClass('fixed');

                }

            },
            _checkMenuBackground = function () {
                var first = _content.children().first();
                if (!first.hasClass('hero')) {
                    _obj.addClass('header_background');
                }
            },
            _init = function () {

                _calculateFooterHeight();
                _addEvents();
                _checkMenuBackground();
                _obj[0].obj = _self;

            };

        _init();

    };

    var Menu = function (obj) {

        //private properties
        var _self = this,
            _menu = obj,
            _menuItems = _menu.find('.menu-item'),
            _menuItemsLink = _menu.find('.menu-item > a'),
            _subMenu = _menu.find('.sub-menu'),
            _window = $(window),
            _action = false,
            _lastPos,
            _openSubMenuBtn,
            _header = $('.site__header'),
            _showBtn = $('.menu-btn');

        //private methods
        var _addEvents = function () {
                _subMenu.parents('li').append('<span class="header-menu__open-btn"></span>');

                _openSubMenuBtn = _menu.find('.header-menu__open-btn');

                _showBtn.on({
                    'click': function () {

                        _openMenu($(this));

                    }
                });
                _menuItemsLink.on({
                    'click': function () {

                        _slideSubMenu($(this));

                    }
                });
                _openSubMenuBtn.on({
                    'click': function () {

                        _slideSubMenu($(this));

                    }
                });
                _window.on({
                    'resize': function () {

                        _resetStyle();

                    },
                    'scroll': function () {

                        _action = _window.scrollTop() >= _header.innerHeight();

                    },
                    'DOMMouseScroll': function (e) {

                        var delta = e.originalEvent.detail;

                        if (delta) {
                            var direction = (delta > 0) ? 1 : -1;

                            _checkScroll(direction);

                        }

                    },
                    'mousewheel': function (e) {

                        var delta = e.originalEvent.wheelDelta;

                        if (delta) {
                            var direction = (delta > 0) ? -1 : 1;

                            _checkScroll(direction);

                        }

                    },
                    'touchmove': function (e) {

                        var currentPos = e.originalEvent.touches[0].clientY;

                        if (currentPos > _lastPos) {

                            _checkScroll(-1);


                        } else if (currentPos < _lastPos) {

                            _checkScroll(1);

                        }

                        _lastPos = currentPos;

                    },
                    'keydown': function (e) {
                        switch (e.which) {

                            case 32:
                                _checkScroll(1);
                                break;
                            case 33:
                                _checkScroll(-1);
                                break;
                            case 34 :
                                _checkScroll(1);
                                break;
                            case 35 :
                                _checkScroll(1);
                                break;
                            case 36 :
                                _checkScroll(-1);
                                break;
                            case 38:
                                _checkScroll(-1);
                                break;
                            case 40:
                                _checkScroll(1);
                                break;

                            default:
                                return;
                        }
                    }


                });

            },
            _checkScroll = function (direction) {

                if (direction > 0 && !_header.hasClass('site__header_hidden') && !_showBtn.hasClass('opened') && _action) {

                    _header.addClass('site__header_hidden');

                }

                if (direction < 0 && _header.hasClass('site__header_hidden') && !_showBtn.hasClass('opened') && _action) {

                    _header.removeClass('site__header_hidden');

                }

            },
            _openMenu = function (elem) {

                var curItem = elem;

                if (curItem.hasClass('opened')) {

                    curItem.removeClass('opened');
                    _menu.slideUp(300);

                } else {

                    curItem.addClass('opened');
                    _menu.slideDown(300);

                }

            },
            _slideSubMenu = function (elem) {

                var curElem = elem,
                    subMenu = curElem.prev('.sub-menu');

                if (_window.width() < 992 && subMenu.length) {

                    if (curElem.parent().hasClass('opened')) {

                        curElem.parent().removeClass('opened');
                        subMenu.slideUp(300);

                    } else {

                        _subMenu.slideUp(300);
                        _menuItems.removeClass('opened');

                        curElem.parent().addClass('opened');
                        subMenu.slideDown(300);

                    }

                    return false;

                }

            },
            _resetStyle = function () {

                _showBtn.removeClass('opened');
                _menuItemsLink.parent().removeClass('opened');
                _menu.removeAttr('style');
                _subMenu.removeAttr('style');

            },
            _init = function () {
                _menu[0].obj = _self;
                _addEvents();
            };

        _init();
    };

    var FormValidation = function (obj) {

        var _self = this,
            _obj = obj,
            _path = _obj.attr('action'),
            _inputs = _obj.find('[required]'),
            _sentMessageMark = _obj.find('.site__form-sent'),
            _request = new XMLHttpRequest();

        var _addEvents = function () {

                _obj.on({
                    'submit': function () {

                        $.each(_inputs, function () {

                            var curItem = $(this),
                                curAttr = curItem.attr('type');

                            if (curItem.val() == '') {
                                curItem.addClass('form-validation__error');
                            }

                            if (curAttr == 'email') {
                                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                                if (pattern.test(curItem.val()) == false) {
                                    curItem.addClass('form-validation__error');
                                }
                            }

                        });

                        if (_obj.find('.form-validation__error').length) {
                            return false;
                        } else {
                            _ajaxRequest();
                        }

                        return false;

                    }

                });

                _inputs.on({
                    'focus': function () {

                        var curItem = $(this);

                        if (curItem.hasClass('form-validation__error')) {
                            curItem.removeClass('form-validation__error');
                        }

                    }

                });

            },
            _ajaxRequest = function () {

                _request.abort();
                _request = $.ajax({
                    url: fudgeJS.ajax_url,
                    data: _obj.serialize(),
                    dataType: 'json',
                    timeout: 20000,
                    type: "POST",
                    success: function (msg) {
                        if (msg.error === false) {
                            _obj.trigger('reset');
                            _sentMessageMark.removeClass('site__form-sent_hidden');
                        } else {
                            alert(msg.message);
                        }
                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != "abort") {
                            alert('Error!');
                        }
                    }
                });

            },
            _init = function () {
                _addEvents();
                _obj[0].obj = _self;
            };

        _init();

    };

    var SliderMain = function (obj) {

        //private properties
        var _self = this,
            _sliderSwiper,
            _slider = obj,
            _items = _slider.find('.swiper-slide'),
            _window = $(window);

        //private methods
        var _addEvents = function () {

                _window.on({
                    'load': function () {

                        //_setHeight();

                    },
                    'resize': function () {

                        //_setHeight();

                    }

                });

            },
            _initSlider = function () {

                _sliderSwiper = new Swiper(_slider, {
                    paginationClickable: true,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    spaceBetween: 30,
                    autoHeight: true

                });

            },
            _setHeight = function () {

                $.each(_items, function () {

                    _items.height(_slider.height())

                });

            },
            _init = function () {

                _initSlider();
                _addEvents();
                _slider[0].obj = _self;

            };

        _init();
    };

    var MediaGallery = function (obj) {

        var _self = this,
            _obj = obj,
            _wrapper = _obj.find('.media-gallery__wrap'),
            _cover = _obj.find('.media-gallery__cover'),
            _galleryItemClass = null,
            _window = $(window),
            _btnMore = _obj.find('.media-gallery__more'),
            _btnAction = _btnMore.data('action'),
            _isGallery = false,
            _request = new XMLHttpRequest();

        var _addGalleryContent = function (msg) {

                var hasItems = msg.has_items,
                    path = null,
                    newBlock = null;

                $.each(msg.items, function (i) {

                    if (this.video == undefined) {
                        path = this.href;
                    } else {
                        path = this.video;
                    }

                    newBlock = $('<a href="' + path + '" title="' + this.title + '" class="media-gallery__item hidden" style="background-image: url(' + this.dummy + ');"><span class="media-gallery__item-title">' + this.title + '</span></a>');

                    if (i == 0 || i == 4) {
                        newBlock.addClass('media-gallery__item_height2x');
                    }

                    if (i == 2 || i == 4 || i == 7) {
                        newBlock.addClass('media-gallery__item_width2x');
                    }

                    if (this.video) {
                        newBlock.addClass('media-gallery__item_video');
                    }

                    _wrapper.append(newBlock);

                });

                var newItems = _wrapper.find('.hidden');
                _btnMore.data('remaining', msg.remaining);

                setTimeout(function () {
                    _heightAnimation(hasItems, newItems);
                }, 50);

            },
            _addEvents = function () {

                _window.on({
                    resize: function () {

                        if (_window.width() + _getScrollWidth() >= 1000) {

                            if (!_isGallery) {
                                _initGallery();
                            }

                        } else {

                            if (_isGallery) {
                                _destroyGallery();
                            }

                        }

                    }

                });

                _btnMore.on({
                    click: function () {
                        _loadNewItems();
                        return false;
                    }

                });

                _obj.on('click', '.media-gallery__item', function () {

                    SwiperPopup($(this), $(this).index());

                    return false;

                });

            },
            _destroyGallery = function () {

                _wrapper.isotope('destroy');
                _isGallery = false;

            },
            _getScrollWidth = function () {
                var div = document.createElement('div'),
                    scrollWidth = null;

                div.style.overflowY = 'scroll';
                div.style.width = '50px';
                div.style.height = '50px';
                div.style.visibility = 'hidden';

                document.body.appendChild(div);

                scrollWidth = div.offsetWidth - div.clientWidth;

                document.body.removeChild(div);
                return scrollWidth;
            },
            _heightAnimation = function (hasItems, newItems) {

                _cover.animate({
                    height: _wrapper.height()
                }, {
                    duration: 500,
                    complete: function () {

                        _cover.css('height', '');

                        newItems.each(function (i) {
                            _showNewItems($(this), i);
                        });

                        if (hasItems == 0) {
                            _removeBtnMore();
                        }

                    }
                })

            },
            _initGallery = function () {

                _wrapper = _obj.find('.media-gallery__wrap');
                _galleryItemClass = '.media-gallery__item';

                _wrapper.isotope({
                    itemSelector: _galleryItemClass,
                    masonry: {
                        columnWidth: 0
                    }
                });

                _isGallery = true;

            },
            _init = function () {

                if (_window.width() + _getScrollWidth() >= 1000) {
                    _initGallery();
                }

                _addEvents();
                _obj[0].obj = _self;
            },
            _loadNewItems = function () {
                var ids = _btnMore.data('remaining');
                var galleryItem = _wrapper.find('.media-gallery__item');
                _request.abort();
                _request = $.ajax({
                    url: fudgeJS.ajax_url,
                    data: {
                        action: 'fudge_load_media',
                        ids: ids
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: "GET",
                    success: function (msg) {

                        if (_window.width() + _getScrollWidth() < 1000) {
                            _addGalleryContent(msg);
                        } else {
                            _cover.height(_cover.height());
                            _destroyGallery();
                            _addGalleryContent(msg);
                            setTimeout(function () {
                                _initGallery();
                            }, 10);
                        }

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert('Error!');
                        }
                    }
                });

            },
            _removeBtnMore = function () {

                _btnMore.css('opacity', 0);

                setTimeout(function () {

                    _btnMore.css('padding', 0);

                    _btnMore.animate({
                        height: 0
                    }, {
                        duration: 500,
                        complete: function () {
                            _btnMore.remove();
                        }
                    });

                }, 300);

            },
            _showNewItems = function (item, index) {

                setTimeout(function () {
                    item.removeClass('hidden');
                }, index * 100);

            };


        _init();

    };

    var ScheduleOpen = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj.find('.schedule__item-drop-down'),
            _close = _obj.find('.schedule__close'),
            _btnOpen = _items.find('.schedule__event');

        //private methods
        var _addEvents = function () {

                _close.on({
                    'click': function () {

                        _closeScheduleDetails($(this));

                        return false;

                    }
                });

                _btnOpen.on({
                    'click': function () {

                        if (_obj.hasClass('schedule__items_profile')) {

                            _openProfileDetails($(this));

                        } else {

                            _openScheduleDetails($(this));

                        }
                    }
                });

            },
            _openScheduleDetails = function (elem) {

                var curItem = elem,
                    curItemParent = curItem.parent(_items),
                    details = curItem.next();

                if (_obj.hasClass('schedule__items_profile')) {
                    details = curItem.parent().next();
                }

                if (curItemParent.hasClass('opened')) {

                    curItemParent.removeClass('opened');
                    details.slideUp(300);

                } else {

                    _items.removeClass('opened');
                    _btnOpen.next().slideUp(300);

                    curItemParent.addClass('opened');
                    details.slideDown(300);

                }

            },
            _openProfileDetails = function (elem) {

                var curItem = elem,
                    curItemParent = curItem.parent().parent(_items),
                    details = curItem.parent().next();

                if (curItemParent.hasClass('opened')) {

                    curItemParent.removeClass('opened');
                    details.slideUp(300);

                } else {
                    _items.removeClass('opened');
                    _btnOpen.parent().next().slideUp(300);

                    curItemParent.addClass('opened');
                    details.slideDown(300);

                }

            },
            _closeScheduleDetails = function (elem) {

                var curItem = elem,
                    curItemParent = curItem.parents(_items),
                    details = curItem.parent();

                curItemParent.removeClass('opened');
                details.slideUp(300);

            },
            _init = function () {

                _btnOpen.off();

                _close.off();

                _addEvents();  //_addEvents();
                _obj[0].obj = _self;

            };

        _init();
    };

    var FilterSchedule = function (obj) {


        //private properties
        var _self = this,
            _obj = obj,
            _page = 1,
            _wrapper = _obj.parent().find($('.schedule__items')),
            _dateButtons = _obj.parent().find('.schedule__date-btn'),
            _venueFilter = _obj.find('.schedule__filters-main-venue'),
            _btnMore = _obj.parent().find('.load-more__btn'),
            _labelFilter = _obj.find('.schedule__filters-technology'),
            _dropdown = _obj.closest('.schedule').hasClass('more-content') ? 'schedule__item-drop-down' : false,
            _request = new XMLHttpRequest();

        var _addEvents = function () {
                _dateButtons.on({
                    'click': function (e) {
                        e.preventDefault();
                        _dateButtons.removeClass('active');
                        $(this).addClass('active');
                        _doAjaxFilter();
                    }
                });
                _venueFilter.on({
                    'change': function (e) {
                        _doAjaxFilter();
                    }
                });
                _labelFilter.on({
                    'change': function (e) {
                        _doAjaxFilter();
                    }
                });
                _btnMore.on({
                    click: function (e) {
                        e.preventDefault();
                        _doAjaxFilter(_page);
                        return false;
                    }

                });
            },
            _addNewContent = function (msg) {
                var lastBlock = false;
                var lastConcurrent = false;
                if (_page == 1) {
                    _wrapper.html('');
                }
                $.each(msg.sessions, function (i) {
                    if (lastBlock) {
                        var lastTime = lastBlock.find('.schedule__time').text();
                        lastTime = lastTime.split('-');
                        if ($.trim(lastTime[0]) == this.time) {
                            if (!lastConcurrent) {
                                lastConcurrent = $('<div class="schedule__concurrent"></div>').appendTo(_wrapper);
                            }
                            lastConcurrent.append(lastBlock);
                        } else {
                            if (lastConcurrent) {
                                lastConcurrent.append(lastBlock);
                                lastConcurrent = false;
                            } else {
                                _wrapper.append(lastBlock);
                            }
                        }
                    }
                    var newBlockString = '<div class="schedule__item ' + _dropdown + ' more-content__item">' +
                        '<time class="schedule__time" datetime="' + this.time + '">' + this.time + ' - ' + this.end_time + '</time>' +
                        '<h2 class="schedule__event">' + this.post_title + '</h2>' +
                        '<div class="schedule__details">';
                    if (_dropdown) {
                        newBlockString += ' <a class="schedule__close" href="#"><i class="fa fa-times"></i></a>';
                    }
                    newBlockString += '<a href="#" class="schedule__main-place"><i class="fa fa-location-arrow"></i> ' + this.location + '</a>' +
                        '<div class="schedule__layout">' +
                        '<div class="schedule__speakers-group">'; // schedule__speakers-group

                    $.each(this.speakers, function () {
                        var speaker_image = '';
                        if (typeof (this.post_image[0]) !== 'undefined') {
                            speaker_image = 'background-image: url(' + this.post_image[0] + ')';
                        }
                        var favourite = this.featured ? 'speakers-favorite speakers-favorite_small' : '';
                        newBlockString += '<a href="' + this.url + '" class="schedule__speaker">' + // schedule__speaker
                            '<div class="schedule__speaker-pic ' + favourite + '" style="' + speaker_image + '">' +
                            '<span class="schedule__speaker-hover">' + msg.strings.view_profile + '</span>' +
                            '</div>' +
                            '<h3 class="schedule__speaker-name">' + this.post_title + '</h3>' +
                            '</a>'; // /schedule__speaker
                    });

                    newBlockString += '</div>' + // /schedule__speakers-group
                        '<div class="schedule__info">' +
                        '<div class="schedule__text">' + this.post_excerpt + '</div>' +
                        '<div class="schedule__labels">';

                    $.each(this.tracks, function () {
                        newBlockString += '<span class="label" style="background-color:' + this.color + ';">' +
                            this.name +
                            '</span> ';
                    });

                    newBlockString += '</div>' +
                        '<a href="' + this.url + '" class="btn btn_7">' + msg.strings.more_info + '</a>' +
                        '</div>' + // /schedule__info
                        '</div>' + // /schedule__layout
                        '</div>' + // /schedule__details
                        '</div>'; // /schedule__item

                    var newBlock = $(newBlockString);

                    if (msg.sessions.length == 1 || msg.sessions.length == i + 1) {
                        if (lastConcurrent) {
                            lastConcurrent.append(newBlock);
                            lastConcurrent = false;
                        } else {
                            _wrapper.append(newBlock);
                        }
                    }
                    lastBlock = newBlock;

                });

                var newItems = _wrapper.find('.hidden');
                setTimeout(function () {

                    $.each($('.schedule__items'), function () {

                        new ScheduleOpen($(this));

                    });

                }, 10);

                setTimeout(function () {
                    _heightAnimation(msg.has_items, newItems);
                }, 50);
            },
            _heightAnimation = function (hasItems, newItems) {

                newItems.each(function (i) {

                    _showNewItems($(this), i);

                });
                if (hasItems == 0) {
                    _hideBtnMore();
                } else {
                    _showBtnMore();
                    _page++;
                }
            },
            _showNewItems = function (item, index) {

                setTimeout(function () {

                    item.removeClass('hidden');

                }, index * 300);

            },
            _doAjaxFilter = function (page) {
                if (typeof (page) == 'undefined') {
                    _page = 1;
                }
                var date = _obj.parent().find('.schedule__date-btn.active').data('value'),
                    location = _obj.find('.schedule__filters-main-venue option:selected').val(),
                    label = _obj.parent().find('.schedule__filters-technology option:selected').val();
                _request.abort();
                _request = $.ajax({
                    url: fudgeJS.ajax_url,
                    data: {
                        'action': 'get_schedule',
                        'data-timestamp': date,
                        'data-location': location,
                        'data-track': label,
                        'data-page': _page,
                        'data-max-items': _obj.closest('[data-max-items]').attr('data-max-items')
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: 'POST',
                    success: function (msg) {
                        _addNewContent(msg);
                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert('Error!');
                        }
                    }
                });

            },
            _hideBtnMore = function () {

                _btnMore.css('opacity', 0);

                setTimeout(function () {

                    _btnMore.hide();

                }, 300);

            },
            _showBtnMore = function () {

                _btnMore.show();

                setTimeout(function () {

                    _btnMore.css('opacity', 1);

                }, 50);

            },
            _init = function () {

                _doAjaxFilter();
                _addEvents();
                _obj[0].obj = _self;

            };

        _init();

    };

    var News = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _btnMore = _obj.find('.news__more'),
            _btnAction = _btnMore.data('action'),
            _wrapper = _obj.find('.news__layout'),
            _request = new XMLHttpRequest();

        //private methods
        var _addEvents = function () {

                _btnMore.on({
                    click: function () {
                        _ajaxRequest();
                        return false;
                    }

                });

            },
            _addNewsContent = function (msg) {

                var hasItems = msg.has_items;

                $.each(msg.items, function () {

                    var newBlock = $('<div class="news__item" data-id="' + this.id + '"><article class="news__article hidden">' +
                        '<div class="news__picture" style="background-image:url( ' + this.picture + ' )"></div>' +
                        '<div class="news__content">' +
                        '<time datetime="' + this.date + '" class="news__date">' + this.date + '</time>' +
                        '<h2 class="news__title">' + this.title + '</h2>' +
                        '<a href="' + this.href + '" class="btn btn_4">READ MORE</a>' +
                        '</div></article></div>');

                    _wrapper.append(newBlock);

                });

                var newItems = _wrapper.find('.hidden');
                _btnMore.data('remaining', msg.remaining);

                setTimeout(function () {
                    _heightAnimation(hasItems, newItems);
                }, 50);

            },
            _heightAnimation = function (hasItems, newItems) {

                newItems.each(function (i) {
                    _showNewItems($(this), i);
                });

                if (hasItems == 0) {
                    _removeBtnMore();
                }

            },
            _showNewItems = function (item, index) {

                setTimeout(function () {
                    item.removeClass('hidden');
                }, index * 100);

            },
            _ajaxRequest = function () {

                var loadedItems = [];
                var ids = _btnMore.data('remaining');
                _request.abort();
                _request = $.ajax({
                    url: fudgeJS.ajax_url,
                    data: {
                        action: 'fudge_load_news',
                        ids: ids
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: 'GET',
                    success: function (msg) {

                        _addNewsContent(msg);

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert('Error!');
                        }
                    }
                });

            },
            _removeBtnMore = function () {

                _btnMore.css('opacity', 0);

                setTimeout(function () {

                    _btnMore.css('padding', 0);

                    _btnMore.animate({
                        height: 0
                    }, {
                        duration: 500,
                        complete: function () {
                            _btnMore.remove();
                        }
                    });

                }, 300);

            },
            _init = function () {

                _addEvents();
                _obj[0].obj = _self;

            };

        _init();
    };

    var AddMoreContent = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _btnMore = _obj.find($('.more-content__btn')),
            _btnAction = _btnMore.data('action'),
            _wrapper = _obj.find($('.more-content__wrapper')),
            _request = new XMLHttpRequest();

        //private methods
        var _addEvents = function () {

                _btnMore.on({
                    click: function () {

                        _addNewBlocks();

                        return false;
                    }

                });

            },
            _addNewContent = function (msg) {

                var contentMsg = msg.html;

                _wrapper.append(contentMsg);

                var newItems = _wrapper.find('.hidden');

                setTimeout(function () {

                    $.each($('.schedule__items'), function () {

                        new ScheduleOpen($(this));

                    });

                }, 10);

                setTimeout(function () {

                    _heightAnimation(newItems);

                }, 50);

                if (!msg.has_items) {

                    _removeBtnMore();

                }

            },
            _heightAnimation = function (newItems) {

                newItems.each(function (i) {

                    _showNewItems($(this), i);

                });

            },
            _showNewItems = function (item, index) {

                setTimeout(function () {

                    item.removeClass('hidden');

                }, index * 300);

            },
            _removeBtnMore = function () {

                _btnMore.addClass('hidden');

            },
            _addNewBlocks = function () {

                var items = _obj.find('.more-content__item');

                _request.abort();

                _request = $.ajax({
                    url: _btnAction,
                    data: {
                        loadedCount: items.length
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: "GET",
                    success: function (msg) {

                        _addNewContent(msg)

                    },
                    error: function (XMLHttpRequest) {

                        if (XMLHttpRequest.statusText != "abort") {

                            alert("Error!");

                        }
                    }
                });

            },
            _init = function () {

                _addEvents();
                _obj[0].obj = _self;

            };

        _init();
    };

    var Speakers = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _btnMore = _obj.find('.speakers__more'),
            _btnAction = _btnMore.data('action'),
            _wrapper = _obj.find('.speakers__layout'),
            _request = new XMLHttpRequest(),
            _titleStyle = _obj.find('.speakers__name').first().attr('style'),
            _subTitleStyle = _obj.find('.speakers__post').first().attr('style');

        //private methods
        var _addEvents = function () {

                _btnMore.on({
                    click: function () {
                        _ajaxRequest();
                        return false;
                    }

                });

            },
            _addNewsContent = function (msg) {

                var hasItems = msg.has_items;

                $.each(msg.items, function () {

                    var newBlock = $('<div class="speakers__item" data-id="' + this.id + '"><a href="' + this.href + '" class="speakers__person hidden ' + this.favorite + ' ">' +
                        '<div class="speakers__photo" style="background-image:url( ' + this.picture + ' )"></div>' +
                        '<h3 class="speakers__name" style="' + _titleStyle + '">' + this.name + '</h3>' +
                        '<span class="speakers__post" style="' + _subTitleStyle + '">' + this.post + '</span>' +
                        '</a></div>');


                    _wrapper.append(newBlock);

                });

                var newItems = _wrapper.find('.hidden');

                setTimeout(function () {
                    _heightAnimation(hasItems, newItems);
                }, 50);

            },
            _heightAnimation = function (hasItems, newItems) {

                newItems.each(function (i) {
                    _showNewItems($(this), i);
                });

                if (hasItems == 0) {
                    _removeBtnMore();
                }

            },
            _showNewItems = function (item, index) {

                setTimeout(function () {
                    item.removeClass('hidden');
                }, index * 100);

            },
            _ajaxRequest = function () {

                var newsItem = _obj.find('.speakers__person');
                var loadedItems = [];
                _obj.find('.speakers__item').each(function () {
                    loadedItems.push($(this).data('id'))
                });
                loadedItems = loadedItems.join();
                _request.abort();
                _request = $.ajax({
                    url: fudgeJS.ajax_url,
                    data: {
                        action: 'fudge_load_speakers',
                        loadedItems: loadedItems,
                        loadedCount: newsItem.length
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: 'GET',
                    success: function (msg) {

                        _addNewsContent(msg);

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert('Error!');
                        }
                    }
                });

            },
            _removeBtnMore = function () {

                _btnMore.css('opacity', 0);

                setTimeout(function () {

                    _btnMore.css('padding', 0);

                    _btnMore.animate({
                        height: 0
                    }, {
                        duration: 500,
                        complete: function () {
                            _btnMore.remove();
                        }
                    });

                }, 300);

            },
            _init = function () {

                _addEvents();
                _obj[0].obj = _self;

            };

        _init();
    };

    var Exhibitors = function (obj) {
        var _obj = obj,
            _self = this,
            _filters = _obj.find('.exhibitor_filter'),
            _request = new XMLHttpRequest(),
            _searchInput = _obj.find('#search_exhibitors'),
            _loadContainer = _obj.find('.exhibitors__items .exhibitors__item').first();

        var _addEvents = function () {
                _filters.on({
                    change: function () {
                        _ajaxRequest();
                        return false;
                    }
                });
                _searchInput.on({
                    keyup: Debounce(function () {
                        _ajaxRequest();
                        return false;
                    }, 500)
                });
            },
            _ajaxRequest = function () {
                var selectedCategory = _filters.find('#selector-category').val();
                var searchTerm = _searchInput.val();
                _request.abort();
                _request = $.ajax({
                    url: fudgeJS.ajax_url,
                    data: {
                        action: 'fudge_load_exhibitors',
                        cat: selectedCategory,
                        search: searchTerm
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: 'GET',
                    success: function (msg) {

                        _addExhibitorsContent(msg);

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert('Error!');
                        }
                    }
                });
            },
            _addExhibitorsContent = function (msg) {

                _loadContainer.html('');
                $.each(msg.items, function () {
                    var newBlock = $('<a href="' + this.url + '" class="exhibitors__logo" title="' + this.title + '">' +
                        '<div style="background-image: url(' + this.logo + ')">' +
                        '</div>' +
                        '</a>');
                    _loadContainer.append(newBlock);
                });
            },
            _init = function () {
                _addEvents();
            };
        _init();

    };

    var SwiperPopup = function (obj, index) {

        var _self = this,
            _obj = obj,
            _body = $('body'),
            _wrapper = _obj.parent(),
            _links = _wrapper.find('.media-gallery__item'),
            _html = $('html'),
            _window = $(window),
            _popup = null,
            _popupInner = null,
            _popupClose = null,
            _swiperWrapper = null,
            _swiperContainer = null,
            _swiperPagination = null,
            _swiperBtnNext = null,
            _swiperBtnPrev = null,
            _swiper = null;

        var _addEvents = function () {

                _window.on({
                    resize: function () {

                        _setPictureSizeWhenResize();

                    }

                });

                _popupInner.parent().on({
                    click: function () {

                        _closePopup();

                    }

                });

                _popupInner.on({
                    click: function (event) {

                        event.stopPropagation();

                    }

                });

                _popupClose.on({
                    click: function () {

                        _closePopup();
                        return false;

                    }
                })

            },
            _addingVariables = function () {

                _popup = $('<div class="swiper-popup">\
                                    <div class="swiper-container">\
                                        <div class="swiper-wrapper"></div>\
                                        <div class="swiper-pagination"></div>\
                                        <div class="swiper-button-next"></div>\
                                        <div class="swiper-button-prev"></div>\
                                    </div>\
                                </div>');
                _swiperWrapper = _popup.find('.swiper-wrapper');
                _swiperContainer = _popup.find('.swiper-container');
                _swiperPagination = _popup.find('.swiper-pagination');
                _swiperBtnNext = _popup.find('.swiper-button-next');
                _swiperBtnPrev = _popup.find('.swiper-button-prev');

                _swiperBtnNext.css('border-color', _obj.data('color'));
                _swiperBtnPrev.css('border-color', _obj.data('color'));

            },
            _addVideo = function () {

                var activeSlide = _popup.find('.swiper-slide-active'),
                    src = activeSlide.find('[data-src]').data('src'),
                    innerContent = $('<iframe src="' + src + '"> frameborder="0" allowfullscreen></iframe>');

                $('.swiper-slide-active').find('.swiper-popup__video').prepend(innerContent);

            },
            _buildPopup = function () {

                _addingVariables();
                _contentFilling();
                _initSwiper();
                _popup.addClass('active');
                _swiper.slideTo(index, 0);
                _setStyles();
                _swiper.onResize();
            },
            _closePopup = function () {

                _popup.removeClass('active');
                setTimeout(function () {
                    _html.css({overflow: '', paddingRight: ''});
                    _popup.remove();
                }, 300);

            },
            _contentFilling = function () {

                $.each(_links, function () {

                    var innerContent = null,
                        dataSRC = null,
                        preloader = null;

                    if ($(this).hasClass('media-gallery__item_video')) {

                        preloader = '<i class="fa fa-spinner fa-spin"></i>';
                        innerContent = '<div class="swiper-popup__video"/>';
                        dataSRC = 'data-src="' + $(this).attr("href") + '"';

                    } else {

                        preloader = '';
                        innerContent = '<img src="' + $(this).attr('href') + '">';
                        dataSRC = '';

                    }

                    var newItem = $('<div class="swiper-slide">\
                                        <div class="swiper-popup__inner" ' + dataSRC + '>\
                                            <a href="#" class="swiper-popup__close"></a>\
                                            ' + preloader + '\
                                            ' + innerContent + '\
                                            <span class="swiper-slide__title">' + $(this).attr('title') + '</span>\
                                        </div>\
                                    </div>');
                    newItem.css('color', _obj.data('color'));
                    newItem.find('.swiper-popup__close').css('color', _obj.data('color'));
                    _swiperWrapper.append(newItem);

                    newItem.find('img').on({
                        load: function () {
                            $(this).attr('data-width', this.width);
                            $(this).attr('data-height', this.height);
                            _setPictureSize(this.width, this.height, $(this));
                        }
                    });

                });

                _body.append(_popup);

                _popupInner = _popup.find('.swiper-popup__inner');
                _popupClose = _popup.find('.swiper-popup__close');

            },
            _getScrollWidth = function () {
                var scrollDiv = document.createElement('div'),
                    scrollbarWidth = null;
                document.body.appendChild(scrollDiv);
                scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            },
            _initSwiper = function () {

                _swiper = new Swiper(_swiperContainer, {
                    pagination: _swiperPagination,
                    nextButton: _swiperBtnNext,
                    prevButton: _swiperBtnPrev,
                    slidesPerView: 1,
                    paginationClickable: true,
                    onInit: function () {
                        _removeVideo();

                        if ( $( '.swiper-slide-active' ).find( '[data-src]' ).length ) {
                            _addVideo();
                        }

                    },
                    onSlideChangeEnd: function () {
                        _removeVideo();

                        if ( $( '.swiper-slide-active' ).find( '[data-src]' ).length ) {
                            _addVideo();
                        }

                    }
                });

            },
            _init = function () {
                _buildPopup();
                _addEvents();
                _obj[0].obj = _self;
            },
            _removeVideo = function () {

                var items = _popup.find('.swiper-slide'),
                    videoFrame = items.find('.swiper-popup__video iframe');
                videoFrame.remove();

            },
            _setPictureSize = function (picWidth, picHeight, pic) {

                var k = 0;

                if ((_popup.width() / picWidth) > (_popup.height() / picHeight)) {
                    k = _popup.height() / picHeight;
                } else {
                    k = _popup.width() / picWidth;
                }

                if (k >= 1) {

                    pic.css({
                        "width": picWidth * 0.85,
                        "height": picHeight * 0.85
                    });

                } else {

                    pic.css({
                        "width": k * picWidth * 0.85,
                        "height": k * picHeight * 0.85
                    });

                }

            },
            _setPictureSizeWhenResize = function () {

                $.each(_swiperWrapper.find('img'), function () {

                    _setPictureSize($(this).data('width'), $(this).data('height'), $(this));

                });

            },
            _setStyles = function () {

                _html.css({
                    overflow: 'hidden',
                    paddingRight: _getScrollWidth()
                });

            };

        _init();

    };

    var AddMoreSocial = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _btnMore = _obj.find('.social-feed__more'),
            _btnAction = _btnMore.data('action'),
            _wrapper = _obj.find('.social-feed__wrap'),
            _request = new XMLHttpRequest(),
            _boxStyle = _obj.find('.social-feed__inner').first().attr('style'),
            _textStyle = _obj.find('.social-feed__txt').first().attr('style'),
            _titleStyle = _obj.find('.social-feed__name').first().attr('style');

        //private methods
        var _addEvents = function () {

                _btnMore.on({
                    click: function () {
                        var next_url = $(this).data('action');
                        _ajaxRequest(next_url);
                        return false;
                    }

                });

            },
            _addSocialContent = function (msg) {

                var hasItems = msg.has_items;

                $.each(msg.items, function () {

                    var newBlock = $('<div class="social-feed__item hidden">' +
                        '<div class="social-feed__inner" style="' + _boxStyle + '">' +
                        '<div class="social-feed__head">' +
                        '<div class="social-feed__logo">' +
                        '<i class="fa fa-twitter"></i>' +
                        '</div>' +
                        '<div class="social-feed__name" style="' + _titleStyle + '">' + this.name + '</div>' + this.login +
                        '</div>' +
                        '<div class="social-feed__txt" style="' + _textStyle + '">' + this.feed_txt + '</div>' +
                        '<div class="social-feed__hover">' +
                        '<a href="' + this.href + '" class="btn btn_11">VIEW ON TWITTER <i class="fa fa-long-arrow-right"></i></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    _wrapper.append(newBlock);

                });
                if (hasItems !== 0) {
                    _btnMore.data('action', msg.next_url);
                }

                var newItems = _wrapper.find('.hidden');

                setTimeout(function () {
                    _heightAnimation(hasItems, newItems);
                }, 50);

            },
            _heightAnimation = function (hasItems, newItems) {

                newItems.each(function (i) {
                    _showNewItems($(this), i);
                });

                if (hasItems == 0) {
                    _removeBtnMore();
                }

            },
            _showNewItems = function (item, index) {

                setTimeout(function () {
                    item.removeClass('hidden');
                }, index * 100);

            },
            _ajaxRequest = function (next_url) {

                var newsItem = _obj.find('.social-feed__item');
                _request.abort();
                _request = $.ajax({
                    url: fudgeJS.ajax_url,
                    data: {
                        action: 'fudge_load_tweets',
                        next_url: next_url
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: 'POST',
                    success: function (msg) {

                        _addSocialContent(msg);

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert('Error!');
                        }
                    }
                });

            },
            _removeBtnMore = function () {

                _btnMore.css('opacity', 0);

                setTimeout(function () {

                    _btnMore.css('padding', 0);

                    _btnMore.animate({
                        height: 0
                    }, {
                        duration: 500,
                        complete: function () {
                            _btnMore.remove();
                        }
                    });

                }, 300);

            },
            _init = function () {

                _addEvents();
                _obj[0].obj = _self;

            };

        _init();
    };

    var Debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.apply(context, args);
        };
    };

    $('.pbs').remove();
});