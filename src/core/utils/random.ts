// export async function randomInt(min: number, max: number): Promise<number> {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

export function subRandom(max: number): string {
    const random = {
        _pattern: /[a-zA-Z0-9_\-\+\!\@\#\$\%\^\&\*\?\.]/,

        getRandomByte: function () {
            return Math.floor(Math.random() * 256);
        },

        generate: function (length: number) {
            // eslint-disable-next-line prefer-spread
            return Array.apply(null, { length: length })
                .map(function () {
                    let result: string;
                    while (true) {
                        result = String.fromCharCode(this.getRandomByte());
                        if (this._pattern.test(result)) {
                            return result;
                        }
                    }
                }, this)
                .join('');
        },
    };
    return random.generate(max);
}
