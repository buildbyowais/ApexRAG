(function () {
    "use strict";

    // ---------- state ----------
    let documentId = null;
    let isProcessing = false; // lock UI during AI response

    const API_URL = "https://apexrag.onrender.com";

    // DOM refs
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileMeta = document.getElementById('fileMeta');
    const progressWrap = document.getElementById('progressWrap');
    const progressBar = document.getElementById('progressBar');
    const uploadStatus = document.getElementById('uploadStatus');
    const uploadBtn = document.getElementById('uploadBtn');
    const chatMessages = document.getElementById('chatMessages');
    const questionInput = document.getElementById('questionInput');
    const sendBtn = document.getElementById('sendBtn');
    const sendLabel = document.getElementById('sendLabel');
    const sendSpinner = document.getElementById('sendSpinner');
    const inputHelper = document.getElementById('inputHelper');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const docIdBadge = document.getElementById('docIdBadge');

    // toast
    const toastEl = document.getElementById('liveToast');
    const toastBody = document.getElementById('toastBody');
    const toast = new bootstrap.Toast(toastEl, { delay: 5000 });

    // ---------- helpers ----------
    function showToast(msg) {
        toastBody.textContent = msg;
        toast.show();
    }

    function setUIEnabled(enabled) {
        if (enabled && documentId) {
            questionInput.disabled = false;
            sendBtn.disabled = false;
            inputHelper.textContent = 'Ask anything about your document';
        } else if (enabled && !documentId) {
            questionInput.disabled = true;
            sendBtn.disabled = true;
            inputHelper.textContent = 'Upload a document first';
        } else {
            questionInput.disabled = true;
            sendBtn.disabled = true;
            inputHelper.textContent = 'Processing…';
        }
    }

    function updateDocBadge() {
        docIdBadge.textContent = documentId
            ? `ID: ${documentId.slice(0, 8)}`
            : 'No document';
    }

    // ---------- upload flow ----------
    async function performUpload(file) {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        // show progress
        progressWrap.classList.remove('d-none');
        progressBar.style.width = '0%';
        uploadStatus.innerHTML =
            '<span class="text-muted">Uploading…</span>';

        uploadBtn.disabled = true;
        uploadBtn.innerHTML =
            '<span class="spinner-border spinner-border-sm me-1"></span> Uploading';

        try {
            const xhr = new XMLHttpRequest();

            const promise = new Promise((resolve, reject) => {

                xhr.open(
                    'POST',
                    `${API_URL}/documents/upload`
                );

                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        const pct = Math.round(
                            (e.loaded / e.total) * 100
                        );

                        progressBar.style.width = pct + '%';
                    }
                };

                xhr.onload = () => {
                    if (
                        xhr.status >= 200 &&
                        xhr.status < 300
                    ) {
                        resolve(
                            JSON.parse(xhr.responseText)
                        );
                    } else {
                        try {
                            reject(
                                JSON.parse(xhr.responseText)
                            );
                        } catch {
                            reject({
                                detail: 'Upload failed'
                            });
                        }
                    }
                };

                xhr.onerror = () => {
                    reject({
                        detail: 'Network error'
                    });
                };

                xhr.send(formData);
            });

            const data = await promise;

            documentId = data.document_id;
            updateDocBadge();

            // update file info
            fileInfo.classList.remove('d-none');

            fileName.textContent = file.name;

            const size =
                (file.size / 1024 / 1024).toFixed(1);

            fileMeta.textContent =
                `${size} MB · uploaded ${new Date().toLocaleTimeString()}`;

            uploadStatus.innerHTML =
                `<span class="text-success">
                    <i class="bi bi-check-circle"></i>
                    ${data.chunks || 0} chunks indexed
                </span>`;

            progressBar.style.width = '100%';

            setTimeout(() => {
                progressWrap.classList.add('d-none');
            }, 800);

            // enable chat
            setUIEnabled(true);

            // clear chat & show welcome
            chatMessages.innerHTML =
                `<div class="empty-chat" id="emptyMessage">
                    <i class="bi bi-chat-text"></i>
                    Document ready! Ask a question.
                </div>`;

            questionInput.focus();

        } catch (err) {

            const msg =
                err.detail ||
                err.message ||
                'Upload error';

            showToast(msg);

            uploadStatus.innerHTML =
                `<span class="text-danger">${msg}</span>`;

            progressWrap.classList.add('d-none');

        } finally {

            uploadBtn.disabled = false;

            uploadBtn.innerHTML =
                '<i class="bi bi-upload me-1"></i> Upload';
        }
    }

    // ---------- dropzone events ----------

    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {

        e.preventDefault();

        dropzone.classList.remove('dragover');

        if (e.dataTransfer.files.length) {

            const file =
                e.dataTransfer.files[0];

            if (
                ['.pdf', '.docx', '.txt']
                    .some(ext =>
                        file.name
                            .toLowerCase()
                            .endsWith(ext)
                    )
            ) {
                performUpload(file);
            } else {
                showToast(
                    'Please upload PDF, DOCX, or TXT'
                );
            }
        }
    });

    fileInput.addEventListener('change', (e) => {

        if (fileInput.files.length) {
            performUpload(fileInput.files[0]);
        }

        fileInput.value = '';
    });

    uploadBtn.addEventListener('click', () => {

        if (fileInput.files.length) {
            performUpload(fileInput.files[0]);
        } else {
            fileInput.click();
        }
    });

    // ---------- send message ----------

    async function sendMessage() {

        const question =
            questionInput.value.trim();

        if (
            !question ||
            !documentId ||
            isProcessing
        ) {
            return;
        }

        // clear empty
        const empty =
            document.getElementById('emptyMessage');

        if (empty) {
            empty.remove();
        }

        // add user msg
        addMessage(question, 'user');

        questionInput.value = '';

        isProcessing = true;

        setUIEnabled(false);

        sendLabel.classList.add('d-none');
        sendSpinner.classList.remove('d-none');

        sendBtn.disabled = true;

        // thinking indicator
        const thinkingEl =
            document.createElement('div');

        thinkingEl.className = 'thinking';

        thinkingEl.innerHTML =
            `<span>AI is thinking</span>
             <span class="dot"></span>
             <span class="dot"></span>
             <span class="dot"></span>`;

        chatMessages.appendChild(thinkingEl);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

        try {

            const response = await fetch(
                `${API_URL}/chat`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        question,
                        document_id: documentId
                    })
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || 'API error'
                );
            }

            // remove thinking
            if (thinkingEl.parentNode) {
                thinkingEl.remove();
            }

            // add assistant response
            const sources =
                data.sources || [];

            addMessage(
                data.answer,
                'assistant',
                sources
            );

        } catch (err) {

            if (thinkingEl.parentNode) {
                thinkingEl.remove();
            }

            showToast(
                err.message || 'Request failed'
            );

            addMessage(
                `⚠️ Error: ${err.message}`,
                'assistant'
            );

        } finally {

            isProcessing = false;

            setUIEnabled(true);

            sendLabel.classList.remove('d-none');
            sendSpinner.classList.add('d-none');

            sendBtn.disabled = false;

            questionInput.focus();
        }
    }

    // ---------- add message ----------

    function addMessage(
        text,
        type,
        sources = []
    ) {

        const wrapper =
            document.createElement('div');

        wrapper.className =
            `message ${type}`;

        if (type === 'assistant') {

            const avatar =
                document.createElement('div');

            avatar.className =
                'ai-avatar';

            avatar.innerHTML =
                `<i class="bi bi-robot"></i> Assistant`;

            wrapper.appendChild(avatar);

            const content =
                document.createElement('div');

            content.innerHTML =
                marked.parse(text);

            wrapper.appendChild(content);

            // copy button
            const copyBtn =
                document.createElement('button');

            copyBtn.className =
                'copy-btn';

            copyBtn.innerHTML =
                '<i class="bi bi-clipboard"></i> Copy';

            copyBtn.addEventListener(
                'click',
                () => {

                    navigator.clipboard
                        .writeText(text)
                        .then(() => {

                            copyBtn.innerHTML =
                                '<i class="bi bi-check"></i> Copied';

                            setTimeout(() => {

                                copyBtn.innerHTML =
                                    '<i class="bi bi-clipboard"></i> Copy';

                            }, 2000);

                        })
                        .catch(() => {});
                }
            );

            wrapper.appendChild(copyBtn);

            // sources
            if (
                sources &&
                sources.length
            ) {

                const srcDiv =
                    document.createElement('div');

                srcDiv.className =
                    'sources';

                const title =
                    document.createElement('strong');

                title.textContent =
                    'Sources:';

                srcDiv.appendChild(title);

                sources.forEach((s) => {

                    const sourceItem =
                        document.createElement('div');

                    sourceItem.textContent =
                        `📄 ${
                            s.file_name || 'doc'
                        } (p.${
                            s.page || '?'
                        })`;

                    srcDiv.appendChild(
                        sourceItem
                    );
                });

                wrapper.appendChild(srcDiv);
            }

        } else {

            wrapper.textContent = text;
        }

        chatMessages.appendChild(wrapper);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

        return wrapper;
    }

    // ---------- clear chat ----------

    clearChatBtn.addEventListener(
        'click',
        () => {

            chatMessages.innerHTML =
                `<div class="empty-chat" id="emptyMessage">
                    <i class="bi bi-chat-text"></i>
                    Chat cleared. Ask a new question.
                </div>`;
        }
    );

    // ---------- event listeners ----------

    sendBtn.addEventListener(
        'click',
        sendMessage
    );

    questionInput.addEventListener(
        'keydown',
        (e) => {

            if (
                e.key === 'Enter' &&
                !e.shiftKey
            ) {

                e.preventDefault();

                sendMessage();
            }
        }
    );

    // ---------- init UI ----------

    setUIEnabled(false);

    updateDocBadge();

})();