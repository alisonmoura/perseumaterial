'use estrict'

$(document).ready(function() {
    PerseuMaterial.initGallery();
})

PerseuMaterial = {

    toast: function(msg, time) {

        if (!time) time = 3000;

        var toastContainer = $('<div></div>');
        toastContainer.css('display', 'block');
        toastContainer.css('width', '50px');
        $(toastContainer).appendTo('body')

        var toast = $('<div></div>');
        toast.addClass('pm-toast');
        toast.css('animation', "pm-toast " + (parseInt(time) / 1000) + "s");

        var paragraph = $('<p></p>');
        $(paragraph).append(document.createTextNode(msg));
        $(toast).append(paragraph);
        $(toastContainer).append(toast);

        setTimeout(
            function() {
                $(toast).remove();
                $(toastContainer).remove();
            },
            time);
    },

    initGallery: function() {
        
        $('.pm-gallery > figure').hover(
            function() {
                if ($(this).children('figcaption').text()) {
                    $(this).children('figcaption').animate({
                        opacity: 1,
                        height: "20px",
                    }, 100);
                }
            }, function() {
                if ($(this).children('figcaption').text()) {
                    $(this).children('figcaption').animate({
                        opacity: 0,
                        height: "0px",
                    }, 100);
                }
            }
        );

        $('.pm-gallery > figure').click(function() {

            var overflowPanel = $('<div></div>');
            overflowPanel.css('position', 'absolute');
            overflowPanel.css('width', '100%');
            overflowPanel.css('height', '100%');
            overflowPanel.css('opacity', '0');
            overflowPanel.css('top', '100%');
            overflowPanel.css('background-color', 'white');

            var overflowPanelHeader = $('<div></div>');
            overflowPanelHeader.addClass('pm-nav-bar');

            var left = $('<div></div>');
            left.addClass('pm-left');

            var closeToggle = $('<a></a>');

            var closeToggleIcon = $('<i></i>');
            closeToggleIcon.addClass('material-icons');
            closeToggleIcon.css('font-size', '25pt');
            closeToggleIcon.append(document.createTextNode('close'));

            closeToggleIcon.click(function() {
                overflowPanel.animate({
                    top: '100%',
                    opacity: '0'
                }, 500, function() {
                    overflowPanel.remove();
                })
            })

            var imageTitle = $('<a></a>');
            imageTitle.append(document.createTextNode($(this).children('figcaption').text()));
            imageTitle.css('font-size', '16pt');
            imageTitle.css('text-align', 'center');
            imageTitle.css('margin-left', '50px');

            var image = $('<img></img>');
            image.attr('src', $(this).children('img').attr('src'));
            image.css('width', '100%');

            closeToggle.append(closeToggleIcon);
            left.append(closeToggle);
            left.append(imageTitle);
            overflowPanelHeader.append(left);
            overflowPanel.append(overflowPanelHeader);
            overflowPanel.append(image);

            overflowPanel.animate({
                top: '0px',
                opacity: '1'
            }, 500)

            $('body').append(overflowPanel);
        });
    }
}

function PerseuDatePicker(element) {

    var dayOfWeekInitials = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    var dayOfWeekAbbreviations = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayOfMonthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dayOfMonth = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'];

    var today = new Date();
    var todayYear = today.getFullYear();
    var todayMonth = today.getMonth();
    var todayWeek = today.getDay();
    var todayDay = today.getDate();

    var datePickerBackground = document.createElement('div');
    datePickerBackground.setAttribute('class', 'date-picker-background');
    datePickerBackground.setAttribute('id', 'datePickerBackground');
    //TODO: assign this function in another place
    datePickerBackground.addEventListener('click', function() {
        document.getElementById('datePickerBackground').remove();
        document.getElementById('datePickerContainer').remove();
    });
    var datePickerContainer = document.createElement('div');
    datePickerContainer.setAttribute('class', 'date-picker-container');
    datePickerContainer.setAttribute('id', 'datePickerContainer');

    var datePickerPopout = document.createElement('div');
    datePickerPopout.setAttribute('class', 'date-picker-popout');
    datePickerPopout.setAttribute('id', 'datePickerPopout');
    datePickerPopout.width = "40%";
    datePickerPopout.style.left = (screen.width / 2) - ((parseInt(datePickerPopout.width.replace('%', '')) * screen.width) / 100) / 2 + "px";


    function createCalendarHeader(date) {
        var calendar = date;
        var calendarYear = calendar.getFullYear();
        var calendarMonth = calendar.getMonth();
        var calendarWeek = calendar.getDay();
        var calendarDay = calendar.getDate();

        var datePickerPopoutHeader = document.createElement('div');
        datePickerPopoutHeader.setAttribute('class', 'date-picker-popout-header');

        var year = document.createElement('p');
        year.setAttribute('class', 'date-picker-popout-header-year');
        year.appendChild(document.createTextNode(calendarYear));
        datePickerPopoutHeader.appendChild(year);

        var day = document.createElement('p');
        day.setAttribute('class', 'date-picker-popout-header-day');
        day.appendChild(document.createTextNode(dayOfWeekAbbreviations[calendarWeek] + ', ' + dayOfMonthAbbreviations[calendarMonth] + ' ' + calendarDay));
        datePickerPopoutHeader.appendChild(day);

        datePickerPopout.appendChild(datePickerPopoutHeader);
    }

    function createCalendarBody(date) {

        var calendar = date;
        var calendarYear = calendar.getFullYear();
        var calendarMonth = calendar.getMonth() + 1;
        var calendarWeek = calendar.getDay();
        var calendarDay = calendar.getDate();

        var datePickerPopoutBody = document.createElement('div');
        datePickerPopoutBody.setAttribute('id', 'datePickerPopoutBody');
        datePickerPopoutBody.setAttribute('align', 'center');
        datePickerPopoutBody.setAttribute('class', 'date-picker-popout-body');

        var months = document.createElement('div');
        months.style.display = 'flex';
        months.style.justifyContent = 'space-around';

        var leftArrowSpan = document.createElement('span');
        if (calendarMonth > 0) {
            leftArrowSpan.setAttribute('class', 'perseu-datepicker-prev-month');
            leftArrowSpan.appendChild(document.createTextNode('<'));
            leftArrowSpan.onclick = function() {
                var oldCalendar = document.getElementById('datePickerPopoutBody');
                if (oldCalendar != null && oldCalendar != undefined) {
                    oldCalendar.remove();
                    var newDate = new Date(calendarYear + "-" + (calendarMonth - 1) + "-" + 1);
                    createCalendarBody(newDate);
                }
            };
        }
        months.appendChild(leftArrowSpan);

        var monthSpan = document.createElement('span');
        monthSpan.appendChild(document.createTextNode(dayOfMonthAbbreviations[calendarMonth] + ', ' + calendarYear));
        months.appendChild(monthSpan);

        var rightArrowSpan = document.createElement('span');
        // rightArrowSpan.addEventListener('click', nextMonth(calendarYear,calendarMonth));
        if (calendarMonth < 11) {
            rightArrowSpan.setAttribute('class', 'perseu-datepicker-next-month');
            rightArrowSpan.appendChild(document.createTextNode('>'));
            rightArrowSpan.onclick = function() {
                var oldCalendar = document.getElementById('datePickerPopoutBody');
                if (oldCalendar != null && oldCalendar != undefined) {
                    oldCalendar.remove();
                    var newDate = new Date(calendarYear + "-" + (calendarMonth + 1) + "-" + 1);
                    createCalendarBody(newDate);
                }
            };
        }
        months.appendChild(rightArrowSpan);

        datePickerPopoutBody.appendChild(months);

        var days = document.createElement('div');
        var lastDay = new Date(calendarYear, calendarMonth + 1, 0).getDate();
        var firstDay = new Date(calendarYear, calendarMonth, 1);
        var table = document.createElement('table');

        var thead = document.createElement('thead');
        for (i = 0; i < dayOfWeekInitials.length; i++) {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(dayOfWeekInitials[i]));
            thead.appendChild(th);
        }
        table.appendChild(thead);

        var tbody = document.createElement('tbody');
        var row = document.createElement('tr');
        for (var i = 1, j = 1; j <= lastDay; i++) {
            var td = document.createElement('td');
            td.setAttribute('align', 'center');
            if (j == today.getDate())
                td.setAttribute('class', 'today');
            if (i - 1 >= firstDay.getDay()) {
                td.appendChild(document.createTextNode(j++));
                td.className += " date-selectable";
            }
            row.appendChild(td);
            if (i % 7 == 0 || j - 1 == lastDay) {
                tbody.appendChild(row);
                row = document.createElement('tr');
            }
        }
        table.appendChild(tbody);

        days.appendChild(table);
        datePickerPopoutBody.appendChild(days);

        datePickerPopout.appendChild(datePickerPopoutBody);


    }

    datePickerContainer.appendChild(datePickerPopout);

    createCalendarHeader(today);
    createCalendarBody(today);

    document.body.appendChild(datePickerBackground);
    document.body.appendChild(datePickerContainer);

    function nextMonth(calendarYear, calendarMonth) {
        var oldCalendar = document.getElementById('datePickerPopoutBody');
        if (oldCalendar != null && oldCalendar != undefined) {
            oldCalendar.remove();
            createCalendarBody(new Date(calendarYear + "-" + calendarMonth + 1));
        }
    }

    function nextYear() {

    }

    this.selectedDate = undefined;

    function selectDate(day) {
        PerseuDatePicker.selectedDate = new Date(todayYear + "-" + todayMonth + "-" + day);
        // for(var i=1; i <= lastDay; i++){
        //
        // }
    }
}