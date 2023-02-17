document.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelectorAll('[data-uploader]');

    el.forEach(item => {
        new Uploader(item);
    });
});

class Uploader {
    constructor(el) {
        this.el = el;
        this.field = this.el.querySelector('[data-uploader-field]');
        this.title = this.el.querySelector('[data-uploader-title]');

        this.setListeners();
    }

    setListeners() {
        this.field.addEventListener('change', (e) => {
           this.setText(e.target.files[0].name);
           this.title = this.el.querySelector('[data-uploader-title]');
        });
    }

    setText(text) {
        this.title.innerHTML = text ? text : 'Прикрепить файл';
    }
}