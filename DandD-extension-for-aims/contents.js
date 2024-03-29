/**
 * 課題ページでドラッグ＆ドロップフィールドを追加
 */
if (location.href.indexOf('assignments') != -1) {
    window.addEventListener('load', () => {

        const formArea = document.getElementsByClassName('submission_attachment');

        // 読み込み直後に存在するフォームの数が2つ以外の場合(2つではない場合は想定している課題ページではないため処理終了)
        if (formArea.length !== 2) {
            return;
        }

        const extentionInnerHTML = `
        <div class="extention-wrapper" id="extention-wrapper">
            <div class="extention-title" id="extention-title">
                AIMS-Gifu Extention
            </div>
            <div class="file-drop-area" id="file-drop-area">
                ファイルをドロップしてアップロード
            </div>
            <div class="file-drop-area-message" id="file-drop-area-message">

            </div>
        </div>
        `;
        const extentionWrapperTmp = document.createElement('div');
        extentionWrapperTmp.className = 'extention-wrapper'
        extentionWrapperTmp.innerHTML = extentionInnerHTML;

        document.querySelector("#submit_online_upload_form").prepend(extentionWrapperTmp.cloneNode(true));

        const uploadArea = document.querySelector('#file-drop-area');
        const uploadAreaMessage = document.querySelector('#file-drop-area-message');
        const extentionWrapper = document.querySelector('#extention-wrapper');

        function addDragClass(){
            document.querySelector('#file-drop-area-message').classList.add('drag');
            document.querySelector('#file-drop-area').classList.add('drag');
            document.querySelector('#extention-wrapper').classList.add('drag');
        }
        function removeDragClass(){
            document.querySelector('#file-drop-area').classList.remove('drag');
            document.querySelector('#file-drop-area-message').classList.remove('drag');
            document.querySelector('#extention-wrapper').classList.remove('drag');
        }
        uploadArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            addDragClass();
        });
        uploadArea.addEventListener('dragleave', (event) => {
            removeDragClass();
        });
        uploadArea.addEventListener('drop', (event) => {
            removeDragClass();
            event.preventDefault();
        });
        uploadAreaMessage.addEventListener('dragover', (event) => {
            event.preventDefault();
            addDragClass();
        });
        uploadAreaMessage.addEventListener('dragleave', (event) => {
            removeDragClass();
        });
        uploadAreaMessage.addEventListener('drop', (event) => {
            removeDragClass();
            event.preventDefault();

        });


        //ドラッグしホバーしている状態で実行
        extentionWrapper.addEventListener('dragover', (event) => {
            event.preventDefault();
            addDragClass();
        });
        //ホーバーしているカーソルがD&Dエリアを出たとき実行
        extentionWrapper.addEventListener('dragleave', (event) => {
            removeDragClass();
        });
        //ドロップされたとき実行
        extentionWrapper.addEventListener('drop', (event) => {
            removeDragClass();
            event.preventDefault();
            let input = document.querySelectorAll('input[type="file"]');

            const files = event.dataTransfer.files;
            const items = event.dataTransfer.items;

            // ディレクトリがアップロードされていないかチェック
            // AIMS側がディレクトリごと渡されることを想定していない可能性があるため
            uploadAreaMessage.innerHTML = '';
            for (let item of items) {
                if (item.webkitGetAsEntry().isDirectory) {
                    uploadAreaMessage.innerHTML = 'フォルダーをアップロードすることはできません。';
                    return;
                }
            }

            //中身がカラのファイルInputがいくつあるか数える
            // 一番最後はクローン元のダミーなので除外
            let availableInputCount = 0;
            for (let j = 0; j < input.length - 1; j++) {
                if (input[j].files.length == 0) {
                    availableInputCount++;
                }
            }
            //カラのInputが足りない場合
            if (files.length > availableInputCount) {
                for (let j = 0; j < files.length - availableInputCount; j++) {
                    document.querySelector('.add_another_file_link').click();
                }
                //Inputを追加したので再度取得
                input = document.querySelectorAll('input[type="file"]');
            }

            //カラのInputにファイルを挿入
            // 一番最後はクローン元のダミーなので除外
            let filesIndex = 0;
            for (let j = 0; j < input.length - 1; j++) {
                if (input[j].files.length == 0) {
                    const dt = new DataTransfer();
                    dt.items.add(files[filesIndex]);
                    input[j].files = dt.files;
                    filesIndex++;
                }
            }
        });
    });
};

/**
 * ファイルページで一括ダウンロード用のチェックボックスを追加
 */
if (location.href.indexOf('files') != -1) {

    window.addEventListener('load', () => {
        const multiDlBtn = document.createElement('input');
        multiDlBtn.setAttribute("value", "複数選択");
        multiDlBtn.setAttribute("class", "Button Button--primary");
        multiDlBtn.setAttribute('id', 'multiDlBtn');

        multiDlBtn.addEventListener("click", function fn(e) {
            const btn = document.getElementById('multiDlBtn');
            btn.setAttribute('class', "Button");
            btn.setAttribute('readonly', true);
            btn.setAttribute('disable', true);

            const cbTmp = document.createElement('input');
            cbTmp.setAttribute('type', 'checkbox');
            cbTmp.setAttribute('class', 'multiselector');

            const cbAll = cbTmp.cloneNode(true);
            cbAll.removeAttribute('class');
            cbAll.setAttribute('id', 'selectAll');

            cbAll.addEventListener('click', (e) => {
                const cb = document.querySelectorAll('.multiselector');
                for (let i = 0; i < cb.length; i++) {
                    if (cb[i].checked !== e.target.checked) {
                        cb[i].click();
                    }
                }
            });
            const originalCbAll = document.querySelector('#selectAllCheckbox');
            originalCbAll.insertAdjacentElement('beforebegin', cbAll);
            const labelCbAll = document.createElement('label');
            labelCbAll.innerHTML = '全て選択';
            labelCbAll.setAttribute('for', 'selectAll');
            originalCbAll.insertAdjacentElement('beforebegin', labelCbAll);


            const itemRows = document.querySelectorAll('.ef-item-row');
            for (let i = 0; i < itemRows.length; i++) {
                const cb = cbTmp.cloneNode(true);
                cb.setAttribute('name', i);
                itemRows[i].setAttribute('name', i);
                cb.addEventListener('click', (e) => {
                    const name = (e.target.getAttribute('name'));
                    const originalCb = document.querySelectorAll(".ef-item-row .multiselectable-toggler input");
                    originalCb[name].click();
                })
                itemRows[i].children[1].insertAdjacentElement('beforebegin', cb);

                //チェックボックス以外の場所を押下時の対策
                const itemRowMo = new MutationObserver((record, observer) => {
                    const itemRows = document.querySelectorAll('.ef-item-row');
                    const cb = document.querySelectorAll('.multiselector');
                    for (let i = 0; i < itemRows.length; i++) {
                        if (itemRows[i].getAttribute('class').indexOf('ef-item-selected') !== -1) {
                            cb[i].checked = true;
                        } else {
                            cb[i].checked = false;
                        }
                    }
                })

                itemRowMo.observe(itemRows[i], {
                    childList: true,//「子ノード（テキストノードも含む）」の変化
                    attributes: true,//「属性」の変化
                    characterData: true,//「テキストノード」の変化
                });
            }
            e.target.removeEventListener('click', fn);


        });

        document.getElementsByClassName("ef-header")[0].children[0].insertAdjacentElement("afterend", multiDlBtn);

        //一括ダウンロードボタンのスタイル変更
        const DlbtnMo = new MutationObserver((record, observer) => {
            const dlBtn = document.querySelectorAll(".btn-download");
            if (dlBtn.length >= 1) {
                const btnText = document.createElement('span')
                btnText.innerHTML = "ダウンロード";
                dlBtn[0].setAttribute('class', 'ui-button btn-download Button--primary');
                if (dlBtn[0].children.length === 1) {
                    dlBtn[0].appendChild(btnText);
                }
            }
        })
        const DlbtnMoTarget = document.querySelectorAll('.ui-buttonset')[0];
        DlbtnMo.observe(DlbtnMoTarget, {
            childList: true,//「子ノード（テキストノードも含む）」の変化
            attributes: true,//「属性」の変化
            characterData: true,//「テキストノード」の変化
        });
    });
}

//左上のナビゲーションに講義名を追加
const url = window.location.pathname;
if (url.split("/")[1] == "courses") {
    window.addEventListener('load', () => {
        if (document.querySelectorAll(".ellipsible").length < 2) {
            return;
        }
        const classCode = document.querySelectorAll(".ellipsible")[1].innerHTML;
        const classTitles = document.title.split(':');

        for (let classTitle of classTitles) {
            if (classTitle.indexOf('[') != -1) {
                document.querySelectorAll(".ellipsible")[1].innerHTML = classTitle + " / " + classCode;
            }
        }
    })
}
