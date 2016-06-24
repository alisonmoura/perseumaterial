function PerseuMaterial() {

    this.toastContainer = undefined;

    this.toast = function (msg) {
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
    };

    this.toast = function (msg,time) {
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

function PerseuDatePicker() {

    this.dayOfWeekInitials = ['S','M','T','W','T','F','S'];
    this.dayOfWeekAbbreviations= ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    this.dayOfWeek= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    this.dayOfMonthAbbreviations = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    this.dayOfMonth= ['January','Febuary','March','April','May','June','July','August','September','Octuber','November','December'];

    var today = new Date();

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

    var datePickerPopoutHeader = document.createElement('div');
    datePickerPopoutHeader.setAttribute('class','date-picker-popout-header');

    var year = document.createElement('p');
    year.setAttribute('class','date-picker-popout-header-year');
    year.appendChild(document.createTextNode(today.getFullYear()));
    datePickerPopoutHeader.appendChild(year);

    var day = document.createElement('p');
    day.setAttribute('class','date-picker-popout-header-day');
    day.appendChild(document.createTextNode(this.dayOfWeekAbbreviations[today.getDay()] + ', ' + this.dayOfMonthAbbreviations[today.getMonth()] + ' '+today.getDate()));
    datePickerPopoutHeader.appendChild(day);

    var datePickerPopoutBody= document.createElement('div');
    datePickerPopoutBody.setAttribute('align','center');
    datePickerPopoutBody.setAttribute('class','date-picker-popout-body');

    var months = document.createElement('div');
    months.setAttribute('align', 'center');
    var monthSpan = document.createElement('span');
    monthSpan.appendChild(document.createTextNode(this.dayOfMonthAbbreviations[today.getMonth()] + ', ' + today.getFullYear()));
    months.appendChild(monthSpan);
    datePickerPopoutBody.appendChild(months);

    var days = document.createElement('div');
    var lastDay = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
    var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    var table = document.createElement('table');

    var thead = document.createElement('thead');
    for(i=0; i < this.dayOfWeekInitials.length; i++){
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(this.dayOfWeekInitials[i]));
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
        if(i >= firstDay.getDay()){
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

    datePickerPopout.appendChild(datePickerPopoutHeader);
    datePickerPopout.appendChild(datePickerPopoutBody);

    datePickerContainer.appendChild(datePickerPopout);

    document.body.appendChild(datePickerBackground);
    document.body.appendChild(datePickerContainer);
}

//TODO fix
function PerseuToast(msg,time) {
    var toastContainer = undefined;

    if(toastContainer == undefined){
        toastContainer = document.createElement('div');
        toastContainer.style.display = 'block';
        toastContainer.style.width = '50px';
    }
    var toast = document.createElement('div');
    toast.setAttribute('class','perseu-toast');
    toast.style.animation = "perseu-toast " + (parseInt(time)/1000) + "s";
    var paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(msg));
    toast.appendChild(paragraph);
    toastContainer.appendChild(toast);
    var eleParent = document.getElementById('perseu-toast');
    eleParent.appendChild(toastContainer);
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

//TODO fix
function PerseuToast(msg) {
    var toastContainer = undefined;

    if(toastContainer == undefined){
        toastContainer = document.createElement('div');
        toastContainer.setAttribute('id', 'toast-container');
        toastContainer.style.display = 'block';
        toastContainer.style.width = '50px';
    }
    var toast = document.createElement('div');
    toast.setAttribute('class','toast');
    var paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(msg));
    toast.appendChild(paragraph);
    toastContainer.appendChild(toast);
    eleParent = document.getElementById('perseu-toast');
    eleParent.appendChild(toastContainer);
}
