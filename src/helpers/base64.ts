export function base64Image(imgUrl: string) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = imgUrl;
        img.setAttribute('crossOrigin', 'anonymous');

        img.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL('image/png');
            resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
        };
        img.onerror = function () {
            reject('The image could not be loaded.');
        };
    });
}
