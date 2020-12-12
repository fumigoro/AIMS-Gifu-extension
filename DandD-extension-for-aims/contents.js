const uploadAreaTemp = document.createElement('div');
uploadAreaTemp.className = 'file_drop_area';
uploadAreaTemp.innerHTML = 'ファイルをドロップしてアップロード';

const button = document.getElementsByClassName('Button Button--primary submit_assignment_link');

if (button[0]) {
    window.addEventListener('load', () => {

        const formArea = document.getElementsByClassName('submission_attachment');

        // 読み込み直後に存在するフォームの数が2つ以外の場合(2つではない場合は想定している課題ページではないため処理終了)
        if(formArea.length !==2){
            return;
        }

        formArea[0].appendChild(uploadAreaTemp.cloneNode(true));

        const uploadArea = document.getElementsByClassName('file_drop_area');

        for (let i=0;i<uploadArea.length;i++) {
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