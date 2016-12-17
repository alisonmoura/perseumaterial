PerseuMaterial = {

    toastContainer: undefined,

    toast: function (msg) {
        if(this.toastContainer == undefined){
            this.toastContainer = document.createElement('div');
            this.toastContainer.setAttribute('id', 'toast-container');
            this.toastContainer.style.display = 'block';
            this.toastContainer.style.width = '50px';
        }
        var toast = document.createElement('div');
        toast.setAttribute('class','toast');
        var paragraph = document.createElement('p');
        paragraph.appendChild(document.createTextNode(msg));
        toast.appendChild(paragraph);
        this.toastContainer.appendChild(toast);
        eleParent = document.getElementById('perseu-toast');
        eleParent.appendChild(this.toastContainer);
    },

    toast: function (msg,time) {
        if(this.toastContainer == undefined){
            this.toastContainer = document.createElement('div');
            this.toastContainer.style.display = 'block';
            this.toastContainer.style.width = '50px';
        }
        var toast = document.createElement('div');
        toast.setAttribute('class','perseu-toast');
        toast.style.animation = "perseu-toast " + (parseInt(time)/1000) + "s";
        var paragraph = document.createElement('p');
        paragraph.appendChild(document.createTextNode(msg));
        toast.appendChild(paragraph);
        this.toastContainer.appendChild(toast);
        var eleParent = document.getElementById('perseu-toast');
        eleParent.appendChild(this.toastContainer);
        setTimeout(
            function () {
                var el = document.getElementById('perseu-toast');
                var toasts = document.getElementsByClassName('perseu-toast');
                for(var i = 0; i<toasts.length; i++){
                    //TODO: check if the element has been really removed
                    toasts[i].remove();
                    break;
                }
            },
            time);
    }
}

function PerseuDatePicker(element) {

    var dayOfWeekInitials = ['S','M','T','W','T','F','S'];
    var dayOfWeekAbbreviations= ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var dayOfWeek= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayOfMonthAbbreviations = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var dayOfMonth= ['January','Febuary','March','April','May','June','July','August','September','Octuber','November','December'];

    var today = new Date();
    var todayYear = today.getFullYear();
    var todayMonth = today.getMonth();
    var todayWeek = today.getDay();
    var todayDay = today.getDate();

    var datePickerBackground = document.createElement('div');
    datePickerBackground.setAttribute('class','date-picker-background');
    datePickerBackground.setAttribute('id','datePickerBackground');
    //TODO: assign this function in another place
    datePickerBackground.addEventListener('click', function () {
        document.getElementById('datePickerBackground').remove();
        document.getElementById('datePickerContainer').remove();
    });
    var datePickerContainer = document.createElement('div');
    datePickerContainer.setAttribute('class','date-picker-container');
    datePickerContainer.setAttribute('id','datePickerContainer');

    var datePickerPopout = document.createElement('div');
    datePickerPopout.setAttribute('class','date-picker-popout');
    datePickerPopout.setAttribute('id','datePickerPopout');
    datePickerPopout.width="40%";
    datePickerPopout.style.left= (screen.width/2) - ((parseInt(datePickerPopout.width.replace('%',''))*screen.width)/100)/2 + "px";


    function createCalendarHeader(date) {
        var calendar = date;
        var calendarYear = calendar.getFullYear();
        var calendarMonth = calendar.getMonth();
        var calendarWeek = calendar.getDay();
        var calendarDay = calendar.getDate();

        var datePickerPopoutHeader = document.createElement('div');
        datePickerPopoutHeader.setAttribute('class','date-picker-popout-header');

        var year = document.createElement('p');
        year.setAttribute('class','date-picker-popout-header-year');
        year.appendChild(document.createTextNode(calendarYear));
        datePickerPopoutHeader.appendChild(year);

        var day = document.createElement('p');
        day.setAttribute('class','date-picker-popout-header-day');
        day.appendChild(document.createTextNode(dayOfWeekAbbreviations[calendarWeek] + ', ' + dayOfMonthAbbreviations[calendarMonth] + ' '+calendarDay));
        datePickerPopoutHeader.appendChild(day);

        datePickerPopout.appendChild(datePickerPopoutHeader);
    }

    function createCalendarBody(date) {

        var calendar = date;
        var calendarYear = calendar.getFullYear();
        var calendarMonth = calendar.getMonth()+1;
        var calendarWeek = calendar.getDay();
        var calendarDay = calendar.getDate();

        var datePickerPopoutBody= document.createElement('div');
        datePickerPopoutBody.setAttribute('id','datePickerPopoutBody');
        datePickerPopoutBody.setAttribute('align','center');
        datePickerPopoutBody.setAttribute('class','date-picker-popout-body');

        var months = document.createElement('div');
        months.style.display='flex';
        months.style.justifyContent='space-around';

        var leftArrowSpan = document.createElement('span');
        if(calendarMonth > 0){
            leftArrowSpan.setAttribute('class','perseu-datepicker-prev-month');
            leftArrowSpan.appendChild(document.createTextNode('<'));
            leftArrowSpan.onclick = function (){
                var oldCalendar = document.getElementById('datePickerPopoutBody');
                if(oldCalendar != null && oldCalendar != undefined) {
                    oldCalendar.remove();
                    var newDate = new Date(calendarYear + "-" + (calendarMonth-1) +"-"+ 1);
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
        if(calendarMonth < 11){
            rightArrowSpan.setAttribute('class','perseu-datepicker-next-month');
            rightArrowSpan.appendChild(document.createTextNode('>'));
            rightArrowSpan.onclick = function (){
                var oldCalendar = document.getElementById('datePickerPopoutBody');
                if(oldCalendar != null && oldCalendar != undefined) {
                    oldCalendar.remove();
                    var newDate = new Date(calendarYear + "-" + (calendarMonth+1) +"-"+ 1);
                    createCalendarBody(newDate);
                }
            };
        }
        months.appendChild(rightArrowSpan);

        datePickerPopoutBody.appendChild(months);

        var days = document.createElement('div');
        var lastDay = new Date(calendarYear, calendarMonth+1, 0).getDate();
        var firstDay = new Date(calendarYear, calendarMonth, 1);
        var table = document.createElement('table');

        var thead = document.createElement('thead');
        for(i=0; i < dayOfWeekInitials.length; i++){
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(dayOfWeekInitials[i]));
            thead.appendChild(th);
        }
        table.appendChild(thead);

        var tbody = document.createElement('tbody');
        var row = document.createElement('tr');
        for(var i=1, j=1; j <= lastDay; i++){
            var td = document.createElement('td');
            td.setAttribute('align','center');
            if(j == today.getDate())
                td.setAttribute('class','today');
            if(i-1 >= firstDay.getDay()){
                td.appendChild(document.createTextNode(j++));
                td.className += " date-selectable";
            }
            row.appendChild(td);
            if(i%7 == 0 || j-1 == lastDay){
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

    function nextMonth(calendarYear,calendarMonth){
        var oldCalendar = document.getElementById('datePickerPopoutBody');
        if(oldCalendar != null && oldCalendar != undefined) {
            oldCalendar.remove();
            createCalendarBody(new Date(calendarYear + "-" + calendarMonth + 1));
        }
    }

    function nextYear() {

    }

    this.selectedDate = undefined;

    function selectDate(day) {
        PerseuDatePicker.selectedDate = new Date(todayYear+"-"+todayMonth+"-"+day);
        // for(var i=1; i <= lastDay; i++){
        //
        // }
    }
}