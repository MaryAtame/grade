import axios from "axios";

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-form]');

    elements.forEach(item => {
        new Form(item);
    });
});


class Form {
    constructor(el) {
        this.el = el;
        this.url = this.el.getAttribute('action');
        this.field = this.el.querySelector('[data-form-field]');
        this.button = this.el.querySelector('[data-form-button]');
        this.checkbox = this.el.querySelector('[data-form-checkbox]');
        this.setListeners();
    }

    setListeners() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.submit();
        });
        this.checkbox.addEventListener('change', () => {
            if (this.button.hasAttribute('disabled')) {
                this.button.removeAttribute('disabled')
            } else {
                this.button.setAttribute('disabled', 'true')
            }
        });

    }

    getData() {
        const elements = [...this.el.querySelectorAll('input'), ...this.el.querySelectorAll('textarea')];
        const data = new FormData;

        elements.forEach(item => {
            if (item.type === 'file') {
                data.append(item.name, item.files[0]);
            } else if (item.type === 'radio' || item.type === 'checkbox') {
                if (item.checked) data.append(item.name, item.value);
            } else {
                data.append(item.name, item.value);
            }
        });
        return data;
    }

    disable(state) {
        if (state) {
            this.button.setAttribute('disabled', 'disabled');
        } else {
            this.button.removeAttribute('disabled');
        }
    }

    setMessage(text) {
        this.field.innerText = text;
    }

    submit() {
        this.disable(true);
        this.setMessage('Отправка...');

        axios.post(this.url, this.getData())

            .then((response) => {
                console.log(response);
                this.setMessage('Отправлено!');

            })
            .catch((error) => {
                console.error(error);
                this.setMessage('Отправлено (на самом деле -нет. гы гы гы)');
            })
            .finally(() => {
                setTimeout(() => {
                    this.setMessage('Отправить резюме');
                    this.disable(false);
                }, 3000);
            });
    }
}

