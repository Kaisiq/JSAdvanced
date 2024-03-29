import { html, render } from "https://unpkg.com/lit-html@3.1.0/lit-html.js";
import { when } from "https://unpkg.com/lit-html@3.1.0/directives/when.js";
import { ref, createRef } from "https://unpkg.com/lit-html@3.1.0/directives/ref.js";

import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

class Chat extends HTMLElement {
    #showRoot = null;
    #socket = null;
    messages = [];
    #inputRef = createRef();
    #usernameRef = createRef();

    constructor() {
        super();

        this.#showRoot = this.attachShadow({ mode: "closed" });
        this.#socket = io("http://localhost:8080");
        this.#socket.on("chat-message", (message) => {
            this.messages.push(message);
            this.render();
        });
        this.#socket.on("system-message", console.warn);
        this.#socket.on("request-username", this.showUsernameInput);
        this.#socket.on("render", this.render);
    }

    getTemplate() {
        const noMessagesFactory = () => html`<div>No messages yet</div>`;
        const messagesListFactory = () =>
            html`<ul>
                ${this.messages.map((message) => html`<li>${message}</li>`)}
            </ul>`;
        return html`
            <div>${when(this.messages.length > 0, messagesListFactory, noMessagesFactory)}</div>
            <input
                ${ref(this.#inputRef)}
                type="text"
                placeholder="enter message"
            />
            <button @click=${this.sendMessageHandler.bind(this)}>Send message</button>
        `;
    }

    showUsernameInput = () => {
        render(
            html`
                <h3>Enter username:</h3>
                <input
                    ${ref(this.#usernameRef)}
                    type="text"
                    placeholder="username"
                />
                <button @click=${this.sendUsernameHandler.bind(this)}>Send username</button>
            `,
            this.#showRoot
        );
    };

    sendMessageHandler = () => {
        const message = this.#inputRef.value.value;
        this.#inputRef.value.value = "";
        this.#socket.emit("chat-message", message);
    };
    sendUsernameHandler = () => {
        const username = this.#usernameRef.value.value;
        this.#socket.emit("entered-username", username);
    };

    render = () => {
        render(this.getTemplate(this), this.#showRoot);
    };
}

customElements.define("app-chat", Chat);
