class CustomInput extends HTMLElement {
    connectedCallback() {
        // 아래와 같이 작성하면, 모든 label 태그에 영향을 주게 된다.
        this.innerHTML = `<label>insert your email</label><input>
            <style>label { color: #f0f}</style>
        `;
    }
}
customElements.define("custom-input", CustomInput);

class ShaodowCustomInput extends HTMLElement {
    connectedCallback() {
        /**
         * custom element만 style을 주기위해서 shadow dom 이용한다.
         * 진정한 의미의 모듈화가 가능해진다.
         * 
         * css inherit 영향받는다.
         */
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `<label>insert your email</label><input>
            <style>label { color: #f00}</style>
        `;
    }
}
customElements.define("shadow-input", ShaodowCustomInput);