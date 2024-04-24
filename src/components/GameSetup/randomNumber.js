// Generates a random integer between the given min and max values, inclusive

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomNumber