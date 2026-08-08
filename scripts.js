const animationSection =
    document.getElementById("animation");

const detailSection =
    document.getElementById("detail");

const section3 =
    document.querySelector(".section-3");

const leftImg =
    document.querySelector(".left");

const centerImg =
    document.querySelector(".center");

const rightImg =
    document.querySelector(".right");

const info =
    document.querySelector(".info");


function clamp(value,min,max){
    return Math.min(
        Math.max(value,min),
        max
    );
}

function range(value,start,end){
    return clamp(
        (value - start) / (end - start),
        0,
        1
    );
}


function animate(){

    const rect =
        animationSection.getBoundingClientRect();

    const scrollable =
        animationSection.offsetHeight -
        window.innerHeight;

    const p = clamp(
        (-rect.top) / scrollable,
        0,
        1
    );

    /* ====================== */
    /* SECTION 1 */
    /* ====================== */

    if(p < 0.95){

        const leftP = range(p,0.10,0.30);

        leftImg.style.opacity = leftP;

        leftImg.style.transform =
            `translateX(${(-150 + leftP * 150)}px)
             translateY(-50%)`;

        const centerP = range(p,0.35,0.55);

        centerImg.style.opacity = centerP;

        centerImg.style.transform =
            `translate(-50%, -50%)
             scale(${0.7 + centerP * 0.3})`;

        const rightP = range(p,0.60,0.80);

        rightImg.style.opacity = rightP;

        rightImg.style.transform =
            `translateX(${(150 - rightP * 150)}px)
             translateY(-50%)`;
    }


    /* ====================== */
    /* SECTION 2 */
    /* ====================== */

    const detailRect =
        detailSection.getBoundingClientRect();

    const detailScrollable =
        detailSection.offsetHeight -
        window.innerHeight;

    const detailP = clamp(
        (-detailRect.top) /
        detailScrollable,
        0,
        1
    );

    // gambar tengah & kanan hilang
    if(p > 0.95){

        centerImg.style.opacity = 0;
        rightImg.style.opacity = 0;

    }

    if(detailRect.top <= 0){

        const section3Rect =
            section3.getBoundingClientRect();

        // mulai saat section 3 menyentuh bawah viewport
        const fadeP = clamp(
            (window.innerHeight - section3Rect.top) /
            window.innerHeight,
            0,
            1
        );

        leftImg.style.opacity =
            1 - fadeP;

        leftImg.style.transform =
        `
        translateX(${-600 * fadeP}px)
        translateY(-50%)
        scale(${1.5 - fadeP * 0.2})
        `;

        info.style.opacity =
            detailP;

        info.style.transform =
            `translateX(${200 - detailP * 200}px)`;
    }

    requestAnimationFrame(animate);
}

animate();