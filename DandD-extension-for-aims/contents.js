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
    function removeSRonly() {
        const labelAndInput = document.querySelectorAll('.multiselectable-toggler');
        for (let i = 0; i < labelAndInput.length; i++) {
            const newClass = labelAndInput[i].getAttribute('class').replace('screenreader-only', '');
            labelAndInput[i].setAttribute("class", newClass);
        }
        const labelSpan = document.querySelectorAll('.multiselectable-toggler span');
        for (let i = 0; i < labelSpan.length; i++) {
            labelSpan[i].setAttribute('class', 'screenreader-only');
        }
        const selectAllCb = document.querySelectorAll('#selectAllCheckbox')[0];
        selectAllCb.removeAttribute('class');
        // selectAllCb.setAttribute('value','すべて選択');


        document.querySelectorAll('label[for="selectAllCheckbox"]')[0].setAttribute('class','screenreader-only');

        
    }

    window.addEventListener('load', () => {
        const multiDlBtn = document.createElement('input');
        multiDlBtn.setAttribute("value", "複数選択");
        multiDlBtn.setAttribute("class", "Button Button--primary");
        multiDlBtn.setAttribute('id', 'multiDlBtn');

        multiDlBtn.addEventListener("click", () => {
            const btn = document.getElementById('multiDlBtn');
            btn.setAttribute('class', "Button");
            // btn.setAttribute('readonly',true);
            removeSRonly();
            const itemRows = document.querySelectorAll(".ef-item-row, #selectAllCheckbox");
            for (let i = 0; i < itemRows.length; i++) {
                itemRows[i].addEventListener('click', removeSRonly);
            }

            

        });
        document.getElementsByClassName("ef-header")[0].children[0].insertAdjacentElement("afterend", multiDlBtn);

        const mo = new MutationObserver((record,observer)=>{
            const dlBtn = document.querySelectorAll(".btn-download");
            console.log(dlBtn.length);
            if (dlBtn.length >= 1) {
                const btnText = document.createElement('span')
                btnText.innerHTML = "全てダウンロード";
                dlBtn[0].setAttribute('class', 'ui-button btn-download Button--primary');
                if (dlBtn[0].children.length === 1) {
                    dlBtn[0].appendChild(btnText);
                }
            }
        })
        const moTarget = document.querySelectorAll('.ui-buttonset')[0];
        mo.observe(moTarget,{
            childList: true,//「子ノード（テキストノードも含む）」の変化
            attributes: true,//「属性」の変化
            characterData: true,//「テキストノード」の変化
        });



    });
}
