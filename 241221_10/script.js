// シーン、カメラ、レンダラーのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 環境光と方向光の追加
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 強い環境光
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // 強い方向光
directionalLight.position.set(5, 5, 5); // 少し離れた位置に配置
scene.add(directionalLight);

// 背景色を変更
scene.background = new THREE.Color(0x333333); // 暗い背景色に変更

// GLTFLoaderでモデルを読み込む
const loader = new THREE.GLTFLoader();
let model;

loader.load(
    'model.glb', // Blenderからエクスポートしたモデルファイルのパス
    function (gltf) {
        model = gltf.scene;
        scene.add(model);

        // モデルのスケールと位置を設定
        model.scale.set(2, 2, 2); // モデルを拡大
        model.position.set(0, 0, 0); // モデルを原点に配置
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // ロード進行状況
    },
    function (error) {
        console.error('An error happened', error); // エラー処理
    }
);

// カメラの位置を設定
camera.position.set(0, 2, 5); // シーン全体が見える位置に設定
camera.lookAt(0, 0, 0);      // シーンの中心を向く

// 回転量の変数
let rotationSpeed = 0;

// スクロールイベントの設定
window.addEventListener('wheel', (event) => {
    if (model) {
        // スクロール量に基づいて回転スピードを調整
        rotationSpeed += event.deltaY * 0.0001;  // スクロールの強さを調整
    }
});

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);

    // モデルが存在する場合、回転させる
    if (model) {
        model.rotation.y += rotationSpeed; // Y軸回転
    }

    renderer.render(scene, camera);
}

// 初回アニメーションループの開始
animate();

// ウィンドウサイズ変更に対応
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});