class Badger {
    constructor(options) {
        Object.assign(
            this, {
                backgroundColor: "#f00",
                color: "#fff",
                size: 1,      // 0..1 (Scale in respect to the favicon image size)
                position: "nw", // Position inside favicon "n", "e", "s", "w", "ne", "nw", "se", "sw"
                radius: 5,      // Border radius
                src: "",        // Favicon source (dafaults to the <link> icon href)
                onChange() {},
            },
            options
        );
        this.canvas = document.createElement("canvas");
        this.src = this.src || this.faviconEL.getAttribute("href");
        this.ctx = this.canvas.getContext("2d");
    }

    faviconEL = document.querySelector("link[rel$=icon]");

    _drawIcon() {
        this.ctx.clearRect(0, 0, this.faviconSize, this.faviconSize);
        this.ctx.drawImage(this.img, 0, 0, this.faviconSize, this.faviconSize);
    }

    _drawShape() {
        const xb = this.offset.x + this.badgeSize;
        const yb = this.offset.y + this.badgeSize;

        this.ctx.beginPath();
        this.ctx.ellipse(3*xb/4, yb/4, xb/4, yb/4,0, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fill();
        this.ctx.closePath();
    }

    // _drawVal() {
    //     const margin = (this.badgeSize * 0.18) / 2;
    //     this.ctx.beginPath();
    //     this.ctx.textBaseline = "middle";
    //     this.ctx.textAlign = "center";
    //     this.ctx.font = `bold ${this.badgeSize * 0.7}px Arial`;
    //     this.ctx.fillStyle = this.color;
    //     this.ctx.fillText(this.value, this.badgeSize / 2 + this.offset.x, this.badgeSize / 2 + this.offset.y + margin);
    //     this.ctx.closePath();
    // }

    _drawFavicon() {
        this.faviconEL.setAttribute("href", this.dataURL);
    }

    _draw() {
        this._drawIcon();
        if (this.value) this._drawShape();
        // if (this.value) this._drawVal();
        this._drawFavicon();
    }

    // this.faviconSize = this.img.naturalWidth;
    _setup() {
        this.faviconSize = this.img.naturalWidth;
        this.badgeSize = this.faviconSize * this.size;
        this.canvas.width = this.faviconSize;
        this.canvas.height = this.faviconSize;
        const sd = this.faviconSize - this.badgeSize;
        const sd2 = sd / 2;
        this.offset = {
            n:  {x: sd2, y: 0 },
            e:  {x: sd, y: sd2},
            s:  {x: sd2, y: sd},
            w:  {x: 0, y: sd2},
            nw: {x: 0, y: 0},
            ne: {x: sd, y: 0},
            sw: {x: 0, y: sd},
            se: {x: sd, y: sd},
        }[this.position];
    }

    // Public functions / methods:

    update() {
        this._value = parseInt(this._value, 10);
        if (this.img) {
            this._draw();
            if (this.onChange) this.onChange.call(this);
        } else {
            this.img = new Image();
            this.img.addEventListener("load", () => {
                this._setup();
                this._draw();
                if (this.onChange) this.onChange.call(this);
            });
            this.img.src = this.src;
        }
    }

    get dataURL() {
        return this.canvas.toDataURL();
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.update();
    }
}

export default Badger;