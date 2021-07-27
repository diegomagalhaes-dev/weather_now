export default function convertLocalization (name) {
    const first = name.split("-")
    const country = first[0].concat('_',first[1]).toLowerCase()
    return country;
}