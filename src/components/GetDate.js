// returnam date in local string
export function getDate(date) {
    const a = +date;
    const dateConv = new Date(a);
    return dateConv.toLocaleDateString();
}