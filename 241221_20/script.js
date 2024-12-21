document.addEventListener('mousemove', function(event) {
    const candle = document.getElementById('candle');
    const flame = document.querySelector('.flame');

    const x = event.clientX;
    const y = event.clientY;

    // 蝋燭の位置をカーソル位置に合わせる
    candle.style.left = `${x - candle.offsetWidth / 2}px`;
    candle.style.top = `${y - candle.offsetHeight / 2}px`;

    // 炎の位置を調整
    flame.style.left = `${(x - candle.offsetWidth / 2) + (candle.offsetWidth / 2) - (flame.offsetWidth / 2)}px`;
    flame.style.top = `${(y - candle.offsetHeight / 2) - 20}px`;

    // カーソルの動きに合わせて蝋燭を少し揺らす
    const offsetX = (Math.random() - 0.5) * 5;  // ゆっくり揺れるランダムなX軸の動き
    const offsetY = (Math.random() - 0.5) * 5;  // ゆっくり揺れるランダムなY軸の動き
    candle.style.transform = `translateX(-50%) translate(${offsetX}px, ${offsetY}px)`;
});