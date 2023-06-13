const template = document.createElement("template");

template.innerHTML = `
<style>
    label {
        color:red;
        display:block;
    }
    .description{
        font-size:0.65rem;
    }
</style>

<label>
    <input type='checkbox'/>
    <slot></slot>
    <span class='description'>
    <slot name='description'></slot>
    </span>
</label>

`;

class todoItem extends HTMLElement {
    constructor() {
        super();
        
        // creating a shadowDom in constructor so that we can encapsulate the properties of this web component.
        const shadow = this.attachShadow({ mode: "open" });
        // appending markup to this web component.
        shadow.append(template.content.cloneNode(true));
        // just a property.
        this.checkbox = shadow.querySelector('input')
        
    }

    // following properties will be observed by attributesChangedCallback.
    static get observedAttributes() {
        return ['checked']
    }

    // called when an element is added by web component
    connectCallback(){
        console.log('connected')
    }

    // called when a web component is unmounted.
    disconnectCallback(){
        console.log('disconnected')
    }

    // observes attributes and returns name, oldValue and newValue.
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(name, oldValue, newValue);
        if(name === 'checked') this.updateChecked(newValue)
    }

    // just a function.
    updateChecked(value:string){
        this.checkbox.checked = value != null && value != 'false'
    }

}

customElements.define('todo-item', todoItem)
