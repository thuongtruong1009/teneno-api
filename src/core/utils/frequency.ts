// K max occurrence.

export function mostFrequency(arr: Array<any>, N: number, K: number) {
    const mp = new Map();

    for (let i = 0; i < N; i++) {
        if (mp.has(arr[i])) {
            mp.set(arr[i], mp.get(arr[i]) + 1);
        } else {
            mp.set(arr[i], 1);
        }
    }

    const list = [...mp];

    list.sort((o1, o2) => {
        if (o1[1] == o2[1]) return o2[0] - o1[0];
        else return o2[1] - o1[1];
    });

    console.log(K + ' numbers with most occurrences are: ');
    for (let i = 0; i < K; i++) console.log(list[i][0] + ' ');
}

const arr = [3, 1, 4, 4, 5, 2, 6, 1];
const N = arr.length;
const K = 2;

mostFrequency(arr, N, K);
