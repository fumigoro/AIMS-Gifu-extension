const uploadAreaTemp = document.createElement('div');
uploadAreaTemp.className = 'file_drop_area';
uploadAreaTemp.innerHTML = 'ファイルをドラックしてアップロード';

const button_assingment = document.getElementsByClassName('Button Button--primary submit_assignment_link');
const filebox_quiz = document.getElementsByClassName('content-box border border-trbl file-upload-box');

const cancelButton = document.getElementsByClassName('cancel_button btn');

if (button_assingment[0]) {//課題ページ
    window.addEventListener('load', () => {

        const formArea = document.getElementsByClassName('submission_attachment');
        if(formArea.length === 0){
            console.warn('フォームが存在しないタイプの課題ページのため動作を中止させました。');
            return;
        }
        if(formArea.length !==2){
            console.warn('読み込み直後に存在するフォームの数が想定外です。動作を中止させました。検出したフォーム数:' + formArea.length);
            return;
        }

        formArea[0].appendChild(uploadAreaTemp.cloneNode(true));

        const uploadArea = document.getElementsByClassName('file_drop_area');

        for (let i=0;i<uploadArea.length;i++) {
            //ドラッグしホーバーしている状態で実行
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
if (filebox_quiz[0]) {//クイズページかつファイルアップロード形式の問題がある
    window.addEventListener('load', () => {
        console.log(filebox_quiz);
        for(let i=0;i<filebox_quiz.length;i++){
            filebox_quiz[i].appendChild(uploadAreaTemp.cloneNode(true));
        }

        const uploadArea = document.getElementsByClassName('file_drop_area');
        for (let i=0;i<uploadArea.length;i++) {
            //ドラッグしホーバーしている状態で実行
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
                const input = document.getElementsByClassName('question_input file-upload hidden');
                input[i].files = event.dataTransfer.files;
            });
        }
    });
}