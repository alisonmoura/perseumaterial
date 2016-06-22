function PerseuDesign() {

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