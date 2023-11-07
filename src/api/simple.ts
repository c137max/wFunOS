
export const getWorld = (): string => {

    const words = [
        "生命终有尽时。",
        "月明孤，风又起，杏花稀。",
        "失之东隅，收之桑榆。",
    ]
    return words[Math.floor(Math.random() * words.length)]
}