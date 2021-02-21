const button = document.getElementsByClassName('Button Button--primary submit_assignment_link');

/**
 * 課題ページでドラッグ＆ドロップフィールドを追加
 */
if (button[0]) {
    window.addEventListener('load', () => {

        const formArea = document.getElementsByClassName('submission_attachment');

        // 読み込み直後に存在するフォームの数が2つ以外の場合(2つではない場合は想定している課題ページではないため処理終了)
        if (formArea.length !== 2) {
            return;
        }

        const uploadAreaTemp = document.createElement('div');
        uploadAreaTemp.className = 'file-drop-area';
        uploadAreaTemp.innerHTML = 'ファイルをドロップしてアップロード';

        formArea[0].appendChild(uploadAreaTemp.cloneNode(true));

        const uploadArea = document.getElementsByClassName('file-drop-area');

        for (let i = 0; i < uploadArea.length; i++) {
            //ドラッグしホバーしている状態で実行
            uploadArea[i].addEventListener('dragover', (event) => {
                event.preventDefault();
                event.target.classList.add('drag');
            });
            //ホーバーしているカーソルがD&Dエリアを出たとき実行
            uploadArea[i].addEventListener('dragleave', (event) => {
                event.target.classList.remove('drag');
            });
            //ドロップされたとき実行
            uploadArea[i].addEventListener('drop', (event) => {
                event.target.classList.remove('drag');
                event.preventDefault();
                const input = document.querySelectorAll('input[type="file"]');
                input[i].files = event.dataTransfer.files;
            });
        }
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
